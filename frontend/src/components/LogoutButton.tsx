import React from 'react';
import {useNavigate} from "react-router-dom";

const LogoutButton: React.FC = () => {
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            await fetch('/logout', {
                method: 'GET',
                credentials: 'include'
            });
            // Navigate to LogoutConfirmation page instead of redirecting to '/'
            navigate('/logout-confirmation');
        } catch (error) {
            console.error('Error logging out:', error);
        }
    };

    return (
        <div
            className="logout-button"
            style={{
                position: 'fixed',
                left: '15px',
                bottom: '15px',
                padding: '10px 20px',
                background: '#dc3545', // Röd färg för logga ut-knappen, justera vid behov
                color: 'white',
                borderRadius: '5px',
                cursor: 'pointer',
                textAlign: 'center',
            }}
            onClick={handleLogout} // Lägg till onClick-hanterare för att logga ut
        >
            Logga ut
        </div>
    );
};

export default LogoutButton;

