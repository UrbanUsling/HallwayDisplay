// StartScreen.tsx or another parent component
import React from 'react';
import Background from '../components/BackgroundImage.tsx'; // Adjust the path based on your file structure
import LogoutButton from "../components/LogoutButton.tsx";


import QRCodeComponent from "../components/QRCodeComponent.tsx";
import NavbarPhone from "../components/NavbarPhone.tsx"; // Adjust the path as necessary


const AdminStartScreen: React.FC = () => {
    return (
        <Background imageUrl="https://i.ytimg.com/vi/d2-3Cf3BMcI/maxresdefault.jpg"> {/* Replace with your actual image URL */}
            <div style={{position: 'relative', zIndex: 1}}>

                <NavbarPhone/>
                <div className='main-content2'>
                    <div className="text-background">
                        <h2>Här kan du lägga till och ta bort i alla tabeller i databasen</h2>
                        <h2>Koppla in med telefon:</h2>
                        <h3>
                            Nätverk: Linux
                        </h3>
                        <h3>
                            Lösenord: Joakim,von,Anka
                        </h3>
                        <h2>
                            <QRCodeComponent/>
                        </h2>
                        <h3>Skanna qr koden när du är ansluten till Linux nätverket eller fyll in 172.16.16.157:8080/admin/home i mobilwebbläsarens adressfält</h3>

                    </div>
                </div>
                <LogoutButton/>
            </div>
        </Background>
    );
};

export default AdminStartScreen;