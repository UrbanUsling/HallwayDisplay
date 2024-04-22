package com.example.demo.service;

import com.example.demo.dto.FaqDTO;
import com.example.demo.exception.EntityNotFoundException;
import com.example.demo.model.Faq;
import com.example.demo.model.Images;
import com.example.demo.repository.FaqRepository;
import com.example.demo.repository.ImagesRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class FaqService {

    private final FaqRepository faqRepository;
    private final ImagesRepository imagesRepository;
    private final ImageService imageService;

    @Autowired
    public FaqService(FaqRepository faqRepository, ImagesRepository imagesRepository, ImageService imageService) {
        this.faqRepository = faqRepository;
        this.imagesRepository = imagesRepository;
        this.imageService = imageService;
    }

    public void deleteFaqAndAssociatedImages(Long id) {
        Faq faq = faqRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Faq not found with id: " + id));

        List<Images> images = imagesRepository.findByTableNameAndRecordId("faq", Math.toIntExact(id));
        imagesRepository.deleteAll(images);
        faqRepository.delete(faq);
    }

    public List<FaqDTO> getAllFaqsWithImages() {
        List<Faq> faqs = faqRepository.findAll();
        return faqs.stream().map(faq -> {
            List<Images> images = imageService.getImagesForRecord("faq", faq.getId());
            List<String> imageUrls = images.stream().map(Images::getImageUrl).collect(Collectors.toList());
            return new FaqDTO(faq, imageUrls);
        }).collect(Collectors.toList());
    }
}
