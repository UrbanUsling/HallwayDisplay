package com.example.demo.controller;


import com.example.demo.exception.BadRequestException;
import com.example.demo.exception.EntityNotFoundException;
import com.example.demo.model.Location;
import com.example.demo.repository.LocationRepository;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Objects;

@RestController
@RequestMapping("/api/location")
public class LocationController {

    private final LocationRepository locationRepository;

    public LocationController(LocationRepository locationRepository) {
        this.locationRepository = locationRepository;
    }

    @CrossOrigin(origins = "http://localhost:5173")
    @GetMapping
    public List<Location> getAllQuiz() {
        List<Location> locations = locationRepository.findAll();
        if (locations.isEmpty()) {
            throw new EntityNotFoundException("Inga Locations hittades.");
        }
        return locations;
    }


    @CrossOrigin(origins = "http://localhost:5173")
    @PostMapping("/")
    public ResponseEntity<Location> createLocation(@RequestBody Location location) {
        System.out.print(location); // Log the received location
        // The rest of your method...

        try {
            if (Objects.isNull(location)) {
                throw new BadRequestException("Location-objektet är ogiltigt.");
            }
            Location savedLocation = locationRepository.save(location);
            return new ResponseEntity<>(savedLocation, HttpStatus.CREATED);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @CrossOrigin(origins = "http://localhost:5173")
    @DeleteMapping("/deleteById/{id}")
    public ResponseEntity<HttpStatus> deleteLocationById(@PathVariable("id") Long id) {
        if (!locationRepository.existsById(id)) {
            throw new EntityNotFoundException("Ingen entitet funnen med Id: " + id);
        }
        try {
            locationRepository.deleteById(id);
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}