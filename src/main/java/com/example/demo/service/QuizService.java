package com.example.demo.service;

import com.example.demo.dto.QuizDTO;
import com.example.demo.exception.EntityNotFoundException;
import com.example.demo.model.Images;
import com.example.demo.model.Quiz;
import com.example.demo.repository.ImagesRepository;
import com.example.demo.repository.QuizRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class QuizService {

    private final QuizRepository quizRepository;
    private final ImagesRepository imagesRepository;
    private final ImageService imageService;

    @Autowired
    public QuizService(QuizRepository quizRepository, ImagesRepository imagesRepository, ImageService imageService) {
        this.quizRepository = quizRepository;
        this.imagesRepository = imagesRepository;
        this.imageService = imageService;
    }

    public void deleteQuizAndAssociatedImages(Long id) {
        Quiz quiz = quizRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Quiz not found with id: " + id));

        List<Images> images = imagesRepository.findByTableNameAndRecordId("quiz", Math.toIntExact(id));
        imagesRepository.deleteAll(images);
        quizRepository.delete(quiz);
    }

    public List<QuizDTO> getAllQuizzesWithImages() {
        List<Quiz> quizzes = quizRepository.findAll();
        return quizzes.stream().map(quiz -> {
            List<Images> images = imageService.getImagesForRecord("quiz", quiz.getId());
            List<String> imageUrls = images.stream().map(Images::getImageUrl).collect(Collectors.toList());
            return new QuizDTO(quiz, imageUrls);
        }).collect(Collectors.toList());
    }
}
