'use server';

import { DownloadButton } from './DownloadButton';


export async function LegendGuessingGame() {
  return (
    <div>
      <h2>Legend Guessing Game</h2>
      <p>Guess the legendary creature based on its description!</p>
      {/* Game implementation goes here */}
    </div>
  );
}

export default async function Home() {
  return (
    <>
      <p>This is the home page!!</p>
      <DownloadButton />
      <LegendGuessingGame />
    </>
  );
}
