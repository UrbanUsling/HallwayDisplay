import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { fetchData } from "../service/DataFetching"; // Adjust the import path as necessary
import Arsenal from '../assets/Arsenal.png'

interface MarkerType {
    id: number;
    geocode: [number, number];
    pop_up: string;
}

const customIcon = L.icon({
    iconUrl: Arsenal,
    iconSize: [70, 55], // Size of the icon
});

// Define a red icon for the "You are here" marker
const redIcon = L.icon({
    iconUrl: 'https://cdn-icons-png.flaticon.com/512/684/684908.png', // Example red marker URL
    iconSize: [50, 50], // Adjust size as needed
});

export const MapComponent: React.FC = () => {
    const [markers, setMarkers] = useState<MarkerType[]>([]);

    useEffect(() => {
        const loadLocations = async () => {
            // Use fetchData with the appropriate endpoint to fetch location data
            const data = await fetchData("/location"); // Adjust the endpoint as needed
            const formattedData = data.map((item: any) => ({
                id: item.id,
                geocode: [item.lat, item.lng],
                pop_up: item.pop_up,
            }));
            setMarkers(formattedData);
        };

        loadLocations();
    }, []);

    const centerPosition: [number, number] = [59.363117, 17.959755]; // Center position

    return (
        <MapContainer center={centerPosition} zoom={12} style={{ height: '100%', width: '100%' }}>
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {markers.map((marker) => (
                <Marker key={marker.id} position={marker.geocode} icon={marker.geocode[0] === centerPosition[0] && marker.geocode[1] === centerPosition[1] ? redIcon : customIcon}>
                    <Popup>{marker.pop_up}</Popup>
                </Marker>
            ))}
            {/* Add the "You are here" marker */}
            <Marker position={centerPosition} icon={redIcon}>
                <Popup>You are here</Popup>
            </Marker>
        </MapContainer>
    );
};

export default MapComponent;
