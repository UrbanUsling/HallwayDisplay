package com.example.demo.service;

import com.example.demo.exception.EntityNotFoundException;
import com.example.demo.model.LayoutConfig;
import com.example.demo.model.Product;
import com.example.demo.repository.LayoutConfigRepository;
import com.example.demo.repository.ProductRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
public class LayoutConfigService {

    private final LayoutConfigRepository layoutConfigRepository;


    public LayoutConfigService(LayoutConfigRepository layoutConfigRepository, ProductRepository productRepository) {
        this.layoutConfigRepository = layoutConfigRepository;

    }

    // Retrieve all layout configurations
    public List<LayoutConfig> getAllLayoutConfigs() {
        return layoutConfigRepository.findAll();
    }

    // Save or update a layout configuration
    @Transactional
    public LayoutConfig saveLayoutConfig(LayoutConfig layoutConfig) {
        // Additional logic before saving can be implemented here
        return layoutConfigRepository.save(layoutConfig);
    }

    // Delete a layout configuration by ID

    @Transactional
    public void replaceLayoutConfigs(List<LayoutConfig> newLayoutConfigs) {
        // Clear all existing layout configurations
        layoutConfigRepository.deleteAll();

        // Directly save the LayoutConfig without setting a Product instance
        layoutConfigRepository.saveAll(newLayoutConfigs);
    }


}
