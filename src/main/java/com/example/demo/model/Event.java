package com.example.demo.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.sql.Time;
import java.time.LocalDate;
import java.time.LocalTime;

@Getter
@Setter
@Entity
@NoArgsConstructor  // Lombok-generated no-args constructor
@AllArgsConstructor // Lombok-generated all-args constructor
@Table(name = "event")
public class Event {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column(nullable = false, length = 255)
    private String title;


    @Column(nullable = false, length = 4000)
    private String descript;

    @Column(nullable = false)
    private LocalDate dateOf;

    @Column
    private LocalTime startTime;

    @Column(length = 500)
    private String location;

    @Column(length = 500)
    private String responsible;

    @Column(length = 500)
    private String note;

    @Column(length = 500)
    private String other;

}
