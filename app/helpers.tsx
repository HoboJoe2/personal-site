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


export async function syncScryfallData() {
    const db = await connectToDatabase();
    const scryfallCollection = db.collection('scryfall_data');
    const metadataCollection = db.collection('scryfall_metadata');
    const scryfallRawMetaData = await fetch('https://api.scryfall.com/bulk-data')
        .then(res => res.json());

    console.log('Fetched Scryfall bulk data metadata:');
    console.log(scryfallRawMetaData);

    const dbScryfallRawMetaData = await metadataCollection.findOne({});

    if (!dbScryfallRawMetaData) {
        await metadataCollection.insertOne(scryfallRawMetaData);
        console.log('Scryfall metadata inserted into database.');
    } else if (scryfallRawMetaData.data[0].updated_at !== (dbScryfallRawMetaData.data?.[0]?.updated_at ?? null)) {
        await metadataCollection.updateOne({}, { $set: scryfallRawMetaData });
        console.log('Scryfall metadata updated in database.');
        const newScryfallData = await fetch(scryfallRawMetaData.data[0].download_uri)
            .then(res => res.json());
        await scryfallCollection.deleteMany({});
        await scryfallCollection.insertMany(newScryfallData);
        console.log('Scryfall data updated in database.');
    } else {
        console.log('Scryfall data is already up to date. No action taken.');
    }
}


export async function incrementCounter() {
    const db = await connectToDatabase();
    const counterCollection = db.collection('counter');
    const counter = await counterCollection.findOne({});

    if (!counter) {
        await counterCollection.insertOne({ count: 1 });
        console.log('Counter incremented, new count:', 1);
    } else {
        const newCount = counter.count + 1;
        await counterCollection.updateOne({}, { $set: { count: newCount } });
        console.log('Counter incremented, new count:', newCount);
    }


}