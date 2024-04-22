import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { fetchData } from './DataFetching.ts'; // Adjust the import path as necessary
import CustomInput from "../components/CustomInput.tsx";

interface Location {
    id: number;
    lat: number;
    lng: number;
    pop_up: string;
}

const DeleteLocation: React.FC = () => {
    const [locations, setLocations] = useState<Location[]>([]);
    const [deleteId, setDeleteId] = useState('');

    useEffect(() => {
        const getLocations = async () => {
            const fetchedLocations = await fetchData('/location'); // Use the fetchData function with the endpoint
            setLocations(fetchedLocations);
        };

        getLocations();
    }, []);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setDeleteId(e.target.value);
    };

    const handleDelete = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!deleteId) {
            alert('Please enter a valid ID.');
            return;
        }
        const baseUrl = import.meta.env.VITE_API_BASE_URL;

        try {
            await axios.delete(`${baseUrl}/api/location/deleteById/${deleteId}`);
            alert('Location deleted successfully!');
            setDeleteId(''); // Reset the delete ID input
            setLocations(locations.filter(location => location.id !== Number(deleteId))); // Update the list after deletion
        } catch (error) {
            console.error(error);
            alert('Failed to delete location.');
        }
    };

    return (
        <div className="form-container">
            <ul>
                {locations.map((location) => (
                    <li key={location.id}>{location.id} - Lat: {location.lat}, Lng: {location.lng}, Popup: {location.pop_up}</li>
                ))}
            </ul>
            <form onSubmit={handleDelete} className="delete-location-form">
                <div className="form-group">
                    <CustomInput
                        type="text"
                        value={deleteId}
                        onChange={handleChange}
                        placeholder="Enter ID to delete"
                    />
                </div>
                <button type="submit" className="submit-button">Delete Location</button>
            </form>
        </div>
    );
};

export default DeleteLocation;
