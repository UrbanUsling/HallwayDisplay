import React, { useEffect, useState } from "react";
import ArrowLeft from '../assets/Prevas-Entre-Portal-UI-assets/SVG/icon-arrow-left.svg';
import ArrowRight from '../assets/Prevas-Entre-Portal-UI-assets/SVG/icon-arrow-right.svg';
import EventIcon from "../assets/Prevas-Entre-Portal-UI-assets/SVG/icon-events.svg";
import { fetchData } from "../service/DataFetching";
import OptionalField from "../components/OptionalField";
import Header from "../components/HeaderComponent.tsx";
import {getImageSrc} from "../../utils/imageUtils.ts";
import ImageCarousel from "../components/ImageCarousel.tsx";

// Adjusted to potentially handle an array of images for each event
interface Event {
    id: number;
    title: string;
    descript?: string;
    dateOf: string; // Assuming ISO format date string
    startTime?: string;
    location?: string;
    responsible?: string;
    note?: string;
    other?: string;
    imageUrls: string[]; // Now using an array for image URLs
}

const EventScreen: React.FC = () => {
    const [events, setEvents] = useState<Event[]>([]);
    const [currentIndex, setCurrentIndex] = useState(0);


    useEffect(() => {
        const fetchEventData = async () => {
            const data: Event[] = await fetchData('/event');
            // Sort events by date in ascending order
            const sortedData = data.sort((a, b) => new Date(a.dateOf).getTime() - new Date(b.dateOf).getTime());

            setEvents(sortedData);

            // Find the index of the first future event
            const today = new Date();
            const futureEventIndex = sortedData.findIndex(event => new Date(event.dateOf) >= today);

            // Set the current index to the future event index, or 0 if all events are in the past
            setCurrentIndex(futureEventIndex >= 0 ? futureEventIndex : 0);
        };

        fetchEventData();
    }, []);


    const isPastEvent = (date: string) => {
        const todayPlusOne = new Date();
        todayPlusOne.setDate(todayPlusOne.getDate() -1);
        console.log("Comparing event date:", new Date(date), "with cutoff date:", todayPlusOne);
        return new Date(date) < todayPlusOne;
    }


    const getPreviousIndex = () => currentIndex === 0 ? events.length - 1 : currentIndex - 1;
    const getNextIndex = () => currentIndex === events.length - 1 ? 0 : currentIndex + 1;

    const handlePreviousClick = () => setCurrentIndex(getPreviousIndex());
    const handleNextClick = () => setCurrentIndex(getNextIndex());



    const currentEntry = events[currentIndex] || { imageUrls: [] };

    return (
        <div className="app">
            <Header />
            <div className="subheader event-header single-side">
                <img src={EventIcon} className='subheader-icon' alt='eventicon'/>
                <div className='subheader-title'>Våra Events</div>
            </div>
            <main className="content">
                <div className={`content-card ${isPastEvent(currentEntry.dateOf) ? 'past-event' : ''}`}>
                    <ImageCarousel imageUrls={currentEntry.imageUrls} getImageSrc={getImageSrc} />
                    <div className="content-details larger-text">
                        <h2 className="content-name event-name">{currentEntry.title}</h2>
                        <h3>{currentEntry.descript}</h3>
                        <p><strong>När:</strong> {currentEntry.dateOf}</p>
                        <OptionalField label="Start" value={currentEntry.startTime} />
                        <OptionalField label="Plats" value={currentEntry.location} />
                        <OptionalField label="Ansvarig" value={currentEntry.responsible} />
                        <OptionalField label="Note" value={currentEntry.note} />
                        <OptionalField label="Övrigt" value={currentEntry.other} />
                    </div>
                </div>
            </main>
            <footer className="footer">
                {events.length > 1 && (
                    <>
                        <button onClick={handlePreviousClick} aria-label="Go to previous">
                            <img src={ArrowLeft} className="arrow-left" alt=''/>
                            <div className='footer-text'>Föregående: {events[getPreviousIndex()].title}</div>
                        </button>
                        <button onClick={handleNextClick} aria-label="Go to next">
                            <div className='footer-text'>Nästa: {events[getNextIndex()].title}</div>
                            <img src={ArrowRight} className="arrow-right" alt=''/>
                        </button>
                    </>
                )}
            </footer>
        </div>
    );
};

export default EventScreen;
