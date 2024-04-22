import React, { useState, ChangeEvent, FormEvent } from 'react';
import axios from 'axios';
import CustomInput from "../components/CustomInput.tsx"; // Ensure the path to CustomInput is correct

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

interface FAQ {
    title: string;
    info: string;
    address?: string; // corrected typo from 'adress' to 'address'
    contact?: string;
    imageUrls: string[]; // Changed to use an array for image URLs
}

const AddFaq: React.FC = () => {
    const [faq, setFaq] = useState<FAQ>({
        title: '',
        info: '',
        address: '',
        contact: '',
        imageUrls: Array(4).fill(''), // Initialize with empty strings for up to 4 URLs
    });
    const [uploadedImages, setUploadedImages] = useState<File[]>([]);

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFaq(prev => ({ ...prev, [name]: value }));
    };

    const handleImageUrlChange = (index: number) => (e: ChangeEvent<HTMLInputElement>) => {
        const newImageUrls = [...faq.imageUrls];
        newImageUrls[index] = e.target.value;
        setFaq(prev => ({ ...prev, imageUrls: newImageUrls }));
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
        formData.append('faq', JSON.stringify(faq));
        uploadedImages.forEach(file => {
            if (file) {
                formData.append('imageFiles', file); // Append each uploaded file
            }
        });

        try {
            await axios.post(`${API_BASE_URL}/api/faq/`, formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
            });
            alert('Faq added successfully!');
            // Optionally reset the form here
            setFaq({
                title: '',
                info: '',
                address: '',
                contact: '',
                imageUrls: Array(4).fill(''),
            });
            setUploadedImages([]);
        } catch (error) {
            console.error('Failed to add faq.', error);
            alert('Failed to add faq. Please try again.');
        }
    };

    return (
        <div className="form-container">
            <form onSubmit={handleSubmit} className="add-product-form">
                {/* Input fields for FAQ properties */}
                <div className="form-group">
                    <CustomInput type="text" name="title" value={faq.title} onChange={handleChange} placeholder="Titel" required />
                    <CustomInput type="text" name="info" value={faq.info} onChange={handleChange} placeholder="Info (Add ';' for new row)" required />
                    <CustomInput type="text" name="address" value={faq.address || ''} onChange={handleChange} placeholder="Address (Optional)" />
                    <CustomInput type="text" name="contact" value={faq.contact || ''} onChange={handleChange} placeholder="Contact (Optional)" />
                    {/* Dynamically generate input fields for image URLs and file uploads */}
                    {faq.imageUrls.map((url, index) => (
                        <CustomInput key={index} type="text" name={`imageUrl${index}`} value={url} onChange={e => handleImageUrlChange(index)(e)} placeholder={`Image URL ${index + 1} (Optional)`} />
                    ))}
                    {Array.from({ length: 4 - faq.imageUrls.filter(url => url).length }).map((_, index) => (
                        <input key={index} type="file" onChange={e => handleImageFileChange(index)(e)} />
                    ))}
                    <button type="submit" className="submit-button">Add Faq</button>
                </div>
            </form>
        </div>
    );
};

export default AddFaq;
