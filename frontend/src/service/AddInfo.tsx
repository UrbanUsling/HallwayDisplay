import React, { useState, ChangeEvent, FormEvent } from 'react';
import axios from 'axios';
import CustomInput from "../components/CustomInput"; // Verify this path is correct

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

interface Info {
    full_name: string;
    email: string;
    title: string;
    phone?: string;
    department?: string;
    location?: string;
    workArea?: string;
    manager?: string;
    imageUrls: string[]; // Use an array for image URLs
}

const AddInfo: React.FC = () => {
    const [info, setInfo] = useState<Info>({
        full_name: '',
        email: '',
        title: '',
        phone: '',
        department: '',
        location: '',
        workArea: '',
        manager: '',
        imageUrls: Array(4).fill(''), // Initialize with empty strings for up to 4 URLs
    });
    const [uploadedImages, setUploadedImages] = useState<File[]>([]);

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setInfo(prev => ({ ...prev, [name]: value }));
    };

    const handleImageUrlChange = (index: number) => (e: ChangeEvent<HTMLInputElement>) => {
        const newImageUrls = [...info.imageUrls];
        newImageUrls[index] = e.target.value;
        setInfo(prev => ({ ...prev, imageUrls: newImageUrls }));
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
        formData.append('info', JSON.stringify(info));
        uploadedImages.forEach(file => {
            if (file) {
                formData.append('imageFiles', file);
            }
        });

        try {
            await axios.post(`${API_BASE_URL}/api/info/`, formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
            });
            alert('Info added successfully!');
            // Reset form state here if desired
        } catch (error) {
            console.error('Failed to add info.', error);
            alert('Failed to add info. Please try again.');
        }
    };

    return (
        <div className="form-container">
            <form onSubmit={handleSubmit} className="add-product-form">
                {/* CustomInput fields for info properties */}
                <div className="form-group">
                    <CustomInput type="text" name="full_name" value={info.full_name} onChange={handleChange}
                                 placeholder="Fullständigt namn" required/>
                    <CustomInput type="email" name="email" value={info.email} onChange={handleChange}
                                 placeholder="Email" required/>
                    <CustomInput type="text" name="title" value={info.title} onChange={handleChange} placeholder="Jobbtitel"
                                 required/>
                    <CustomInput type="text" name="phone" value={info.phone || ''} onChange={handleChange}
                                 placeholder="Telefon (Optional)"/>
                    <CustomInput type="text" name="department" value={info.department || ''} onChange={handleChange}
                                 placeholder="Avdelning (Optional)"/>
                    <CustomInput type="text" name="location" value={info.location || ''} onChange={handleChange}
                                 placeholder="Ort (Optional)"/>
                    <CustomInput type="text" name="workArea" value={info.workArea || ''} onChange={handleChange}
                                 placeholder="Arbetsyta på kontorskartan. Skriv bara siffran (Optional)"/>
                    <CustomInput type="text" name="manager" value={info.manager || ''} onChange={handleChange}
                                 placeholder="Manager (Optional)"/>

                    {/* Similar to AddProduct, dynamically generate input fields for image URLs and files */}
                    {info.imageUrls.slice(0, 4 - uploadedImages.length).map((url, index) => (
                        <CustomInput
                            key={index}
                            type="text"
                            name={`imageUrl${index}`}
                            value={url}
                            onChange={handleImageUrlChange(index)}
                            placeholder={`Image URL ${index + 1} (Optional)`}
                        />
                    ))}

                    {Array.from({length: 4 - info.imageUrls.filter(url => url).length}).map((_, index) => (
                        <input
                            key={index}
                            type="file"
                            onChange={handleImageFileChange(index)}
                        />
                    ))}

                    <button type="submit" className="submit-button">Add Info</button>
                </div>
            </form>
        </div>
);
};

export default AddInfo;


