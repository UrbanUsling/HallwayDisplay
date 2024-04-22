// ImageLoop.tsx
import React, { useState, useEffect } from 'react';


interface ImageLoopProps {
    images: string[]; // Array of image URLs
}

const ImageLoop: React.FC<ImageLoopProps> = ({ images }) => {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
        }, 5000); // Change image every 5 seconds

        return () => clearInterval(timer); // Clean up the interval on component unmount
    }, [images.length]);

    return (
        <div className="loop-image-container">
            {images.map((image, index) => (
                <img
                    key={image}
                    src={image}
                    alt={`Slide ${index}`}
                    className={`loop-image ${index === currentImageIndex ? 'loop-visible' : 'loop-hidden'}`}
                />
            ))}
        </div>
    );
};

export default ImageLoop;
