package com.example.demo.controller;

import com.example.demo.dto.LabbDTO;
import com.example.demo.exception.EntityNotFoundException;
import com.example.demo.model.Images;
import com.example.demo.model.Labb;
import com.example.demo.repository.LabbRepository;
import com.example.demo.repository.ImagesRepository;
import com.example.demo.service.LabbService;
import com.example.demo.service.ImageService;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@RequestMapping("/api/labb")
public class LabbController {

    private final LabbRepository labbRepository;
    private final ImagesRepository imagesRepository;
    private final ImageService imageService;
    private final LabbService labbService;

    public LabbController(LabbRepository labbRepository, ImagesRepository imagesRepository, ImageService imageService, LabbService labbService) {
        this.labbRepository = labbRepository;
        this.imagesRepository = imagesRepository;
        this.imageService = imageService;
        this.labbService = labbService;
    }
    private Labb convertToEntity(LabbDTO labbDto) {
        Labb labb = new Labb();
        labb.setTitle(labbDto.getTitle());
        labb.setInfo(labbDto.getInfo());
        labb.setContact(labbDto.getContact());
        // Add other fields if necessary

        return labb;
    }


    @CrossOrigin(origins = "http://localhost:5173")
    @GetMapping
    public ResponseEntity<List<LabbDTO>> getAllLabbs() {
        List<LabbDTO> labbsWithImages = labbService.getAllLabbWithImages();
        if (labbsWithImages.isEmpty()) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(labbsWithImages);
    }

    @CrossOrigin(origins = "http://localhost:5173")
    @PostMapping("/")
    public ResponseEntity<Labb> createLabb(@RequestPart("lab") String labbStr, @RequestPart(required = false) List<MultipartFile> imageFiles) throws JsonProcessingException {
        LabbDTO labbDto = new ObjectMapper().readValue(labbStr, LabbDTO.class);

        Labb labb = convertToEntity(labbDto);
        System.out.println("Converted Labb entity: " + labb);

        Labb savedLabb = labbRepository.save(labb);
        System.out.println("Saved labb entity: " + savedLabb);

        if (labbDto.getImageUrls() != null) {
            labbDto.getImageUrls().stream()
                    .filter(url -> url != null && !url.isEmpty()) // Filter out null or empty URLs
                    .forEach(url -> {
                        Images image = new Images();
                        image.setRecordId(savedLabb.getId());
                        image.setTableName("lab");
                        image.setImageUrl(url);
                        imagesRepository.save(image); // Only non-empty URLs are saved
                    });
        }

        // Handling uploaded images, ImageService.storeImage() filters out empty files
        if (imageFiles != null && !imageFiles.isEmpty()) {
            imageFiles.forEach(file -> {
                if (!file.isEmpty()) { // Double-check to ensure file is not empty
                    Images image = imageService.storeImage(file, "lab", savedLabb.getId());
                    // storeImage() method handles saving, so no need to save image again here
                }
            });
        }

        return new ResponseEntity<>(savedLabb, HttpStatus.CREATED);
    }

    @CrossOrigin(origins = "http://localhost:5173")
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteLabb(@PathVariable Long id) {
        try {
            labbService.deleteLabbAndAssociatedImages(id);
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } catch (EntityNotFoundException e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.NOT_FOUND);
        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
