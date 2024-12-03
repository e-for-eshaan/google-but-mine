"use client";

import { ForwardedRef, forwardRef, useRef, useState } from 'react';
import Tooltip from '@/components/Tooltip';

const LANGS = [
    "हिन्दी", "বাংলা", "తెలుగు", "मराठी", "தமிழ்", "ગુજરાતી", "ಕನ್ನಡ", "മലയാളം", "ਪੰਜਾਬੀ",
]

const GoogleSearchInput = () => {
    const [query, setQuery] = useState('')
    const [suggestions, setSuggestions] = useState<string[]>([])
    const [activeSuggestionIndex, setActiveSuggestionIndex] = useState(-1)
    const inputRef = useRef<HTMLInputElement>(null)

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

    const handleSearch = () => {
        if (query.trim()) {
            window.location.href = `https://www.google.com/search?q=${encodeURIComponent(query)}`
        }
    }

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            if (activeSuggestionIndex > -1 && suggestions[activeSuggestionIndex]) {
                // Use selected suggestion
                setQuery(suggestions[activeSuggestionIndex])
                window.location.href = `https://www.google.com/search?q=${encodeURIComponent(suggestions[activeSuggestionIndex])}`
            } else {
                // Use current input
                handleSearch()
            }
        }

        // Handle arrow key navigation for suggestions
        if (e.key === 'ArrowDown') {
            setActiveSuggestionIndex(prev =>
                prev < suggestions.length - 1 ? prev + 1 : prev
            )
        }

        if (e.key === 'ArrowUp') {
            setActiveSuggestionIndex(prev =>
                prev > 0 ? prev - 1 : -1
            )
        }
    }

    const handleSuggestionClick = (suggestion: string) => {
        setQuery(suggestion)
        window.location.href = `https://www.google.com/search?q=${encodeURIComponent(suggestion)}`
    }


    const [focused, setFocused] = useState(false)

    return (
        <div
            className='flex flex-col justify-center items-center mb-10'
        >
            <div
                onClick={() => {
                    inputRef.current?.focus()
                }}
                className={`hover:bg-inputHover flex items-center h-12 w-[584px] bg-secondary mt-[26px]`} style={{
                    borderBottomLeftRadius: focused ? 0 : '24px',
                    borderBottomRightRadius: focused ? 0 : '24px',
                    borderTopLeftRadius: '24px',
                    borderTopRightRadius: '24px',
                    transition: 'border-radius 0.2s'
                }}>
                <SearchIcon />
                <InputCore setFocused={setFocused} ref={inputRef} />
                <IconTray />
            </div>
            <div className='flex mt-[29px] mb-[21px] gap-[11px] text-[14px]'>
                <button className='rounded-s bg-[#313134] px-4 hover:border-[#616066] border-[1px] border-transparent h-9'>Google Search</button>
                <button className='rounded-s bg-[#313134] px-4 hover:border-[#616066] border-[1px] border-transparent h-9'>I'm Feeling Lucky</button>
            </div>
            <div className='flex text-[13px] mt-1'>
                <p className='text-[#bfbfbf] font-[500]'>Google offered in:</p>
                <div className='gap-[9px] flex ml-2'>{LANGS.map((item, index) => <a className='text-link font-[600]' key={index}>{item}</a>)}</div>
            </div>
        </div>
    )
}

const InputCore = forwardRef((props: {
    setFocused: (focused: boolean) => void
}, ref: ForwardedRef<HTMLInputElement>) => {
    const { setFocused } = props
    return <input
        onBlur={() => setFocused(false)}
        onFocus={() => setFocused(true)}
        ref={ref} className='w-full bg-transparent outline-none' />
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

const IconTray = () => {
    return <div className='flex mr-[17px] gap-4 items-center mb-[2px]'>
        <Tooltip text='Search by voice'>
            <div className='w-6'>
                <Mic />
            </div>
        </Tooltip>
        <Tooltip text='Search by image'>
            <div className='w-6'>
                <Lens />
            </div>
        </Tooltip>
    </div>
}

const Mic = () => {
    return <svg className="goxjub" focusable="false" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path fill="#4285f4" d="m12 15c1.66 0 3-1.31 3-2.97v-7.02c0-1.66-1.34-3.01-3-3.01s-3 1.34-3 3.01v7.02c0 1.66 1.34 2.97 3 2.97z"></path><path fill="#34a853" d="m11 18.08h2v3.92h-2z"></path><path fill="#fbbc04" d="m7.05 16.87c-1.27-1.33-2.05-2.83-2.05-4.87h2c0 1.45 0.56 2.42 1.47 3.38v0.32l-1.15 1.18z"></path><path fill="#ea4335" d="m12 16.93a4.97 5.25 0 0 1 -3.54 -1.55l-1.41 1.49c1.26 1.34 3.02 2.13 4.95 2.13 3.87 0 6.99-2.92 6.99-7h-1.99c0 2.92-2.24 4.93-5 4.93z"></path></svg>
}

const Lens = () => {
    return <svg className="Gdd5U" focusable="false" viewBox="0 0 192 192" xmlns="http://www.w3.org/2000/svg"><rect fill="none" height="192" width="192"></rect><g><circle fill="#34a853" cx="144.07" cy="144" r="16"></circle><circle fill="#4285f4" cx="96.07" cy="104" r="24"></circle><path fill="#ea4335" d="M24,135.2c0,18.11,14.69,32.8,32.8,32.8H96v-16l-40.1-0.1c-8.8,0-15.9-8.19-15.9-17.9v-18H24V135.2z"></path><path fill="#fbbc04" d="M168,72.8c0-18.11-14.69-32.8-32.8-32.8H116l20,16c8.8,0,16,8.29,16,18v30h16V72.8z"></path><path fill="#4285f4" d="M112,24l-32,0L68,40H56.8C38.69,40,24,54.69,24,72.8V92h16V74c0-9.71,7.2-18,16-18h80L112,24z"></path></g></svg>
}

export default GoogleSearchInput;