'use server';

import { connectToDatabase } from '../lib/connectToDatabase';

export async function getCounterValue() {
    const db = await connectToDatabase();
    const counterCollection = db.collection('counter');
    const counter = await counterCollection.findOne({});

    if (!counter) {
        return 0;
    } else {
        return counter.count;
    }
} 