"use client"

import { ImFacebook } from 'react-icons/im'
import { FiTwitter } from 'react-icons/fi'
import { FaInstagram } from 'react-icons/fa'
import { RiLinkedinLine } from 'react-icons/ri'
import { AiOutlineArrowUp } from 'react-icons/ai'
import Link from 'next/link'

function Footer() {


    const handleScrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };


    return (
        <>
            <div className='flex justify-end w-full mt-12 mb-6'>
                <div onClick={handleScrollToTop} className='flex justify-center items-center w-12 h-12 cursor-pointer rounded-full bg-[#dfdfdf] mr-14'>
                    <AiOutlineArrowUp height={14} width={14} />
                </div>
            </div>
            <div className="bg-black">
                <div className="p-12 text-white flex flex-col lg:flex-row justify-between lg:items-start items-center max-w-[1440px] mx-auto">
                    <div className="flex flex-col w-max">
                        <h4 className="text-lg mb-4 text-center lg:text-start">Support</h4>
                        <div className="flex flex-col items-center text-center sm:items-start lg:text-start gap-2 sm:gap-4 text-lightgrey text-xs sm:text-base">
                            <span>
                                HQ: Navi, Mumbai,<br /> Maharashtra, Pin-410210
                            </span>

                            <span>
                                <a href="mailto:support@cleantech-mart.com" target='__blank'>
                                    support@cleantech-mart.com
                                </a>
                            </span>
                        </div>
                    </div>
                    <div className="flex flex-col">
                        <h4 className="text-lg mb-4">Product Categories</h4>
                        <div className="hidden lg:flex flex-col gap-4">
                            <span>
                                <Link href={'/pages/productlisting/dGVybToxNzA='} >
                                    Eco-friendly LED Lights
                                </Link>
                            </span>
                            <span>
                                <Link href={'pages/productlisting/dGVybToxOTM='} >
                                    Solar Energy
                                </Link>
                            </span>
                            <span>
                                <Link href={'/pages/productlisting/dGVybToxOTQ='} >
                                    Energy Efficiency equipment
                                </Link>
                            </span>
                            <span>
                                <Link href={'/pages/productlisting/dGVybToxOTY='} >
                                    Organic Products
                                </Link>
                            </span>
                            <span>
                                <Link href={'/pages/productlisting/dGVybToxOTc='} >
                                    Eco-friendly products
                                </Link>
                            </span>
                        </div>
                    </div>
                    <div className="flex flex-col w-max">
                        <h4 className="text-lg mb-4">Our services</h4>
                        <div className="hidden lg:flex flex-col gap-4">
                            <span>
                                <Link href={'/services/servicelisting/dGVybToxMzk2'} >
                                    Carbon Consultant
                                </Link>
                            </span>
                            <span>
                                <Link href={'/services/servicelisting/dGVybToxMzk1'}  >
                                    Solar Consultant
                                </Link>
                            </span>
                            <span>
                                <Link href={'/services/servicelisting/dGVybToxMzkz'}  >
                                    EV mechanic
                                </Link>
                            </span>
                            <span>
                                <Link href={'/services/servicelisting/dGVybToxMzg2'}  >
                                    Green building designers
                                </Link>
                            </span>
                            <span>
                                <Link href={'/services'}  >
                                    more
                                </Link>
                            </span>
                        </div>
                    </div>
                    <div className="flex flex-col w-max">
                        <h4 className="text-lg mb-4">Sustainability</h4>
                        <div className="hidden lg:flex flex-col gap-4">
                            <span>
                                <Link href={'https://www.carbinnov.com/'}  >
                                    Industries
                                </Link>
                            </span>
                            <span>
                                <Link href={'https://www.carbinnov.com/'}  >
                                    Green Buildings
                                </Link>
                            </span>
                            <span>
                                <Link href={'https://www.carbinnov.com/'}  >
                                    Nature Based Solution
                                </Link>
                            </span>
                            <span>
                                <Link href={'https://www.carbinnov.com/'}  >
                                    Renewable Solution
                                </Link>
                            </span>
                        </div>
                    </div>
                    <div className="flex flex-col w-max">
                        <h4 className="text-lg mb-4">Quick Link</h4>
                        <div className="hidden lg:flex flex-col gap-4">
                            <span>
                                Privacy Policy
                            </span>
                            <span>
                                Terms Of Use
                            </span>
                            <span>
                                Payment terms
                            </span>
                            <span>
                                Disclaimer
                            </span>
                            <span>
                                Data Privacy
                            </span>
                            <span>
                                FAQ
                            </span>
                        </div>
                    </div>
                    <div className="hidden lg:flex flex-col w-max">
                        <h4 className="text-lg mb-4">Download App</h4>
                        <div className="flex flex-col">
                            <span className="hidden text-xs text-[#afafaf] " >
                                Save more with App
                            </span>
                            <div className="hidden gap-2 mt-4">
                                <div>
                                    <img src="/Icons/QR Code.png" />
                                </div>
                                <div className="flex flex-col justify-between">
                                    <img src="/Icons/playstore.png" />
                                    <img src="/Icons/appstore.png" />
                                </div>
                            </div>
                            <div className="flex justify-between mt-10">
                                <a target='__blank' href='https://www.facebook.com/cleantechmart/'>
                                    <ImFacebook size={17} />
                                </a>
                                <a target='__blank' href='https://twitter.com/TheDealers8'>
                                    <FiTwitter size={17} />
                                </a>
                                <a target='__blank' href='https://www.instagram.com/cleantechmart/'>
                                    <FaInstagram size={17} />
                                </a>
                                <a target='__blank' href="https://www.linkedin.com/showcase/cleantech-mart/">
                                    <RiLinkedinLine size={17} />
                                </a>
                            </div>
                        </div>
                    </div>
                    <div className="sm:hidden flex justify-between items-center gap-7 mt-10">

                    </div>
                </div>
                <div className="flex h-16 justify-center items-center gap-2 border-t-[1px] border-[#3d3d3d]">
                    <span className="text-[#3d3d3d] font-mono text-xs sm:text-base text-center ">
                        © Copyright IDEALERS B2B PVT LTD 2023. All right reserved
                    </span>
                </div>
            </div>
        </>
    )
}

export default Footer