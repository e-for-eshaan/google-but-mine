import React from 'react'
import { randInt } from '@/utils';
import { faker } from '@faker-js/faker';


const generateRandomImageURLs = (n: number): string[] => {
    const urls: string[] = [];
    for (let i = 0; i < n; i++) {
        const randomSeed = Math.floor(Math.random() * 1000); // Generate a random seed
        urls.push(`https://picsum.photos/seed/${randomSeed}/${randInt(100, 200)}/${randInt(100, 300)}`);
    }
    return urls;
};


export default function index() {

    return (
        <div className='flex-grow h-full w-full p-6 gap-6'>
            <VerticalAlignedGrid />
        </div>
    )
}



const VerticalAlignedGrid = () => {
    const imageUrls = generateRandomImageURLs(100);
    const cols: string[][] = imageUrls.reduce((acc, url, i) => {
        acc[i % 4].push(url);
        return acc;
    }
        , [[], [], [], []] as string[][]);

    return (
        <div className='flex gap-4'>
            {
                cols.map((col, i) => (
                    <div key={i} className='flex flex-col gap-6'>
                        {col.map((url, j) => (
                            <div key={`${j}_${i}`} className='flex flex-col gap-3' style={{
                                borderRadius: '10px',
                                overflow: 'hidden',
                            }}>
                                <img src={url} alt="" className='w-full'
                                    style={{
                                        borderRadius: '10px',
                                    }}
                                />
                                <div className='flex flex-col gap-2'>
                                    <div className='flex items-center gap-2 text-gray-300 text-sm font-[100]'>
                                        <div className='bg-secondary rounded-full w-5 h-5 ' /> {faker.word.sample()}
                                    </div>
                                    <div>
                                        <p className='text-sm'>{Array.from(
                                            { length: randInt(4, 7) },
                                            () => faker.word.sample()
                                        ).join(' ')}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                ))
            }
        </div>
    );
};
