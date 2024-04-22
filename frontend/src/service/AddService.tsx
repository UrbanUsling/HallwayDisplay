import React, { useState, ChangeEvent, FormEvent } from 'react';
import axios from 'axios';
import CustomInput from "../components/CustomInput.tsx"; // Verify the path is correct

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

interface Service {
    title: string;
    info: string;
    address?: string;
    contact?: string;
    imageUrls: string[]; // Changed to use an array for image URLs
}

const AddService: React.FC = () => {
    const [service, setService] = useState<Service>({
        title: '',
        info: '',
        address: '',
        contact: '',
        imageUrls: Array(4).fill(''), // Initialize with empty strings for up to 4 URLs
    });
    const [uploadedImages, setUploadedImages] = useState<File[]>([]);

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setService(prev => ({ ...prev, [name]: value }));
    };

    const handleImageUrlChange = (index: number) => (e: ChangeEvent<HTMLInputElement>) => {
        const newImageUrls = [...service.imageUrls];
        newImageUrls[index] = e.target.value;
        setService(prev => ({ ...prev, imageUrls: newImageUrls }));
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
        formData.append('service', JSON.stringify(service));
        uploadedImages.forEach(file => {
            if (file) {
                formData.append('imageFiles', file); // Append each uploaded file
            }
        });

        try {
            await axios.post(`${API_BASE_URL}/api/service/`, formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
            });
            alert('Service added successfully!');
            // Optionally reset the form here
            setService({
                title: '',
                info: '',
                address: '',
                contact: '',
                imageUrls: Array(4).fill(''),
            });
            setUploadedImages([]);
        } catch (error) {
            console.error('Failed to add service.', error);
            alert('Failed to add service. Please try again.');
        }
    };

    return (
        <div className="form-container">
            <form onSubmit={handleSubmit} className="add-product-form">
                {/* CustomInput fields for service properties */}
                <div className="form-group">
                    <CustomInput type="text" name="title" value={service.title} onChange={handleChange} placeholder="Title" required />
                    <CustomInput type="text" name="info" value={service.info} onChange={handleChange} placeholder="Info. ';' för ny rad" required />
                    <CustomInput type="text" name="address" value={service.address || ''} onChange={handleChange} placeholder="Address (Optional)" />
                    <CustomInput type="text" name="contact" value={service.contact || ''} onChange={handleChange} placeholder="Contact (Optional)" />
                    {/* Dynamically generate input fields for up to 4 image URLs and file uploads */}
                    {service.imageUrls.map((url, index) => (
                        <CustomInput key={index} type="text" name={`imageUrl${index}`} value={url} onChange={e => handleImageUrlChange(index)(e)} placeholder={`Image URL ${index + 1} (Optional)`} />
                    ))}
                    {Array.from({ length: 4 - service.imageUrls.filter(url => url).length }).map((_, index) => (
                        <input key={index} type="file" onChange={e => handleImageFileChange(index)(e)} />
                    ))}
                    <button type="submit" className="submit-button">Add Service</button>
                </div>
            </form>
        </div>
    );
};

export default AddService;

