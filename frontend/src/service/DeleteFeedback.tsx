// DeleteFeedback.tsx
import React, { useState, FormEvent } from 'react';
import axios from 'axios';
import CustomInput from "../components/CustomInput.tsx";

const DeleteFeedback: React.FC = () => {
    const [id, setId] = useState<string>('');

    const handleDelete = async (e: FormEvent) => {
        e.preventDefault();
        if (!id) {
            alert('Please enter the ID of the feedback to delete.');
            return;
        }
        try {
            await axios.delete(`http://localhost:8080/api/feedback/deleteById/${id}`);
            alert('Feedback deleted successfully!');
            setId('');
        } catch (error) {
            console.error('There was an error deleting the feedback:', error);
            alert('Failed to delete feedback.');
        }
    };

    return (
        <form onSubmit={handleDelete} className="delete-feedback-form">
            <label htmlFor="feedbackId">Feedback ID:</label>
            <CustomInput
                type="text"
                id="feedbackId"
                value={id}
                onChange={(e) => setId(e.target.value)}
            />
            <button type="submit">Delete Feedback</button>
        </form>
    );
};

export default DeleteFeedback;
