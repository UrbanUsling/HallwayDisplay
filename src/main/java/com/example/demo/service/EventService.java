package com.example.demo.service;

import com.example.demo.dto.EventDTO;
import com.example.demo.exception.EntityNotFoundException;
import com.example.demo.model.Event;
import com.example.demo.model.Images;
import com.example.demo.repository.EventRepository;
import com.example.demo.repository.ImagesRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class EventService {

    private final EventRepository eventRepository;
    private final ImagesRepository imagesRepository;
    private final ImageService imageService;

    @Autowired
    public EventService(EventRepository eventRepository, ImagesRepository imagesRepository, ImageService imageService) {
        this.eventRepository = eventRepository;
        this.imagesRepository = imagesRepository;
        this.imageService = imageService;
    }

    public void deleteEventAndAssociatedImages(Long id) {
        Event event = eventRepository.findById(Math.toIntExact(id))
                .orElseThrow(() -> new EntityNotFoundException("Event not found with id: " + id));

        List<Images> images = imagesRepository.findByTableNameAndRecordId("event", Math.toIntExact(id));
        imagesRepository.deleteAll(images);
        eventRepository.delete(event);
    }

    public List<EventDTO> getAllEventsWithImages() {
        List<Event> events = eventRepository.findAll();
        return events.stream().map(event -> {
            List<Images> images = imageService.getImagesForRecord("event", event.getId());
            List<String> imageUrls = images.stream().map(Images::getImageUrl).collect(Collectors.toList());
            return new EventDTO(event, imageUrls);
        }).collect(Collectors.toList());
    }
}
