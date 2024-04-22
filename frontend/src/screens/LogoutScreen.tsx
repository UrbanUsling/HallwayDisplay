import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { CircleLoader } from "react-spinners";

const LogoutConfirmation: React.FC = () => {
    const navigate = useNavigate();

    useEffect(() => {
        // Redirect to home page after a delay
        const timer = setTimeout(() => navigate('/'), 3000);
        return () => clearTimeout(timer);
    }, [navigate]);

    return (
        <div style={{ textAlign: 'center', marginTop: '80px' }}>
            <h2>You have been logged out.</h2>
            <div className="spinner-container">
                <CircleLoader color="#09f" loading={true} size={150} />
            </div>
        </div>
    );
};

export default LogoutConfirmation;
