import React, {useEffect, useState} from "react";
import Prevas from '../assets/Prevas-Entre-Portal-UI-assets/SVG/Logo-Head-Prevas-Stockholm.svg';
import ArrowLeft from '../assets/Prevas-Entre-Portal-UI-assets/SVG/icon-arrow-left.svg';
import ArrowRight from '../assets/Prevas-Entre-Portal-UI-assets/SVG/icon-arrow-right.svg';
import QuizIcon from "../assets/Prevas-Entre-Portal-UI-assets/SVG/icon-quiz.svg";
import Home from "../assets/Prevas-Entre-Portal-UI-assets/SVG/icon-Home.svg";
import AnswerModal from "../components/AnswerModal.tsx";
import { Link } from "react-router-dom";
import {fetchData} from "../service/DataFetching.ts";
interface Quiz {
    id: number;
    question: string;
    correct: string;
    wrong_a: string;
    wrong_b: string;
    imageUrls: string[]; // Store URLs as an array
    answer?: string;
}
const QuizScreen: React.FC = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [quizData, setQuizData] = useState<Quiz[]>([]); // Assuming your fetched data is an array
    const [showModal, setShowModal] = useState(false);
    const [isCorrectAnswer, setIsCorrectAnswer] = useState(false);
    const [isFetching, setIsFetching] = useState(true); // State to indicate if data is being fetched

    useEffect(() => {
        const fetchQuizData = async () => {
            setIsFetching(true);
            const data: Quiz[] = await fetchData('/quiz');
            setQuizData(data);
            setIsFetching(false);
        };

        fetchQuizData();
    }, []);

    // Return a loading state if the data is still being fetched
    if (isFetching) return <div>Loading...</div>;

    // Ensure current entry is defined or provide a fallback
    const currentEntry = quizData[currentIndex] || {};

    // Calculate previous and next indices

    const handlePreviousClick = () => {
        setCurrentIndex(getPreviousIndex());
    };

    const handleNextClick = () => {
        setCurrentIndex(getNextIndex());
    };

    // Calculate previous and next names for display
    const getPreviousIndex = () => currentIndex === 0 ? quizData.length - 1 : currentIndex - 1;
    const getNextIndex = () => currentIndex === quizData.length - 1 ? 0 : currentIndex + 1;

    function shuffleArray<T>(array: T[]): T[] {
        let m = array.length, t, i;

        // While there remain elements to shuffle…
        while (m) {

            // Pick a remaining element…
            i = Math.floor(Math.random() * m--);

            // And swap it with the current element.
            t = array[m];
            array[m] = array[i];
            array[i] = t;
        }

        return array;
    }

    const answers = currentEntry ? shuffleArray([
        { answer: currentEntry.correct, correct: true },
        { answer: currentEntry.wrong_a, correct: false },
        { answer: currentEntry.wrong_b, correct: false },
    ]) : [];

    const handleCloseModal = () => {
        setShowModal(false);
    };
    const handleAnswerClick = (isCorrect: boolean) => {
        setShowModal(true); // Show the modal
        setIsCorrectAnswer(isCorrect); // Set whether the answer was correct

    };


    return (
        <div className="app">
            <header className="header">
                <img src={Prevas} className='header-text' alt='Prevas'/>
                <Link className='header-icon' to="/"> {/* Use Link to navigate to home */}
                    <img src={Home}  alt='Home' />
                </Link>
            </header>
            <div className="subheader quiz-header single-side">
                <img src={QuizIcon} className='subheader-icon' alt='eventicon'/>
                <div className='subheader-title'>Frågesport</div>
            </div>
            <main className="content">

                <div className="content-card">
                    {currentEntry.imageUrls && currentEntry.imageUrls.length > 0 && (
                        <img className="content-image" src={currentEntry.imageUrls[0]} alt="Quiz" />
                    )}

                    <div className="content-details smaller-text">
                        <h2 className="content-name quiz-name">{currentEntry.question}</h2>
                        {answers.map((item: { correct: any; answer: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | null | undefined; }, index: React.Key | null | undefined) => (
                            <button key={index} className="quiz-button" onClick={() => handleAnswerClick(item.correct)}>
                                {item.answer}
                            </button>
                        ))}
                    </div>
                </div>
            </main>
            {showModal && (
                <AnswerModal
                    show={showModal}
                    explanation={currentEntry.answer}
                    imageUrl={currentEntry.imageUrls[1]} // Pass the second image for the answer
                    isCorrect={isCorrectAnswer}
                    onClose={handleCloseModal}
                />
            )}
            <footer className="footer">
                {quizData.length > 1 && (
                    <>
                        <button onClick={handlePreviousClick} aria-label="Go to previous">
                            <img src={ArrowLeft} className="arrow-left" alt=''/>
                            <div className='footer-text'>Föregående</div>
                        </button>
                        <button onClick={handleNextClick} aria-label="Go to next">
                            <div className='footer-text'>Nästa</div>
                            <img src={ArrowRight} className="arrow-right" alt=''/>
                        </button>
                    </>
                )}
            </footer>
        </div>
    );
};

export default QuizScreen;

