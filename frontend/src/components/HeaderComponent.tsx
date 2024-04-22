import React from 'react';
import { Link } from "react-router-dom";
import Prevas from '../assets/Prevas-Entre-Portal-UI-assets/SVG/Logo-Head-Prevas-Stockholm.svg';
import Home from "../assets/Prevas-Entre-Portal-UI-assets/SVG/icon-Home.svg";

const Header: React.FC = () => {
    return (
        <header className="header">
            <img src={Prevas} className='header-text' alt='Prevas'/>
            <Link className='header-icon' to="/">
                <img src={Home}  alt='Home' />
            </Link>
        </header>
    );
};

export default Header;

