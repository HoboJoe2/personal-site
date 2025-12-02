'use client';

import { useState, useEffect } from 'react';
import { incrementAndGetCounterValue } from './incrementAndGetCounterValue';
import { getCounterValue } from './getCounterValue';

export function IncrementButton() {
    const [count, setCount] = useState<number>(0);

    useEffect(() => {
        Promise.resolve(getCounterValue()).then(result => {
            setCount(result);
        });
    }, []);

    const handleClick = async () => {
        const count = await incrementAndGetCounterValue();
        setCount(count);
    };

    return (
        <button onClick={handleClick}>
            {count ? "This button has been clicked " + count + " times" : "Loading..."}
        </button>
    );
}