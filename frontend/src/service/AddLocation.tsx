import React, { useState, ChangeEvent, FormEvent } from 'react';
import axios from 'axios';
import CustomInput from "../components/CustomInput.tsx";

interface Location {
    lat: number;
    lng: number;
    pop_up: string;
}

const AddLocation: React.FC = () => {
    const [location, setLocation] = useState<Location>({
        lat: 0,
        lng: 0,
        pop_up: ''
    });

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setLocation({ ...location, [name]: value });
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        console.log("Submitting location:", location); // Log the location data being submitted
        try {
            const response = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/api/location/`, location);
            console.log("Response data:", response.data); // Log response data
            alert('Location added successfully!');
            setLocation({ lat: 0, lng: 0, pop_up: '' });
        } catch (error) {
            // @ts-ignore
            console.error("Error response:", error.response); // Log error response
            alert('Failed to add location.');
        }
    };

    return (
        <div className="form-container ">
            <form onSubmit={handleSubmit} className="add-location-form add-product-form">
                <div className="form-group ">
                    <CustomInput type="number" step="0.00000001" name="lat" value={location.lat} onChange={handleChange} placeholder="Latitude"/>
                </div>
                <div className="form-group">
                    <CustomInput type="number" step="0.00000001" name="lng" value={location.lng} onChange={handleChange} placeholder="Longitude"/>
                </div>
                <div className="form-group">
                    <CustomInput type="text" name="pop_up" value={location.pop_up} onChange={handleChange} placeholder="Popup"/>
                </div>
                <button type="submit" className="submit-button">Add Location</button>
            </form>
        </div>
    );
};

export default AddLocation;
