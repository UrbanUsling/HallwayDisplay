import React, { useState, useEffect, useRef } from 'react';
import backgroundImg from '../assets/Prevas-Entre-Portal-UI-assets/PNG/Background-01.png';
import robotHand from '../assets/Prevas-Entre-Portal-UI-assets/WebP/Pic-Robot-hand-standing.webp';
import Logo from '../assets/Prevas-Entre-Portal-UI-assets/SVG/Logo-Prevas-blue.svg';
import Greeting1 from '../assets/Prevas-Entre-Portal-UI-assets/SVG/Text-Welcome-to.svg';
import Greeting2 from '../assets/Prevas-Entre-Portal-UI-assets/SVG/Text-Prevas-Stockholm.svg';
import Klicka from '../assets/Prevas-Entre-Portal-UI-assets/SVG/Button-Klicka-pa-skarmen.svg';

const ScreenSaver: React.FC<{ onActiveChange: (isActive: boolean) => void }> = ({ onActiveChange }) => {
    const [isActive, setIsActive] = useState(false);
    const inactivityTimer = useRef<NodeJS.Timeout | null>(null);

    const handleActivity = () => {
        setIsActive(false);
        onActiveChange(false); // Meddela att skärmsläckaren är inaktiv
        clearTimeout(inactivityTimer.current as NodeJS.Timeout);
        inactivityTimer.current = setTimeout(() => {
            setIsActive(true);
            onActiveChange(true); // Meddela att skärmsläckaren är aktiv
        }, 30 * 1000); // 10 seconds
    };

    useEffect(() => {
        handleActivity(); // Reset timer on component mount

        document.addEventListener('mousemove', handleActivity);
        document.addEventListener('keypress', handleActivity);

        return () => {
            clearTimeout(inactivityTimer.current as NodeJS.Timeout);
            document.removeEventListener('mousemove', handleActivity);
            document.removeEventListener('keypress', handleActivity);
        };
    }, []);

    if (!isActive) {
        return null;
    }

    return (
        <>
            <div className='screensaver-sections'>
                <div className="screensaver-texts">
                    <img src={Logo} className='screensaver-logo' alt="Logo"/>
                    <img src={Greeting1} className='screensaver-text1' alt="Welcome to"/>
                    <img src={Greeting2} className='screensaver-text2' alt="Prevas Stockholm"/>
                    <img src={Klicka} className='screensaver-klicka' alt="Click on screen"/>
                </div>
                <img src={robotHand} alt="Robothand" className='screensaver-robothand'/>
            </div>
            <img src={backgroundImg} alt="Screensaver background" className='screensaver-backgroundImage'/>
        </>
    );
};

export default ScreenSaver;