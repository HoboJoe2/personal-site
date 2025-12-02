'use client';

import { HomeButton } from "../HomeButton";

export default function About() {
    return (
        <>
            <HomeButton />
            <p>
                This is a personal website by me (Joe Dickson)<br />
                I built it mostly to practice coding and to see how hosting a website works<br />
                It's still a work in progress, but it does include a fun little game about guessing magic the gathering cards :)<br />
                <br />
                If you want to get in contact with me yell really loudly out the nearest window, and if I happen to be nearby I'll respond.<br />
                Or hit me up on <a href="https://www.linkedin.com/in/joe-dickson-a3885523b/">linkedin</a> / <a href="mailto:joedickson4556@gmail.com">joedickson4556@gmail.com</a>
            </p>
        </>
    );
}