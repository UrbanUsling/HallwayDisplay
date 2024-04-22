import React, { useEffect, useState } from "react";
import ArrowLeft from '../assets/Prevas-Entre-Portal-UI-assets/SVG/icon-arrow-left.svg';
import ArrowRight from '../assets/Prevas-Entre-Portal-UI-assets/SVG/icon-arrow-right.svg';
import LabIcon from "../assets/Prevas-Entre-Portal-UI-assets/SVG/icon-lab.svg";
import { fetchData } from "../service/DataFetching";
import OptionalField from "../components/OptionalField";
import Header from "../components/HeaderComponent.tsx";
import {getImageSrc} from "../../utils/imageUtils.ts";
import ImageCarousel from "../components/ImageCarousel.tsx";

// Adjust the Lab interface to potentially handle an array of images for each lab
interface Lab {
    id: number;
    title: string;
    info: string;
    contact?: string;
    imageUrls: string[]; // Now using an array for image URLs
}

const LabScreen: React.FC = () => {
    const [labs, setLabs] = useState<Lab[]>([]);
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        const fetchLabData = async () => {
            const data: Lab[] = await fetchData('/labb');
            const sortedData = data.sort((a, b) => a.title.localeCompare(b.title));
            setLabs(sortedData);
        };

        fetchLabData();
    }, []);

    const getPreviousIndex = () => currentIndex === 0 ? labs.length - 1 : currentIndex - 1;
    const getNextIndex = () => currentIndex === labs.length - 1 ? 0 : currentIndex + 1;

    const handlePreviousClick = () => setCurrentIndex(getPreviousIndex());
    const handleNextClick = () => setCurrentIndex(getNextIndex());


    const currentEntry = labs[currentIndex] || { imageUrls: [] }; // Defaults to PrevasImage if no URLs are provided

    if (labs.length === 0) return <div>Loading...</div>; // or any other loading state

    return (
        <div className="app">
            <Header />
            <div className="subheader lab-header single-side">
                <img src={LabIcon} className='subheader-icon' alt='labicon'/>
                <div className='subheader-title'>Vårt Labb</div>
            </div>
            <main className="content">
                {labs.length > 0 ? (
                <div className="content-card">
                    <ImageCarousel imageUrls={currentEntry.imageUrls} getImageSrc={getImageSrc} />
                    <div className="content-details larger-text">
                        <h2 className="content-name lab-name">{currentEntry.title}</h2>
                        <p>{currentEntry.info}</p>
                        <OptionalField label="Kontakt" value={currentEntry.contact} />
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
                {labs.length > 1 && (
                    <>
                        <button onClick={handlePreviousClick} aria-label="Go to previous">
                            <img src={ArrowLeft} className="arrow-left" alt=''/>
                            <div className='footer-text'>Föregående: {labs[getPreviousIndex()].title}</div>
                        </button>
                        <button onClick={handleNextClick} aria-label="Go to next">
                            <div className='footer-text'>Nästa: {labs[getNextIndex()].title}</div>
                            <img src={ArrowRight} className="arrow-right" alt=''/>
                        </button>
                    </>
                )}
            </footer>
        </div>
    );
};

export default LabScreen;
