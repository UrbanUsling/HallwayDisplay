import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { fetchData } from './DataFetching'; // Verify the import path
import CustomInput from "../components/CustomInput"; // Verify the import path

// Define the Product interface
interface Product {
    id: number;
    title: string; // Adjust based on your actual data model
}

const DeleteProduct: React.FC = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [deleteId, setDeleteId] = useState('');

    useEffect(() => {
        // Adjust '/product' endpoint as needed
        const getProducts = async () => {
            const fetchedProducts: Product[] = await fetchData('/product');
            setProducts(fetchedProducts);
        };

        getProducts();
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

        const baseUrl = import.meta.env.VITE_API_BASE_URL;
        try {
            await axios.delete(`${baseUrl}/api/product/deleteById/${deleteId}`);
            alert('Product and associated images deleted successfully!');
            setDeleteId('');
            setProducts(products.filter(product => product.id !== Number(deleteId)));
        } catch (error) {
            console.error('Failed to delete product:', error);
            alert('Failed to delete product.');
        }
    };


    return (
        <div className="form-container">
            <ul>
                {products.map((product) => (
                    <li key={product.id}>{product.id} - {product.title}</li>
                ))}
            </ul>
            <form onSubmit={handleDelete} >
                <div className="form-group">
                    <CustomInput
                        type="text"
                        value={deleteId}
                        onChange={handleChange}
                        placeholder="Enter ID to delete"
                    />
                </div>
                <button type="submit" className="submit-button">Delete Product</button>
            </form>
        </div>
    );
};

export default DeleteProduct;
