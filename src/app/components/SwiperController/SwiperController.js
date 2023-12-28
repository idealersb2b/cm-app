import React from 'react'
import { useSwiper } from 'swiper/react';

function SwiperController() {
    const swiper = useSwiper();
    return (
        <div className='flex gap-2 absolute -top-10 right-0'>
            <button className='p-2 text-sm sm:text-lg bg-primary text-white' onClick={() => swiper.slidePrev()}>&lt;</button>
            <button className='p-2 text-sm sm:text-lg bg-primary text-white' onClick={() => swiper.slideNext()}>&gt;</button>
        </div>
    )
}

export default SwiperController