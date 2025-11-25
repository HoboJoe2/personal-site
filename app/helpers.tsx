'use server';

import fs from 'fs/promises';
import path from 'path';
import { Db, MongoClient } from 'mongodb';


async function connectToDatabase() {
    const uri = 'mongodb://db:27017';
    const client = new MongoClient(uri);
    await client.connect();
    await client.db('admin').command({ ping: 1 });
    console.log('Connected successfully to MongoDB server');
    return client.db('personal_site_db');
}


export async function downloadScryfallData() {
    const db = await connectToDatabase();
    const collection = db.collection('scryfall_data');
    const metadataCollection = db.collection('scryfall_metadata');
    const data = await fetch('https://api.scryfall.com/bulk-data')
        .then(res => res.json());

    console.log('Fetched Scryfall bulk data metadata:');
    console.log(data);



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


export async function incrementCounter() {
    const db = await connectToDatabase();
    console.log('Database connection established:', db.databaseName);
}