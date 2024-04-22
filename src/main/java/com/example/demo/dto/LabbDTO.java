package com.example.demo.dto;

import com.example.demo.model.Labb;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@NoArgsConstructor
@Getter
@Setter
public class LabbDTO {
    private int id;
    private String title;
    private String info;
    private String contact;
    private List<String> imageUrls;

    // Constructor for transforming from Labb entity to LabbDTO
    public LabbDTO(Labb labb, List<String> imageUrls) {
        this.id = labb.getId();
        this.title = labb.getTitle();
        this.info = labb.getInfo();
        this.contact = labb.getContact();
        this.imageUrls = imageUrls;
    }
}
