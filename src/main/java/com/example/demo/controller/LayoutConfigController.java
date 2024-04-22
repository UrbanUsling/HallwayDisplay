package com.example.demo.controller;

import ch.qos.logback.classic.Logger;
import com.example.demo.dto.LayoutConfigDTO;
import com.example.demo.exception.EntityNotFoundException;
import com.example.demo.model.LayoutConfig;
import com.example.demo.repository.LayoutConfigRepository;
import com.example.demo.service.LayoutConfigService;
import org.slf4j.LoggerFactory;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/layoutConfig")
public class LayoutConfigController {
    private static final Logger log = (Logger) LoggerFactory.getLogger(LayoutConfigController.class);



    private final LayoutConfigService layoutConfigService;

    public LayoutConfigController(LayoutConfigRepository layoutConfigRepository, LayoutConfigService layoutConfigService) {

        this.layoutConfigService = layoutConfigService;
    }

    // Get the layout configuration for all cards
    @CrossOrigin(origins = "http://localhost:5173")
    @GetMapping
    public ResponseEntity<List<LayoutConfig>> getAllLayoutConfigs() {
        log.info("Fetching all layout configurations...");
        List<LayoutConfig> configs = layoutConfigService.getAllLayoutConfigs();
        log.info("Layout configurations fetched. Count: {}", configs.size());
        return ResponseEntity.ok(configs);
    }


    @PostMapping("/")
    public ResponseEntity<LayoutConfig> saveLayoutConfig(@RequestBody LayoutConfig layoutConfig) {
        log.info("Saving layout configuration: {}", layoutConfig);
        LayoutConfig savedConfig = layoutConfigService.saveLayoutConfig(layoutConfig);
        log.info("Layout configuration saved successfully with ID: {}", savedConfig.getId());
        return new ResponseEntity<>(savedConfig, HttpStatus.CREATED);
    }

    // Delete a specific layout configuration


    // Retrieve the layout configuration for a specific card

    @CrossOrigin(origins = "http://localhost:5173")
    @PostMapping("/batch")
    public ResponseEntity<?> saveLayoutConfigs(@RequestBody List<LayoutConfig> layoutConfigs) {
        log.info("Received layout configs: {}", layoutConfigs);
        try {
            // Assuming a service method that handles a list of LayoutConfig objects
            layoutConfigService.replaceLayoutConfigs(layoutConfigs);
            return ResponseEntity.ok().build();
        } catch (Exception e) {
            // Log the exception details for more insights
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
        }

    }

}
