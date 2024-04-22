// src/utils/imageUtils.ts

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL; // Ensure this is defined or imported correctly
const DEFAULT_IMAGE = '../assets/Prevas-image.png'; // Adjust this path to your default image

export const getImageSrc = (imagePath: string | undefined): string => {
    if (!imagePath) {
        return DEFAULT_IMAGE;
    } else if (imagePath.startsWith('http')) {
        return imagePath;
    } else {
        console.log(`${API_BASE_URL}/resources/${imagePath}`);
        return `${API_BASE_URL}/resources/${imagePath}`;
    }
};
