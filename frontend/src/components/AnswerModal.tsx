import React from 'react';
interface AnswerModalProps {
    show: boolean;
    explanation?: string;
    imageUrl?: string;
    isCorrect?: boolean;
    onClose: () => void;
}

const AnswerModal: React.FC<AnswerModalProps> = ({ show, explanation, imageUrl, isCorrect, onClose }) => {
    if (!show) {
        return null;
    }

    // Determine the message and color based on the correctness of the answer

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                <div className={`answer-feedback ${isCorrect ? 'green' : 'red'}`}>
                    {isCorrect ? 'Rätt svar! Hurray!' : 'Fel svar!'}
                </div>
                <img src={imageUrl} alt='' className="modal-image"/>
                <p>{explanation}</p>
                <button className='quiz-button' onClick={onClose}>Close</button>
            </div>
        </div>
    );
};

export default AnswerModal;
