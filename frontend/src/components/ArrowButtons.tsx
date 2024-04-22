// ArrowButtons.tsx
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons';

interface ArrowButtonsProps {
    goToNextQuiz: () => void;
    goToPreviousQuiz: () => void;
}

const ArrowButtons: React.FC<ArrowButtonsProps> = ({ goToNextQuiz, goToPreviousQuiz }) => {
    return (
        <>
            <button className="left-arrow" onClick={goToPreviousQuiz}>
                <FontAwesomeIcon icon={faArrowLeft} />
            </button>
            <button className="right-arrow" onClick={goToNextQuiz}>
                <FontAwesomeIcon icon={faArrowRight} />
            </button>
        </>
    );
};

export default ArrowButtons;
