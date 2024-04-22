import React, { useState, ChangeEvent, FormEvent } from 'react';
import axios from 'axios';
import CustomInput from "../components/CustomInput.tsx"; // Verify the path is correct

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

interface Lab {
    title: string;
    info: string;
    contact?: string;
    imageUrls: string[]; // Changed to use an array for image URLs
}

const AddLab: React.FC = () => {
    const [lab, setLab] = useState<Lab>({
        title: '',
        info: '',
        contact: '',
        imageUrls: Array(4).fill(''), // Initialize with empty strings for up to 4 URLs
    });
    const [uploadedImages, setUploadedImages] = useState<File[]>([]);

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setLab(prev => ({ ...prev, [name]: value }));
    };

    const handleImageUrlChange = (index: number) => (e: ChangeEvent<HTMLInputElement>) => {
        const newImageUrls = [...lab.imageUrls];
        newImageUrls[index] = e.target.value;
        setLab(prev => ({ ...prev, imageUrls: newImageUrls }));
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
        formData.append('lab', JSON.stringify(lab));
        uploadedImages.forEach(file => {
            if (file) {
                formData.append('imageFiles', file); // Append each uploaded file
            }
        });

        try {
            await axios.post(`${API_BASE_URL}/api/labb/`, formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
            });
            alert('Lab added successfully!');
            // Optionally reset the form here
            setLab({
                title: '',
                info: '',
                contact: '',
                imageUrls: Array(4).fill(''),
            });
            setUploadedImages([]);
        } catch (error) {
            console.error('Failed to add lab.', error);
            alert('Failed to add lab. Please try again.');
        }
    };

    return (
        <div className="form-container">
            <form onSubmit={handleSubmit} className="add-product-form">
                {/* Input fields for Lab properties */}
                <div className="form-group">
                    <CustomInput type="text" name="title" value={lab.title} onChange={handleChange} placeholder="Title" required />
                    <CustomInput type="text" name="info" value={lab.info} onChange={handleChange} placeholder="Info" required />
                    <CustomInput type="text" name="contact" value={lab.contact || ''} onChange={handleChange} placeholder="Contact (Optional)" />
                    {/* Dynamically generate input fields for image URLs and file uploads */}
                    {lab.imageUrls.map((url, index) => (
                        <CustomInput key={index} type="text" name={`imageUrl${index}`} value={url} onChange={e => handleImageUrlChange(index)(e)} placeholder={`Image URL ${index + 1} (Optional)`} />
                    ))}
                    {Array.from({ length: 4 - lab.imageUrls.filter(url => url).length }).map((_, index) => (
                        <input key={index} type="file" onChange={e => handleImageFileChange(index)(e)} />
                    ))}
                    <button type="submit" className="submit-button">Add Lab</button>
                </div>
            </form>
        </div>
    );
};

export default AddLab;
