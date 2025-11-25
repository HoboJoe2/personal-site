'use server';

import fs from 'fs/promises';
import path from 'path';

export async function downloadScryfallData() {
    const data = await fetch('https://api.scryfall.com/bulk-data')
        .then(res => res.json());

    console.log('Fetched Scryfall bulk data metadata:');
    console.log(data);

    const metadataPath = path.join(process.cwd(), 'app', 'scryfall', 'metadata.json');
    const metadataRaw = await fs.readFile(metadataPath, 'utf-8');
    const metadata = JSON.parse(metadataRaw);

    if (data.data[0].updated_at !== metadata.oracleCardsLastUpdated) {
        console.log('Downloading updated oracle cards data...');
        const res = await fetch(data.data[0].download_uri)
            .then(res => res.json());

        const cardsPath = path.join(process.cwd(), 'app', 'scryfall', 'scryfall_oracle_cards.json');
        await fs.writeFile(cardsPath, JSON.stringify(res));
    } else {
        console.log('Oracle cards data is up to date.');
    }

    metadata.oracleCardsLastUpdated = data.data[0].updated_at;
    await fs.writeFile(metadataPath, JSON.stringify(metadata, null, 2));
    console.log('Scryfall data updated successfully.');
}
