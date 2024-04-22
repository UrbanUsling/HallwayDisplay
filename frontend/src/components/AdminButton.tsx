import React from 'react';

const AdminButton: React.FC = () => {
    const handleClick = () => {
        // Byt till /admin/products genom att ändra sidans URL
        window.location.href = '/admin/home';
    };

    return (
        <div
            className="admin-button"
            style={{
                position: 'fixed',
                right: '15px',
                bottom: '15px',
                padding: '10px 20px',
                background: '#007bff', // Example color, adjust as necessary
                color: 'white',
                borderRadius: '5px',
                cursor: 'pointer',
                textAlign: 'center',
            }}
            onClick={handleClick} // Lägg till onClick-hanterare för att ändra sidans URL
        >
            Admin
        </div>
    );
};

export default AdminButton;





