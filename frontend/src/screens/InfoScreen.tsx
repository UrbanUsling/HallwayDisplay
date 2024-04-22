import React, { useEffect, useState } from "react";
import ArrowLeft from '../assets/Prevas-Entre-Portal-UI-assets/SVG/icon-arrow-left.svg';
import ArrowRight from '../assets/Prevas-Entre-Portal-UI-assets/SVG/icon-arrow-right.svg';
import infoIcon from "../assets/Prevas-Entre-Portal-UI-assets/SVG/icon-people-search.svg";
import { Link } from "react-router-dom";
import { fetchData } from "../service/DataFetching";
import OptionalField from "../components/OptionalField";
import Header from "../components/HeaderComponent.tsx";
import {getImageSrc} from "../../utils/imageUtils.ts";
import ImageCarousel from "../components/ImageCarousel.tsx";


 // Verify the path is correct

// Update the Info interface to include an array of image URLs
interface Info {
    id: number; // Assuming each info has a unique ID
    full_name: string;
    email: string;
    title: string;
    phone?: string;
    department?: string;
    location?: string;
    workArea?: string;
    manager?: string;
    imageUrls: string[]; // Use an array for image URLs
}

const InfoScreen: React.FC = () => {
    const [infoData, setInfoData] = useState<Info[]>([]);
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        const fetchInfoData = async () => {
            const data = await fetchData("/info");
            if (Array.isArray(data)) {
                const sortedData = data
                    .filter((item): item is Info => 'full_name' in item && typeof item.full_name === 'string') // Ensure each item has a `full_name` property of type string
                    .sort((a, b) => a.full_name.localeCompare(b.full_name)); // Now safe to sort
                setInfoData(sortedData);
            }
        };

        fetchInfoData();
    }, []);

    const handlePreviousClick = () => {
        setCurrentIndex(getPreviousIndex());
    };

    const handleNextClick = () => {
        setCurrentIndex(getNextIndex());
    };

    const getPreviousIndex = () => currentIndex === 0 ? infoData.length - 1 : currentIndex - 1;
    const getNextIndex = () => currentIndex === infoData.length - 1 ? 0 : currentIndex + 1;

    // Adjust getImageSrc to handle array of images
    const currentEntry = infoData[currentIndex] || { imageUrls: [] };
    return (
        <div className="app">
            <Header />
            <div className="subheader info-header single-side">
                <img src={infoIcon} className='subheader-icon' alt='eventicon'/>
                <div className='subheader-title'>Vem söker du?</div>
            </div>
            <main className="content">
                {infoData.length > 0 ? (
                <div className="content-card">
                    <ImageCarousel imageUrls={currentEntry.imageUrls} getImageSrc={getImageSrc} />
                    <div className="content-details larger-text">
                        <h2 className="content-name info-name">{currentEntry.full_name}</h2>
                        <p><strong>Titel:</strong> {currentEntry.title}</p>
                        <p><strong>Epost:</strong> {currentEntry.email}</p>
                        <OptionalField label="Mobil" value={currentEntry.phone}/>
                        <OptionalField label="Avdelning" value={currentEntry.department}/>
                        <OptionalField label="Plats" value={currentEntry.location}/>
                        <OptionalField label="Manager" value={currentEntry.manager}/>


                    </div>
                    <Link to="/office" state={{workArea: `Zon ${currentEntry.workArea}`}}>
                        <button className='content-link'>Hitta kontorsplats!</button>
                    </Link>
                </div>
                ) : (
                    <div className="content-empty">
                        <h2>No products available.</h2>
                        <p>Please check back later or contact support.</p>
                    </div>
                )}
            </main>
            <footer className="footer">
                {infoData.length > 1 && (
                    <>
                        <button onClick={handlePreviousClick} aria-label="Go to previous">
                            <img src={ArrowLeft} className="arrow-left" alt=''/>
                            <div className='footer-text'>Föregående: {infoData[getPreviousIndex()].full_name}</div>
                        </button>
                        <button onClick={handleNextClick} aria-label="Go to next">
                            <div className='footer-text'>Nästa: {infoData[getNextIndex()].full_name}</div>
                            <img src={ArrowRight} className="arrow-right" alt=''/>
                        </button>
                    </>
                )}
            </footer>
        </div>
    );
};

export default InfoScreen;
