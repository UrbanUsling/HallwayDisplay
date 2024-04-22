package com.example.demo.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor  // Lombok-generated no-args constructor
@AllArgsConstructor // Lombok-generated all-args constructor
@Entity
@Table(name = "images")
public class Images {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;


    @Column(name = "record_id", nullable = false)
    private int recordId;

    @Column(name = "table_name", nullable = false)
    private String tableName;

    @Column(name = "image_url", nullable = false)
    private String imageUrl; // The URL or path to the image


}

