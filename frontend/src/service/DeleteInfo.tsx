import React, { useEffect, useState } from 'react';
import axios from 'axios';

// Assuming you have a service setup to fetch data
import { fetchData } from './DataFetching.ts';
import CustomInput from "../components/CustomInput"; // Verify path

// Define the Info interface
interface Info {
    id: number;
    full_name: string; // Adjust based on your actual data model
}

const DeleteInfo: React.FC = () => {
    const [infos, setInfos] = useState<Info[]>([]);
    const [deleteId, setDeleteId] = useState('');

    useEffect(() => {
        // Adjust '/info' endpoint as needed
        const getInfo = async () => {
            const fetchedInfos: Info[] = await fetchData('/info');
            setInfos(fetchedInfos);
        };

        getInfo();
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

        const baseUrl = import.meta.env.VITE_API_BASE_URL; // Ensure this matches your environment variable setup
        try {
            await axios.delete(`${baseUrl}/api/info/${deleteId}`);
            alert('Info and associated images deleted successfully!');
            setDeleteId('');
            setInfos(infos.filter(info => info.id !== Number(deleteId)));
        } catch (error) {
            console.error('Failed to delete info:', error);
            alert('Failed to delete info.');
        }
    };

    return (
        <div className="form-container">
            <ul>
                {infos.map(info => (
                    <li key={info.id}>{info.id} - {info.full_name}</li>
                ))}
            </ul>
            <form onSubmit={handleDelete} >
                <div className="form-group">
                    <CustomInput
                        type="text"
                        value={deleteId}
                        onChange={handleChange}
                        placeholder="Enter ID to delete"
                    />
                </div>
                    <button type="submit" className="submit-button">Delete Info</button>
            </form>
        </div>
);
};

export default DeleteInfo;
