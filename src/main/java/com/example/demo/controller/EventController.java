package com.example.demo.controller;

import com.example.demo.dto.EventDTO;
import com.example.demo.exception.EntityNotFoundException;
import com.example.demo.model.Event;
import com.example.demo.model.Images;
import com.example.demo.repository.EventRepository;
import com.example.demo.repository.ImagesRepository;
import com.example.demo.service.EventService;
import com.example.demo.service.ImageService;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;

@RestController
@RequestMapping("/api/event")
public class EventController {

    private final EventRepository eventRepository;
    private final ImagesRepository imagesRepository;
    private final ImageService imageService;
    private final EventService eventService;

    public EventController(EventRepository eventRepository, ImagesRepository imagesRepository, ImageService imageService, EventService eventService) {
        this.eventRepository = eventRepository;
        this.imagesRepository = imagesRepository;
        this.imageService = imageService;
        this.eventService = eventService;
    }

    private Event convertToEntity(EventDTO eventDto) {
        Event event = new Event();
        event.setTitle(eventDto.getTitle());
        event.setDescript(eventDto.getDescript());
        event.setDateOf(LocalDate.parse(eventDto.getDateOf()));
        event.setStartTime(LocalTime.parse(eventDto.getStartTime()));
        event.setLocation(eventDto.getLocation());
        event.setResponsible(eventDto.getResponsible());
        event.setNote(eventDto.getNote());
        event.setOther(eventDto.getOther());

        return event;
    }

    @CrossOrigin(origins = "http://localhost:5173")
    @GetMapping
    public ResponseEntity<List<EventDTO>> getAllEvents() {
        List<EventDTO> eventsWithImages = eventService.getAllEventsWithImages();
        if (eventsWithImages.isEmpty()) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(eventsWithImages);
    }

    @CrossOrigin(origins = "http://localhost:5173")
    @PostMapping("/")
    public ResponseEntity<Event> createEvent(@RequestPart("event") String eventStr, @RequestPart(required = false) List<MultipartFile> imageFiles) throws JsonProcessingException {
        EventDTO eventDto = new ObjectMapper().readValue(eventStr, EventDTO.class);

        Event event = convertToEntity(eventDto);
        System.out.println("Converted Event entity: " + event);

        Event savedEvent = eventRepository.save(event);
        System.out.println("Saved event entity: " + savedEvent);

        if (eventDto.getImageUrls() != null) {
            eventDto.getImageUrls().stream()
                    .filter(url -> url != null && !url.isEmpty()) // Filter out null or empty URLs
                    .forEach(url -> {
                        Images image = new Images();
                        image.setRecordId(savedEvent.getId());
                        image.setTableName("event");
                        image.setImageUrl(url);
                        imagesRepository.save(image); // Only non-empty URLs are saved
                    });
        }

        // Handling uploaded images, ImageService.storeImage() filters out empty files
        if (imageFiles != null && !imageFiles.isEmpty()) {
            imageFiles.forEach(file -> {
                if (!file.isEmpty()) { // Double-check to ensure file is not empty
                    Images image = imageService.storeImage(file, "event", savedEvent.getId());
                    // storeImage() method handles saving, so no need to save image again here
                }
            });
        }

        return new ResponseEntity<>(savedEvent, HttpStatus.CREATED);
    }

    @CrossOrigin(origins = "http://localhost:5173")
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteEvent(@PathVariable Long id) {
        try {
            eventService.deleteEventAndAssociatedImages(id);
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } catch (EntityNotFoundException e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.NOT_FOUND);
        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
