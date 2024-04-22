package com.example.demo.controller;

import com.example.demo.dto.QuizDTO;
import com.example.demo.exception.EntityNotFoundException;
import com.example.demo.model.Images;
import com.example.demo.model.Quiz;
import com.example.demo.repository.ImagesRepository;
import com.example.demo.repository.QuizRepository;
import com.example.demo.service.ImageService;
import com.example.demo.service.QuizService;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@RequestMapping("/api/quiz")
public class QuizController {

    private final QuizRepository quizRepository;
    private final ImagesRepository imagesRepository;
    private final ImageService imageService;
    private final QuizService quizService;

    public QuizController(QuizRepository quizRepository, ImagesRepository imagesRepository, ImageService imageService, QuizService quizService) {
        this.quizRepository = quizRepository;
        this.imagesRepository = imagesRepository;
        this.imageService = imageService;
        this.quizService = quizService;
    }

    @CrossOrigin(origins = "http://localhost:5173")
    @GetMapping
    public ResponseEntity<List<QuizDTO>> getAllQuizzes() {
        List<QuizDTO> quizzesWithImages = quizService.getAllQuizzesWithImages();
        if (quizzesWithImages.isEmpty()) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(quizzesWithImages);
    }

    @CrossOrigin(origins = "http://localhost:5173")
    @PostMapping("/")
    public ResponseEntity<Quiz> createQuiz(@RequestPart("quiz") String quizStr, @RequestPart(required = false) List<MultipartFile> imageFiles) throws JsonProcessingException {
        QuizDTO quizDto = new ObjectMapper().readValue(quizStr, QuizDTO.class);

        Quiz quiz = convertToEntity(quizDto);
        Quiz savedQuiz = quizRepository.save(quiz);
        if (quizDto.getImageUrls() != null) {
            quizDto.getImageUrls().stream()
                    .filter(url -> url != null && !url.isEmpty()) // Filter out null or empty URLs
                    .forEach(url -> {
                        Images image = new Images();
                        image.setRecordId(savedQuiz.getId());
                        image.setTableName("quiz");
                        image.setImageUrl(url);
                        imagesRepository.save(image); // Only non-empty URLs are saved
                    });
        }

        // Handling uploaded images, ImageService.storeImage() filters out empty files
        if (imageFiles != null && !imageFiles.isEmpty()) {
            imageFiles.forEach(file -> {
                if (!file.isEmpty()) { // Double-check to ensure file is not empty
                    Images image = imageService.storeImage(file, "quiz", savedQuiz.getId());
                    // storeImage() method handles saving, so no need to save image again here
                }
            });
        }


        return new ResponseEntity<>(savedQuiz, HttpStatus.CREATED);
    }

    @CrossOrigin(origins = "http://localhost:5173")
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteQuiz(@PathVariable Long id) {
        try {
            quizService.deleteQuizAndAssociatedImages(id);
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } catch (EntityNotFoundException e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.NOT_FOUND);
        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    private Quiz convertToEntity(QuizDTO quizDto) {
        Quiz quiz = new Quiz();
        quiz.setQuestion(quizDto.getQuestion());
        quiz.setCorrect(quizDto.getCorrect());
        quiz.setWrong_a(quizDto.getWrong_a());
        quiz.setWrong_b(quizDto.getWrong_b());
        quiz.setAnswer(quizDto.getAnswer());
        // Add other fields if necessary

        return quiz;
    }
}
