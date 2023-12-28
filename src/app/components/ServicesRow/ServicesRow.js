"use client";

import React, { useRef, useState } from "react";
import Service from "../Service/Service";
import Title from "../Title/Title";
import { Swiper, SwiperSlide } from "swiper/react";
import Link from "next/link";
import { useQuery } from "@apollo/client";
import { QUERY_GET_SERVICES } from "@/app/graphql/productCategories/queries";
import Shimmer_Product from "../Shimmer/Shimmer_Product";

function ServicesRow() {

    const { loading, error, data } = useQuery(QUERY_GET_SERVICES);

    console.log(data?.productCategories?.edges[0].node.children.edges)

    return (
        <div>
            <Title title={"Services"} />

            <div className="w-full flex overflow-x-scroll hide-horizontal gap-7">
                <Swiper
                    watchSlidesVisibility={true}
                    slidesPerView={4}
                    grabCursor
                    className="services-slider"
                    breakpoints={{

                        // when window width is >= 320px
                        320: {
                            slidesPerView: 2,
                            spaceBetween: 20
                        },
                        // when window width is >= 640px
                        500: {
                            slidesPerView: 3,
                            spaceBetween: 20
                        },
                        1080: {
                            slidesPerView: 4,
                            spaceBetween: 40
                        }
                    }}
                >
                    {
                        data?.productCategories?.edges[0].node.children.edges.slice(0, 7).map((service) =>
                            <SwiperSlide key={service.node.id}>
                                <Service service={service.node} />
                            </SwiperSlide>
                        )
                    }
                </Swiper>
            </div>


            {
                loading &&
                <div className="w-full flex overflow-x-scroll hide-horizontal gap-7">
                    <Shimmer_Product />
                    <Shimmer_Product />
                    <Shimmer_Product />
                    <Shimmer_Product />
                    <Shimmer_Product />
                    <Shimmer_Product />
                    <Shimmer_Product />
                </div>
            }

            <div className="w-full flex justify-center mt-10">
                <Link href="/services" className="bg-primary rounded-md px-4 py-2 text-white text-base font-medium">
                    View More
                </Link>
            </div>

            {
                error && <div className="w-full flex text-red-700 overflow-x-scroll hide-horizontal gap-7">
                    {error}
                </div>

            }

        </div>
    );
}

export default ServicesRow;
