package com.example.demo.service;


import com.example.demo.dto.LabbDTO;
import com.example.demo.exception.EntityNotFoundException;
import com.example.demo.model.Images;

import com.example.demo.model.Labb;
import com.example.demo.repository.ImagesRepository;
import com.example.demo.repository.LabbRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class LabbService {

    private final LabbRepository labbRepository;
    private final ImagesRepository imagesRepository;
    private final ImageService imageService;

    @Autowired
    public LabbService(LabbRepository labbRepository, ImagesRepository imagesRepository, ImageService imageService) {
        this.labbRepository = labbRepository;
        this.imagesRepository = imagesRepository;
        this.imageService = imageService;
    }
    public void deleteLabbAndAssociatedImages(Long id) throws EntityNotFoundException {
        // Check if the info exists
        Labb labb = labbRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Info not found with id: " + id));

        // Delete associated images first to maintain referential integrity
        List<Images> images = imagesRepository.findByTableNameAndRecordId("info", Math.toIntExact(id));
        imagesRepository.deleteAll(images);

        // Now, delete the info entry
        labbRepository.delete(labb);
    }

    public List<LabbDTO> getAllLabbWithImages() {
        System.out.println("Fetching all labb with their images");
        List<Labb> labbs = labbRepository.findAll();
        if(labbs.isEmpty()) {
            System.out.println("No info found.");
            return new ArrayList<>();
        }
        List<LabbDTO> labbDTOs = labbs.stream()
                .map(labb -> {
                    List<Images> images = imageService.getImagesForRecord("lab", labb.getId() );
                    List<String> imageUrls = images.stream().map(Images::getImageUrl).collect(Collectors.toList());
                    return new LabbDTO(labb, imageUrls);
                })
                .collect(Collectors.toList());

        System.out.println("Returning labbs with images, count: " + labbDTOs.size());
        return labbDTOs;
    }
    // Other service methods
}
