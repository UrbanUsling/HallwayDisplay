import React, { useEffect, useState } from "react";
import ProductIcon from "../assets/Prevas-Entre-Portal-UI-assets/SVG/icon-products.svg";
import { fetchData } from "../service/DataFetching";
import OptionalField from "../components/OptionalField"; // Adjust the path to match your project structure

import Header from "../components/HeaderComponent.tsx";
import ImageCarousel from "../components/ImageCarousel.tsx";
import NavigationFooter from "../components/NavigationFooter.tsx";
import {getImageSrc} from "../../utils/imageUtils.ts"; // Default image

// Define a TypeScript interface for your product data if you're using TypeScript
interface Product {
    id: number;
    title: string;
    subtitle: string;
    customerSide: string;
    prevasSide: string;
    contact?: string;
    imageUrls: string[]; // Array of image URLs
}

const ProductScreen: React.FC = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        const fetchProducts = async () => {
            const data: Product[] = await fetchData("/product");
            setProducts(data);
        };
        fetchProducts();
    }, []);

    const handlePreviousClick = () => {
        setCurrentIndex(currentIndex === 0 ? products.length - 1 : currentIndex - 1);
    };

    const handleNextClick = () => {
        setCurrentIndex(currentIndex === products.length - 1 ? 0 : currentIndex + 1);
    };

    const renderListFromText = (text: string | undefined) => {
        return typeof text === "string"
            ? text.split(';').map((item, index) => <li key={index}>{item.trim()}</li>)
            : [];
    };

    const currentEntry = products[currentIndex] || { imageUrls: [] };
    return (
        <div className="app">
            <Header />
            <div className="subheader product-header single-side">
                <img src={ProductIcon} className='subheader-icon' alt='eventicon'/>
                <div className='subheader-title'>Våra Produkter</div>
            </div>

            <main className="content">
                {products.length > 0 ? (
                <div className="content-card">
                    <ImageCarousel imageUrls={currentEntry.imageUrls} getImageSrc={getImageSrc} />
                    <div className="content-details smaller-text">
                        <h2 className="content-name product-name">{currentEntry.title}</h2>
                        <p>{currentEntry.subtitle}</p>
                        <p><strong>Kundens insikt:</strong></p>
                        <ul>
                            {renderListFromText(currentEntry.customerSide)}
                        </ul>
                        <p><strong>Elektronikutveckling och certifiering hos Prevas:</strong></p>
                        <ul>
                        {renderListFromText(currentEntry.prevasSide)}
                        </ul>
                        <OptionalField label="Kontakt" value={currentEntry.contact} />
                    </div>
                </div>
                ) : (
                    <div className="content-empty">
                        <h2>No products available.</h2>
                        <p>Please check back later or contact support.</p>
                    </div>
                )}
            </main>
            <NavigationFooter
                items={products}
                getPreviousIndex={() => currentIndex === 0 ? products.length - 1 : currentIndex - 1}
                getNextIndex={() => currentIndex === products.length - 1 ? 0 : currentIndex + 1}
                handlePreviousClick={handlePreviousClick}
                handleNextClick={handleNextClick}
            />
        </div>
    );
};

export default ProductScreen;


