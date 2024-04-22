package com.example.demo.dto;

import com.example.demo.model.Quiz;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@NoArgsConstructor
@Getter
@Setter
public class QuizDTO {
    private int id;
    private String question;
    private String correct;
    private String wrong_a;
    private String wrong_b;
    private String answer;
    private List<String> imageUrls;

    // Constructor for transforming from Quiz entity to QuizDTO
    public QuizDTO(Quiz quiz, List<String> imageUrls) {
        this.id = quiz.getId();
        this.question = quiz.getQuestion();
        this.correct = quiz.getCorrect();
        this.wrong_a = quiz.getWrong_a();
        this.wrong_b = quiz.getWrong_b();
        this.answer = quiz.getAnswer();
        this.imageUrls = imageUrls;
    }
}
