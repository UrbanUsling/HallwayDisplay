package com.example.demo.controller;

import java.net.MalformedURLException;
import java.nio.file.Path;
import java.nio.file.Paths;

import jakarta.annotation.PostConstruct;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.beans.factory.annotation.Value;

@RestController
public class ImagesController {

    @Value("${file.storage.location}")
    private String fileStorageLocation;
    private Path rootLocation;

    @PostConstruct
    public void init() {
        rootLocation = Paths.get(fileStorageLocation);
    }

    @GetMapping("/images/{filename:.+}")
    @ResponseBody
    public ResponseEntity<Resource> serveFile(@PathVariable String filename) {
        try {
            Path file = rootLocation.resolve(filename);
            System.out.println("Trying to access file: " + file.toString());  // Log attempts to access the file
            Resource resource = new UrlResource(file.toUri());
            if (resource.exists() || resource.isReadable()) {
                return ResponseEntity.ok().header(HttpHeaders.CONTENT_DISPOSITION,
                        "inline; filename=\"" + resource.getFilename() + "\"").body(resource);
            } else {
                System.out.println("File not found or not readable");  // Log if the file was not found or is not readable
                return ResponseEntity.notFound().build();
            }
        } catch (MalformedURLException e) {
            System.out.println("URL Malformation: " + e.getMessage());  // Log URL malformation errors
            return ResponseEntity.badRequest().build();
        }
    }
}
