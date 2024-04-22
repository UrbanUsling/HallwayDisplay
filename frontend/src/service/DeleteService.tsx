import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { fetchData } from './DataFetching.ts';
import CustomInput from "../components/CustomInput.tsx"; // Adjust import path as necessary

// Define an interface for the service data
interface Service {
    id: number;
    title: string;
}

const DeleteService: React.FC = () => {
    const [services, setServices] = useState<Service[]>([]);
    const [deleteId, setDeleteId] = useState('');

    useEffect(() => {
        const getServices = async () => {
            // Fetch services using the /service endpoint
            const fetchedServices = await fetchData('/service');
            setServices(fetchedServices);
        };

        getServices();
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
        // Use the correct API base URL and endpoint for deleting a service entry
        const baseUrl = import.meta.env.VITE_API_BASE_URL;
        try {
            await axios.delete(`${baseUrl}/api/service/${deleteId}`);
            alert('Service deleted successfully!');
            setDeleteId(''); // Reset the delete ID input
            // Update the list by filtering out the deleted service
            setServices(services.filter(service => service.id !== Number(deleteId)));
        } catch (error) {
            console.error(error);
            alert('Failed to delete service.');
        }
    };

    return (
        <div className="form-container">
            <ul>
                {services.map((service) => (
                    <li key={service.id}>{service.id} - {service.title}</li>
                ))}
            </ul>
            <form onSubmit={handleDelete} className="delete-service-form">
                <div className="form-group">
                    <CustomInput
                        type="text"
                        value={deleteId}
                        onChange={handleChange}
                        placeholder="Enter ID to delete"
                    />
                </div>
                <button type="submit" className="submit-button">Delete Service</button>
            </form>
        </div>
    );
};

export default DeleteService;
