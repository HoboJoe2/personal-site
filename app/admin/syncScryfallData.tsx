'use server';

import { connectToDatabase } from '../lib/connectToDatabase';

export async function syncScryfallData() {
    const db = await connectToDatabase();
    const scryfallCollection = db.collection('scryfall_data');
    const metadataCollection = db.collection('scryfall_metadata');
    let scryfallRawMetaData = null;
    try {
        scryfallRawMetaData = await fetch('https://api.scryfall.com/bulk-data')
            .then(result => result.json());
    } catch (error) {
        return 'Error fetching Scryfall bulk data metadata.';
    }

    const dbScryfallRawMetaData = await metadataCollection.findOne({});

    if (!dbScryfallRawMetaData) {
        await metadataCollection.insertOne(scryfallRawMetaData);
        syncScryfallData();
    } else if (scryfallRawMetaData.data[0].updated_at !== (dbScryfallRawMetaData.data?.[0]?.updated_at ?? null)) {
        await metadataCollection.updateOne({}, { $set: scryfallRawMetaData });
        let newScryfallData = null;
        try {
            newScryfallData = await fetch(scryfallRawMetaData.data[0].download_uri)
                .then(result => result.json());
        }
        catch (error) {
            return 'Error fetching Scryfall data'
        }
        await scryfallCollection.deleteMany({});
        await scryfallCollection.insertMany(newScryfallData);
        return 'Scryfall data updated in database.';
    } else {
        return 'Scryfall data is already up to date. No action taken.';
    }
}