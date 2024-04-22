import React from 'react';
import { Link } from 'react-router-dom';


export const navButtons = [
    { path: "/admin/home", label: "Home" },
    { path: "/admin/products", label: "Produkter" },
    { path: "/admin/labb", label: "Labb" },
    { path: "/admin/info", label: "Info" },
    { path: "/admin/event", label: "Events" },
    { path: "/admin/faq", label: "FAQ" },
    { path: "/admin/location", label: "Locations" },
    { path: "/admin/quiz", label: "Quiz" },
    { path: "/admin/business", label: "Business" },
    { path: "/admin/service", label: "Service" },
    { path: "/admin/cupboard", label: "Skåpet" },
];

const NavbarComponent: React.FC = () => {
    return (
        <div>


            <nav className="navbar-container">
                {navButtons.map((button, index) => (
                    <Link key={index} to={button.path} className="navbar-button">
                        {button.label}
                    </Link>
                ))}
            </nav>
        </div>
    );
};

export default NavbarComponent;

