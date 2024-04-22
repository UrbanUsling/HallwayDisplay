import React from 'react';

interface OptionalFieldProps {
    label: string;
    value?: string | null; // Make value optional and allow for null
}

const OptionalField: React.FC<OptionalFieldProps> = ({ label, value }) => {
    if (!value) return null; // Don't render anything if the value is not provided or empty

    return (
        <p><strong>{label}:</strong> {value}</p>
    );
};

export default OptionalField;
