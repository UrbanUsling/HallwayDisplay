import React, { useState, ChangeEvent, FormEvent } from 'react';
import axios from 'axios';
import CustomInput from "../components/CustomInput.tsx"; // Correct path as per your instruction

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

// Define the Event interface similar to how Info is defined,
// but adjusted for Event's attributes and including an array for image URLs
interface Event {
    title: string;
    descript: string;
    dateOf: string; // Assuming ISO format date string
    startTime?: string;
    location?: string;
    responsible?: string;
    note?: string;
    other?: string;
    imageUrls: string[]; // Now using an array for image URLs similar to Info
}

const AddEvent: React.FC = () => {
    const [event, setEvent] = useState<Event>({
        title: '',
        descript: '',
        dateOf: '',
        startTime: '',
        location: '',
        responsible: '',
        note: '',
        other: '',
        imageUrls: Array(4).fill(''), // Initialize with empty strings for up to 4 URLs
    });
    const [uploadedImages, setUploadedImages] = useState<File[]>([]);

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setEvent(prev => ({ ...prev, [name]: value }));
    };

    const handleImageUrlChange = (index: number) => (e: ChangeEvent<HTMLInputElement>) => {
        const newImageUrls = [...event.imageUrls];
        newImageUrls[index] = e.target.value;
        setEvent(prev => ({ ...prev, imageUrls: newImageUrls }));
    };

    const handleImageFileChange = (index: number) => (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            const newFiles = [...uploadedImages];
            newFiles[index] = e.target.files[0];
            setUploadedImages(newFiles);
        }
    };

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('event', JSON.stringify(event));
        uploadedImages.forEach(file => {
            if (file) {
                formData.append(`imageFiles`, file);
            }
        });

        try {
            await axios.post(`${API_BASE_URL}/api/event/`, formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
            });
            alert('Event added successfully!');
            // Optionally reset the form here
            setEvent({
                title: '',
                descript: '',
                dateOf: '',
                startTime: '',
                location: '',
                responsible: '',
                note: '',
                other: '',
                imageUrls: Array(4).fill(''),
            });
            setUploadedImages([]);
        } catch (error) {
            console.error('Failed to add event.', error);
            alert('Failed to add event. Please try again.');
        }
    };

    return (
        <div className="form-container">
            <form onSubmit={handleSubmit}>
                <div className="form-group add-product-form">
                    {/* Include CustomInput for each field */}
                    <CustomInput type="text" name="title" value={event.title} onChange={handleChange}
                                 placeholder="Titel på event"/>
                    <CustomInput type="text" name="descript" value={event.descript} onChange={handleChange}
                                 placeholder="Beskrivning"/>
                    <input type="date" name="dateOf" value={event.dateOf} onChange={handleChange}/>
                    <input type="time" name="startTime" value={event.startTime} onChange={handleChange}/>
                    <CustomInput type="text" name="location" value={event.location} onChange={handleChange}
                                 placeholder="Location (Optional)"/>
                    <CustomInput type="text" name="responsible" value={event.responsible} onChange={handleChange}
                                 placeholder="In charge (Optional)"/>
                    <CustomInput type="text" name="note" value={event.note} onChange={handleChange}
                                 placeholder="Note (Optional)"/>
                    <CustomInput type="text" name="other" value={event.other} onChange={handleChange}
                                 placeholder="Other (Optional)"/>
                    {event.imageUrls.map((url, index) => (
                        <CustomInput
                            key={index}
                            type="text"
                            name={`imageUrl${index}`}
                            value={url}
                            onChange={handleImageUrlChange(index)}
                            placeholder={`Image URL ${index + 1} (Optional)`}
                        />
                    ))}
                    {Array.from({ length: 4 - event.imageUrls.filter(url => url).length }).map((_, index) => (
                        <input
                            key={index}
                            type="file"
                            onChange={handleImageFileChange(index)}
                        />
                    ))}
                    <button type="submit" className="submit-button">Add Event</button>
                </div>
            </form>
        </div>
);
};

export default AddEvent;
