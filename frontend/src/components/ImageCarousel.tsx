import React, { useState } from 'react';

interface ImageCarouselProps {
    imageUrls: string[];
    getImageSrc: (url: string) => string;
}

const ImageCarousel: React.FC<ImageCarouselProps> = ({ imageUrls, getImageSrc }) => {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [isLoading, setIsLoading] = useState(true); // State to track loading of images

    const handlePreviousImage = () => {
        setIsLoading(true); // Set loading true on image change
        setCurrentImageIndex(prevIndex => prevIndex === 0 ? imageUrls.length - 1 : prevIndex - 1);
    };

    const handleNextImage = () => {
        setIsLoading(true); // Set loading true on image change
        setCurrentImageIndex(prevIndex => (prevIndex + 1) % imageUrls.length);
    };

    const handleImageLoaded = () => {
        setIsLoading(false); // Set loading false once the image is loaded
    };

    const handleImageError = () => {
        setIsLoading(false); // Set loading false and handle error
    };

    return (
        <div className="content-image-container">
            {isLoading && <div className="loading-animation">Loading...</div>}
            {imageUrls.length > 1 && (
                <button className="carousel-arrow left-arrow" onClick={handlePreviousImage}>&lt;</button>
            )}
            <img
                className="content-image"
                src={getImageSrc(imageUrls[currentImageIndex])}
                onLoad={handleImageLoaded}
                onError={handleImageError}
                alt={`Image ${currentImageIndex + 1}`}
                style={{ display: isLoading ? 'none' : 'block' }} // Hide image while loading
            />
            {imageUrls.length > 1 && (
                <button className="carousel-arrow right-arrow" onClick={handleNextImage}>&gt;</button>
            )}
        </div>
    );
};

export default ImageCarousel;
