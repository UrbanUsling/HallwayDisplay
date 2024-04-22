package com.example.demo.repository;


import com.example.demo.model.Images;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ImagesRepository extends JpaRepository<Images, Integer> {
    List<Images> findByTableNameAndRecordId(String tableName, int recordId);
}

