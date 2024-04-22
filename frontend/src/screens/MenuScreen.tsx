import { To, useNavigate} from 'react-router-dom';
import Background from "../assets/Prevas-Entre-Portal-UI-assets/WebP/Background-02.webp";
import HomeButtonSearch from "../assets/Prevas-Entre-Portal-UI-assets/SVG/Home-button-whosearch.svg";
import HomeButtonOfficeVe from "../assets/Prevas-Entre-Portal-UI-assets/SVG/Home-button-offive.svg";
import HomeButtonEvents from "../assets/Prevas-Entre-Portal-UI-assets/SVG/Home-button-events.svg";
import HomeButtonProducts from "../assets/Prevas-Entre-Portal-UI-assets/SVG/Home-button-products.svg";
import HomeButtonLab from "../assets/Prevas-Entre-Portal-UI-assets/SVG/Home-button-lab.svg";
import HomeButtonQuiz from "../assets/Prevas-Entre-Portal-UI-assets/SVG/Home-button-quiz.svg";
import HomeButtonOffices from "../assets/Prevas-Entre-Portal-UI-assets/SVG/Home-button-offices.svg";
import HomeButtonServices from "../assets/Prevas-Entre-Portal-UI-assets/SVG/Home-button-services.svg";
import HomeButtonFaq from "../assets/Prevas-Entre-Portal-UI-assets/SVG/Home-button-FAQ.svg";
import HomeButtonMontern from "../assets/Prevas-Entre-Portal-UI-assets/WebP/home-button-montern.webp";
import LogoHeadPrevas from "../assets/Prevas-Entre-Portal-UI-assets/SVG/Logo-Head-Prevas-Stockholm.svg"
import SettingsLogo from "../assets/Prevas-Entre-Portal-UI-assets/SVG/icon-settings.svg"

function MenuScreen() {

    const navigate = useNavigate(); // Använd useNavigate hook

    // Funktion för att navigera. Notera att useNavigate använder navigate(path) direkt.
    const navigateTo = (path: To) => {
        navigate(path);
    };
//tog bort weather widget div och komponent för att förbättra prestandan på raspberryn
    return (
        <div className="menuScreen-container">
            <img src={Background} className="menuScreen-background" alt="Menu Background" />
            <nav className="navbar-menuScreen">
                <div className="container-nav">
                    <div className="prevas-icon-container">
                        <img src={LogoHeadPrevas} className="logo-prevas-icon" alt="Prevas Logo" />
                    </div>

                    <div className='logo-settings-container'>
                        <img src={SettingsLogo}  className="settings-logo" alt="Settings" onClick={() => navigate('/login')} />
                    </div>
                </div>
            </nav>
            <div className="main-content">
                <div className="all-buttons-container">
                    <button className="home-button" onClick={() => navigateTo('/montern')}>
                        <img src={HomeButtonMontern} className="montern-button" alt="Montern!" />
                    </button>
                    <div className="buttons-grid">
                        <button className='home-button' onClick={() => navigateTo('/info')}>
                            <img src={HomeButtonSearch} alt="Vem söker du?" />
                        </button>
                        <button className='home-button' onClick={() => navigateTo('/office')}>
                            <img src={HomeButtonOfficeVe} alt="Hitta på kontoret?" />
                        </button>
                        <button className='home-button' onClick={() => navigateTo('/event')}>
                            <img src={HomeButtonEvents} alt="Våra Events" />
                        </button>
                        <button className='home-button' onClick={() => navigateTo('/product')}>
                            <img src={HomeButtonProducts} alt="Våra Produkter" />
                        </button>
                        <button className='home-button' onClick={() => navigateTo('/labb')}>
                            <img src={HomeButtonLab} alt="Vårt Labb" />
                        </button>
                        <button className='home-button' onClick={() => navigateTo('/quiz')}>
                            <img src={HomeButtonQuiz} alt="Frågesport" />
                        </button>
                        <button className='home-button' onClick={() => navigateTo('/business')}>
                            <img src={HomeButtonOffices} alt="Affärsenheter" />
                        </button>
                        <button className='home-button' onClick={() => navigateTo('/service')}>
                            <img src={HomeButtonServices} alt="Våra Tjänster" />
                        </button>
                        <button className='home-button' onClick={() => navigateTo('/faq')}>
                            <img src={HomeButtonFaq} alt="FAQ" />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}


export default MenuScreen;