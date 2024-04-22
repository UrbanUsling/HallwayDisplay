import React, { createContext, useContext, useState, ReactNode, useCallback } from 'react';

interface KeyboardInputContextType {
    appendValue: (value: string) => void;
    backspace: () => void;
    clearInput: () => void;
    registerInput: (updateFunction: (update: (prev: string) => string) => void) => void;
}

const defaultState: KeyboardInputContextType = {
    appendValue: () => {},
    backspace: () => {},
    clearInput: () => {},
    registerInput: () => {},
};

const KeyboardInputContext = createContext<KeyboardInputContextType>(defaultState);

interface KeyboardInputProviderProps {
    children: ReactNode;
}

export const KeyboardInputProvider: React.FC<KeyboardInputProviderProps> = ({ children }) => {
    const [currentInputUpdateFunction, setCurrentInputUpdateFunction] = useState<(update: (prev: string) => string) => void>(() => () => {});

    // In your KeyboardInputProvider component
    const registerInput = useCallback((updateFunction: (update: (prev: string) => string) => void) => {
        setCurrentInputUpdateFunction(() => updateFunction);
    }, []);


    const appendValue = (value: string) => {
        currentInputUpdateFunction((prev) => prev + value);
    };

    const backspace = () => {
        currentInputUpdateFunction((prev) => prev.slice(0, -1));
    };

    const clearInput = () => {
        currentInputUpdateFunction(() => '');
    };

    return (
        <KeyboardInputContext.Provider value={{ appendValue, backspace, clearInput, registerInput }}>
            {children}
        </KeyboardInputContext.Provider>
    );
};

export const useKeyboardInput = () => useContext(KeyboardInputContext);

