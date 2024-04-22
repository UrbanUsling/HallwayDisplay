import React, { useEffect, useState } from "react";
import ArrowLeft from '../assets/Prevas-Entre-Portal-UI-assets/SVG/icon-arrow-left.svg';
import ArrowRight from '../assets/Prevas-Entre-Portal-UI-assets/SVG/icon-arrow-right.svg';
import BusinessIcon from "../assets/Prevas-Entre-Portal-UI-assets/SVG/icon-offices.svg";
import { Link } from "react-router-dom";
import { fetchData } from "../service/DataFetching";
import OptionalField from "../components/OptionalField"; // Adjust the path to match your project structure

import Header from "../components/HeaderComponent.tsx";
import {getImageSrc} from "../../utils/imageUtils.ts";
import ImageCarousel from "../components/ImageCarousel.tsx";

// Adjusted Business interface to include an array of image URLs
interface Business {
    id: number;
    title: string;
    subtitle: string;
    info: string;
    address?: string;
    contact?: string;
    imageUrls: string[]; // Array of image URLs
}

const BusinessScreen: React.FC = () => {
    const [businesses, setBusinesses] = useState<Business[]>([]);
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        const fetchBusinesses = async () => {
            const data: Business[] = await fetchData("/business");
            if (Array.isArray(data)) {
                const sortedData = data
                    .filter((item): item is Business => 'title' in item && typeof item.title === 'string') // Ensure each item has a `full_name` property of type string
                    .sort((a, b) => a.title.localeCompare(b.title)); // Now safe to sort
                setBusinesses(sortedData);
            }
        };

        fetchBusinesses();
    }, []);

    const handlePreviousClick = () => {
        setCurrentIndex(currentIndex === 0 ? businesses.length - 1 : currentIndex - 1);
    };

    const handleNextClick = () => {
        setCurrentIndex(currentIndex === businesses.length - 1 ? 0 : currentIndex + 1);
    };


    const getPreviousIndex = () => currentIndex === 0 ? businesses.length - 1 : currentIndex - 1;
    const getNextIndex = () => currentIndex === businesses.length - 1 ? 0 : currentIndex + 1;

    const currentEntry = businesses[currentIndex] || { imageUrls: [] };

    return (
        <div className="app">
            <Header />
            <div className="subheader business-header">
                <div className='left-group'>
                    <img src={BusinessIcon} className='subheader-icon' alt='business icon'/>
                    <div className='subheader-title'>Affärsenheter</div>
                </div>
                <div className='right-group'>
                    <Link to="/organization" className='business-button-link'>
                        <button className='business-button'>Organisation 2024</button>
                    </Link>
                    <Link to="/location" className='business-button-link'>
                        <button className='business-button'>Se Karta!</button>
                    </Link>
                </div>
            </div>
            <main className="content">
                {businesses.length > 0 ? (
                <div className="content-card">
                    <ImageCarousel imageUrls={currentEntry.imageUrls} getImageSrc={getImageSrc} />
                    <div className="content-details smaller-text">
                        <h2 className="content-name">{currentEntry.title}</h2>
                        <p><strong>Subtitle:</strong> {currentEntry.subtitle}</p>
                        <p><strong>Info:</strong> {currentEntry.info}</p>
                        <OptionalField label="Address" value={currentEntry.address}/>
                        <OptionalField label="Contact" value={currentEntry.contact}/>
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
                {businesses.length > 1 && (
                    <>
                        <button onClick={handlePreviousClick} aria-label="Go to previous">
                            <img src={ArrowLeft} className="arrow-left" alt=''/>
                            <div className='footer-text'>Föregående: {businesses[getPreviousIndex()].title}</div>
                        </button>
                        <button onClick={handleNextClick} aria-label="Go to next">
                            <div className='footer-text'>Nästa: {businesses[getNextIndex()].title}</div>
                            <img src={ArrowRight} className="arrow-right" alt=''/>
                        </button>
                    </>
                )}
            </footer>
        </div>
    );
};

export default BusinessScreen;
