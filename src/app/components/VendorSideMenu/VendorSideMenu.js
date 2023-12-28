"use client"

import { isDashboardInVar, isLoggedInVar } from "@/app/Providers"
import { useReactiveVar } from "@apollo/client"
import Link from "next/link"
import { useRouter, useSelectedLayoutSegment } from 'next/navigation'
// import cookieCutter from 'cookie-cutter'
import { parseCookies, setCookie, destroyCookie } from 'nookies'
import { useEffect } from "react"
import { AiFillHome, AiFillSetting } from "react-icons/ai"
import { BiSolidDiscount } from "react-icons/bi"
import { BsFillBoxSeamFill, BsFillJournalBookmarkFill } from "react-icons/bs"
import { FaStore } from "react-icons/fa"
import { IoPeople } from "react-icons/io5"
import { MdRateReview, MdReportGmailerrorred, MdSupport } from 'react-icons/md'

function VendorSideMenu() {

    const activeSegment = useSelectedLayoutSegment()
    const isDashboard = useReactiveVar(isDashboardInVar);

    useEffect(() => {

    }, [isDashboard])


    return (
        <div className='hidden sm:flex w-[260px] flex-col gap-8'>
            <div className='flex flex-col'>
                {/* <h3 className='font-medium mb-4'>Manage My Account</h3> */}
                <div className='flex flex-col gap-3'>
                    <div className="h-24 w-full flex items-center object-contain">
                        <img src="/assets/image 1.png" />
                    </div>
                    <Link
                        href="/pages/home/vendor/dashboard"
                        className={`flex h-11 pl-5 items-center group ${activeSegment === 'dashboard' ? "text-white bg-primary rounded-r-full" : "text-lightgrey hover:text-primary "}`}>
                        <div className="flex">
                            <AiFillHome size={20} className="mr-3 peer-hover:text-primary" />
                            Dashboards
                        </div>
                    </Link>
                    <Link
                        href="/pages/home/vendor/products"
                        className={`flex h-11 pl-5 items-center group ${activeSegment === 'products' ? "text-white bg-primary rounded-r-full" : "text-lightgrey hover:text-primary "}`}>
                        <div className="flex">
                            <BsFillBoxSeamFill size={20} className="mr-3" />
                            Products
                        </div>
                    </Link>
                    <Link
                        href="/pages/home/vendor/orders"
                        className={`flex h-11 pl-5 items-center group ${activeSegment === 'orders' ? "text-white bg-primary rounded-r-full" : "text-lightgrey hover:text-primary "}`}>
                        <div className="flex">
                            <BsFillBoxSeamFill size={20} className="mr-3" />
                            Orders
                        </div>
                    </Link>
                    {/* <Link
                        href="/pages/home/vendor/coupons"
                        className={`flex h-11 pl-5 items-center group ${activeSegment === 'coupons' ? "text-white bg-primary rounded-r-full" : "text-lightgrey hover:text-primary "}`}>
                        <div className="flex">
                            <BiSolidDiscount size={20} className="mr-3" />
                            Coupons
                        </div>
                    </Link> */}
                    {/* <Link
                        href="/pages/home/vendor/customers"
                        className={`flex h-11 pl-5 items-center group ${activeSegment === 'customers' ? "text-white bg-primary rounded-r-full" : "text-lightgrey hover:text-primary "}`}>
                        <div className="flex">
                            <IoPeople size={20} className="mr-3" />
                            Customers
                        </div>
                    </Link> */}
                    {/* <Link
                        href="/pages/home/vendor/add_to_my_store"
                        className={`flex h-11 pl-5 items-center group ${activeSegment === 'add_to_my_store' ? "text-white bg-primary rounded-r-full" : "text-lightgrey hover:text-primary "}`}>
                        <div className="flex">
                            <FaStore size={20} className="mr-3" />
                            Add to my store
                        </div>
                    </Link> */}
                    {/* <Link
                        href="/pages/home/vendor/ledger_book"
                        className={`flex h-11 pl-5 items-center group ${activeSegment === 'ledger_book' ? "text-white bg-primary rounded-r-full" : "text-lightgrey hover:text-primary "}`}>
                        <div className="flex">
                            <BsFillJournalBookmarkFill size={20} className="mr-3" />
                            Ledger Book
                        </div>
                    </Link> */}
                    {/* <Link
                        href="/pages/home/vendor/reports"
                        className={`flex h-11 pl-5 items-center group ${activeSegment === 'reports' ? "text-white bg-primary rounded-r-full" : "text-lightgrey hover:text-primary "}`}>
                        <div className="flex">
                            <MdReportGmailerrorred size={20} className="mr-3" />
                            Reports
                        </div>
                    </Link> */}
                    {/* <Link
                        href="/pages/home/vendor/reviews"
                        className={`flex h-11 pl-5 items-center group ${activeSegment === 'reviews' ? "text-white bg-primary rounded-r-full" : "text-lightgrey hover:text-primary "}`}>
                        <div className="flex">
                            <MdRateReview size={20} className="mr-3" />
                            Reviews
                        </div>
                    </Link> */}
                    {/* <Link
                        href="/pages/home/vendor/support"
                        className={`flex h-11 pl-5 items-center group ${activeSegment === 'support' ? "text-white bg-primary rounded-r-full" : "text-lightgrey hover:text-primary "}`}>
                        <div className="flex">
                            <MdSupport size={20} className="mr-3" />
                            Support
                        </div>
                    </Link> */}
                    <Link
                        href="/pages/home/vendor/settings"
                        className={`flex h-11 pl-5 items-center group ${activeSegment === 'settings' ? "text-white bg-primary rounded-r-full" : "text-lightgrey hover:text-primary "}`}>
                        <div className="flex">
                            <AiFillSetting size={20} className="mr-3" />
                            Store details
                        </div>
                    </Link>
                    <Link
                        onClick={() => {
                            isDashboardInVar(false);
                        }}
                        href="/"
                        className={`flex h-11 pl-5 items-center group text-lightgrey hover:text-primary`}>
                        <div className="flex">
                            <FaStore size={20} className="mr-3" />
                            Go To Home
                        </div>
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default VendorSideMenu