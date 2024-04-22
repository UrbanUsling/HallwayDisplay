import React, { useState, ChangeEvent, FormEvent } from 'react';
import axios from 'axios';
import CustomInput from "../components/CustomInput.tsx"; // Ensure the path to CustomInput is correct

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

interface Business {
    title: string;
    subtitle: string;
    info: string;
    address?: string;
    contact?: string;
    imageUrls: string[]; // Assuming multiple images can be linked to a Business
}

const AddBusiness: React.FC = () => {
    const [business, setBusiness] = useState<Business>({
        title: '',
        subtitle: '',
        info: '',
        address: '',
        contact: '',
        imageUrls: Array(4).fill(''), // Initialize with empty strings for up to 4 URLs
    });
    const [uploadedImages, setUploadedImages] = useState<File[]>([]);

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setBusiness(prev => ({ ...prev, [name]: value }));
    };

    const handleImageUrlChange = (index: number) => (e: ChangeEvent<HTMLInputElement>) => {
        const newImageUrls = [...business.imageUrls];
        newImageUrls[index] = e.target.value;
        setBusiness(prev => ({ ...prev, imageUrls: newImageUrls }));
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
        formData.append('business', JSON.stringify(business));
        uploadedImages.forEach(file => {
            if (file) {
                formData.append('imageFiles', file);
            }
        });

        try {
            await axios.post(`${API_BASE_URL}/api/business/`, formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
            });
            alert('Business added successfully!');
            // Reset form state here if desired
            setBusiness({
                title: '',
                subtitle: '',
                info: '',
                address: '',
                contact: '',
                imageUrls: Array(4).fill(''), // Reset the image URLs
            });
            setUploadedImages([]); // Clear the uploaded images array
        } catch (error) {
            console.error('Failed to add business.', error);
            alert('Failed to add business. Please try again.');
        }
    };

    return (
        <div className="form-container">
            <form onSubmit={handleSubmit} className="add-product-form">
                <div className="form-group">
                    <CustomInput type="text" name="title" value={business.title} onChange={handleChange}
                                 placeholder="Titel på organisationen/företaget"/>
                    <CustomInput type="text" name="subtitle" value={business.subtitle} onChange={handleChange}
                                 placeholder="Kort subrubrik"/>
                    <CustomInput type="text" name="info" value={business.info} onChange={handleChange}
                                 placeholder="Info"/>
                    <CustomInput type="text" name="address" value={business.address || ''} onChange={handleChange}
                                 placeholder="Address (Optional)"/>
                    <CustomInput type="text" name="contact" value={business.contact || ''} onChange={handleChange}
                                 placeholder="Contact (Optional)"/>
                    {business.imageUrls.slice(0, 4 - uploadedImages.length).map((url, index) => (
                        <CustomInput
                            key={index}
                            type="text"
                            name={`imageUrl${index}`}
                            value={url}
                            onChange={handleImageUrlChange(index)}
                            placeholder={`Image URL ${index + 1} (Optional)`}
                        />
                    ))}

                    {Array.from({ length: 4 - business.imageUrls.filter(url => url).length }).map((_, index) => (
                        <input
                            key={index}
                            type="file"
                            onChange={handleImageFileChange(index)}
                        />
                    ))}
                    <button type="submit" className="submit-button">Add Business</button>
                </div>
            </form>
        </div>
);
};

export default AddBusiness;
