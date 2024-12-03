"use client";

import { Dispatch, ForwardedRef, forwardRef, SetStateAction } from 'react';
import Tooltip from '@/components/Tooltip';
import FileDropZone from '../ImageDrop/ImageDrop';
import useClickOutside from '@/hooks/useClickOutside';

const LANGS = [
    "हिन्दी", "বাংলা", "తెలుగు", "मराठी", "தமிழ்", "ગુજરાતી", "ಕನ್ನಡ", "മലയാളം", "ਪੰਜਾਬੀ",
]

const GoogleSearchInput = () => {
    const [query, setQuery] = useState('')
    const [suggestions, setSuggestions] = useState<string[]>([])
    const [activeSuggestionIndex, setActiveSuggestionIndex] = useState(-1)
    const inputRef = useRef<HTMLInputElement>(null)

    const [results, setResults] = useState<string[]>([])
    const [selectedIndex, setSelectedIndex] = useState<number>(-1)

    // Mock suggestions (in a real app, you'd fetch these from an API)
    const mockSuggestions = [
        'react typescript',
        'react hooks',
        'tailwind css',
        'next.js tutorial',
        'web development'
    ]

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value
        setQuery(value)

        // Filter suggestions based on input
        if (value.length > 0) {
            const filteredSuggestions = mockSuggestions
                .filter(suggestion =>
                    suggestion.toLowerCase().includes(value.toLowerCase())
                )
                .slice(0, 5)
            setSuggestions(filteredSuggestions)
        } else {
            setSuggestions([])
        }
    }

    const [focused, setFocused] = useState(false)
    const [showImageDrop, setShowImageDrop] = useState(false)

    const dropdownRef = useRef<HTMLDivElement>(null)


    useClickOutside(dropdownRef, () => {
        setShowImageDrop(false)
    })

    return (
        <div
            className='flex flex-col justify-center items-center mb-10'
        >
            <div
                onClick={() => {
                    inputRef.current?.focus()
                }}
                className={`${focused ? "hover:bg-tertiary" : "hover:bg-inputHover"} flex items-center h-12 w-[584px] ${focused ? "bg-tertiary" : "bg-secondary"} mt-[26px] relative`} style={{
                    borderBottomLeftRadius: focused && query && results ? '0px' : 24,
                    borderBottomRightRadius: focused && query && results ? '0px' : 24,
                    borderTopLeftRadius: '24px',
                    borderTopRightRadius: '24px',
                }}>
                {showImageDrop ?
                    <div ref={dropdownRef} className='w-full h-[362px] absolute left-0 top-0 p-5 bg-tertiary' style={{ borderRadius: 24 }}>
                        <div className='flex justify-center relative w-full mb-[14px]'>
                            <p className='text-[16px]'>Search any image with Google Lens</p>
                            <div className='w-[20px] h-[20px] absolute right-0 top-0 cursor-pointer' onClick={() => setShowImageDrop(false)}>
                                <Cross />
                            </div>
                        </div>
                        <FileDropZone />
                    </div> : <>
                        <SearchIcon />
                        <InputCore onChange={handleInputChange} value={query} setFocused={setFocused} ref={inputRef} />
                        <IconTray setShowImageDrop={setShowImageDrop} />
                        {query && focused && <SearchResults query={query}
                            results={results}
                            setResults={setResults}
                            setSelectedIndex={setSelectedIndex}
                            selectedIndex={selectedIndex}
                        />}
                    </>}
            </div>
            <ButtonTray />
            <div className='flex text-[13px] mt-1'>
                <p className='text-[#bfbfbf] font-[500]'>Google offered in:</p>
                <div className='gap-[9px] flex ml-2'>{LANGS.map((item, index) => <a className='text-link font-[600]' key={index}>{item}</a>)}</div>
            </div>
        </div>
    )
}

const ButtonTray = ({ secondary = false }: { secondary?: boolean }) => {
    return <div className='flex mt-[29px] mb-[21px] gap-[11px] text-[14px]'>
        <button className={`rounded-s ${secondary ? "bg-[#3c4043]" : "bg-[#313134]"} px-4 hover:border-[#616066] border-[1px] border-transparent h-9`}>Google Search</button>
        <button className={`rounded-s ${secondary ? "bg-[#3c4043]" : "bg-[#313134]"} px-4 hover:border-[#616066] border-[1px] border-transparent h-9`}>I'm Feeling Lucky</button>
    </div>
}

import React, { useState, useEffect, useRef } from 'react'
import { useStore } from 'zustand';
import useVoiceOverStore from '@/stores/exampleStore';

// Mock search results (replace with actual API in production)
const mockSearchResults = [
    "React TypeScript Tutorial",
    "TypeScript Handbook",
    "React Hooks Guide",
    "Next.js Documentation",
    "Tailwind CSS Tutorial",
]

const SearchResults: React.FC<{
    query: string,
    results: string[],
    setResults: (e: string[]) => void
    setSelectedIndex: Dispatch<SetStateAction<number>>,
    selectedIndex: number
}> = ({ query, results, selectedIndex, setResults, setSelectedIndex }) => {

    const resultsContainerRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        if (query) {
            const filteredResults = mockSearchResults.filter(
                result =>
                    result.toLowerCase().includes(query.toLowerCase())
            )
            setResults(filteredResults)
            setSelectedIndex(-1)
        } else {
            setResults([])
        }
    }, [query])

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (results.length === 0) return

            switch (e.key) {
                case 'ArrowDown':
                    e.preventDefault()
                    setSelectedIndex(prev =>
                        prev < results.length - 1 ? prev + 1 : prev
                    )
                    break
                case 'ArrowUp':
                    e.preventDefault()
                    setSelectedIndex(prev =>
                        prev > 0 ? prev - 1 : -1
                    )
                    break
                case 'Enter':
                    if (selectedIndex !== -1) {
                        window.location.href = `https://www.google.com/search?q=${encodeURIComponent(results[selectedIndex])}`
                    }
                    break
            }
        }

        window.addEventListener('keydown', handleKeyDown)
        return () => {
            window.removeEventListener('keydown', handleKeyDown)
        }
    }, [results, selectedIndex])

    if (results.length === 0) return null

    return (
        <div
            ref={resultsContainerRef}
            className="absolute top-full left-0 right-0 bg-tertiary shadow-lg z-50 max-h-96 overflow-y-auto"
            style={{
                borderBottomLeftRadius: 24,
                borderBottomRightRadius: 24
            }}
        >
            {results.map((result, index) => (
                <a
                    key={result}
                    href={result}
                    onClick={(e) => {
                        e.preventDefault()
                        window.location.href = `https://www.google.com/search?q=${encodeURIComponent(result)}`
                    }}
                    className={`hover:bg-secondary flex items-center ${index === selectedIndex ? 'bg-secondary' : 'bg-tertiary'}`}
                >
                    <SearchIcon />
                    <p className="py-1">
                        {result}
                    </p>
                </a>
            ))}
            <div className='flex justify-center -mt-4'><ButtonTray secondary={true} /></div>
        </div>
    )
}

const Cross = () => {
    return <svg fill='#e8e8e8' focusable="false" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"></path></svg>
}

const InputCore = forwardRef((props: {
    setFocused: (focused: boolean) => void
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
    value: string
}, ref: ForwardedRef<HTMLInputElement>) => {
    const { setFocused, onChange, value } = props
    return <input
        onBlur={() => setFocused(false)}
        onFocus={() => setFocused(true)}
        ref={ref} className='w-full bg-transparent outline-none'
        onChange={onChange}
        value={value}
    />
}
)

const SearchIcon = () => {
    return <div className='w-[15px] h-[15px] ml-[16px] mb-1 mr-[14px]'>
        <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-[18px] w-[18px]"
            viewBox="0 0 20 20"
            fill="#9AA0A5"
        >
            <path
                fillRule="evenodd"
                d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                clipRule="evenodd"
            />
        </svg>
    </div>
}

const IconTray = ({ setShowImageDrop }: {
    setShowImageDrop: (value: boolean) => void
}) => {
    const { startVoiceOver } = useVoiceOverStore();
    return <div className='flex mr-[17px] gap-4 items-center mb-[2px]'>
        <Tooltip text='Search by voice'>
            <div className='w-6' onClick={startVoiceOver}>
                <Mic />
            </div>
        </Tooltip>
        <Tooltip text='Search by image'>
            <div className='w-6' onClick={() => setShowImageDrop(true)}>
                <Lens />
            </div>
        </Tooltip>
    </div>
}

export const Mic = () => {
    return <svg className="goxjub" focusable="false" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path fill="#4285f4" d="m12 15c1.66 0 3-1.31 3-2.97v-7.02c0-1.66-1.34-3.01-3-3.01s-3 1.34-3 3.01v7.02c0 1.66 1.34 2.97 3 2.97z"></path><path fill="#34a853" d="m11 18.08h2v3.92h-2z"></path><path fill="#fbbc04" d="m7.05 16.87c-1.27-1.33-2.05-2.83-2.05-4.87h2c0 1.45 0.56 2.42 1.47 3.38v0.32l-1.15 1.18z"></path><path fill="#ea4335" d="m12 16.93a4.97 5.25 0 0 1 -3.54 -1.55l-1.41 1.49c1.26 1.34 3.02 2.13 4.95 2.13 3.87 0 6.99-2.92 6.99-7h-1.99c0 2.92-2.24 4.93-5 4.93z"></path></svg>
}

const Lens = () => {
    return <svg className="Gdd5U" focusable="false" viewBox="0 0 192 192" xmlns="http://www.w3.org/2000/svg"><rect fill="none" height="192" width="192"></rect><g><circle fill="#34a853" cx="144.07" cy="144" r="16"></circle><circle fill="#4285f4" cx="96.07" cy="104" r="24"></circle><path fill="#ea4335" d="M24,135.2c0,18.11,14.69,32.8,32.8,32.8H96v-16l-40.1-0.1c-8.8,0-15.9-8.19-15.9-17.9v-18H24V135.2z"></path><path fill="#fbbc04" d="M168,72.8c0-18.11-14.69-32.8-32.8-32.8H116l20,16c8.8,0,16,8.29,16,18v30h16V72.8z"></path><path fill="#4285f4" d="M112,24l-32,0L68,40H56.8C38.69,40,24,54.69,24,72.8V92h16V74c0-9.71,7.2-18,16-18h80L112,24z"></path></g></svg>
}

export default GoogleSearchInput;