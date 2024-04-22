// src/Board.tsx
import React, {useEffect, useState} from 'react';
import { Tile, SymbolType } from '../../types/gameTypes.ts';
import symbol1 from '../assets/Prevas-Entre-Portal-UI-assets/PNG/Logo-Prevas-blue.png';
import symbol2 from '../assets/Prevas-Entre-Portal-UI-assets/PNG/Pic-Robot-hand-standing.png';
import symbol3 from '../assets/afinion.png';
import symbol4 from '../assets/dollars2.png';
import symbol5 from '../assets/klocka.png';
import symbol6 from '../assets/zipforce.png';

const symbols: Record<SymbolType, string> = {
    1: symbol1,
    2: symbol2,
    3: symbol3,
    4: symbol4,
    5: symbol5,
    6: symbol6,
};

const width = 8; // Number of columns
const height = 5; // Number of rows
const blank = null; // Representation for an empty spot if needed

const generateTile = (id: number): Tile => ({
    id,
    symbolType: Math.ceil(Math.random() * 6) as SymbolType,
});

const generateBoard = (): Tile[] => {
    let tiles: Tile[] = [];
    for (let i = 0; i < width * height; i++) {
        tiles.push(generateTile(i));
    }
    return tiles;
};

const Board: React.FC = () => {
    const [tiles, setTiles] = useState<Tile[]>(generateBoard());
    const [score, setScore] = useState(0);
    const [dragStartIndex, setDragStartIndex] = useState<number | null>(null);
    const [dragOverIndex, setDragOverIndex] = useState<number | null>(null);




    // Convert the flat array to a structured grid for easier manipulation
    const toGrid = (tiles: Tile[]): Tile[][] => {
        return Array.from({ length: height }, (_, i) =>
            tiles.slice(i * width, (i + 1) * width)
        );
    };

    const flattenGrid = (grid: Tile[][]): Tile[] => {
        return grid.reduce((acc, val) => acc.concat(val), []);
    };


    const checkForColumnOfThree = () => {
        let grid = toGrid(tiles);
        let madeChanges = false;

        for (let i = 0; i < width; i++) {
            for (let j = 0; j < height - 2; j++) {
                const columnOfThree = [grid[j][i], grid[j+1][i], grid[j+2][i]];
                if (columnOfThree.every(tile => tile.symbolType === columnOfThree[0].symbolType && tile.symbolType !== blank)) {
                    setScore((score) => score + 3);
                    columnOfThree.forEach(tile => {
                        // Directly assign a new random symbol
                        tile.symbolType = Math.ceil(Math.random() * 6) as SymbolType;
                    });

                    madeChanges = true;
                }
            }
        }

        if (madeChanges) {
            setTiles(flattenGrid(grid));
        }
    };

    const checkForRowOfThree = () => {
        let grid = toGrid(tiles);
        let madeChanges = false;

        for (let i = 0; i < height; i++) {
            for (let j = 0; j < width - 2; j++) {
                const rowOfFour = [grid[i][j], grid[i][j + 1], grid[i][j + 2]];
                if (rowOfFour.every(tile => tile.symbolType === rowOfFour[0].symbolType && tile.symbolType !== blank)) {
                    setScore(score => score + 3);
                    rowOfFour.forEach(tile => {
                        // Directly assign a new random symbol
                        tile.symbolType = Math.ceil(Math.random() * 6) as SymbolType;
                    });

                    madeChanges = true;
                }
            }
        }

        if (madeChanges) {
            setTiles(flattenGrid(grid));
        }
    };

    const checkForColumnOfFour = () => {
        let grid = toGrid(tiles);
        let madeChanges = false;

        for (let i = 0; i < width; i++) {
            for (let j = 0; j < height - 3; j++) {
                const columnOfFour = [grid[j][i], grid[j + 1][i], grid[j + 2][i], grid[j + 3][i]];
                if (columnOfFour.every(tile => tile.symbolType === columnOfFour[0].symbolType && tile.symbolType !== blank)) {
                    setScore(score => score + 4);
                    columnOfFour.forEach(tile => {
                        // Directly assign a new random symbol
                        tile.symbolType = Math.ceil(Math.random() * 6) as SymbolType;
                    });

                    madeChanges = true;
                }
            }
        }

        if (madeChanges) {
            setTiles(flattenGrid(grid));
        }
    };

    const checkForRowOfFour = () => {
        let grid = toGrid(tiles);
        let madeChanges = false;

        for (let i = 0; i < height; i++) {
            for (let j = 0; j < width - 3; j++) {
                const rowOfFour = [grid[i][j], grid[i][j + 1], grid[i][j + 2], grid[i][j + 3]];
                if (rowOfFour.every(tile => tile.symbolType === rowOfFour[0].symbolType && tile.symbolType !== blank)) {
                    setScore(score => score + 4);
                    rowOfFour.forEach(tile => {
                        // Directly assign a new random symbol
                        tile.symbolType = Math.ceil(Math.random() * 6) as SymbolType;
                    });

                    madeChanges = true;
                }
            }
        }

        if (madeChanges) {
            setTiles(flattenGrid(grid));
        }
    };


    const handleDragStart = (index: number) => {
        setDragStartIndex(index);
    };

    const handleDragOver = (index: number) => {
        setDragOverIndex(index);
    };


    const handleDragEnd = () => {
        if (dragStartIndex !== null && dragOverIndex !== null && dragStartIndex !== dragOverIndex) {
            // Temporarily swap tiles to check for potential matches
            const newTiles = [...tiles];
            [newTiles[dragStartIndex], newTiles[dragOverIndex]] = [newTiles[dragOverIndex], newTiles[dragStartIndex]];
            setTiles([...newTiles]);  // Immediately update the tiles to show the swap

            // Check if the swap results in a match
            setTimeout(() => {
                if (!(checkForMatches(dragStartIndex, newTiles) || checkForMatches(dragOverIndex, newTiles))) {
                    // If no match, revert the tiles
                    [newTiles[dragStartIndex], newTiles[dragOverIndex]] = [newTiles[dragOverIndex], newTiles[dragStartIndex]];
                    setTiles([...newTiles]);  // Immediately revert the tiles if no match
                }
            }, 500);  // Delay should match the CSS transition time for the swap animation
        }

        // Reset indices
        setDragStartIndex(null);
        setDragOverIndex(null);
    };


    const checkForMatches = (index: number, tiles: Tile[]): boolean => {
        const row = Math.floor(index / width);
        const col = index % width;

        // Horizontal and vertical checks
        return checkLineMatch(row, col, tiles, 'horizontal') || checkLineMatch(row, col, tiles, 'vertical');
    };

    const checkLineMatch = (row: number, col: number, tiles: Tile[], direction: 'horizontal' | 'vertical'): boolean => {
        const lineTiles: Tile[] = [];

        if (direction === 'horizontal') {
            for (let i = Math.max(col - 2, 0); i <= Math.min(col + 2, width - 1); i++) {
                lineTiles.push(tiles[row * width + i]);
            }
        } else {
            for (let i = Math.max(row - 2, 0); i <= Math.min(row + 2, height - 1); i++) {
                lineTiles.push(tiles[i * width + col]);
            }
        }

        // Use regex to find three or more consecutive identical symbols in a row
        const matchGroups = lineTiles.map(t => t.symbolType).join('').match(/(\d)\1{2,}/);
        return !!matchGroups; // Convert to boolean: true if a match group exists, otherwise false
    };


    const fillEmptySquares = () => {
        let grid = toGrid(tiles);
        let modified = false;

        for (let row = height - 1; row >= 0; row--) {
            for (let col = 0; col < width; col++) {
                if (row === 0 && grid[row][col].symbolType === blank) { // top row special handling
                    grid[row][col].symbolType = Math.ceil(Math.random() * 6) as SymbolType;
                    modified = true;
                } else if (grid[row][col].symbolType === blank) {
                    grid[row][col].symbolType = grid[row - 1][col].symbolType;
                    grid[row - 1][col].symbolType = blank;
                    modified = true;
                }
            }
        }

        if (modified) {
            setTiles(flattenGrid(grid));
        }
    };


    useEffect(() => {
        const gameLogic = () => {
            checkForColumnOfFour();
            checkForRowOfFour();
            checkForColumnOfThree();
            checkForRowOfThree();
            fillEmptySquares(); // New tiles are filled in after checking matches
        };

        const timer = setInterval(gameLogic, 100);
        return () => clearInterval(timer);
    }, [tiles]); // This effect depends on the `tiles` state

    return (
        <div className="game-app">
            <div className="game-board">
                {tiles.map((tile, index) => (
                    <div className="game-square" key={index}>
                        <img
                            className="game-image"
                            src={symbols[tile.symbolType]}
                            alt={`Symbol ${tile.symbolType}`}
                            draggable="true"
                            onDragStart={() => handleDragStart(index)}
                            onDragOver={(e) => e.preventDefault()} // Necessary to allow dropping
                            onDrop={() => handleDragOver(index)}
                            onDragEnd={handleDragEnd}
                        />
                    </div>
                ))}
            </div>
        </div>
    );


};

export default Board;
