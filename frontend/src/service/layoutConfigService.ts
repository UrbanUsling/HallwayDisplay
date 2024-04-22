import axios from 'axios';
import { fetchData } from './DataFetching'; // Adjust the path as necessary

// Assuming `API_BASE_URL` is defined in your DataFetching module or environment
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
// Define the CardLayout interface


type CardSizeType = 'single' | 'half' | 'third' | 'full';
export interface FetchedLayoutConfig {
    cardNumber: number;
    cardSize: CardSizeType;
    rowNr: number;
    productId: number | null;
}
export interface LayoutConfig {
    cardNumber: number;
    cardSize: 'single' | 'half' | 'third' | 'full';
    rowNr: number;
    // Ensure productId's type is consistent with your backend expectations.
    // If your backend expects a `null` for no product, include `null` in the type union.
    productId?: number | null; // or just `productId?: number;` if null is not needed
}
// Fetch the layout configuration
export const fetchLayoutConfig = async (): Promise<FetchedLayoutConfig[]> => {
    try {
        console.log("Fetching layout configuration...");
        const response = await fetchData('/layoutConfig');
        if (Array.isArray(response)) {
            console.log("Layout configuration fetched successfully:", response);
            return response.map(item => ({
                cardNumber: item.cardNumber,
                cardSize: item.cardSize as CardSizeType,
                rowNr: item.rowNr,
                productId: item.productId || null,
            }));
        } else {
            throw new Error('Response is not an array');
        }
    } catch (error) {
        console.error("Error fetching layout configuration:", error);
        throw error; // Rethrow the error to handle it in the calling context
    }
};
export const saveLayoutConfig = async (layoutConfigs: LayoutConfig[]): Promise<any> => {
    try {
        const response = await axios.post(`${API_BASE_URL}/api/layoutConfig/batch`, layoutConfigs);
        console.log('Layout configuration saved successfully:', response.data);
        console.log('Layout configuration saved successfully:', layoutConfigs);
        return response.data;
    } catch (error) {
        console.error('There was an error saving the layout configuration:', error);
        throw error;
    }
};


