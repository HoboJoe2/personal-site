'use server';

import { connectToDatabase } from '../lib/connectToDatabase';

export async function incrementAndGetCounterValue() {
    const db = await connectToDatabase();
    const counterCollection = db.collection('counter');
    const counter = await counterCollection.findOne({});

    if (!counter) {
        await counterCollection.insertOne({ count: 1 });
        return 1
    } else {
        const newCount = counter.count + 1;
        await counterCollection.updateOne({}, { $set: { count: newCount } });
        return newCount;
    }
}