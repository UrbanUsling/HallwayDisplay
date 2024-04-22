import React, {useEffect, useState} from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import DeleteProduct from "./service/DeleteProduct.tsx";
import AddInfo from "./service/AddInfo.tsx";
import AddProduct from "./service/AddProduct.tsx";
import DeleteInfo from "./service/DeleteInfo.tsx";
import './globalStyles.scss'
import AddEvent from "./service/AddEvent.tsx";
import DeleteEvent from "./service/DeleteEvent.tsx";

import AddQuiz from "./service/AddQuiz.tsx";
import DeleteQuiz from "./service/DeleteQuiz.tsx";
import DeleteLab from "./service/DeleteLab.tsx";
import AddLocation from "./service/AddLocation.tsx";
import DeleteLocation from "./service/DeleteLocation.tsx";
import LogoutButton from "./components/LogoutButton";
import LogoutConfirmation from "./screens/LogoutScreen.tsx";
import LoginConfirmation from "./screens/LogInScreen.tsx";
import AdminStartScreen from "./screens/AdminStartScreen.tsx";
import InfoScreen from "./screens/InfoScreen.tsx";
import MenuScreen from "./screens/MenuScreen.tsx";
import EventScreen from "./screens/EventScreen.tsx";
import ProductScreen from "./screens/ProductScreen.tsx";
import LabScreen from "./screens/LabScreen.tsx";
import QuizScreen from "./screens/QuizScreen.tsx";
import BusinessScreen from "./screens/BusinessScreen.tsx";
import LocationScreen from "./screens/LocationScreen.tsx";
import OrganizationScreen from "./screens/OrganizationScreen.tsx";
import FAQScreen from "./screens/FAQScreen.tsx";
import ServiceScreen from "./screens/ServiceScreen.tsx";
import {KeyboardInputProvider} from "./components/KeyboardContext.tsx";
import Keyboard from "./components/Keyboard.tsx";
import DeleteBusiness from "./service/DeleteBusiness.tsx";
import AddBusiness from "./service/AddBusiness.tsx";
import OfficeMap from "./screens/OfficeMap.tsx";
import AddFaq from "./service/AddFaq.tsx";
import DeleteFaq from "./service/DeleteFaq.tsx";
import AddLab from "./service/AddLab.tsx";
import AddService from "./service/AddService.tsx";
import DeleteService from "./service/DeleteService.tsx";
import Login from "./screens/Login.tsx";
import ProductDetailScreen from "./screens/ProductDetailScreen.tsx";

import CupboardScreen from "./screens/CupboardScreen.tsx";
import ScreenSaver from "./screens/ScreenSaver.tsx";

import NavbarPhone from "./components/NavbarPhone.tsx";
import CupboardScreenGuest from "./screens/CupboardScreenGuest.tsx";
import Board from "./screens/GameBoard.tsx";





const Home: React.FC = () => {
    const [showScreenSaver, setShowScreenSaver] = useState(false); // Anta att skärmsläckaren är dold från start
    const handleScreenSaverActivity = (isActive: boolean) => {
        setShowScreenSaver(isActive);
    };

    useEffect(() => {
        const handleResize = () => {
            // Your global resize handling logic here
            console.log('Window resized');

            // Example: safely call onResize or setupMobileNav if elements exist
            const helpOuterBox = document.querySelector('#details');
            if (helpOuterBox && helpOuterBox.classList.contains('some-class')) {
                // Perform actions if #details exists and has 'some-class'
            }
        };

        // Add resize event listener when the component mounts
        window.addEventListener('resize', handleResize);

        // Remove the event listener when the component unmounts
        return () => window.removeEventListener('resize', handleResize);
    }, []); // Empty dependency array means this effect runs once on mount and cleanup runs on unmount


    return (
        <div>
            <Router>
                <Routes>
                    <Route path="/" element={
                        <>
                            <ScreenSaver onActiveChange={handleScreenSaverActivity} />
                            {!showScreenSaver && <MenuScreen />}
                        </>
                    } />
                    <Route path="/montern" element={
                        <>
                            <CupboardScreenGuest />
                        </>
                    } />
                    <Route
                        path="/admin/home"
                        element={
                            <>
                                <AdminStartScreen />
                            </>
                        }
                    />
                    <Route
                        path="/admin/products"
                        element={<>
                        <KeyboardInputProvider>

                            <NavbarPhone />
                            <div className="main-content-admin">
                                <LogoutButton />
                                <AddProduct/>
                                <DeleteProduct />

                                <Keyboard/>
                            </div>
                        </KeyboardInputProvider>
                        </>}
                    />
                    <Route
                        path="/admin/event"
                        element={<>
                            <KeyboardInputProvider>

                                <NavbarPhone />
                                <div className="main-content-admin">
                                    <LogoutButton />
                                    <AddEvent/>
                                    <DeleteEvent />
                                    <Keyboard />
                                </div>
                            </KeyboardInputProvider>

                        </>}
                    />
                    <Route
                        path="/admin/quiz"
                        element={<>
                            <KeyboardInputProvider>

                                <NavbarPhone />
                                <div className="main-content-admin">
                                    <LogoutButton />
                                    <AddQuiz/>
                                    <DeleteQuiz />
                                    <Keyboard />
                                </div>
                            </KeyboardInputProvider>


                        </>}
                    />
                    <Route
                        path="/admin/business"
                        element={<>
                            <KeyboardInputProvider>

                                <NavbarPhone />
                                <div className="main-content-admin">
                                    <LogoutButton />
                                    <AddBusiness />
                                    <DeleteBusiness />
                                    <Keyboard />
                                </div>
                            </KeyboardInputProvider>


                        </>}
                    />
                    <Route
                        path="/admin/info"
                        element={<>
                        <KeyboardInputProvider>

                            <NavbarPhone />
                            <div className="main-content-admin">
                                <LogoutButton />
                                <AddInfo/>
                                <DeleteInfo />
                                <Keyboard />
                            </div>
                        </KeyboardInputProvider>
                        </>}
                    />
                    <Route
                        path="/admin/labb"
                        element={<>
                        <KeyboardInputProvider>

                            <NavbarPhone />
                            <div className="main-content-admin">
                                <LogoutButton />
                                <AddLab/>
                                <DeleteLab />
                                <Keyboard />
                            </div>
                        </KeyboardInputProvider>
                        </>}
                    />
                    <Route
                        path="/admin/location"
                        element={<>
                        <KeyboardInputProvider>

                            <NavbarPhone />
                            <div className="main-content-admin">
                                <LogoutButton />
                                <AddLocation/>
                                <DeleteLocation/>
                                <Keyboard />
                            </div>
                        </KeyboardInputProvider>
                        </>}
                    />
                    <Route
                        path="/admin/faq"
                        element={<>
                        <KeyboardInputProvider>

                            <NavbarPhone />
                            <div className="main-content-admin">
                                <LogoutButton />
                                <AddFaq/>
                                <DeleteFaq/>
                                <Keyboard />
                            </div>
                        </KeyboardInputProvider>
                        </>}
                    />
                    <Route
                        path="/admin/service"
                        element={<>
                            <KeyboardInputProvider>

                                <NavbarPhone />
                                <div className="main-content-admin">
                                    <LogoutButton />
                                    <AddService/>
                                    <DeleteService/>
                                    <Keyboard />
                                </div>
                            </KeyboardInputProvider>
                        </>}
                    />
                    <Route
                        path="/product"
                        element={
                            <>
                                    <ProductScreen/>
                            </>
                        }
                    />
                    <Route
                        path="/product/:id"
                        element={
                            <>
                                <ProductDetailScreen product={undefined} onClose={undefined} />
                            </>
                        }
                    />
                    <Route
                    path="/office"
                    element={
                        <>

                            <OfficeMap />
                        </>
                    }
                    />
                    <Route
                        path="/info"
                        element={
                            <InfoScreen />
                        }
                    />
                    <Route
                        path="/labb"
                        element={
                            <>
                     <LabScreen />
                            </>
                        }
                    />
                    <Route
                        path="/quiz"
                        element={

                            <QuizScreen/>

                        }
                    />
                    <Route
                        path="/business"
                        element={

                            <BusinessScreen />

                        }
                    />
                    <Route
                        path="/event"
                        element={
                            <>
                                <EventScreen />

                            </>
                        }
                    />
                    <Route
                        path="/location"
                        element={
                                <LocationScreen />
                        }
                    />
                    <Route
                        path="/organization"
                        element={
                            <OrganizationScreen />
                        }
                    />
                    <Route
                        path="/faq"
                        element={
                            <FAQScreen />
                        }
                    />
                    <Route
                        path="/service"
                        element={
                            <ServiceScreen />
                        }
                    />
                    <Route
                        path="/login"
                        element={
                            <KeyboardInputProvider>
                                <Login />
                                <Keyboard />
                            </KeyboardInputProvider>
                        }
                    />
                    <Route
                        path="/game"
                        element={
                            <Board />
                        }
                    />
                    <Route
                        path="/admin/cupboard"
                        element={<>
                            <KeyboardInputProvider>

                                <NavbarPhone />
                                <div className="main-content-admin">
                                    <LogoutButton />
                                    <CupboardScreen />
                                    <Keyboard />
                                </div>
                            </KeyboardInputProvider>


                        </>}
                    />


                    <Route path="/logout-confirmation" element={<LogoutConfirmation />} />
                    <Route path="/login-confirmation" element={<LoginConfirmation />} />
                </Routes>
            </Router>
        </div>
    );
};

export default Home;
