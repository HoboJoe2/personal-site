'use server';

import { connectToDatabase } from '../lib/connectToDatabase';

export async function getRandomLegend(): Promise<string> {
    const db = await connectToDatabase();
    const scryfallCollection = db.collection('scryfall_data');
    const legend = await scryfallCollection.aggregate([
        {
            $match: {
                type_line: { $regex: 'Legendary' },
                games: { $in: ['paper'] },
                name: { $regex: ',' }
            },
        },
        {
            $sample: { size: 1 }
        },
        { $project: { name: 1, _id: 0 } }
    ]).toArray().then(result => result[0]);
    return legend ? legend.name : 'Search Failed';
}