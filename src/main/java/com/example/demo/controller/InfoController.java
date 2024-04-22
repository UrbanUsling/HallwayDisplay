package com.example.demo.controller;

import com.example.demo.dto.InfoDTO;
import com.example.demo.dto.ProductDTO;
import com.example.demo.exception.BadRequestException;
import com.example.demo.exception.EntityNotFoundException;
import com.example.demo.model.Images;
import com.example.demo.model.Info;

import com.example.demo.model.Product;
import com.example.demo.repository.ImagesRepository;
import com.example.demo.repository.InfoRepository;
import com.example.demo.service.FileStorageService;
import com.example.demo.service.ImageService;
import com.example.demo.service.InfoService;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping("/api/info")
public class InfoController {

    private final InfoRepository infoRepository;
    private final ImagesRepository imagesRepository;

    private final ImageService imageService;
    private final InfoService infoService;

    public InfoController(InfoRepository infoRepository, ImagesRepository imagesRepository, ImageService imageService, FileStorageService fileStorageService, InfoService infoService) {
        this.infoRepository = infoRepository;
        this.imagesRepository = imagesRepository;
        this.imageService = imageService;
        this.infoService = infoService;
    }
    private Info convertToEntity(InfoDTO infoDto) {
        Info info = new Info();
        info.setFull_name(infoDto.getFull_name());
        info.setTitle(infoDto.getTitle());
        info.setEmail(infoDto.getEmail());
        info.setPhone(infoDto.getPhone());
        info.setDepartment(infoDto.getDepartment());
        info.setLocation(infoDto.getLocation());
        info.setWorkArea(infoDto.getWorkArea());
        info.setManager(infoDto.getManager());

        // Set other fields as necessary

        return info;
    }
    @CrossOrigin(origins = "http://localhost:5173")
    @GetMapping
    public ResponseEntity<List<InfoDTO>> getAllInfo() {
        List<InfoDTO> productsWithImages = infoService.getAllInfoWithImages();
        if (productsWithImages.isEmpty()) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(productsWithImages);
    }



    @CrossOrigin(origins = "http://localhost:5173")
    @PostMapping("/")
    public ResponseEntity<Info> createProduct(@RequestPart("info") String infoStr, @RequestPart(required = false) List<MultipartFile> imageFiles) throws JsonProcessingException {

        InfoDTO infoDto = new ObjectMapper().readValue(infoStr, InfoDTO.class);


        Info info = convertToEntity(infoDto);
        System.out.println("Converted Product entity: " + info);

        Info savedInfo = infoRepository.save(info);
        System.out.println("Saved info entity: " + savedInfo);
        // Handling image URLs from DTO, only save non-empty URLs
        if (infoDto.getImageUrls() != null) {
            infoDto.getImageUrls().stream()
                    .filter(url -> url != null && !url.isEmpty()) // Filter out null or empty URLs
                    .forEach(url -> {
                        Images image = new Images();
                        image.setRecordId(savedInfo.getId());
                        image.setTableName("info");
                        image.setImageUrl(url);
                        imagesRepository.save(image); // Only non-empty URLs are saved
                    });
        }

        // Handling uploaded images, ImageService.storeImage() filters out empty files
        if (imageFiles != null && !imageFiles.isEmpty()) {
            imageFiles.forEach(file -> {
                if (!file.isEmpty()) { // Double-check to ensure file is not empty
                    Images image = imageService.storeImage(file, "info", savedInfo.getId());
                    // storeImage() method handles saving, so no need to save image again here
                }
            });
        }

        return new ResponseEntity<>(savedInfo, HttpStatus.CREATED);
    }

    @CrossOrigin(origins = "http://localhost:5173")
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteInfo(@PathVariable Long id) {
        try {
            // Call the service method to delete the info and its associated images.
            infoService.deleteInfoAndAssociatedImages(id);
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } catch (EntityNotFoundException e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.NOT_FOUND);
        } catch (Exception e) {
            // Log the exception details for debugging
            e.printStackTrace();
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
