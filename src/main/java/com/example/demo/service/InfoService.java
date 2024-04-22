package com.example.demo.service;


import com.example.demo.dto.InfoDTO;
import com.example.demo.exception.EntityNotFoundException;
import com.example.demo.model.Images;

import com.example.demo.model.Info;
import com.example.demo.repository.ImagesRepository;
import com.example.demo.repository.InfoRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class InfoService {

    private final InfoRepository infoRepository;
    private final ImagesRepository imagesRepository;
    private final ImageService imageService;

    @Autowired
    public InfoService(InfoRepository infoRepository, ImagesRepository imagesRepository, ImageService imageService) {
        this.infoRepository = infoRepository;
        this.imagesRepository = imagesRepository;
        this.imageService = imageService;
    }
    public void deleteInfoAndAssociatedImages(Long id) throws EntityNotFoundException {
        // Check if the info exists
        Info info = infoRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Info not found with id: " + id));

        // Delete associated images first to maintain referential integrity
        List<Images> images = imagesRepository.findByTableNameAndRecordId("info", Math.toIntExact(id));
        imagesRepository.deleteAll(images);

        // Now, delete the info entry
        infoRepository.delete(info);
    }

    public List<InfoDTO> getAllInfoWithImages() {
        System.out.println("Fetching all info with their images");
        List<Info> infos = infoRepository.findAll();
        if(infos.isEmpty()) {
            System.out.println("No info found.");
            return new ArrayList<>();
        }
        List<InfoDTO> infoDTOs = infos.stream()
                .map(info -> {
                    List<Images> images = imageService.getImagesForRecord("info", info.getId() );
                    List<String> imageUrls = images.stream().map(Images::getImageUrl).collect(Collectors.toList());
                    return new InfoDTO(info, imageUrls);
                })
                .collect(Collectors.toList());

        System.out.println("Returning infos with images, count: " + infoDTOs.size());
        return infoDTOs;
    }
    // Other service methods
}
