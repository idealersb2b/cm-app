"use client"

import React from "react";
import Title from "../Title/Title";
import Product from "../Product/Product";
import { Swiper, SwiperSlide } from "swiper/react";
import { useQuery } from "@apollo/client"
import { QUERY_ALL_PRODUCTS } from "../../graphql/products/queries";
import Shimmer_Product from "../Shimmer/Shimmer_Product";
import Link from "next/link";
import { Navigation } from "swiper/modules";

function RecommendedRow({ related = [] }) {

    console.log(related);

    return (
        <div className="fixing-vertical-slider">
            <Title title={"Just for you"} subtitle={"Recommended"} />

            {
                related.edges.length > 0 &&
                <div className="sm:flex w-full overflow-x-scroll hide-horizontal gap-7">
                    <Swiper
                        watchSlidesProgress={true}
                        watchSlidesVisibility={true}
                        // slidesPerView={Math.min(productRow.length, 4)}
                        grabCursor
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
                        className="product-slider"
                    >
                        {
                            related.edges.map((product) =>
                                <SwiperSlide key={product.node.productId} >
                                    <Product product={product.node} />
                                </SwiperSlide>
                            )
                        }
                    </Swiper>
                </div>
            }
        </div>
    );
}

export default RecommendedRow;
