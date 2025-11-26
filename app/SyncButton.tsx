'use client';

import { syncScryfallData } from './helpers';

export function SyncButton() {
    const handleClick = async () => {
        await syncScryfallData();
    };

    return (
        <button onClick={handleClick}>
            Sync Scryfall Data
        </button>
    );
}