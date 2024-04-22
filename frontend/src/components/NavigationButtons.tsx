import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ClockComponent } from "./ClockComponent";
import PrevasLogo from '../assets/PrevasLogo.png'; // Adjust the import path as necessary

const navButtons = [
    { path: "/products", label: "Produkter" },
    { path: "/labb", label: "Labb" },
    { path: "/info", label: "Info" },
    { path: "/event", label: "Events" },
    { path: "/location", label: "Locations" },
    { path: "/quiz", label: "Quiz" },
];

const NavigationButtons: React.FC = () => {
    const radius = 300; // Adjust as needed
    const dotRef = useRef<HTMLDivElement>(null);
    const containerSize = radius * 2;

    useEffect(() => {
        if (dotRef.current) {
            const dotSize = 10; // Assuming the dot is 10x10px
            const offset = dotSize / 2;

            // Center the dot by adjusting its position based on the container and dot sizes
            dotRef.current.style.left = `calc(50% - ${offset}px)`;
            dotRef.current.style.top = `calc(50% - ${offset}px)`;
        }
    }, [radius]); // Re-apply when radius changes

    return (
        <div>
            <ClockComponent />
            <div className="navigation-container" style={{ width: `${containerSize}px`, height: `${containerSize}px` }}>
                {navButtons.map((button, index) => {
                    const angle = (2 * Math.PI) / navButtons.length * index; // Calculate angle for this button
                    const x = radius * Math.cos(angle) + radius; // Adjust button position based on angle
                    const y = radius * Math.sin(angle) + radius; // Adjust button position based on angle
                    return (
                        <Link key={index} to={button.path} className="nav-button" style={{
                            position: 'absolute',
                            left: `${x}px`,
                            top: `${y}px`,
                            transform: 'translate(-50%, -50%)' // Center buttons on calculated positions
                        }}>
                            {button.label}
                        </Link>
                    );
                })}
                <img src={PrevasLogo} alt="Center" className="center-image" />
            </div>
        </div>
    );
};

export default NavigationButtons;
