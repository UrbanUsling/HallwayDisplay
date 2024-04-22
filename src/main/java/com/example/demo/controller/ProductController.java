package com.example.demo.controller;

import com.example.demo.exception.EntityNotFoundException;
import com.example.demo.model.Images;
import com.example.demo.model.Product;
import com.example.demo.repository.ImagesRepository;
import com.example.demo.repository.ProductRepository;
import com.example.demo.service.FileStorageService;
import com.example.demo.service.ImageService;
import com.example.demo.dto.ProductDTO;
import com.example.demo.service.ProductService;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/product") // Keep as is if other endpoints remain public
public class ProductController {


    private final ProductRepository productRepository;
    private final ImagesRepository imagesRepository;

    private final ImageService imageService;
    private final ProductService productService;

    public ProductController(ProductRepository productRepository, ImagesRepository imagesRepository, FileStorageService fileStorageService, ImagesRepository imagesRepository1, ImageService imageService, ProductService productService) {
        this.productRepository = productRepository;
        this.imagesRepository = imagesRepository1;
        this.imageService = imageService;
        this.productService = productService;
    }
    private Product convertToEntity(ProductDTO productDto) {
        Product product = new Product();
        product.setTitle(productDto.getTitle());
        product.setSubtitle(productDto.getSubtitle());
        product.setCustomerSide(productDto.getCustomerSide());
        product.setPrevasSide(productDto.getPrevasSide());
        product.setContact(productDto.getContact());

        // Set other fields as necessary

        return product;
    }
    // Assuming this endpoint remains public
    @CrossOrigin(origins = "http://localhost:5173")
    @GetMapping
    public ResponseEntity<List<ProductDTO>> getAllProducts() {
        List<ProductDTO> productsWithImages = productService.getAllProductsWithImages();
        if (productsWithImages.isEmpty()) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(productsWithImages);
    }


    // Adjust this to fall under /admin
    @CrossOrigin(origins = "http://localhost:5173")
    @PostMapping("/")
    public ResponseEntity<Product> createProduct(@RequestPart("product") String productStr, @RequestPart(required = false) List<MultipartFile> imageFiles) throws JsonProcessingException {

        System.out.println("Received createProduct request with productStr: " + productStr);
        System.out.println("Number of uploaded imageFiles: " + (imageFiles != null ? imageFiles.size() : "0"));

        ProductDTO productDto = new ObjectMapper().readValue(productStr, ProductDTO.class);
        System.out.println("Deserialized ProductDTO: " + productDto);

        Product product = convertToEntity(productDto);
        System.out.println("Converted Product entity: " + product);

        Product savedProduct = productRepository.save(product);
        System.out.println("Saved Product entity: " + savedProduct);
        // Handling image URLs from DTO, only save non-empty URLs
        if (productDto.getImageUrls() != null) {
            productDto.getImageUrls().stream()
                    .filter(url -> url != null && !url.isEmpty()) // Filter out null or empty URLs
                    .forEach(url -> {
                        Images image = new Images();
                        image.setRecordId(savedProduct.getId());
                        image.setTableName("product");
                        image.setImageUrl(url);
                        imagesRepository.save(image); // Only non-empty URLs are saved
                    });
        }

        // Handling uploaded images, ImageService.storeImage() filters out empty files
        if (imageFiles != null && !imageFiles.isEmpty()) {
            imageFiles.forEach(file -> {
                if (!file.isEmpty()) { // Double-check to ensure file is not empty
                    Images image = imageService.storeImage(file, "product", savedProduct.getId());
                    // storeImage() method handles saving, so no need to save image again here
                }
            });
        }

        return new ResponseEntity<>(savedProduct, HttpStatus.CREATED);
    }






    @CrossOrigin(origins = "http://localhost:5173")
    @DeleteMapping("/deleteById/{id}")
    public ResponseEntity<?> deleteProduct(@PathVariable Long id) {
        try {
            // Call the service method to delete the product and its associated images.
            productService.deleteProductAndAssociatedImages(id);
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } catch (EntityNotFoundException e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.NOT_FOUND);
        } catch (Exception e) {
            // Log the exception details for debugging
            e.printStackTrace();
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }


    @CrossOrigin(origins = "http://localhost:5173")
    @GetMapping("/{id}")
    public ResponseEntity<ProductDTO> getProductById(@PathVariable Long id) {
        return productRepository.findById(id)
                .map(product -> {
                    List<String> imageUrls = imageService.getImagesForRecord("product", product.getId())
                            .stream()
                            .map(Images::getImageUrl)
                            .collect(Collectors.toList());
                    ProductDTO productDTO = new ProductDTO(product, imageUrls);
                    return new ResponseEntity<>(productDTO, HttpStatus.OK);
                })
                .orElseThrow(() -> new EntityNotFoundException("Gick inte att hitta produkt med ID: " + id));
    }


}

