import axios from 'axios';

// Base URL for your API
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const fetchData = async (endpoint: any) => {
    const url = `${API_BASE_URL}/api${endpoint}`; // Build the full URL dynamically

    try {
        const response = await axios.get(url);
        return response.data;
    } catch (error) {
        console.error(`There was an error fetching data from ${endpoint}:`, error);
        return [];
    }
};
