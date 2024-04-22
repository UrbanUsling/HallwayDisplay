/*package com.example.demo.controller;

import com.example.demo.dto.CupboardLayoutDTO;
import com.example.demo.exception.EntityNotFoundException;
import com.example.demo.model.CupboardLayout;
import com.example.demo.model.CupboardProduct;
import com.example.demo.model.Product;
import com.example.demo.repository.CupboardLayoutRepository;
import com.example.demo.repository.CupboardProductRepository;
import com.example.demo.repository.ProductRepository;
import com.example.demo.service.CupboardLayoutService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


import java.util.List;

@RestController
@RequestMapping("/api")
public class CupboardLayoutController {

    private final CupboardLayoutService cupboardLayoutService;
    private final ProductRepository productRepository;
    private final CupboardProductRepository cupboardProductRepository;
    public CupboardLayoutController(CupboardLayoutService cupboardLayoutService, ProductRepository productRepository, CupboardLayoutRepository cupboardLayoutRepository){
        this.cupboardLayoutService=cupboardLayoutService;
        this.productRepository=productRepository;
        this.cupboardProductRepository = cupboardProductRepository;
    }
    @PostMapping("/savelayout")
    public ResponseEntity<String> saveLayout(@RequestBody CupboardLayoutDTO cupboardLayoutDTO) {
        cupboardLayoutService.saveLayoutConfig(cupboardLayoutDTO.getConfiguration());
        return ResponseEntity.ok("Layout saved successfully");
    }

    @GetMapping("/getlayouts")
    public ResponseEntity<List<CupboardLayout>> getLayouts() {
        List<CupboardLayout> layouts = cupboardLayoutService.getAllLayoutConfigs();
        return ResponseEntity.ok(layouts);
    }

    @PostMapping("/cupboardProduct/{cardId}/{productId}")
    public ResponseEntity<CupboardProduct> saveCupboardProduct(@PathVariable int cardId, @PathVariable int productId) {
        Product product = productRepository.findById((long) productId)
                .orElseThrow(() -> new EntityNotFoundException("Product not found with ID: " + productId));

        CupboardProduct cupboardProduct = new CupboardProduct();
        cupboardProduct.setCardId(cardId);
        cupboardProduct.setProduct(product);
        CupboardProduct savedCupboardProduct = cupboardProductRepository.save(cupboardProduct);

        return new ResponseEntity<>(savedCupboardProduct, HttpStatus.CREATED);
    }


}*/
