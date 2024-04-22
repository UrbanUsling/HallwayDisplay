package com.example.demo.repository;

import com.example.demo.model.CupboardProduct;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CupboardProductRepository extends JpaRepository<CupboardProduct, Integer> {
}