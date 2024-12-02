import React from 'react'

const LOCATION = "India"
const LINKS = [
    { label: "Advertising", link: "https://www.google.com/intl/en_in/ads/?subid=ww-ww-et-g-awa-a-g_hpafoot1_1!o2&utm_source=google.com&utm_medium=referral&utm_campaign=google_hpafooter&fg=1" },
    { label: "Business", link: "https://www.google.com/services/?subid=ww-ww-et-g-awa-a-g_hpbfoot1_1!o2&utm_source=google.com&utm_medium=referral&utm_campaign=google_hpbfooter&fg=1" },
    { label: "How Search works", link: "https://google.com/search/howsearchworks/?fg=1" },
    { label: "Privacy", link: "https://policies.google.com/privacy?hl=en-IN&fg=1" },
    { label: "Terms", link: "https://policies.google.com/terms?hl=en-IN&fg=1" },
    { label: "Settings", link: "" },
]


const Footer = () => {
    const firstHalf = LINKS.slice(0, LINKS.length / 2)
    const secondHalf = LINKS.slice(LINKS.length / 2)
    return (
        <footer className="w-full">
            <div className="bg-footer flex flex-col">
                <div className="h-12 flex items-center border-b-[1px] border-[#313335] px-[30px] text-[15px]">
                    {LOCATION}
                </div>

                <div className="h-12 flex justify-between items-center px-[35px] text-[14px]">
                    <div className='flex gap-[30px]'>
                        {firstHalf.map((link) => (
                            <a key={link.label} href={link.link} className="hover:underline">
                                {link.label}
                            </a>
                        ))}
                    </div>
                    <div className='flex gap-[30px]'>
                        {secondHalf.map((link) => (
                            <a key={link.label} href={link.link} className="hover:underline">
                                {link.label}
                            </a>
                        ))}
                    </div>
                </div>
            </div>
        </footer>
    )
}

export default Footer
