package com.example.demo.dto;

import com.example.demo.model.Business;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@NoArgsConstructor
@Getter
@Setter
public class BusinessDTO {
    private int id;
    private String title;
    private String subtitle;
    private String info;
    private String address;
    private String contact;
    private List<String> imageUrls;

    // Constructor used in BusinessService
    public BusinessDTO(Business business, List<String> imageUrls) {
        this.id = business.getId();
        this.title = business.getTitle();
        this.subtitle = business.getSubtitle();
        this.info = business.getInfo();
        this.address = business.getAddress();
        this.contact = business.getContact();
        this.imageUrls = imageUrls;
    }
}
