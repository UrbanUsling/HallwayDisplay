
import React, { useState, ChangeEvent, FormEvent } from 'react';
import axios from 'axios';
import CustomInput from "../components/CustomInput.tsx";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL; // Make sure this matches your environment variable

interface Product {
    title: string;
    subtitle: string;
    customerSide: string;
    prevasSide: string;
    contact?: string;
    imageUrls: string[]; // Add an array for image URLs
}

const AddProduct: React.FC = () => {
    const [product, setProduct] = useState<Product>({
        title: '',
        subtitle: '',
        customerSide: '',
        prevasSide: '',
        contact: '',
        imageUrls: Array(4).fill(''), // Initialize with empty strings for up to 4 URLs
    });
    const [uploadedImages, setUploadedImages] = useState<File[]>([]);

    // Calculate the number of non-empty image URLs
    const nonEmptyImageUrls = product.imageUrls.filter(url => url).length;

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setProduct(prev => ({ ...prev, [name]: value }));
    };

    const handleImageUrlChange = (index: number) => (e: ChangeEvent<HTMLInputElement>) => {
        const newImageUrls = [...product.imageUrls];
        newImageUrls[index] = e.target.value;
        setProduct(prev => ({ ...prev, imageUrls: newImageUrls }));
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
        formData.append('product', JSON.stringify(product));
        uploadedImages.forEach((file) => {
            if (file) {
                formData.append('imageFiles', file); // Append each uploaded file
            }
        });

        try {
            await axios.post(`${API_BASE_URL}/api/product/`, formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
            });
            alert('Product added successfully!');
            // Reset form state
            setProduct({
                title: '',
                subtitle: '',
                customerSide: '',
                prevasSide: '',
                contact: '',
                imageUrls: Array(4).fill(''),
            });
            setUploadedImages([]);
        } catch (error) {
            console.error('Failed to add product.', error);
            alert('Failed to add product.');
        }
    };
    return (
        <div className="form-container">
            <form onSubmit={handleSubmit} className="add-product-form">
                <div className="form-group">
                    <CustomInput type="text" name="title" value={product.title} onChange={handleChange} placeholder="Produktnamn"/>
                    <CustomInput type="text" name="subtitle" value={product.subtitle} onChange={handleChange} placeholder="En menings beskrivning"/>
                    <CustomInput type="text" name="customerSide" value={product.customerSide} onChange={handleChange} placeholder="Kundens perspektiv. ';' ger ny rad" />
                    <CustomInput type="text" name="prevasSide" value={product.prevasSide} onChange={handleChange} placeholder="Prevas perspektiv. ';' ger ny rad"/>
                    <CustomInput type="text" name="contact" value={product.contact || ''} onChange={handleChange} placeholder="Contact (Optional)"/>

                    {product.imageUrls.slice(0, 4 - uploadedImages.length).map((url, index) => (
                        <CustomInput
                            key={index}
                            type="text"
                            name={`imageUrl${index}`}
                            value={url}
                            onChange={handleImageUrlChange(index)}
                            placeholder={`Image URL ${index + 1} (Optional)`}
                        />
                    ))}

                    {/* Image file inputs */}
                    {Array.from({ length: 4 - nonEmptyImageUrls }).map((_, index) => (
                        <input
                            key={index}
                            type="file"
                            onChange={handleImageFileChange(index)}
                        />
                    ))}

                    <button type="submit" className="submit-button">Add Product</button>
                </div>
            </form>
        </div>
    );
};

export default AddProduct;
