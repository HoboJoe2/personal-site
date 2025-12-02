'use client';

import { useState, useEffect } from 'react';
import { getRandomLegend } from './getRandomLegend';

export function LegendGuessingGame() {

    const [legend, setLegend] = useState<string>('');
    const [guess, setGuess] = useState<string>('');
    const [result, setResult] = useState<string>('');

    useEffect(() => {
        getRandomLegend().then(result => setLegend(result));
    }, [result]);

    const legendName = legend ? legend.split(',')[0] : 'Loading...';
    const legendDescription = legend ? legend.split(',')[1] : 'Loading...';

    function handleClick() {
        if (guess.toLowerCase() === legendName.toLowerCase()) {
            setResult('Correct!');
        } else {
            setResult(`Incorrect! The correct answer was ${legendName}`);
        }
    }


    return (
        <div>
            <p>
                Guess the legendary Magic: The Gathering card based on its description!<br />
                Press enter or click "Submit Guess" to submit your answer.
            </p>
            <input
                className='legendGuess'
                value={guess}
                onChange={
                    e => setGuess(e.target.value)
                }
                onKeyDown={
                    e => {
                        if (e.key === 'Enter') {
                            e.preventDefault();
                            handleClick()
                        }
                    }
                }>
            </input>, {legendDescription}
            <br />
            <br />
            <button onClick={handleClick}>Submit Guess</button> {result}
        </div>
    );
}