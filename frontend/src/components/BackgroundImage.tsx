// BackgroundImage.js

// Background.tsx
import React, {ReactNode} from 'react';

interface BackgroundProps {
    imageUrl: string;
    children?: ReactNode;
}

const Background: React.FC<BackgroundProps> = ({ imageUrl, children }) => {
    return (
        <div className="background-image-container" style={{
            backgroundImage: `url(${imageUrl})`,

        }}>
            {children}
        </div>
    );
};

export default Background;
