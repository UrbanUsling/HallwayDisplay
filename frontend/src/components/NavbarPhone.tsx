import React from 'react';
import { Link } from 'react-router-dom';
import {navButtons} from "./Navbar.tsx";


const NavbarPhone: React.FC = () => {
    return (
        <div className="navbar-phone-container">
            <nav className="navbar-phone">
                {navButtons.map((button, index) => (
                    <Link key={index} to={button.path} className="navbar-phone-button">
                        {button.label}
                    </Link>
                ))}
            </nav>
        </div>
    );
};

export default NavbarPhone;
