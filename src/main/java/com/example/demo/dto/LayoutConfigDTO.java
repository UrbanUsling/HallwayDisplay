package com.example.demo.dto;

import com.example.demo.model.CardSize;
import com.example.demo.model.Product;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class LayoutConfigDTO {
    private Integer cardNumber;
    private CardSize cardSize;
    private Integer rowNr;
    private Product product;
}
