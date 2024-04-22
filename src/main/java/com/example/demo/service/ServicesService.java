package com.example.demo.service;


import com.example.demo.dto.ServicesDTO;
import com.example.demo.exception.EntityNotFoundException;
import com.example.demo.model.Images;
import com.example.demo.model.Services;
import com.example.demo.repository.ImagesRepository;
import com.example.demo.repository.ServicesRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class ServicesService {

    private final ServicesRepository servicesRepository;
    private final ImagesRepository imagesRepository;
    private final ImageService imageService;

    @Autowired
    public ServicesService(ServicesRepository servicesRepository, ImagesRepository imagesRepository, ImageService imageService) {
        this.servicesRepository = servicesRepository;
        this.imagesRepository = imagesRepository;
        this.imageService = imageService;
    }



    public void deleteServiceAndAssociatedImages(Long id) {
        Services services = servicesRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Service not found with id: " + id));

        List<Images> images = imagesRepository.findByTableNameAndRecordId("service", Math.toIntExact(id));
        imagesRepository.deleteAll(images);
        servicesRepository.delete(services);
    }

    public List<ServicesDTO> getAllServicesWithImages() {
        List<Services> servicess = servicesRepository.findAll();
        return servicess.stream().map(services -> {
            List<Images> images = imageService.getImagesForRecord("service", services.getId());
            List<String> imageUrls = images.stream().map(Images::getImageUrl).collect(Collectors.toList());
            return new ServicesDTO(services, imageUrls);
        }).collect(Collectors.toList());
    }
}
