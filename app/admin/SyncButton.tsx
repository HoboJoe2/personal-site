'use client';

import { syncScryfallData } from './syncScryfallData';

export function SyncButton() {
    const handleClick = async () => {
        const result = await syncScryfallData();
        alert(result);
    };

    return (
        <button onClick={handleClick}>
            Sync Scryfall Data
        </button>
    );
}