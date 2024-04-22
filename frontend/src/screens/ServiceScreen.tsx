import React, { useEffect, useState } from "react";
import ArrowLeft from '../assets/Prevas-Entre-Portal-UI-assets/SVG/icon-arrow-left.svg';
import ArrowRight from '../assets/Prevas-Entre-Portal-UI-assets/SVG/icon-arrow-right.svg';
import ServicesIcon from '../assets/Prevas-Entre-Portal-UI-assets/SVG/icon-services.svg';
import { fetchData } from "../service/DataFetching";
import OptionalField from "../components/OptionalField";
import Header from "../components/HeaderComponent.tsx";
import {getImageSrc} from "../../utils/imageUtils.ts";
import ImageCarousel from "../components/ImageCarousel.tsx"; // Default image

// Adjusted to potentially handle an array of images for each service
interface Service {
    id: number;
    title: string;
    info: string;
    address?: string;
    contact?: string;
    imageUrls: string[]; // Using an array for image URLs
}

const ServiceScreen: React.FC = () => {
    const [services, setServices] = useState<Service[]>([]);
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        const fetchServiceData = async () => {
            const data: Service[] = await fetchData('/service'); // Ensure this matches your API endpoint
            // Sort services by title in ascending order
            const sortedData = data.sort((a, b) => a.title.localeCompare(b.title));
            setServices(sortedData);
        };

        fetchServiceData();
    }, []);

    const handlePreviousClick = () => {
        setCurrentIndex(getPreviousIndex());

    };

    const handleNextClick = () => {
        setCurrentIndex(getNextIndex());
    };

    const getPreviousIndex = () => currentIndex === 0 ? services.length - 1 : currentIndex - 1;
    const getNextIndex = () => currentIndex === services.length - 1 ? 0 : currentIndex + 1;

    const currentEntry = services[currentIndex] || { imageUrls: [] }; // Defaults to PrevasImage if no URLs are provided

    if (services.length === 0) return <div>Loading...</div>;
    return (
        <div className="app">
            <Header />
            <div className="subheader service-header single-side">
                <img src={ServicesIcon} className='subheader-icon' alt='eventicon'/>
                <div className='subheader-title'>Våra Tjänster</div>
            </div>
            <main className="content">
                {services.length > 0 ? (
                <div className="content-card">
                    <ImageCarousel imageUrls={currentEntry.imageUrls} getImageSrc={getImageSrc} />
                    <div className="content-details smaller-text">
                        <h2 className="content-name service-name">{currentEntry.title}</h2>
                        <p>{currentEntry.info}</p>
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
                {services.length > 1 && (
                    <>
                        <button onClick={handlePreviousClick} aria-label="Go to previous">
                            <img src={ArrowLeft} className="arrow-left" alt=''/>
                            <div className='footer-text'>Föregående: {services[getPreviousIndex()].title}</div>
                        </button>
                        <button onClick={handleNextClick} aria-label="Go to next">
                            <div className='footer-text'>Nästa: {services[getNextIndex()].title}</div>
                            <img src={ArrowRight} className="arrow-right" alt=''/>
                        </button>
                    </>
                )}
            </footer>
        </div>
    );
};

export default ServiceScreen;
