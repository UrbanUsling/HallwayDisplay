package com.example.demo.service;

import com.example.demo.exception.StorageException;
import com.example.demo.model.Images;
import com.example.demo.repository.ImagesRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@Service
public class ImageService {

    private final ImagesRepository imagesRepository;
    private final FileStorageService fileStorageService;

    // Inject repositories for other entities if needed, e.g. ProductRepository, InfoRepository

    @Autowired
    public ImageService(ImagesRepository imagesRepository, FileStorageService fileStorageService) {
        this.imagesRepository = imagesRepository;
        this.fileStorageService = fileStorageService;
    }
// In ImageService.java

    // Method to retrieve all images for a given record and table
    public List<Images> getImagesForRecord(String tableName, int recordId) {
        return imagesRepository.findByTableNameAndRecordId(tableName, recordId);
    }

    // Method to store image and create a new Images record
    public Images storeImage(MultipartFile file, String tableName, int recordId) {
        System.out.println("Storing image for tableName: " + tableName + ", recordId: " + recordId);
        if (file != null && !file.isEmpty()) {
            String imageUrl = fileStorageService.store(file);
            System.out.println("Stored image at URL: " + imageUrl);

            Images image = new Images();
            image.setRecordId(recordId);
            image.setTableName(tableName);
            image.setImageUrl(imageUrl);
            Images savedImage = imagesRepository.save(image);
            System.out.println("Saved image record: " + savedImage);

            return savedImage;
        } else {
            System.out.println("Received empty file for image storage.");
            return null;
        }

        // Additional methods as needed for deleting images, etc.
    }
}
