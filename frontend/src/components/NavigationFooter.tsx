import React from 'react';
import ArrowLeft from '../assets/Prevas-Entre-Portal-UI-assets/SVG/icon-arrow-left.svg';
import ArrowRight from '../assets/Prevas-Entre-Portal-UI-assets/SVG/icon-arrow-right.svg';

interface NavigationFooterProps {
    items: { id: number; full_name?: string; title?: string; }[];
    getPreviousIndex: () => number;
    getNextIndex: () => number;
    handlePreviousClick: () => void;
    handleNextClick: () => void;
}

const NavigationFooter: React.FC<NavigationFooterProps> = ({ items, getPreviousIndex, getNextIndex, handlePreviousClick, handleNextClick }) => {
    return (
        <footer className="footer">
            {items.length > 1 && (
                <>
                    <button onClick={handlePreviousClick} aria-label="Go to previous">
                        <img src={ArrowLeft} className="arrow-left" alt=''/>
                        <div className='footer-text'>Föregående: {items[getPreviousIndex()].full_name || items[getPreviousIndex()].title}</div>
                    </button>
                    <button onClick={handleNextClick} aria-label="Go to next">
                        <div className='footer-text'>Nästa: {items[getNextIndex()].full_name || items[getNextIndex()].title}</div>
                        <img src={ArrowRight} className="arrow-right" alt=''/>
                    </button>
                </>
            )}
        </footer>
    );
};

export default NavigationFooter;
