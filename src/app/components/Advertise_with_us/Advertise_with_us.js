"use client"

import Image from "next/image"
import Link from "next/link"

function Advertise_with_us() {

    return (
        <div className="flex flex-col-reverse sm:flex-row gap-6 sm:gap-0 sm:justify-around">
            <div className='flex flex-col justify-center items-center sm:items-start text-center sm:text-start'>
                <h2 className='font-semibold sm:text-4xl mb-2'>Advertise with Us</h2>
                <p className='font-medium text-base text-lightgrey'>Advertise with us and grow your customer database</p>
                <Link href='/advertisement/form' className="mt-10 max-w-fit bg-primary rounded-md px-4 py-2 text-white text-base font-medium">
                    Advertise Here
                </Link>
            </div>
            <div className='flex justify-center'>
                <img className="object-contain" src='/services/advertise_with_us.png' width={636} height={305} />
            </div>
        </div>
    )
}

export default Advertise_with_us