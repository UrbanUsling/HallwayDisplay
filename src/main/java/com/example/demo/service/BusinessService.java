package com.example.demo.service;

import com.example.demo.dto.BusinessDTO;
import com.example.demo.exception.EntityNotFoundException;
import com.example.demo.model.Business;
import com.example.demo.model.Images;
import com.example.demo.repository.BusinessRepository;
import com.example.demo.repository.ImagesRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class BusinessService {

    private final BusinessRepository businessRepository;
    private final ImagesRepository imagesRepository;
    private final ImageService imageService;

    @Autowired
    public BusinessService(BusinessRepository businessRepository, ImagesRepository imagesRepository, ImageService imageService) {
        this.businessRepository = businessRepository;
        this.imagesRepository = imagesRepository;
        this.imageService = imageService;
    }

    public void deleteBusinessAndAssociatedImages(Long id) {
        Business business = businessRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Business not found with id: " + id));

        List<Images> images = imagesRepository.findByTableNameAndRecordId("business", Math.toIntExact(id));
        imagesRepository.deleteAll(images);
        businessRepository.delete(business);
    }

    public List<BusinessDTO> getAllBusinessWithImages() {
        List<Business> businesses = businessRepository.findAll();
        return businesses.stream().map(business -> {
            List<Images> images = imageService.getImagesForRecord("business", business.getId());
            List<String> imageUrls = images.stream().map(Images::getImageUrl).collect(Collectors.toList());
            return new BusinessDTO(business, imageUrls);
        }).collect(Collectors.toList());
    }
}
