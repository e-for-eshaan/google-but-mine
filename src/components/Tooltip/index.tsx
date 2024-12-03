import React, { PropsWithChildren, ReactNode, useState } from 'react'

interface TooltipProps {
    text: string
}

const Tooltip: React.FC<PropsWithChildren<TooltipProps>> = ({
    children,
    text,
}) => {
    const [isVisible, setIsVisible] = useState(false)

    const positionStyles =
        'top-[130%] left-1/2 -translate-x-1/2 mt-2'

    return (
        <div className="relative group cursor-pointer">
            <div
                onMouseEnter={() => setIsVisible(true)}
                onMouseLeave={() => setIsVisible(false)}
            >
                {children}
            </div>

            {isVisible &&
                <div className={`w-3 h-3 rotate-45 transform absolute bg-tooltip ${ 'top-[110%] left-1/2 -translate-x-1/2 mt-2'} z-20 border border-[#2E3236]
            border-r-transparent border-b-transparent
                `} />}

            {isVisible && (
                <div
                    className={`
            absolute ${positionStyles}
            bg-tooltip text-white
            px-2 py-1
            z-10
            opacity-0 group-hover:opacity-100
            transition-opacity duration-300
            text-nowrap
            p-1
            border border-[#2E3236]
          `}
                >
                    <div className='z-40 bg-tooltip'>
                    <p className='text-xs bold w-full h-full z-50 text-[#A5A9AC]'>{text}</p>
                </div>
                </div>
            )}
        </div>
    )
}

export default Tooltip