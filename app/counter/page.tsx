'use client';

import { HomeButton } from "../HomeButton";
import { IncrementButton } from "./IncrementButton";

export default function Counter() {
    return (
        <>
            <HomeButton />
            <br />
            <br />
            <IncrementButton />
        </>
    );
}