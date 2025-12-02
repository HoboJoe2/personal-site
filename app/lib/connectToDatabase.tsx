'use server';

import { MongoClient } from 'mongodb';

export async function connectToDatabase() {
    const client = new MongoClient('mongodb://db:27017');
    await client.connect();
    return client.db('personal_site_db');
}