import React from 'react';

interface CardProps {
    size: 'single' | 'half' | 'third' | 'full'; // Corresponds to the card size/type
    onClick: () => void; // Function to call when the card is clicked
    selected?: boolean; // Indicates if the card is currently selected
    productTitle?: string; // Optional title of the product associated with this card
    imageSrc?: string; // Optional image source for the product's image
}

const Card: React.FC<CardProps> = ({ size, onClick, selected, productTitle, imageSrc }) => {
    // Determine the class names to apply based on the card's size and selection status
    const cardClass = `cupboardbox-card cupboardbox-card-${size} ${selected ? 'cupboardbox-card-selected' : ''}`;

    return (
        <div className={cardClass} onClick={onClick}>
            {imageSrc && (
                <img src={imageSrc} alt={productTitle || 'Product image'} className="cupboardbox-card-image" />
            )}
            {productTitle && <div className="cupboardbox-card-title">{productTitle}</div>}
            {/* Optionally, render additional product details here */}
        </div>
    );
};

export default Card;
