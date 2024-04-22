import React, { useState } from 'react';

const LampControl: React.FC = () => {
    const [lampStatuses, setLampStatuses] = useState<{ [key: string]: string }>({});

    const esp32BaseUrl: string = 'http://192.168.175.160';

    const controlLamp = async (lampId: string, turnOn: boolean): Promise<void> => {
        const endpoint: string = turnOn ? 'turnOn' : 'turnOff';
        const url: string = `${esp32BaseUrl}/${endpoint}/${lampId}`;

        try {
            await fetch(url);
            setLampStatuses(prev => ({ ...prev, [lampId]: turnOn ? 'on' : 'off' }));
        } catch (error) {
            console.error('Error when trying to control lamp:', error);
        }
    };

    return (
        <div>
            <h2>Lamp Control</h2>
            {Array.from({ length: 9 }, (_, i) => i + 1).map(lampId => (
                <div key={lampId}>
                    <p>Lamp {lampId} Status: {lampStatuses[lampId] || 'unknown'}</p>
                    <button onClick={() => controlLamp(String(lampId), true)}>Turn On Lamp {lampId}</button>
                    <button onClick={() => controlLamp(String(lampId), false)}>Turn Off Lamp {lampId}</button>
                </div>
            ))}
        </div>
    );
};

export default LampControl;


