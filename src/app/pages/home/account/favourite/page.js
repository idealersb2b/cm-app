"use client"

import React, { useEffect, useState } from 'react'
import Link from "next/link";
import { BsHeart, BsHeartFill } from 'react-icons/bs';
import { toast } from "react-toastify";
import Product from '@/app/components/Product/Product';

function FavPage() {

    const [favoriteProducts, setFavoriteProducts] = useState([]);

    const favButtonClick = (productId) => {


        let currfavoriteProducts = favoriteProducts;
        currfavoriteProducts = currfavoriteProducts.filter((item) => item.id !== productId);
        setFavoriteProducts(currfavoriteProducts);
    }

    useEffect(() => {
        const storedFavoriteProducts = localStorage ? (JSON.parse(localStorage.getItem("favoriteProducts")) || []) : [];
        setFavoriteProducts(storedFavoriteProducts);
    }, [])

    useEffect(() => {
        localStorage.setItem('favoriteProducts', JSON.stringify(favoriteProducts));
    }, [favoriteProducts]);


    return (
        <div className='flex justify-center sm:justify-normal mx-4 sm:mx-14 gap-20'>
            <div className='flex justify-between'>
                <div className='grid grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-4 md:gap-14'>
                    {
                        favoriteProducts.map((product) => {
                            return <div className="group w-40 sm:w-64 rounded relative">
                                <span onClick={() => {
                                    favButtonClick(product.id);
                                }} className="absolute bg-white cursor-pointer rounded-full  p-2 sm:p-3 right-3 top-3 z-10">
                                    <BsHeartFill color={`#f60000`} className="h-2 w-2 sm:h-4 sm:w-4" />
                                </span>
                                <Link href={`/product/${product.id}`}>
                                    <div className="flex flex-col justify-center items-center w-full bg-[#f5f5f5] relative" >
                                        <img src={product?.image?.link} style={{ width: "80%", aspectRatio: 1, mixBlendMode: 'darken' }} alt={`${product.name}`} />
                                        <Link href={`/product/${product.id}`} className="group-hover:flex justify-center items-center text-white rounded-br-md rounded-bl-md transition-opacity z-10 duration-1000 group-hover:opacity-100 opacity-0 hidden absolute w-full bg-primary bottom-0 h-10 text-xs font-mono">
                                            Ask for quote
                                        </Link>
                                    </div>
                                </Link>

                                <div className="flex flex-col mx-2">
                                    <div className="font-mono font-medium text-xs sm:text-lg">
                                        {product.name.substr(0, 50) + (product.name.length > 50 ? "...." : "")}
                                    </div>
                                    <div style={{ fontFamily: '__className_6dd009' }} className="text-secondary2 text-xs sm:text-base">
                                        {product.price}
                                    </div>
                                </div>
                            </div>
                            // return <Product key={product.id} product={product} />
                        }
                            // <div key={product.id} className="group w-[270px] h-[322px] rounded relative">
                            //     <span onClick={() => favButtonClick(product.id)} className="absolute bg-white cursor-pointer rounded-full p-3 right-3 top-3 z-10">
                            //         <BsHeartFill color={`#f60000`} height={14} width={14} />
                            //     </span>
                            //     <div className="flex flex-col justify-center items-center w-[270px] h-[250px] bg-[#f5f5f5] relative" >
                            //         <img src={product?.image?.link || '/product/product_img-2.png'} style={{ width: "190px", height: "180px", mixBlendMode: 'darken' }} alt={`${product.name}`} />
                            //         <Link href={`/product/${product.id}`} className="group-hover:flex justify-center items-center text-white rounded-br-md rounded-bl-md transition-opacity z-10 duration-1000 group-hover:opacity-100 opacity-0 hidden absolute w-full bg-primary bottom-0 h-10 text-xs font-mono">
                            //             Ask for quote
                            //         </Link>
                            //     </div>
                            //     <div className="flex flex-col mx-2">
                            //         <div className="font-mono font-medium">
                            //             {product.name}
                            //         </div>
                            //         <div style={{ fontFamily: '__className_6dd009' }} className="text-secondary2">
                            //             {product.price}
                            //         </div>
                            //     </div>
                            // </div>
                        )
                    }
                </div>
            </div>
        </div>
    )
}

export default FavPage