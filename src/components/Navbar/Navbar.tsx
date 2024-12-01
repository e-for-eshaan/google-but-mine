"use client";

import Image from 'next/image';
import React, { FC, PropsWithChildren, useState } from 'react'

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false)

    const firstLinks = [
        { href: '#home', label: 'About' },
        { href: '#about', label: 'Store' },
    ]

    const secondLinks = [
        { href: '#services', label: 'Gmail' },
        { href: '#contact', label: 'Images' }
    ]

    const toggleMenu = () => {
        setIsOpen(!isOpen)
    }

    return (
        <nav className="fixed top-0 left-0 w-full shadow-md z-50">
            <div className="mx-auto flex justify-between items-center">
                <div className="flex items-center justify-between w-full">
                    <div className="px-[26px] py-[20px] flex gap-5 font-[Arial]">
                        {firstLinks.map((link) => (
                            <a
                                key={link.href}
                                href={link.href}
                                className="text-sm hover:underline transition-colors duration-100"
                            >
                                {link.label}
                            </a>
                        ))}
                    </div>
                    <div className='flex items-center pr-[14px]'>
                        <div className="flex space-x-[15px] items-center">
                            {secondLinks.map((link) => (
                                <a
                                    key={link.href}
                                    href={link.href}
                                    className="text-[13px] hover:underline transition-colors duration-100"
                                >
                                    {link.label}
                                </a>
                            ))}
                        </div>
                        <div className='ml-[15px]'>
                            <HoverWrapper>
                                <Labs />
                            </HoverWrapper>
                        </div>
                        <div className='ml-[11px]'>
                            <HoverWrapper>
                                <div className='w-6'>
                                    <Menu />
                                </div>
                            </HoverWrapper>
                        </div>
                        <div className='ml-[8px]'>
                        <Avatar />
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    )
}

const Labs = () => {
    return <svg className="fill-white" focusable="false" height="24px" viewBox="0 -960 960 960" width="24px"> <path d="M209-120q-42 0-70.5-28.5T110-217q0-14 3-25.5t9-21.5l228-341q10-14 15-31t5-34v-110h-20q-13 0-21.5-8.5T320-810q0-13 8.5-21.5T350-840h260q13 0 21.5 8.5T640-810q0 13-8.5 21.5T610-780h-20v110q0 17 5 34t15 31l227 341q6 9 9.5 20.5T850-217q0 41-28 69t-69 28H209Zm221-660v110q0 26-7.5 50.5T401-573L276-385q-6 8-8.5 16t-2.5 16q0 23 17 39.5t42 16.5q28 0 56-12t80-47q69-45 103.5-62.5T633-443q4-1 5.5-4.5t-.5-7.5l-78-117q-15-21-22.5-46t-7.5-52v-110H430Z"></path> </svg>
}

const Menu = () => {
    return <svg xmlns="http://www.w3.org/2000/svg" className="fill-white" focusable="false" viewBox="0 0 24 24"><path d="M6,8c1.1,0 2,-0.9 2,-2s-0.9,-2 -2,-2 -2,0.9 -2,2 0.9,2 2,2zM12,20c1.1,0 2,-0.9 2,-2s-0.9,-2 -2,-2 -2,0.9 -2,2 0.9,2 2,2zM6,20c1.1,0 2,-0.9 2,-2s-0.9,-2 -2,-2 -2,0.9 -2,2 0.9,2 2,2zM6,14c1.1,0 2,-0.9 2,-2s-0.9,-2 -2,-2 -2,0.9 -2,2 0.9,2 2,2zM12,14c1.1,0 2,-0.9 2,-2s-0.9,-2 -2,-2 -2,0.9 -2,2 0.9,2 2,2zM16,6c0,1.1 0.9,2 2,2s2,-0.9 2,-2 -0.9,-2 -2,-2 -2,0.9 -2,2zM12,8c1.1,0 2,-0.9 2,-2s-0.9,-2 -2,-2 -2,0.9 -2,2 0.9,2 2,2zM18,14c1.1,0 2,-0.9 2,-2s-0.9,-2 -2,-2 -2,0.9 -2,2 0.9,2 2,2zM18,20c1.1,0 2,-0.9 2,-2s-0.9,-2 -2,-2 -2,0.9 -2,2 0.9,2 2,2z"></path><image height="24" width="24" style={{ "border": 'none', "display": 'none' }}></image></svg>
}

const Avatar = () => {
    return <HoverWrapper>
        <div className='w-8 h-8 overflow-hidden rounded-2xl'>
            <Image src={'https://picsum.photos/32/32'} width={32} height={32} alt="logo" />
        </div>
    </HoverWrapper>
}

const HoverWrapper: FC<PropsWithChildren> = ({ children }) => {
    return <div className='w-10 flex justify-center items-center'>{children}</div>
}

export default Navbar