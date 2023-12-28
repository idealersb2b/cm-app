"use client"

import Image from "next/image";
import lightbulb from '../../assets/Icons/Vector-17.png'
import lightbulb_white from '../../assets/Icons/Vector-17_white.png'
import solarenergy from '../../assets/Icons/Half_Sun.png'
import solarenergy_white from '../../assets/Icons/Half_Sun_white.png'
import energyefficient from '../../assets/Icons/Plug-2.png'
import energyefficient_white from '../../assets/Icons/Plug-2_white.png'
import ecofriendly from '../../assets/Icons/Recyle.png'
import ecofriendly_white from '../../assets/Icons/Recyle_white.png'
import garments from '../../assets/Icons/Boy_Shirt.png'
import garments_white from '../../assets/Icons/Boy_Shirt_white.png'
import organic from '../../assets/Icons/Seeding.png'
import organic_white from '../../assets/Icons/Seeding_white.png'
import Title from '@/app/components/Title/Title';
import { QUERY_GET_PARENT_PRODUCT_CATEGORIES, QUERY_GET_PRODUCT_CATEGORIES_AND_THEIR_CHILDREN, QUERY_GET_PRODUCT_CATEGORY } from "@/app/graphql/productCategories/queries";
import { useQuery } from "@apollo/client";
import { Swiper, SwiperSlide } from "swiper/react";
import Shimmer_Product from "../Shimmer/Shimmer_Product";
import { Shimmer } from "react-shimmer";
import { useRouter } from "next/navigation";
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import SwiperController from "../SwiperController/SwiperController";
import { useRef } from "react";

function CategoriesRow() {

    // const { loading, error, data } = useQuery(QUERY_GET_PARENT_PRODUCT_CATEGORIES);
    const router = useRouter();
    // console.log("Category Data", data);
    const temRef = useRef();

    const allData = [
        {
            "icon-b": "/assets/Category Icon/garment-b.png",
            "icon-g": "/assets/Category Icon/garment-g.png",
            "id": "dGVybToxODg1",
            "name": "Eco Friendly Garments"
        },
        {
            "icon-b": "/assets/Category Icon/home-lifestyle-b.png",
            "icon-g": "/assets/Category Icon/home-lifestyle-g.png",
            "id": "dGVybToyMTM0",
            "name": "Eco Friendly Home & Lifestyle"
        },
        {
            "icon-b": "/assets/Category Icon/eco-friendly-led-lights-svg-b.png",
            "icon-g": "/assets/Category Icon/eco-friendly-led-lights-svg-g.png",
            "id": "dGVybToxNzA=",
            "name": "Eco Friendly LED Lights"
        },
        {
            "icon-b": "/assets/Category Icon/eco-friendly-product-b.png",
            "icon-g": "/assets/Category Icon/eco-friendly-product-g.png",
            "id": "dGVybToxOTc=",
            "name": "Eco Friendly products"
        },
        {
            "icon-b": "/assets/Category Icon/personal-care-b.png",
            "icon-g": "/assets/Category Icon/personal-care-g.png",
            "id": "dGVybToxODAz",
            "name": "Natural Personal Care"
        },
        {
            "icon-b": "/assets/Category Icon/energy-efficient-b.png",
            "icon-g": "/assets/Category Icon/energy-efficient-g.png",
            "id": "dGVybToyMzU0",
            "name": "Energy Storage"
        },
        {
            "icon-b": "/assets/Category Icon/energy-efficient-b.png",
            "icon-g": "/assets/Category Icon/energy-efficient-g.png",
            "id": "dGVybToxOTQ=",
            "name": "Energy Efficient Equipment"
        },
        {
            "icon-b": "/assets/Category Icon/organic-products-b.png",
            "icon-g": "/assets/Category Icon/organic-products-g.png",
            "id": "dGVybToxOTY=",
            "name": "Organic Products"
        },
        {
            "icon-b": "/assets/Icons/farming-forestation-b.png",
            "icon-g": "/assets/Icons/farming-forestation-g.png",
            "id": "dGVybToyMzU2",
            "name": "Farming and Forestation"
        },
        {
            "icon-b": "/assets/Icons/green-building-b.png",
            "icon-g": "/assets/Icons/green-building-g.png",
            "id": "dGVybToyMzU1",
            "name": "Green Building Materials"
        },
        {
            "icon-b": "/assets/Category Icon/services-b.png",
            "icon-g": "/assets/Category Icon/services-g.png",
            "id": "dGVybToxOTU=",
            "name": "Services"
        },
        {
            "icon-b": "/assets/Category Icon/solar-energy-b.png",
            "icon-g": "/assets/Category Icon/solar-energy-g.png",
            "id": "dGVybToxOTM=",
            "name": "Solar Energy"
        }]

    // if (error) {
    //     console.log(error)
    //     return <div>Error</div>
    // }

    return (
        <div>
            <Title title={"Categories"} subtitle={"Browse By Category"} />
            {
                <div className="w-full flex hide-horizontal category_row gap-7">
                    <Swiper
                        ref={temRef}
                        wrapperClass="SwiperWrapper"
                        modules={[Navigation]}
                        navigation
                        watchSlidesProgress={true}
                        watchSlidesVisibility={true}
                        slidesPerView={6}
                        breakpoints={{

                            // when window width is >= 320px
                            320: {
                                slidesPerView: 3,
                            },
                            // when window width is >= 640px
                            640: {
                                slidesPerView: 4,
                                spaceBetween: 40
                            },
                            1080: {
                                slidesPerView: 6,
                            }
                        }}
                        grabCursor
                        className="product-slider"
                    >
                        {
                            allData.map((category) =>
                                <SwiperSlide key={category.id}>
                                    <div
                                        onClick={() => router.push(`/pages/productlisting/${category.id}`)}
                                        className='group transition cursor-pointer group flex flex-col 
                                    justify-center items-center gap-[10px] border-[1px] border-[#cccccc] 
                                    rounded w-[70px] h-[70px] md:w-[170px] md:h-[145px] hover:border-4 hover:border-primary'>
                                        <img src={category["icon-b"]} alt={category.name + ' black-icon'} className='h-7 w-7 md:h-16 md:w-16 group-hover:hidden object-contain' />
                                        <img src={category["icon-g"]} alt={category.name + ' green-icon'} className='h-7 w-7 md:h-16 md:w-16 group-hover:block hidden object-contain' />
                                        <p className='group-hover:text-primary md:text-base font-mono font-normal text-center text-[8px] '>
                                            {
                                                category.name
                                            }
                                        </p>
                                    </div>
                                </SwiperSlide>
                            )
                        }

                    </Swiper>
                </div>
            }

            {/* {
                loading && <div className="w-full flex overflow-x-scroll hide-horizontal gap-7">
                    <Shimmer width={170} height={145} />
                    <Shimmer width={170} height={145} />
                    <Shimmer width={170} height={145} />
                    <Shimmer width={170} height={145} />
                    <Shimmer width={170} height={145} />
                    <Shimmer width={170} height={145} />
                </div>
            } */}

            {/* <div className='flex justify-evenly flex-wrap gap-10'>
                <div className='transition cursor-pointer group flex flex-col justify-center items-center gap-[10px] border-[1px] border-[#cccccc] rounded w-[170px] h-[145px] hover:bg-primary'>
                    <Image src={lightbulb} alt='LED Lights' className='group-hover:hidden' />
                    <Image src={lightbulb_white} alt='LED Lights' className='hidden group-hover:block' />
                    <p className='group-hover:text-white text-base font-mono font-normal'>
                        LED Lights
                    </p>
                </div>
                <div className='transition cursor-pointer group flex flex-col justify-center items-center gap-[10px] border-[1px] border-[#cccccc] rounded w-[170px] h-[145px] hover:bg-primary'>
                    <Image src={solarenergy} alt='solar energy' className='group-hover:hidden' />
                    <Image src={solarenergy_white} alt='LED Lights' className='hidden group-hover:block' />
                    <p className='group-hover:text-white text-base font-mono font-normal'>
                        Solar Energy
                    </p>
                </div>
                <div className='transition cursor-pointer group flex flex-col justify-center items-center gap-[10px] border-[1px] border-[#cccccc] rounded w-[170px] h-[145px] hover:bg-primary'>
                    <Image src={energyefficient} alt='energyefficient' className='group-hover:hidden' />
                    <Image src={energyefficient_white} alt='LED Lights' className='hidden group-hover:block' />
                    <p className='group-hover:text-white text-base font-mono font-normal'>
                        Energy Efficient
                    </p>
                </div>
                <div className='transition cursor-pointer group flex flex-col justify-center items-center gap-[10px] border-[1px] border-[#cccccc] rounded w-[170px] h-[145px] hover:bg-primary'>
                    <Image src={ecofriendly} alt='ecofriendly' className='group-hover:hidden' />
                    <Image src={ecofriendly_white} alt='LED Lights' className='hidden group-hover:block' />
                    <p className='group-hover:text-white text-base font-mono font-normal'>
                        Eco Friendly
                    </p>
                </div>
                <div className='transition cursor-pointer group flex flex-col justify-center items-center gap-[10px] border-[1px] border-[#cccccc] rounded w-[170px] h-[145px] hover:bg-primary'>
                    <Image src={garments} alt='garments' className='group-hover:hidden' />
                    <Image src={garments_white} alt='LED Lights' className='hidden group-hover:block' />
                    <p className='group-hover:text-white text-base font-mono font-normal'>
                        Garments
                    </p>
                </div>
                <div className='transition cursor-pointer group flex flex-col justify-center items-center gap-[10px] border-[1px] border-[#cccccc] rounded w-[170px] h-[145px] hover:bg-primary'>
                    <Image src={organic} alt='organic' className='group-hover:hidden' />
                    <Image src={organic_white} alt='LED Lights' className='hidden group-hover:block' />
                    <p className='group-hover:text-white text-base font-mono font-normal'>
                        Organic
                    </p>
                </div>
            </div> */}

        </div>
    )
}

export default CategoriesRow