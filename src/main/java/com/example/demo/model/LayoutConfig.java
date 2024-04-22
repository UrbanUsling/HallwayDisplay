package com.example.demo.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@NoArgsConstructor  // Lombok-generated no-args constructor
@AllArgsConstructor // Lombok-generated all-args constructor
@Table(name = "layout_config")
public class LayoutConfig {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "card_number", nullable = false)
    private Integer cardNumber;

    @Enumerated(EnumType.STRING)
    @Column(name = "card_size", nullable = false)
    private CardSize cardSize;

    @Column(name = "row_nr", nullable = false)
    private Integer rowNr;

    // Assuming a ManyToOne relationship if multiple layout configs can relate to a single product

    @Column(name = "product_id")
    private Integer productId;

    // Additional fields like `created_at` and `updated_at` can also be included as needed
}

