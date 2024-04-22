package com.example.demo.controller;

import com.example.demo.dto.ServicesDTO;
import com.example.demo.exception.EntityNotFoundException;
import com.example.demo.model.Images;
import com.example.demo.model.Services;
import com.example.demo.repository.ImagesRepository;
import com.example.demo.repository.ServicesRepository;
import com.example.demo.service.ImageService;
import com.example.demo.service.ServicesService;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@RequestMapping("/api/service")
public class ServicesController {

    private final ServicesRepository servicesRepository;
    private final ImagesRepository imagesRepository;
    private final ImageService imageService;
    private final ServicesService servicesService;

    public ServicesController(ServicesRepository servicesRepository, ImagesRepository imagesRepository, ImageService imageService, ServicesService servicesService) {
        this.servicesRepository = servicesRepository;
        this.imagesRepository = imagesRepository;
        this.imageService = imageService;
        this.servicesService = servicesService;
    }

    @CrossOrigin(origins = "http://localhost:5173")
    @GetMapping
    public ResponseEntity<List<ServicesDTO>> getAllServices() {
        List<ServicesDTO> servicesWithImages = servicesService.getAllServicesWithImages();
        if (servicesWithImages.isEmpty()) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(servicesWithImages);
    }

    @CrossOrigin(origins = "http://localhost:5173")
    @PostMapping("/")
    public ResponseEntity<Services> createServices(@RequestPart("service") String servicesStr, @RequestPart(required = false) List<MultipartFile> imageFiles) throws JsonProcessingException {
        ServicesDTO servicesDto = new ObjectMapper().readValue(servicesStr, ServicesDTO.class);

        Services services = convertToEntity(servicesDto);
        Services savedServices = servicesRepository.save(services);
        if (servicesDto.getImageUrls() != null) {
            servicesDto.getImageUrls().stream()
                    .filter(url -> url != null && !url.isEmpty()) // Filter out null or empty URLs
                    .forEach(url -> {
                        Images image = new Images();
                        image.setRecordId(savedServices.getId());
                        image.setTableName("service");
                        image.setImageUrl(url);
                        imagesRepository.save(image); // Only non-empty URLs are saved
                    });
        }

        // Handling uploaded images, ImageService.storeImage() filters out empty files
        if (imageFiles != null && !imageFiles.isEmpty()) {
            imageFiles.forEach(file -> {
                if (!file.isEmpty()) { // Double-check to ensure file is not empty
                    Images image = imageService.storeImage(file, "service", savedServices.getId());
                    // storeImage() method handles saving, so no need to save image again here
                }
            });
        }

        return new ResponseEntity<>(savedServices, HttpStatus.CREATED);
    }

    @CrossOrigin(origins = "http://localhost:5173")
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteServices(@PathVariable Long id) {
        try {
            servicesService.deleteServiceAndAssociatedImages(id);
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } catch (EntityNotFoundException e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.NOT_FOUND);
        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    private Services convertToEntity(ServicesDTO servicesDto) {
        Services services = new Services();
        services.setTitle(servicesDto.getTitle());
        services.setInfo(servicesDto.getInfo());
        services.setAddress(servicesDto.getAddress());
        services.setContact(servicesDto.getContact());
        // Add other fields from DTO to entity as needed

        return services;
    }
}
