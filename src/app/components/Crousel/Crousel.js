"use client"

import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import Image from "next/image";
import { v4 as uuidv4 } from 'uuid'
import Link from "next/link";

const links = [
    {
        image: "assets/Crousel/IMG-20230818-WA0000.jpg",
        link: 'https://www.cleantech-mart.com/product-category/services/agricultural-farming/'
    },
    {
        image: "assets/Crousel/IMG-20230818-WA0001.jpg",
        link: 'https://www.cleantech-mart.com/product-category/organic-products/beans-pulses/organic-dals/'
    },
    {
        image: "assets/Crousel/IMG-20230818-WA0002.jpg",
        link: 'https://www.cleantech-mart.com/product-category/eco-friendly-home-lifestyle/home-decor-rural-livlihood/wooden-window/'
    }

]



function HeroCrousel() {

    return (
        <Carousel
            autoPlay
            infiniteLoop
            className="mb-10"
            showThumbs={false}
            labels={false}
            showArrows={true}
            showStatus={false}
            stopOnHover={true}
            renderArrowPrev={(onClickHandler, hasPrev, label) =>
            (
                <button className="crousel-arrow" type="button" onClick={onClickHandler} title={label} style={{
                    position: 'absolute',
                    opacity: hasPrev ? 1 : 0.5,
                    zIndex: 2,
                    top: 'calc(50% - 15px)',
                    width: 30,
                    height: 30,
                    cursor: 'pointer',
                    left: 15,
                    color: "white"
                }} >
                    <Image src={'/Icons/left-arrow-crousel.png'} width={35} height={35} />
                </button>
            )}
            renderArrowNext={(onClickHandler, hasNext, label) =>
            (
                <button disabled={!hasNext} className="crousel-arrow" type="button" onClick={onClickHandler} title={label} style={{
                    position: 'absolute',
                    opacity: hasNext ? 1 : 0.5,
                    zIndex: 2,
                    top: 'calc(50% - 15px)',
                    width: 30,
                    height: 30,
                    cursor: 'pointer',
                    right: 15,
                    color: "white"
                }}>
                    <Image src={'/Icons/right-arrow-crousel.png'} width={35} height={35} />
                </button>
            )}

            renderIndicator={(onClickHandler, isSelected, index, label) => {
                if (isSelected) {
                    return (
                        <li
                            style={{
                                display: 'inline-block',
                                margin: '0 10px',
                                background: '#00B517'
                            }}
                            className="rounded-full h-2 w-2 px-2 sm:h-4 sm:w-4 sm:px-4"
                            aria-label={`Selected: ${label} ${index + 1}`}
                            title={`Selected: ${label} ${index + 1}`}
                        />
                    );
                }
                return (
                    <li
                        style={{
                            background: '#D9D9D9',
                            display: 'inline-block',
                            margin: '0 8px',
                        }}
                        className="rounded-full h-2 w-2 sm:h-4 sm:w-4"
                        onClick={onClickHandler}
                        onKeyDown={onClickHandler}
                        value={index}
                        key={index}
                        role="button"
                        tabIndex={0}
                        title={`${label} ${index + 1}`}
                        aria-label={`${label} ${index + 1}`}
                    />
                );
            }}

        >
            {
                links.map((item) => {
                    return <div key={uuidv4()} className="w-full h-[170px] sm:h-[500px] bg-blue-950">
                        <div className='flex flex-row justify-between h-full bg-black rounded-xl'>
                            <Link className='h-full w-full' href={item.link} >
                                <img className='h-full w-full object-fill box-shadow-image' src={item.image} height={"100%"} />
                            </Link>
                        </div>
                    </div>
                })
            }


        </Carousel>
    );
}

export default HeroCrousel;