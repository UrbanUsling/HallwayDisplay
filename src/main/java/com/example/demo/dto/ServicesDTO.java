package com.example.demo.dto;


import com.example.demo.model.Services;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import java.util.List;

@NoArgsConstructor
@Getter
@Setter
public class ServicesDTO {
    private int id;
    private String title;
    private String info;
    private String address;
    private String contact;
    private List<String> imageUrls;

    // Constructor for transforming from Service entity to ServiceDTO
    public ServicesDTO(Services services, List<String> imageUrls) {
        this.id = services.getId();
        this.title = services.getTitle();
        this.info = services.getInfo();
        this.address = services.getAddress();
        this.contact = services.getContact();
        this.imageUrls = imageUrls;
    }
}
