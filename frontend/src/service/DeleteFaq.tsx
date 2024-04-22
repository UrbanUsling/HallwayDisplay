import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { fetchData } from './DataFetching.ts';
import CustomInput from "../components/CustomInput.tsx"; // Adjust import path as necessary

// Define an interface for the business data
interface FAQ {
    id: number;
    title: string;
}

const DeleteFaq: React.FC = () => {
    const [faqs, setFaqs] = useState<FAQ[]>([]);
    const [deleteId, setDeleteId] = useState('');

    useEffect(() => {
        const getFaq = async () => {
            // Replace '/business' with the actual endpoint for fetching business entries
            const fetchedFaq = await fetchData('/faq');
            setFaqs(fetchedFaq);
        };

        getFaq();
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
            await axios.delete(`${baseUrl}/api/faq/${deleteId}`);
            alert('Faq deleted successfully!');
            setDeleteId(''); // Reset the delete ID input
            // Update the list by filtering out the deleted business
            setFaqs(faqs.filter(faq => faq.id !== Number(deleteId)));
        } catch (error) {
            console.error(error);
            alert('Failed to delete faq.');
        }
    };

    return (
        <div className="form-container">
            <ul>
                {faqs.map((faq) => (
                    <li key={faq.id}>{faq.id} - {faq.title}</li>
                ))}
            </ul>
            <form onSubmit={handleDelete}>
                <div className="form-group">
                    <CustomInput
                        type="text"
                        value={deleteId}
                        onChange={handleChange}
                        placeholder="Enter ID to delete"
                    />
                </div>
                <button type="submit" className="submit-button">Delete Faq</button>
            </form>
        </div>
    );
};

export default DeleteFaq;
