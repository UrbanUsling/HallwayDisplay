package com.example.demo.service;
import com.example.demo.exception.StorageException;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
/*
@Service
public class FileStorageService {

    private final Path rootLocation = Paths.get("src/main/resources/static/assets");

    public String store(MultipartFile file) {
        if (file.isEmpty()) {
            throw new StorageException("Failed to store empty file.");
        }
        String filename = System.currentTimeMillis() + "_" + file.getOriginalFilename();
        Path destinationFile = this.rootLocation.resolve(Paths.get(filename)).normalize().toAbsolutePath();
        if (!destinationFile.getParent().equals(this.rootLocation.toAbsolutePath())) {
            // This is a security check
            throw new StorageException("Cannot store file outside current directory.");
        }
        try {
            Files.copy(file.getInputStream(), destinationFile);
            return "/assets/" + filename;
        } catch (IOException e) {
            throw new StorageException("Failed to store file.", e);
        }
    }

    // You can add more methods here for other functionalities like delete, etc.
}
*/
@Service
public class FileStorageService {

    private final Path rootLocation;
    public FileStorageService(@Value("${file.storage.location}") String location) {
        this.rootLocation = Paths.get(location);
    }

    public String store(MultipartFile file) {
        String filename = System.currentTimeMillis() + "_" + file.getOriginalFilename();
        Path destinationFile = this.rootLocation.resolve(Paths.get(filename)).normalize();
        try {
            Files.copy(file.getInputStream(), destinationFile);
            System.out.println("File stored at: " + destinationFile);
            return filename;
        } catch (IOException e) {
            System.out.println("Failed to store file: " + filename);
            e.printStackTrace();
            throw new StorageException("Failed to store file.", e);
        }
    }
}



