import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { fetchData } from './DataFetching'; // Adjust the import path as necessary
import CustomInput from "../components/CustomInput";

interface Lab {
    id: number;
    title: string;
}

const DeleteLab: React.FC = () => {
    const [labs, setLabs] = useState<Lab[]>([]);
    const [deleteId, setDeleteId] = useState('');

    useEffect(() => {
        const getLabs = async () => {
            const fetchedLabs = await fetchData('/labb'); // Use the correct endpoint to fetch labs
            setLabs(fetchedLabs);
        };

        getLabs();
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
        const baseUrl = import.meta.env.VITE_API_BASE_URL; // Adjust if necessary

        try {
            await axios.delete(`${baseUrl}/api/labb/${deleteId}`); // Use the correct endpoint for deletion
            alert('Lab deleted successfully!');
            setDeleteId(''); // Reset the delete ID input
            // Update the list by filtering out the deleted lab
            setLabs(labs.filter(lab => lab.id !== Number(deleteId)));
        } catch (error) {
            console.error(error);
            alert('Failed to delete lab.');
        }
    };

    return (
        <div className="form-container">
            <ul>
                {labs.map((lab) => (
                    <li key={lab.id}>{lab.id} - {lab.title}</li>
                ))}
            </ul>
            <form onSubmit={handleDelete} className="delete-lab-form">
                <div className="form-group">
                    <CustomInput
                        type="text"
                        value={deleteId}
                        onChange={handleChange}
                        placeholder="Enter ID to delete"
                    />
                </div>
                <button type="submit" className="submit-button">Delete Lab</button>
            </form>
        </div>
    );
};

export default DeleteLab;
