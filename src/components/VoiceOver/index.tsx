"use client";

import useVoiceOverStore from '@/stores/exampleStore';
import { useEffect, useState } from 'react';
import { faker } from "@faker-js/faker";

const VoiceOver = () => {
    const { voiceOver, stopVoiceOver } = useVoiceOverStore()

    const [borderThickness, setBorderThickness] = useState(5);

    useEffect(() => {
        const updateBorder = () => {
            const newThickness = Math.random() * 40 + 1;
            setBorderThickness(newThickness);
        };
        const interval = setInterval(updateBorder, 100);
        return () => clearInterval(interval);
    }, []);

    if (!voiceOver) return null
    return <div className='absolute left-0 top-0 h-full w-full flex justify-center items-center bg-background z-[100]' onClick={stopVoiceOver}>
        <div className='w-[700px] h-[200px] flex justify-between'>
            <div><GrowingText /></div>
            <div className='relative'>
                <div className='absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-white' style={{
                    height: 200 + borderThickness,
                    width: 200 + borderThickness,
                    borderRadius: '50%',
                    transition: 'all 0.1s',
                }} />
                <div className=' absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2  w-[165px] min-w165px h-[165px] min-h-[165px] bg-red-600 rounded-full flex justify-center items-center border-secondary'
                >
                    <div className='w-[100px]'>
                        <Mic />
                    </div>
                </div>
            </div>
        </div>
    </div>
}


const GrowingText: React.FC = () => {
    const [text, setText] = useState<string>("");
    const [words, setWords] = useState<string[]>([]);

    useEffect(() => {
        // Generate an array of random words
        const generatedWords = Array.from({ length: 20 }, () => faker.word.sample());
        setWords(generatedWords);

        let index = 0;

        const interval = setInterval(() => {
            if (index < generatedWords.length) {

                setText((prevText) => `${prevText} ${generatedWords[index]}`.trim());
                index++;
            } else {
                clearInterval(interval);
            }
        }, randInt(200,700));

        return () => clearInterval(interval);
    }, []);
    return (
        <div
            style={{
                fontSize: "28px",
                lineHeight: "1.5",
                padding: "10px",
                width: "550px",
                margin: "20px auto",
            }}
        >
            {text || "Speak now"}
        </div>
    );
};

export const Mic = () => {
    return <svg className="goxjub" focusable="false" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path fill="white" d="m12 15c1.66 0 3-1.31 3-2.97v-7.02c0-1.66-1.34-3.01-3-3.01s-3 1.34-3 3.01v7.02c0 1.66 1.34 2.97 3 2.97z"></path><path fill="white" d="m11 18.08h2v3.92h-2z"></path><path fill="white" d="m7.05 16.87c-1.27-1.33-2.05-2.83-2.05-4.87h2c0 1.45 0.56 2.42 1.47 3.38v0.32l-1.15 1.18z"></path><path fill="white" d="m12 16.93a4.97 5.25 0 0 1 -3.54 -1.55l-1.41 1.49c1.26 1.34 3.02 2.13 4.95 2.13 3.87 0 6.99-2.92 6.99-7h-1.99c0 2.92-2.24 4.93-5 4.93z"></path></svg>
}

export default VoiceOver

const randInt = (min: number, max: number) => {
    return Math.random() * (max - min) + min;
}