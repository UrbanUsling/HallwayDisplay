import React, { useEffect, useState } from "react";
import ArrowLeft from '../assets/Prevas-Entre-Portal-UI-assets/SVG/icon-arrow-left.svg';
import ArrowRight from '../assets/Prevas-Entre-Portal-UI-assets/SVG/icon-arrow-right.svg';
import FAQIcon from "../assets/Prevas-Entre-Portal-UI-assets/SVG/icon-FAQ.svg";
import { fetchData } from "../service/DataFetching";
import OptionalField from "../components/OptionalField";
import Header from "../components/HeaderComponent.tsx";
import {getImageSrc} from "../../utils/imageUtils.ts";
import ImageCarousel from "../components/ImageCarousel.tsx"; // Default image

interface FAQ {
    id: number;
    title: string;
    info: string;
    address?: string;
    contact?: string;
    imageUrls: string[]; // Adjusted to handle an array of image URLs
}

const FAQScreen: React.FC = () => {
    const [faqs, setFaqs] = useState<FAQ[]>([]);
    const [currentIndex, setCurrentIndex] = useState(0);


    useEffect(() => {
        const fetchFAQData = async () => {
            const data: FAQ[] = await fetchData('/faq');
            const sortedData = data.sort((a, b) => a.title.localeCompare(b.title));
            setFaqs(sortedData);
        };

        fetchFAQData();
    }, []);

    const getPreviousIndex = () => currentIndex === 0 ? faqs.length - 1 : currentIndex - 1;
    const getNextIndex = () => currentIndex === faqs.length - 1 ? 0 : currentIndex + 1;

    const handlePreviousClick = () => {
        setCurrentIndex(getPreviousIndex());
    };
    const handleNextClick = () => {
        setCurrentIndex(getNextIndex());
    };

    const currentEntry = faqs[currentIndex] || { imageUrls: [] }; // Defaults to PrevasImage if no URLs are provided

    const renderParagraphsFromText = (text: string) => text.split(';').map((item, index) => <p key={index}>{item.trim()}</p>);

    return (
        <div className="app">
            <Header />
            <div className="subheader faq-header single-side">
                <img src={FAQIcon} className='subheader-icon' alt='FAQ'/>
                <div className='subheader-title'>FAQ</div>
            </div>
            <main className="content">
                {faqs.length > 0 ? (
                <div className="content-card">
                    <ImageCarousel imageUrls={currentEntry.imageUrls} getImageSrc={getImageSrc} />
                    <div className="content-details smaller-text">
                        <h2 className="content-name faq-name">{currentEntry.title}</h2>
                        {renderParagraphsFromText(currentEntry.info)}
                        <OptionalField label="Plats" value={currentEntry.address} />
                        <OptionalField label="Kontakta" value={currentEntry.contact} />
                    </div>
                </div>
                ) : (
                    <div className="content-empty">
                        <h2>No products available.</h2>
                        <p>Please check back later or contact support.</p>
                    </div>
                )}
            </main>

            <footer className="footer">
                {faqs.length > 1 && (
                    <>
                        <button onClick={handlePreviousClick} aria-label="Go to previous">
                            <img src={ArrowLeft} className="arrow-left" alt=''/>
                            <div className='footer-text'>Föregående: {faqs[getPreviousIndex()].title}</div>
                        </button>
                        <button onClick={handleNextClick} aria-label="Go to next">
                            <div className='footer-text'>Nästa:  {faqs[getNextIndex()].title}</div>
                            <img src={ArrowRight} className="arrow-right" alt=''/>
                        </button>
                    </>
                )}
            </footer>
        </div>
    );
};

export default FAQScreen;


