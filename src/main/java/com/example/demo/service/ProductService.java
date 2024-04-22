package com.example.demo.service;


import com.example.demo.dto.ProductDTO;
import com.example.demo.exception.EntityNotFoundException;
import com.example.demo.model.Images;

import com.example.demo.model.Product;
import com.example.demo.repository.ImagesRepository;
import com.example.demo.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class ProductService {

    private final ProductRepository productRepository;
    private final ImagesRepository imagesRepository;
    private final ImageService imageService;

    @Autowired
    public ProductService(ProductRepository productRepository, ImagesRepository imagesRepository, ImageService imageService) {
        this.productRepository = productRepository;
        this.imagesRepository = imagesRepository;
        this.imageService = imageService;
    }

    public List<ProductDTO> getAllProductsWithImages() {
        System.out.println("Fetching all products with their images");
        List<Product> products = productRepository.findAll();
        if(products.isEmpty()) {
            System.out.println("No products found.");
            return new ArrayList<>();
        }
        List<ProductDTO> productDTOs = products.stream()
                .map(product -> {
                    List<Images> images = imageService.getImagesForRecord("product", product.getId());
                    List<String> imageUrls = images.stream().map(Images::getImageUrl).collect(Collectors.toList());
                    return new ProductDTO(product, imageUrls);
                })
                .collect(Collectors.toList());

        System.out.println("Returning products with images, count: " + productDTOs.size());
        return productDTOs;
    }

    public void deleteProductAndAssociatedImages(Long id) throws EntityNotFoundException {
        // Check if the info exists
        Product product = productRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Product found with id: " + id));

        // Delete associated images first to maintain referential integrity
        List<Images> images = imagesRepository.findByTableNameAndRecordId("product", Math.toIntExact(id));
        imagesRepository.deleteAll(images);

        // Now, delete the info entry
        productRepository.delete(product);
    }
    // Other service methods
}
