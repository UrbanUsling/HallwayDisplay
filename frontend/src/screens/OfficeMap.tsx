import {useCallback, useEffect, useState} from 'react';
import {Link, useLocation} from "react-router-dom";

import OfficeMapRightSide from "../assets/Prevas-Entre-Portal-UI-assets/WebP/Sumpan-office-map.webp";
import LogoHeadPrevas from '../assets/Prevas-Entre-Portal-UI-assets/SVG/Logo-Head-Prevas-Stockholm.svg';
import iconFindOfficeMap from '../assets/Prevas-Entre-Portal-UI-assets/SVG/icon-find-office.svg';
import iconHomeMap from '../assets/Prevas-Entre-Portal-UI-assets/SVG/icon-Home2.svg';
import iconLabMap from '../assets/Prevas-Entre-Portal-UI-assets/SVG/icon-lab1.svg';
import foodBankIcon from '../assets/Prevas-Entre-Portal-UI-assets/SVG/food-bank.svg';
import locationIcon from '../assets/Prevas-Entre-Portal-UI-assets/SVG/location.svg';
import meetingRoomIcon from '../assets/Prevas-Entre-Portal-UI-assets/SVG/meeting-room.svg';
import moveLocationIcon from '../assets/Prevas-Entre-Portal-UI-assets/SVG/move-location.svg';
import wcIcon from '../assets/Prevas-Entre-Portal-UI-assets/SVG/wc.svg';

interface IconPosition {
    x: string;
    y: string;
}

interface IconData {
    src: string;
    title: string;
    alt: string;
    positions?: IconPosition[];
}

interface ZoneOrRoomPosition {
    positions: IconPosition[];
}

interface BlinkingState {
    [key: string]: boolean;
}

const iconsData: Record<string, IconData> = {
    Location: {
        src: locationIcon,
        title: 'Du är här!',
        alt: 'Arbetsplatser',
        positions: [{ x: '32.9%', y: '37%' }]
    },
    WC: {
        src: wcIcon,
        title: 'WC',
        alt: 'Toalett',
        positions: [{ x: '40%', y: '57%' }, { x: '40%', y: '27.5%' }]
    },
    FoodBank: {
        src: foodBankIcon,
        title: 'Kök, Bar & Café',
        alt: 'Kök, Bar & Café',
        positions: [{ x: '51.5%', y: '27%' }]
    },
    Labb: {
        src: iconLabMap,
        title: 'Labb',
        alt: 'Labb',
        positions: [{ x: '86.5%', y: '27%' }]
    },
    MoveLocation: {
        src: moveLocationIcon,
        title: 'Arbetsplatser',
        alt: 'Flytta plats',
    },
    Konferensrum: {
        src: meetingRoomIcon,
        title: 'Konferensrum',
        alt: 'Konferensrum',
    },
};

const zonePositions: Record<string, ZoneOrRoomPosition> = {
    'Zon 1': {
        positions: [{ x: '27.5%', y: '93%' }]
    },
    'Zon 2': {
        positions: [{ x: '11%', y: '88%' }]
    },
    'Zon 3': {
        positions: [{ x: '11.5%', y: '67%' }]
    },
    'Zon 4': {
        positions: [{ x: '31.5%', y: '7%' }]
    },
    'Zon 5': {
        positions: [{ x: '48.5%', y: '17%' }]
    },
    'Zon 6': {
        positions: [{ x: '52.5%', y: '7%' }]
    },
    'Zon 7': {
        positions: [{ x: '69.5%', y: '7%' }]
    },
    'Zon 8': {
        positions: [{ x: '84%', y: '7%' }]
    },
    'Zon 9': {
        positions: [{ x: '94.5%', y: '14%' }]
    },
    'Zon 10': {
        positions: [{ x: '69.5%', y: '17%' }]
    },
    'Zon 11': {
        positions: [{ x: '66.7%', y: '27.5%' }]
    },


};

const conferenceRoomPositions: Record<string, ZoneOrRoomPosition> = {
    'A Skansen': {
        positions: [{ x: '25.5%', y: '68%' }]
    },
    'B Stadshuset': {
        positions: [{ x: '25.5%', y: '62%' }]
    },
    'C Moderna': {
        positions: [{ x: '25.5%', y: '55%' }]
    },
    'D Globen': {
        positions: [{ x: '25.5%', y: '27%' }]
    },
    'E Dramaten': {
        positions: [{ x: '78%', y: '16%' }]
    },
};



function OfficeMap() {

    const [blinking, setBlinking] = useState<BlinkingState>({});
    const location = useLocation();
    const workAreaFromLink = location.state?.workArea;
    console.log(workAreaFromLink)

    useEffect(() => {
        if (workAreaFromLink) {
            // Rensa alla befintliga blinkningar
            setBlinking({});
            const zoneKey = `zone-${workAreaFromLink}`; // Antag att dina tillståndsnycklar för zoner är prefixade med "zone-"

            // Starta en ny blinkning för den angivna zonen
            setBlinking({ [zoneKey]: true });

            // Skapa en timeout för att avbryta blinkningen
            const timeoutId = setTimeout(() => {
                setBlinking(prev => ({ ...prev, [zoneKey]: false }));
            }, 8000);

            // Rensa timeouten när komponenten avmonteras eller före nästa körning av useEffect
            return () => clearTimeout(timeoutId);
        }
    }, [workAreaFromLink]);

    const handleIconClick = useCallback((iconKey: string) => {
        // Om ikonen redan blinkar, avbryt blinkningen
        // Annars, starta en ny blinkning och avbryt alla andra
        setBlinking(prev => {
            if (prev[iconKey]) {
                // Ikonen blinkar redan, så vi stänger av den
                return { ...prev, [iconKey]: false };
            } else {
                // Avbryt alla andra blinkningar och starta den nya
                return { [iconKey]: true };
            }
        });

        // Återställ blinkningen efter 10 sekunder
        setTimeout(() => {
            setBlinking(prev => ({ ...prev, [iconKey]: false }));
        }, 8000);
    }, []);

    const handleItemClick = useCallback((itemKey: string, itemType: string) => {
        const key = `${itemType}-${itemKey}`;

        setBlinking(prev => {
            if (prev[key]) {
                return { ...prev, [key]: false };
            } else {
                return { [key]: true };
            }
        });

        setTimeout(() => {
            setBlinking(prev => ({ ...prev, [key]: false }));
        }, 8000);
    }, []);



    return (
        <div className="office-map-container">
            {/* Vänster sida */}
            <div className="left-side">
                <header className="header-office">
                    <img src={LogoHeadPrevas} className='logo-prevas' alt='Prevas Logo' />
                </header>
                <div className="subheaderOffice">
                    <img src={iconFindOfficeMap} className='find-office-icon' alt='Hitta på kontoret' />
                    <h2 className="subheaderOffice-text">Hitta på kontoret</h2>
                </div>
                <div className="content-container">
                    {/* Rendera ikonerna */}
                    {Object.keys(iconsData).map((key, index) => (
                        <div className="icon-group" key={index} onClick={() => handleIconClick(key)}>
                            <img src={iconsData[key].src} alt={iconsData[key].alt} className="icon" />
                            <div className="icon-title">{iconsData[key].title}</div>
                        </div>
                    ))}
                    {/* Visa detaljer om arbetsplatser */}
                    <div className="workspace-details">
                        {Object.keys(zonePositions).map((zone, index) => (
                            <div key={index} onClick={() => handleItemClick(zone, 'zone')}>
                                {zone}
                            </div>
                        ))}
                    </div>
                    <div className="conference-details">
                        {Object.keys(conferenceRoomPositions).map((room, index) => (
                            <div key={index} onClick={() => handleItemClick(room, 'conferenceRoom')}>
                                {room}
                            </div>
                        ))}
                    </div>

                </div>
            </div>

            {/* Höger sida */}
            <div className="right-side">
                <div className="map-container">
                    <img src={OfficeMapRightSide} className='officeMap-picture' alt="Office Map" />

                    {Object.entries(blinking).map(([key, isBlinking]) =>
                        isBlinking ? (iconsData[key]?.positions ?? []).map((pos, index) =>
                            [...Array(2)].map((_, ringIndex) => (
                                <div key={`${key}-${index}-${ringIndex}`} className="blink-marker" style={{
                                    position: 'absolute',
                                    left: pos.x,
                                    top: pos.y,
                                    animationDelay: `${ringIndex * 0.30}s`,
                                }}></div>
                            ))
                        ) : null
                    )}


                    {/* Rendera blinkande markörer för konferensrummen */}
                    {Object.entries(conferenceRoomPositions).map(([roomKey, room]) =>
                        blinking[`conferenceRoom-${roomKey}`] ? (
                            room.positions.map((pos, index) => (
                                [...Array(2)].map((_, ringIndex) => (
                                    <div key={`conferenceRoom-${roomKey}-${index}-${ringIndex}`} className="blink-marker" style={{
                                        position: 'absolute',
                                        left: pos.x,
                                        top: pos.y,
                                        animationDelay: `${ringIndex * 0.30}s`,
                                    }}></div>
                                ))
                            ))
                        ) : null
                    )}

                    {/* Rendera blinkande markörer för zonerna */}
                    {Object.entries(zonePositions).map(([zoneKey, zone]) =>
                        blinking[`zone-${zoneKey}`] ? (
                            zone.positions.map((pos, index) => (
                                [...Array(2)].map((_, ringIndex) => (
                                    <div key={`zone-${zoneKey}-${index}-${ringIndex}`} className="blink-marker" style={{
                                        position: 'absolute',
                                        left: pos.x,
                                        top: pos.y,
                                        animationDelay: `${ringIndex * 0.30}s`,
                                    }}></div>
                                ))
                            ))
                        ) : null
                    )}
                </div>


                <Link to="/" className="homeButton-Office">
                    <img src={iconHomeMap} className="logo-homeButton" alt="Home button" />
                </Link>
            </div>
        </div>
    );
}

export default OfficeMap;
