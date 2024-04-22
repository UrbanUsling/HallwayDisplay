import { useState } from 'react';
import { useKeyboardInput } from './KeyboardContext'; // Ensure this path is correct

const Keyboard = () => {
    const [isVisible, setIsVisible] = useState(false);
    const [isCapsOn, setIsCapsOn] = useState(false);
    const [keyboardPage, setKeyboardPage] = useState(1); // 1 for first page, 2 for second
    const { appendValue, backspace } = useKeyboardInput();

    const toggleVisibility = () => setIsVisible(!isVisible);
    const toggleCapsLock = () => setIsCapsOn(!isCapsOn);

    // Define the keys for both pages of the keyboard
    const keysPage1 = [
        ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0', 'Backspace'],
        ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P', 'Å'],
        ['1 / 2', 'A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L', 'Ö', 'Ä'],
        ['Z', 'X', 'C', 'V', 'B', 'N', 'M', ',', '.', ';', ':', 'Caps'],
        ['Space']
    ];

    const keysPage2 = [
        ['#', '$', '&', '*', '(', ')', '_', '+', '=', '|', 'Backspace'],
        ['!', '@', '%', '^', '?', '/', '<', '>', '[', ']', '{', '}'],
        ['2 / 2', '-', '~', '`', "'", '"', ':', ';', '\\', '£', '½'],
        [ 'Space']
    ];

    const handleKeyPress = (key: string) => {
        switch(key) {
            case 'Space':
                appendValue(' ');
                break;
            case 'Backspace':
                backspace();
                break;
            case '1 / 2':
                setKeyboardPage(2);
                break;
            case '2 / 2':
                setKeyboardPage(1);
                break;
            case 'Caps':
                toggleCapsLock();
                break;
            default:
                appendValue(isCapsOn ? key.toUpperCase() : key.toLowerCase());
                break;
        }
    };

    // Function to render keys with caps lock consideration
    const renderKeyLabel = (key: string) => {
        if (key.match(/[a-zåäö]/i) || key === 'Caps') {
            return isCapsOn ? key.toUpperCase() : key.toLowerCase();
        }
        return key;
    };

    // Decide which keys to display based on the current page
    const currentKeys = keyboardPage === 1 ? keysPage1 : keysPage2;

    return (
        <div className="keyboard-container">
            {isVisible && (
                <div className="keyboard">
                    {currentKeys.map((row, rowIndex) => (
                        <div key={rowIndex} className="keyboard-row">
                            {row.map((key) => (
                                <button
                                    key={key}
                                    className={`key ${key === 'Space' ? 'space' : ''}`}
                                    onClick={() => handleKeyPress(key)}
                                >
                                    {renderKeyLabel(key)}
                                </button>
                            ))}
                        </div>
                    ))}
                    <button className="key close" onClick={toggleVisibility}>
                        Close
                    </button>
                </div>
            )}
            {!isVisible && (
                <button className="toggle-button" onClick={toggleVisibility}>
                    Open Keyboard
                </button>
            )}
        </div>
    );
};

export default Keyboard;

