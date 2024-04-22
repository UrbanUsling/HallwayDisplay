import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';


const NavbarComponent2: React.FC = () => {
    return (
        <div>
            <nav className="navbar-container">
                <Link to="/" className="back-arrow">
                    <FontAwesomeIcon icon={faArrowLeft} />
                </Link>
            </nav>
        </div>
    );
};

export default NavbarComponent2;

