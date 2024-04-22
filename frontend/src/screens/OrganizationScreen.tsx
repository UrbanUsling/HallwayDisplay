import React from "react";
import Prevas from '../assets/Prevas-Entre-Portal-UI-assets/SVG/Logo-Head-Prevas-Stockholm.svg';
import BusinessIcon from "../assets/Prevas-Entre-Portal-UI-assets/SVG/icon-offices.svg";
import Home from "../assets/Prevas-Entre-Portal-UI-assets/SVG/icon-Home.svg";
import Organization from '../assets/Prevas-Org-v2-ol (1).svg';
import { Link } from "react-router-dom";


const OrganizationScreen: React.FC = () => {



    return (
        <div className="app">
            <header className="header">
                <img src={Prevas} className='header-text' alt='Prevas'/>
                <Link className='header-icon' to="/"> {/* Use Link to navigate to home */}
                    <img src={Home}  alt='Home' />
                </Link>
            </header>
            <div className="subheader business-header">
                <div className='left-group'>
                    <img src={BusinessIcon} className='subheader-icon' alt='eventicon'/>
                    <div className='subheader-title'>Affärsenheter: Organisation 2024</div>
                </div>

                <div className='right-group'>
                    <Link to="/business" className='business-button-link'>
                        <button className='business-button'>Till Lista</button>
                    </Link>
                    <Link to="/location" className='business-button-link'>
                        <button className='business-button'>Se Karta!</button>
                    </Link>
                </div>


            </div>
            <main className="content">

                <img src={Organization} className='organization-image' alt='OrganisationsBild' />


            </main>
        </div>
    );
};

export default OrganizationScreen;
