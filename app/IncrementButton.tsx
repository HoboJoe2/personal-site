'use client';

import { incrementCounter } from "./helpers";

export function IncrementButton() {
    const handleClick = async () => {
        await incrementCounter();
    };

    return (
        <button onClick={handleClick}>
            Increment DB Counter
        </button>
    );
}