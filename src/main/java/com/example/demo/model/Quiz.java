package com.example.demo.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@Entity
@NoArgsConstructor  // Lombok-generated no-args constructor
@AllArgsConstructor // Lombok-generated all-args constructor
@Table(name = "quiz")
public class Quiz {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column(nullable = false, length = 1000)
    private String question;

    @Column(nullable = false, length = 500)
    private String correct;

    @Column(nullable = false, length = 500)
    private String wrong_a;

    @Column(nullable = false, length = 500)
    private String wrong_b;


    @Column(nullable = false, length = 1000)
    private String answer;

}