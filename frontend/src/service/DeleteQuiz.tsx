import React, { useEffect, useState } from 'react';
import { fetchData } from './DataFetching'; // Adjust the import path as necessary
import CustomInput from "../components/CustomInput";
import axios from "axios"; // Adjust the import path as necessary

interface Quiz {
    id: number;
    question: string;
}

const DeleteQuiz: React.FC = () => {
    const [quizzes, setQuizzes] = useState<Quiz[]>([]);
    const [deleteId, setDeleteId] = useState('');

    useEffect(() => {
        const getQuizzes = async () => {
            // Assuming fetchData returns the quizzes directly
            const fetchedQuizzes = await fetchData('/quiz');
            setQuizzes(fetchedQuizzes);
        };

        getQuizzes();
    }, []);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        console.log("Input value (before state update):", e.target.value);
        setDeleteId(e.target.value);
    };

    const handleDelete = async (e: React.FormEvent) => {
        e.preventDefault();
        const deleteIdNum = parseInt(deleteId, 10);
        console.log("Attempting to delete quiz with ID:", deleteIdNum);
        if (!deleteId) {
            alert('Please enter a valid ID.');
            return;
        }
        const baseUrl = import.meta.env.VITE_API_BASE_URL;
        try {
            // Continue using axios here for the DELETE request
            await axios.delete(`${baseUrl}/api/quiz/${deleteId}`);
            alert('Quiz deleted successfully!');
            setDeleteId(''); // Reset the delete ID input
            // Optimistically update the UI
            setQuizzes(quizzes.filter(quiz => quiz.id !== parseInt(deleteId, 10)));
        } catch (error) {
            console.error(error);
            alert('Failed to delete quiz.');
        }
    };

    return (
        <div className="form-container">
            <ul>
                {quizzes.map((quiz) => (
                    <li key={quiz.id}>{quiz.id} - {quiz.question}</li>
                ))}
            </ul>
            <form onSubmit={handleDelete} className="delete-quiz-form">
                <div className="form-group">
                    <CustomInput
                        type="text"
                        value={deleteId}
                        onChange={handleChange}
                        placeholder="Enter ID to delete"
                    />
                </div>
                <button type="submit" className="submit-button">Delete Quiz</button>
            </form>
        </div>
    );
};

export default DeleteQuiz;
