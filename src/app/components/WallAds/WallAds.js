import React from 'react'

function WallAds() {
    return (
        <div className='flex flex-row justify-between h-[116px] sm:h-[482px] bg-black rounded-xl'>
            {/* <div className='flex flex-col justify-between text-white'>
                <div className='text-5xl'>
                    LED Lights
                    <br />
                    <span className=' text-3xl'>
                        Starting from Rs. 200
                    </span>
                </div>
                <button className='h-12 bg-primary rounded-md'>
                    Buy Now
                </button>
            </div> */}
            <img className='h-full w-full' src='/assets/mobile-banner.png' />
        </div>
    )
}

export default WallAds