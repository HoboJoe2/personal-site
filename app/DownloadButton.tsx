'use client';
import { downloadScryfallData } from './helpers';

export function DownloadButton() {
    const handleClick = async () => {
        await downloadScryfallData();
    };

    return (
        <button onClick={handleClick}>
            Download Scryfall Data
        </button>
    );
}