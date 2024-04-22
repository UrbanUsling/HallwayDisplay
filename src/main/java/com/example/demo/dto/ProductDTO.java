package com.example.demo.dto;
import com.example.demo.model.Product;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import java.util.List;

@NoArgsConstructor
@Getter
@Setter
public class ProductDTO {
    private int id;
    private String title;
    private String subtitle;
    private String customerSide;
    private String prevasSide;
    private String contact;
    private List<String> imageUrls;

    // Constructor used in ProductService
    public ProductDTO(Product product, List<String> imageUrls) {
        this.id = product.getId();
        this.title = product.getTitle();
        this.subtitle = product.getSubtitle();
        this.customerSide = product.getCustomerSide();
        this.prevasSide = product.getPrevasSide();
        this.contact = product.getContact();
        this.imageUrls = imageUrls;
    }
}
