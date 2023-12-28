"use client"

import React, { useState } from 'react'

function NewsLetter() {

    const [email, setEmail] = useState("")

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    }

    return (
        <div className='w-full flex flex-col items-center py-8'>
            <div className='text-center'>
                <h2 className='font-semibold text-xl sm:text-4xl mb-2' >Join our newsletter</h2>
                <p className='font-medium text-xs sm:text-base text-lightgrey'>and get updates on new products, promotions and coupons.</p>
            </div>
            <div className='flex sm:flex-row justify-center items-center flex-col w-full pt-7 px-8'>
                <input
                    placeholder='E-Mail'
                    value={email}
                    onChange={handleEmailChange}
                    type='email'
                    className='lg:w-[700px] w-full max-w-[600px] h-10 px-4 mx-8 my-5 sm:m-0 rounded border outline-none border-r-0 focus:border-primary peer invalid:border-red-500' />
                <button onClick={() => console.log("AVinash")} className="bg-primary w-[250px] rounded-none sm:rounded-md px-4 py-2 text-white text-base font-medium rounded-tl-none rounded-bl-none peer-invalid:cursor-not-allowed">
                    Subscribe
                </button>
            </div>
        </div>
    )
}

export default NewsLetter