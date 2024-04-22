// AddFeedback.tsx
import React, { useState, FormEvent } from 'react';
import axios from 'axios';
import CustomInput from "../components/CustomInput.tsx";

const AddFeedback: React.FC = () => {
    const [suggestion, setSuggestion] = useState<string>('');

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        if (!suggestion) {
            alert('Please add a suggestion.');
            return;
        }
        try {
            await axios.post('http://localhost:8080/api/feedback/', { suggestion });
            alert('Feedback added successfully!');
            setSuggestion('');
        } catch (error) {
            console.error('There was an error adding the feedback:', error);
            alert('Failed to add feedback.');
        }
    };

    return (
        <form onSubmit={handleSubmit} className="add-feedback-form">
            <label htmlFor="suggestion">Suggestion:</label>
            <CustomInput
                type="text"
                id="suggestion"
                value={suggestion}
                onChange={(e) => setSuggestion(e.target.value)}
            />
            <button type="submit">Submit Feedback</button>
        </form>
    );
};

export default AddFeedback;

