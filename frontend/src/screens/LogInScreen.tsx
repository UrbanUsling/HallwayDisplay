import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { CircleLoader } from "react-spinners";


const LoginConfirmation: React.FC = () => {
    const navigate = useNavigate();

    useEffect(() => {
        // Redirect to login page after a delay instead of /admin/home
        const timer = setTimeout(() => navigate('/admin/home'), 3000);
        return () => clearTimeout(timer);
    }, [navigate]);

    return (
        <div style={{ textAlign: 'center', marginTop: '80px' }}>
            <h2>You are logging in. Don't forget to log out when done!</h2>
            <div className="spinner-container">
                <CircleLoader color="#09f" loading={true} size={150} />
            </div>
        </div>
    );
};

export default LoginConfirmation;
