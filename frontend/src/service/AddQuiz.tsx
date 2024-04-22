import React, { useState, ChangeEvent, FormEvent } from 'react';
import axios from 'axios';
import CustomInput from "../components/CustomInput.tsx"; // Verify the path is correct

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

interface Quiz {
    question: string;
    correct: string;
    wrong_a: string;
    wrong_b: string;
    answer?: string;
    imageUrls: string[]; // Changed to use an array for up to 2 image URLs
}

const AddQuiz: React.FC = () => {
    const [quiz, setQuiz] = useState<Quiz>({
        question: '',
        correct: '',
        wrong_a: '',
        wrong_b: '',
        answer: '',
        imageUrls: Array(2).fill(''), // Initialize with empty strings for up to 2 URLs
    });
    const [uploadedImages, setUploadedImages] = useState<File[]>([]);

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setQuiz(prev => ({ ...prev, [name]: value }));
    };

    const handleImageUrlChange = (index: number) => (e: ChangeEvent<HTMLInputElement>) => {
        const newImageUrls = [...quiz.imageUrls];
        newImageUrls[index] = e.target.value;
        setQuiz(prev => ({ ...prev, imageUrls: newImageUrls }));
    };

    const handleImageFileChange = (index: number) => (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            const newFiles = [...uploadedImages];
            newFiles[index] = e.target.files[0];
            setUploadedImages(newFiles);
        }
    };

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('quiz', JSON.stringify(quiz));
        uploadedImages.forEach(file => {
            if (file) {
                formData.append('imageFiles', file); // Append each uploaded file
            }
        });

        try {
            await axios.post(`${API_BASE_URL}/api/quiz/`, formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
            });
            alert('Quiz added successfully!');
            // Optionally reset the form here
            setQuiz({
                question: '',
                correct: '',
                wrong_a: '',
                wrong_b: '',
                answer: '',
                imageUrls: Array(2).fill(''),
            });
            setUploadedImages([]);
        } catch (error) {
            console.error('Failed to add quiz.', error);
            alert('Failed to add quiz. Please try again.');
        }
    };

    return (
        <div className="form-container">
            <form onSubmit={handleSubmit} className="add-product-form">
                {/* CustomInput fields for quiz properties */}
                <div className="form-group">
                    <CustomInput type="text" name="question" value={quiz.question} onChange={handleChange} placeholder="Question" required />
                    <CustomInput type="text" name="correct" value={quiz.correct} onChange={handleChange} placeholder="Correct Answer" required />
                    <CustomInput type="text" name="wrong_a" value={quiz.wrong_a} onChange={handleChange} placeholder="Wrong Answer A" required />
                    <CustomInput type="text" name="wrong_b" value={quiz.wrong_b} onChange={handleChange} placeholder="Wrong Answer B" required />
                    <CustomInput type="text" name="answer" value={quiz.answer || ''} onChange={handleChange} placeholder="Detailed Answer (Optional)" />
                    {/* Dynamically generate input fields for up to 2 image URLs and file uploads */}
                    {quiz.imageUrls.map((url, index) => (
                        <CustomInput key={index} type="text" name={`imageUrl${index}`} value={url} onChange={e => handleImageUrlChange(index)(e)} placeholder={`Image URL ${index + 1} (Optional)`} />
                    ))}
                    {Array.from({ length: 2 - quiz.imageUrls.filter(url => url).length }).map((_, index) => (
                        <input key={index} type="file" onChange={e => handleImageFileChange(index)(e)} />
                    ))}
                    <button type="submit" className="submit-button">Add Quiz</button>
                </div>
            </form>
        </div>
    );
};

export default AddQuiz;

