"use client"

import React, { useEffect, useState } from "react";
import Title from "../Title/Title";
import Product from "../Product/Product";
import { Swiper, SwiperSlide } from "swiper/react";
import { useLazyQuery } from "@apollo/client"
import Shimmer_Product from "../Shimmer/Shimmer_Product";
import Link from "next/link";
import { QUERY_GET_PRODUCT_CATEGORY } from "@/app/graphql/productCategories/queries";

function OurProductsRow({ name, id, data }) {

    // const [getProductCategories] = useLazyQuery(QUERY_GET_PRODUCT_CATEGORY);

    const [productRow, setproductRow] = useState(data.edges)

    return (
        <div>
            <Title title={name} subtitle={`Explore ${name}`} />

            {productRow &&
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
                            productRow.map((product) =>
                                <SwiperSlide key={product.node.productId} >
                                    <Product product={product.node} />
                                </SwiperSlide>
                            )
                        }
                    </Swiper>
                </div>
            }

            <div className="w-full flex justify-center mt-10">
                <Link href={`/pages/productlisting/${id}`} className="bg-primary rounded-md px-4 py-2 text-white text-base font-medium">
                    View More
                </Link>
            </div>
        </div>
    );
}

export default OurProductsRow;
