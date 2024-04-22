// CupboardScreen.tsx

import React, { useState, useEffect } from 'react';
import ProductsDropdown from "../components/ProductsDropdown";
import {
    fetchLayoutConfig,
    saveLayoutConfig,
} from '../service/layoutConfigService';
import Card from '../components/Card';

interface CardLayout {
    id: number;
    type: 'single' | 'half' | 'third' | 'full';
    productId?: number | null;
}
export type CardSizeType = 'single' | 'half' | 'third' | 'full';
interface LayoutConfig {
    cardNumber: number;
    cardSize: 'single' | 'half' | 'third' | 'full';
    rowNr: number;
    productId?: number | null;
}// Define the shape of the data as it's fetched from the backend.

export interface RowLayout {
    rowId: string;
    cards: CardLayout[];
}

type RowLayoutsArray = RowLayout[];

interface SelectedCardState {
    rowId: string;
    cardIndex: number;
}

interface RowLayoutsState {
    [key: string]: string;
}

export const layoutToCardTypes: Record<string, CardSizeType[]> = {
    fourSingles: ['single', 'single', 'single', 'single'],
    twoHalfs: ['half', 'half'],
    full: ['full'],
    thirdAndSingle: ['third', 'single'],
    singleThreeQuarters:['single', 'third'],
    singleHalfSingle:['single', 'half', 'single'],
    twoSinglesAndHalf:['single', 'single', 'half'],
    halfAndTwoSingles:['half', 'single', 'single'],
};



const CupboardScreen: React.FC = () => {
    const defaultRowLayout: RowLayoutsState = {
        row1: 'fourSingles',
        row2: 'fourSingles',
        row3: 'fourSingles',
        row4: 'fourSingles',
    };



    const [selectedCard, setSelectedCard] = useState<SelectedCardState | null>(null);

    const [rowLayouts, setRowLayouts] = useState<RowLayoutsState>(defaultRowLayout);
    const generateDefaultRowLayout = (): RowLayout[] => {
        return Object.keys(defaultRowLayout).map(rowId => ({
            rowId,
            cards: new Array(4).fill(null).map((_, index) => ({
                id: index,
                type: 'single',
                productId: undefined
            })),
        }));
    };
    const [layout, setLayout] = useState<RowLayout[]>(generateDefaultRowLayout());


    useEffect(() => {
        const initLayout = async () => {
            const fetchedConfigs = await fetchLayoutConfig();
            if (fetchedConfigs.length > 0) {
                // Convert fetched configurations to the RowLayout[] structure
                const newLayout: RowLayoutsArray = fetchedConfigs.reduce((acc: RowLayoutsArray, config) => {
                    // Get or initialize the row
                    let row = acc.find(r => r.rowId === `row${config.rowNr}`);
                    if (!row) {
                        row = { rowId: `row${config.rowNr}`, cards: [] };
                        acc.push(row);
                    }

                    // Add the card to the row
                    row.cards[config.cardNumber] = {
                        id: config.cardNumber,
                        type: config.cardSize,
                        productId: config.productId
                    };

                    return acc;
                }, []);

                // Now set the new layout
                setLayout(newLayout);

                // Update the rowLayouts state to match the fetched configuration
                const newRowLayouts = newLayout.reduce((acc: RowLayoutsState, row) => {
                    // Determine the layout type based on the cards in the row
                    const cardTypes = row.cards.map(card => card.type);
                    const layoutKey = Object.keys(layoutToCardTypes).find(key =>
                        layoutToCardTypes[key].toString() === cardTypes.toString()
                    );

                    acc[row.rowId] = layoutKey || 'fourSingles';
                    return acc;
                }, {});

                setRowLayouts(newRowLayouts);
            }
        };

        initLayout();
    }, []);




    const handleLayoutChange = (rowId: string, newLayout: string) => {
        setRowLayouts(prev => ({
            ...prev,
            [rowId]: newLayout
        }));
    };
    const transformLayoutToLayoutConfigs = (layout: RowLayout[]): LayoutConfig[] => {
        return layout.flatMap((row, rowIndex) => {
            const layoutType = rowLayouts[row.rowId];
            const cardTypes = layoutToCardTypes[layoutType];

            return cardTypes.map((type, cardIndex): LayoutConfig => ({
                cardNumber: cardIndex,
                cardSize: type as CardSizeType, // Type assertion here
                rowNr: rowIndex + 1,
                productId: row.cards[cardIndex]?.productId || null,
            }));
        });
    };



    const renderLayoutSelection = (rowId: string) => {
        return (
            <select
                value={rowLayouts[rowId]}
                onChange={(e) => handleLayoutChange(rowId, e.target.value)}
            >
                {Object.entries(layoutToCardTypes).map(([key]) => (
                    <option key={key} value={key}>{key}</option>
                ))}
            </select>
        );
    };

    const onProductSelect = (productId: number | null) => {
        console.log(`Vald produkt-ID: ${productId}`);
        if (selectedCard !== null) {
            setLayout(prevLayout => {
                const newLayout = [...prevLayout];
                const selectedRow = newLayout.find(row => row.rowId === selectedCard.rowId);
                if (selectedRow) {
                    const cardToUpdate = selectedRow.cards[selectedCard.cardIndex];
                    if (cardToUpdate) {
                        // Set or clear the product ID on the card based on the selection
                        cardToUpdate.productId = productId;
                    }
                }
                return newLayout;
            });
        }
    };




    const handleSaveLayout = async () => {
        try {
            const layoutConfigs = transformLayoutToLayoutConfigs(layout);
            await saveLayoutConfig(layoutConfigs);
            alert('Layout saved successfully!');
        } catch (error) {
            console.error('Error saving layout:', error);
            alert('Failed to save layout.');
        }
    };

    const renderRow = (row: RowLayout, rowIndex: number) => {
        const layoutType = rowLayouts[row.rowId];
        const cardTypes = layoutToCardTypes[layoutType] || ['single', 'single', 'single', 'single'];

        return (
            <div className="cupboardbox-row" key={row.rowId}>
                {renderLayoutSelection(row.rowId)}
                {cardTypes.map((type: string, cardIndex: number) => {
                    const cardId = rowIndex * 4 + cardIndex; // This will give a unique ID to each card across all rows
                    return (
                        <Card
                            key={`${row.rowId}-${cardId}`}
                            size={type as 'single' | 'half' | 'third' | 'full'}
                            onClick={() => setSelectedCard({ rowId: row.rowId, cardIndex: cardIndex })}
                            selected={selectedCard !== null && selectedCard.rowId === row.rowId && selectedCard.cardIndex === cardIndex}
                            productTitle={row.cards[cardIndex]?.productId ? `Product ${row.cards[cardIndex].productId}` : undefined}
                            // Add other props as needed
                        />
                    );
                })}
            </div>
        );
    };

    return (
        <div className="">
            <header className="cupboard-header">
                <ProductsDropdown onProductSelect={onProductSelect}/>
                <button onClick={handleSaveLayout}>Save Layout</button>
            </header>


            <div className="cupboardbox-container">
                    {layout.map((row, index) => renderRow(row, index))}
                </div>


        </div>
    );
};

export default CupboardScreen;



