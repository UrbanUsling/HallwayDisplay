package com.example.demo.controller;

import com.example.demo.dto.FaqDTO;
import com.example.demo.exception.EntityNotFoundException;
import com.example.demo.model.Faq;
import com.example.demo.model.Images;
import com.example.demo.repository.FaqRepository;
import com.example.demo.repository.ImagesRepository;
import com.example.demo.service.FaqService;
import com.example.demo.service.ImageService;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@RequestMapping("/api/faq")
public class FaqController {

    private final FaqRepository faqRepository;
    private final ImagesRepository imagesRepository;
    private final ImageService imageService;
    private final FaqService faqService;

    public FaqController(FaqRepository faqRepository, ImagesRepository imagesRepository, ImageService imageService, FaqService faqService) {
        this.faqRepository = faqRepository;
        this.imagesRepository = imagesRepository;
        this.imageService = imageService;
        this.faqService = faqService;
    }
    private Faq convertToEntity(FaqDTO faqDto) {
        Faq faq = new Faq();
        faq.setTitle(faqDto.getTitle());
        faq.setInfo(faqDto.getInfo());
        faq.setAddress(faqDto.getAddress());
        faq.setContact(faqDto.getContact());
        // Assuming Faq has these fields based on the DTO

        return faq;
    }

    @CrossOrigin(origins = "http://localhost:5173")
    @GetMapping
    public ResponseEntity<List<FaqDTO>> getAllFaqs() {
        List<FaqDTO> faqsWithImages = faqService.getAllFaqsWithImages();
        if (faqsWithImages.isEmpty()) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(faqsWithImages);
    }

    @CrossOrigin(origins = "http://localhost:5173")
    @PostMapping("/")
    public ResponseEntity<Faq> createFaq(@RequestPart("faq") String faqStr, @RequestPart(required = false) List<MultipartFile> imageFiles) throws JsonProcessingException {
        FaqDTO faqDto = new ObjectMapper().readValue(faqStr, FaqDTO.class);

        Faq faq = convertToEntity(faqDto);
        System.out.println("Converted Faq entity: " + faq);

        Faq savedFaq = faqRepository.save(faq);
        System.out.println("Saved faq entity: " + savedFaq);
        if (faqDto.getImageUrls() != null) {
            faqDto.getImageUrls().stream()
                    .filter(url -> url != null && !url.isEmpty()) // Filter out null or empty URLs
                    .forEach(url -> {
                        Images image = new Images();
                        image.setRecordId(savedFaq.getId());
                        image.setTableName("faq");
                        image.setImageUrl(url);
                        imagesRepository.save(image); // Only non-empty URLs are saved
                    });
        }

        // Handling uploaded images, ImageService.storeImage() filters out empty files
        if (imageFiles != null && !imageFiles.isEmpty()) {
            imageFiles.forEach(file -> {
                if (!file.isEmpty()) { // Double-check to ensure file is not empty
                    Images image = imageService.storeImage(file, "faq", savedFaq.getId());
                    // storeImage() method handles saving, so no need to save image again here
                }
            });
        }

        // Handling image URLs and uploaded images logic here

        return new ResponseEntity<>(savedFaq, HttpStatus.CREATED);
    }

    @CrossOrigin(origins = "http://localhost:5173")
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteFaq(@PathVariable Long id) {
        try {
            faqService.deleteFaqAndAssociatedImages(id);
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } catch (EntityNotFoundException e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.NOT_FOUND);
        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
