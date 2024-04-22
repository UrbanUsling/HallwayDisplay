package com.example.demo.controller;


import com.example.demo.dto.BusinessDTO;

import com.example.demo.exception.EntityNotFoundException;
import com.example.demo.model.Business;
import com.example.demo.model.Images;

import com.example.demo.repository.BusinessRepository;
import com.example.demo.repository.ImagesRepository;

import com.example.demo.service.BusinessService;

import com.example.demo.service.ImageService;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@RequestMapping("/api/business")
public class BusinessController {

    private final BusinessRepository businessRepository;
    private final ImagesRepository imagesRepository;

    private final ImageService imageService;
    private final BusinessService businessService;

    public BusinessController(BusinessRepository businessRepository, ImagesRepository imagesRepository, ImageService imageService, BusinessService businessService) {
        this.businessRepository = businessRepository;
        this.imagesRepository = imagesRepository;
        this.imageService = imageService;
        this.businessService = businessService;
    }

    private Business convertToEntity(BusinessDTO businessDto) {
        Business business = new Business();
        business.setTitle(businessDto.getTitle());
        business.setSubtitle(businessDto.getSubtitle());
        business.setInfo(businessDto.getInfo());
        business.setAddress(businessDto.getAddress());
        business.setContact(businessDto.getContact());


        return business;
    }
    @CrossOrigin(origins = "http://localhost:5173")
    @GetMapping
    public ResponseEntity<List<BusinessDTO>> getAllInfo() {
        List<BusinessDTO> productsWithImages = businessService.getAllBusinessWithImages();
        if (productsWithImages.isEmpty()) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(productsWithImages);
    }



    @CrossOrigin(origins = "http://localhost:5173")
    @PostMapping("/")
    public ResponseEntity<Business> createProduct(@RequestPart("business") String infoStr, @RequestPart(required = false) List<MultipartFile> imageFiles) throws JsonProcessingException {

        BusinessDTO businessDto = new ObjectMapper().readValue(infoStr, BusinessDTO.class);


        Business business = convertToEntity(businessDto);
        System.out.println("Converted Business entity: " + business);

        Business savedInfo = businessRepository.save(business);
        System.out.println("Saved info entity: " + savedInfo);
        // Handling image URLs from DTO, only save non-empty URLs
        if (businessDto.getImageUrls() != null) {
            businessDto.getImageUrls().stream()
                    .filter(url -> url != null && !url.isEmpty()) // Filter out null or empty URLs
                    .forEach(url -> {
                        Images image = new Images();
                        image.setRecordId(savedInfo.getId());
                        image.setTableName("business");
                        image.setImageUrl(url);
                        imagesRepository.save(image); // Only non-empty URLs are saved
                    });
        }

        // Handling uploaded images, ImageService.storeImage() filters out empty files
        if (imageFiles != null && !imageFiles.isEmpty()) {
            imageFiles.forEach(file -> {
                if (!file.isEmpty()) { // Double-check to ensure file is not empty
                    Images image = imageService.storeImage(file, "business", savedInfo.getId());
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
            businessService.deleteBusinessAndAssociatedImages(id);
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
