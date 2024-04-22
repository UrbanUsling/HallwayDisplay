import React, { useState, useEffect } from 'react';
import {fetchData} from "../service/DataFetching.ts";

// Define the Product type based on your product structure
interface Product {
    id: number;
    title: string;
    subtitle?: string;
    customerSide?: string;
    prevasSide?: string;
    contact?: string;
    image?: string;
}

// Props for the ProductsDropdown component
interface ProductsDropdownProps {
    onProductSelect: (productId: number) => void;
}

// Assuming fetchData is an async function that fetches product data from your backend
const ProductsDropdown: React.FC<ProductsDropdownProps> = ({ onProductSelect }) => {
    const [products, setProducts] = useState<Product[]>([]);

    useEffect(() => {
        const getProducts = async () => {
            // Use the correct endpoint and adjust fetchData as necessary
            const data: Product[] = await fetchData('/product');
            setProducts(data);
        };
        getProducts();
    }, []);

    // Handler for dropdown change
    const handleDropdownChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const productId = parseInt(e.target.value, 10);
        // Notify the parent component (CupboardScreen) about the product selection
        onProductSelect(productId);
    };

    return (
        <div>
            <select onChange={handleDropdownChange} defaultValue="">
                <option value="" disabled>Select a Product</option>
                <option value="">None</option>
                {/* Add this line */}
                {products.map((product) => (
                    <option key={product.id} value={product.id}>
                        {product.title} - {product.subtitle}
                    </option>
                ))}
            </select>
        </div>
    );
};

export default ProductsDropdown;
