// types/react-leaflet.d.ts
declare module 'react-leaflet' {
    import { ComponentType } from 'react';
    import { MapContainerProps, TileLayerProps, MarkerProps, PopupProps } from 'leaflet';

    export const MapContainer: ComponentType<MapContainerProps>;
    export const TileLayer: ComponentType<TileLayerProps>;
    export const Marker: ComponentType<MarkerProps>;
    export const Popup: ComponentType<PopupProps>;

    // Add more exports here as needed
}
