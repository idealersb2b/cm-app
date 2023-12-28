import Link from 'next/link'
import React from 'react'

function page() {
    return (
        <div className='mx-5 sm:mx-14 flex flex-col justify-center items-center gap-10 py-12' >
            <img src='/assets/404 Image.png' alt='404 Error Image' />
            <div className='font-medium text-center'>
                Your visited page not found. You may go home page.
            </div>
            <Link className="bg-primary text-white px-12 py-4" href='/'>Back to home page</Link>
        </div>
    )
}

export default page