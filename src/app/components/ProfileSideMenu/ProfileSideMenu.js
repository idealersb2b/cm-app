"use client"

import { isDashboardInVar, isLoggedInVar, isVendorInVar } from "@/app/Providers"
import { useReactiveVar } from "@apollo/client"
import Link from "next/link"
import { useRouter, useSelectedLayoutSegment } from 'next/navigation'
// import cookieCutter from 'cookie-cutter'
import { parseCookies, setCookie, destroyCookie } from 'nookies'

import { toast } from "react-toastify"

function ProfileSideMenu() {

    const isLoggedIn = useReactiveVar(isLoggedInVar);
    const isVendor = useReactiveVar(isVendorInVar);
    const isDashboard = useReactiveVar(isDashboardInVar);

    const activeSegment = useSelectedLayoutSegment()
    const router = useRouter();
    console.log(activeSegment)

    return (
        <div className='hidden lg:flex min-w-[185px] mt-8 flex-col gap-8'>
            <div className='flex flex-col'>
                <h3 className='font-medium mb-4'>Manage My Account</h3>
                <div className='pl-8 flex flex-col gap-2'>
                    <Link
                        href='/pages/home/account/myprofile'
                        className={`hover:text-primary ${activeSegment === 'myprofile' ? "text-primary" : "text-lightgrey"}`}>
                        My Profile
                    </Link>
                    <Link
                        href='/pages/home/account/myaddresses'
                        className={`hover:text-primary ${activeSegment === 'myaddresses' ? "text-primary" : "text-lightgrey"}`}>
                        My Addresses
                    </Link>
                    {
                        isVendor ? <Link
                            target="_blank"
                            href='https://dev.cleantech-mart.com/login-vendor/'
                            className={`hover:text-primary ${activeSegment === 'dashboard' ? "text-primary" : "text-lightgrey"}`}>
                            Go to Dashboard
                        </Link> : <Link
                            href='/pages/home/account/vendorRegistration'
                            className={`hover:text-primary ${activeSegment === 'vendorRegistration' ? "text-primary" : "text-lightgrey"}`}>
                            Become a vendor
                        </Link>
                    }
                </div>
            </div>
            <div className='flex flex-col'>
                <h3 className='font-medium mb-4' >My Requests</h3>
                <div className='pl-8 flex flex-col gap-2'>
                    <Link href='/pages/home/account/quoterequest' className='text-lightgrey hover:text-primary' >Quote History</Link>
                    <Link href='/pages/home/account/list' className='text-lightgrey hover:text-primary' >Quotes</Link>
                </div>
            </div>
            <div className='flex flex-col'>
                <h3 className='font-medium mb-4' >My Wishlist</h3>
                <div className='pl-8 flex flex-col gap-2'>
                    <Link
                        href='/pages/home/account/favourite'
                        className={`hover:text-primary ${activeSegment === 'favourite' ? "text-primary" : "text-lightgrey"}`}>
                        My Favorites
                    </Link>
                </div>
            </div>
            <div className='flex flex-col'>
                <Link href='/pages/home/account/contact-us' >
                    <h3 className={`font-medium hover:text-primary ${activeSegment === 'aboutus' ? "text-primary" : "text-lightgrey"}`}>
                        Contact US</h3>
                </Link>
            </div>
            <div className='flex flex-col'>
                <h3 onClick={() => {
                    localStorage.removeItem('authToken');
                    localStorage.removeItem('favoriteProducts');
                    localStorage.removeItem('userId');
                    localStorage.removeItem('woocommerce_session_token');
                    localStorage.removeItem('clientMutationId');
                    localStorage.removeItem('userRole');
                    localStorage.removeItem('customerId');
                    localStorage.removeItem('userName');

                    destroyCookie('refreshToken');

                    toast.success('You Have been Logout!')

                    isLoggedInVar(false);
                    router.push('/');
                }} className='font-medium hover:text-primary text-lightgrey'>
                    Logout
                </h3>
            </div>
        </div>
    )
}

export default ProfileSideMenu