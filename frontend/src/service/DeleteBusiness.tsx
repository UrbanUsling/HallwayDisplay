import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { fetchData } from './DataFetching.ts';
import CustomInput from "../components/CustomInput.tsx"; // Adjust import path as necessary

// Define an interface for the business data
interface Business {
    id: number;
    title: string;
}

const DeleteBusiness: React.FC = () => {
    const [businesses, setBusinesses] = useState<Business[]>([]);
    const [deleteId, setDeleteId] = useState('');

    useEffect(() => {
        const getBusinesses = async () => {
            // Replace '/business' with the actual endpoint for fetching business entries
            const fetchedBusinesses = await fetchData('/business');
            setBusinesses(fetchedBusinesses);
        };

        getBusinesses();
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
        // Replace with your actual API base URL and endpoint for deleting a business entry
        const baseUrl = import.meta.env.VITE_API_BASE_URL;
        try {
            await axios.delete(`${baseUrl}/api/business/${deleteId}`);
            alert('Business deleted successfully!');
            setDeleteId(''); // Reset the delete ID input
            // Update the list by filtering out the deleted business
            setBusinesses(businesses.filter(business => business.id !== Number(deleteId)));
        } catch (error) {
            console.error(error);
            alert('Failed to delete business.');
        }
    };

    return (
        <div className="form-container">
            <ul>
                {businesses.map((business) => (
                    <li key={business.id}>{business.id} - {business.title}</li>
                ))}
            </ul>
            <form onSubmit={handleDelete}>
                <div className="form-group ">
                    <CustomInput
                        type="text"
                        value={deleteId}
                        onChange={handleChange}
                        placeholder="Enter ID to delete"
                    />
                </div>
                <button type="submit" className="submit-button">Delete Business</button>
            </form>
        </div>
    );
};

export default DeleteBusiness;
