package com.example.demo.service;

import com.example.demo.model.CupboardLayout;
import com.example.demo.repository.CupboardLayoutRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


import java.util.List;
import java.util.Optional;

@Service
public class CupboardLayoutService {
    @Autowired
    private CupboardLayoutRepository cupboardLayoutRepository;

    public CupboardLayout saveLayoutConfig(String layoutConfig) {
        CupboardLayout cupboardLayout = new CupboardLayout();
        cupboardLayout.setConfiguration(layoutConfig); // Anta att layoutConfig redan är en JSON-sträng
        return cupboardLayoutRepository.save(cupboardLayout);

    }
    public Optional<CupboardLayout> getLayoutConfig() {
        return cupboardLayoutRepository.findById(1L);
    }

    public List<CupboardLayout> getAllLayoutConfigs() {
        return cupboardLayoutRepository.findAll();
    }
}
