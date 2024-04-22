import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { fetchData } from '../service/DataFetching';
import CustomInput from "../components/CustomInput.tsx"; // Adjust the path as needed

const DeleteEvent: React.FC = () => {
    const [events, setEvents] = useState<{id: number, title: string}[]>([]);
    const [deleteId, setDeleteId] = useState('');

    useEffect(() => {
        const getEvents = async () => {
            const fetchedEvents = await fetchData('/event');
            setEvents(fetchedEvents.map((event: any) => ({id: event.id, title: event.title})));
        };

        getEvents();
    }, []);
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setDeleteId(e.target.value);
    };

    const handleDelete = async () => {
        if (!deleteId) {
            alert('Please enter a valid ID.');
            return;
        }
        const baseUrl = import.meta.env.VITE_API_BASE_URL; // Adjust if necessary
        try {
            await axios.delete(`${baseUrl}/api/event/${deleteId}`);
            alert('Event deleted successfully!');
            // Refresh the list of events
            setEvents(events.filter(event => event.id !== Number(deleteId)));
            setDeleteId('');
        } catch (error) {
            console.error(error);
            alert('Failed to delete event.');
        }
    };

    return (
        <div className="form-container">
            <ul>
                {events.map((event) => (
                    <li key={event.id}>{event.id} - {event.title}</li>
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
                <button type="submit" className="submit-button">Delete Event</button>
            </form>
        </div>
    );
};

export default DeleteEvent;
