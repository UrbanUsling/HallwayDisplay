package com.example.demo.dto;

import com.example.demo.model.Faq;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import java.util.List;

@NoArgsConstructor
@Getter
@Setter
public class FaqDTO {
    private int id;
    private String title;
    private String info;
    private String address;
    private String contact;
    private List<String> imageUrls;

    // Constructor for transforming from Faq entity to FaqDTO
    public FaqDTO(Faq faq, List<String> imageUrls) {
        this.id = faq.getId();
        this.title = faq.getTitle();
        this.info = faq.getInfo();
        this.address = faq.getAddress();
        this.contact = faq.getContact();
        this.imageUrls = imageUrls;
    }
}
