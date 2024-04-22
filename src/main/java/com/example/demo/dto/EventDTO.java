package com.example.demo.dto;

import com.example.demo.model.Event;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;

@NoArgsConstructor
@Getter
@Setter
public class EventDTO {
    private int id;
    private String title;
    private String descript;
    private String dateOf;
    private String startTime;
    private String location;
    private String responsible;
    private String note;
    private String other;
    private List<String> imageUrls;

    // Constructor used for mapping Event entity to EventDTO
    public EventDTO(Event event, List<String> imageUrls) {
        this.id = event.getId();
        this.title = event.getTitle();
        this.descript = event.getDescript();
        this.dateOf = String.valueOf(event.getDateOf());
        this.startTime = String.valueOf(event.getStartTime());
        this.location = event.getLocation();
        this.responsible = event.getResponsible();
        this.note = event.getNote();
        this.other = event.getOther();
        this.imageUrls = imageUrls;
    }
}
