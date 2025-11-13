'use client';
import path from 'path';
import fs from 'fs/promises';
import { downloadScryfallData } from './helpers';

export function DownloadButton() {
  const handleClick = async () => {
    await downloadScryfallData();
  };

  return (
    <button onClick={handleClick}>
      Download Scryfall Data
    </button>
  );
}

export async function LegendGuessingGame() {
  const cardsPath = path.join(process.cwd(), 'app', 'scryfall', 'scryfall_oracle_cards.json');
  const cardsRaw = await fs.readFile(cardsPath, 'utf-8');
  const cards = JSON.parse(cardsRaw);
  for (let card in cards) {
    console.log(card);
  }
  return (
    <div>
      <h2>Legend Guessing Game</h2>
      <p>Guess the legendary creature based on its description!</p>
      {/* Game implementation goes here */}
    </div>
  );
}

export default function Home() {
  return (
    <>
      <p>This is the home page!</p>
      <DownloadButton />
      <LegendGuessingGame />
    </>
  );
}
