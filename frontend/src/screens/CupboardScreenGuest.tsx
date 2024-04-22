import React, { useState, useEffect } from 'react';
import ProductDetailScreen from './ProductDetailScreen';
import monter from '../assets/Prevas-Entre-Portal-UI-assets/SVG/Montern-head-text.svg';
import Prevas from '../assets/Prevas-Entre-Portal-UI-assets/SVG/Logo-Head-Prevas-Stockholm.svg';
import Home from "../assets/Prevas-Entre-Portal-UI-assets/SVG/icon-Home.svg";
import {Link} from "react-router-dom";
import PrevasImage from '../assets/Prevas-image.png'; // Default image

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

interface Product {
    id: number;
    title: string;
    subtitle: string;
    customerSide: string;
    prevasSide: string;
    contact?: string;
    imageUrls: string[];
}



const CupboardScreenGuest = () => {
    const [rowLayouts, setRowLayouts] = useState<any[]>([]);
    const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
    const [products, setProducts] = useState<Product[]>([]);

    const [showDetailModal, setShowDetailModal] = useState(false);




    const getImageSrc = (imagePath: string) => {
        if (!imagePath) {
            return PrevasImage; // Use default image if none provided
        } else if (imagePath.startsWith('http')) {
            return imagePath; // Return the full URL if it's already a complete URL
        } else {
            // Log and return the full path if it's a relative path
            console.log(`${API_BASE_URL}/resources/${imagePath}`);
            return `${API_BASE_URL}/resources/${imagePath}`;
        }
    };

    useEffect(() => {
        const fetchLayoutAndProducts = async () => {
            const layoutResponse = await fetch(`${API_BASE_URL}/api/layoutConfig`);
            const layoutConfigs = await layoutResponse.json();

            const productsResponse = await fetch(`${API_BASE_URL}/api/product`);
            let fetchedProducts = await productsResponse.json();

            // Assuming fetchedProducts might have an image property that needs to be processed
            fetchedProducts = fetchedProducts.map((product: { imageUrls: string[]; }) => ({
                ...product,
                imageUrls: product.imageUrls.map((url: string) => getImageSrc(url))
            }));
            setProducts(fetchedProducts);

            const rows = layoutConfigs.reduce((acc: { [x: string]: { cards: { key: string; size: any; product: any; }[]; }; }, config: { rowNr: any; cardNumber: any; cardSize: any; productId: any; }) => {
                const rowKey = `row-${config.rowNr}`;
                if (!acc[rowKey]) {
                    acc[rowKey] = { rowNr: config.rowNr, cards: [] };
                }
                acc[rowKey].cards.push({
                    key: `${rowKey}-card-${config.cardNumber}`,
                    size: config.cardSize,
                    product: fetchedProducts.find((product: { id: any; }) => product.id === config.productId)
                });
                return acc;
            }, {});

            setRowLayouts(Object.values(rows));
        };

        fetchLayoutAndProducts();
    }, []);
    const handleCardClick = async (product: Product) => {
        console.log("Product clicked:", product);

        // Only attempt to toggle the lamp if a productId exists
        /*if (product.id) {
            try {
                const lampUrl = import.meta.env.VITE_API_LAMP_URL;
                // Making a GET request to the lamp URL to toggle it
                const response = await fetch(`${lampUrl}/toggle/0`, { method: 'GET' });
                if (response.ok) {
                    console.log('Lamp toggle request sent successfully.');
                } else {
                    console.error('Lamp toggle request failed:', response.status);
                }
            } catch (error) {
                console.error('Failed to send lamp toggle request:', error);
            }
        }*/

        setSelectedProduct(product);
        setShowDetailModal(true);
        // Reset image index each time a new product is clicked
        toggleDetailModal();
    };

    const toggleDetailModal = async () => {
        // If we're going to hide the modal, send the lamp off request
        /*if (showDetailModal) {
            try {
                const lampUrl = import.meta.env.VITE_API_LAMP_URL;
                // Adjust the endpoint if needed to turn off the lamp
                const response = await fetch(`${lampUrl}/toggle/0`, { method: 'GET' });
                if (response.ok) {
                    console.log('Lamp off request sent successfully.');
                } else {
                    console.error('Lamp off request failed:', response.status);
                }
            } catch (error) {
                console.error('Failed to send lamp off request:', error);
            }
        }*/

        // Toggle the modal visibility
        setShowDetailModal(!showDetailModal);
    };


    const renderRow = (row: any) => {
        return (
            <div className="cupboard-row" key={`row-${row.rowNr}`}>
                {row.cards.map((card: any, index: number) => (
                    <div key={card.key} className={`white-card ${card.size}-card ${index === 2 ? 'third-card' : ''}`} onClick={() => handleCardClick(card.product)}>

                    {card.product?.imageUrls?.[0] ? (
                        <>

                        <img src={card.product.imageUrls[0]} alt={card.product.title} className="product-image"/>
                        <div className="card-title">{card.product.title}</div>
                        </>
                        ):null}
                    </div>
                ))}
            </div>
        );
    };

    return (
        <div className="guest-cupboard-app" style={{ minHeight: '100vh' }}>
            <header className="cupboard-guest-header">
                <img src={Prevas} className='header-text' alt='Prevas'/>
                <img src={monter} className="cupboard-text" alt='Monter'/>
                <Link className='header-icon' to="/"><img src={Home} alt='Home'/></Link>
            </header>
            <div className="guest-cupboard-cards">
                {rowLayouts.map(renderRow)}
                {selectedProduct && showDetailModal && (
                    <ProductDetailScreen
                        product={selectedProduct}
                        onClose={() => toggleDetailModal()}
                    />
                )}

            </div>
        </div>
    );
};

export default CupboardScreenGuest;
