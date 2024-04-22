import React, {useEffect, useRef} from 'react';
import {useKeyboardInput} from './KeyboardContext';

const CustomInput: React.FC<React.InputHTMLAttributes<HTMLInputElement>> = (props) => {
    const inputRef = useRef<HTMLInputElement>(null);
    const { registerInput } = useKeyboardInput();

    useEffect(() => {
        const handleVirtualKeyboardUpdate = (newValue: string) => {
            if (inputRef.current) {
                inputRef.current.value = newValue; // Update the actual input element's value

                // Construct a synthetic event object to simulate a real input event
                const event: React.ChangeEvent<HTMLInputElement> = {
                    ...new Event('change', { bubbles: true }),
                    target: inputRef.current,
                    currentTarget: inputRef.current,
                } as unknown as React.ChangeEvent<HTMLInputElement>;

                // Manually update React's state by calling props.onChange
                props.onChange?.(event);
            }
        };

        const handleFocus = () => {
            registerInput((updateFunc) => {
                const updatedValue = updateFunc(inputRef.current?.value || '');
                handleVirtualKeyboardUpdate(updatedValue);
            });
        };

        const inputElem = inputRef.current;
        inputElem?.addEventListener('focus', handleFocus);

        return () => {
            inputElem?.removeEventListener('focus', handleFocus);
        };
    }, [registerInput, props.onChange]);

    return <input {...props} ref={inputRef} />;
};


export default CustomInput;
