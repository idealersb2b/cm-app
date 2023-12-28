"use client"

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { BsHeart, BsHeartFill } from 'react-icons/bs';
import { toast } from "react-toastify";

function Product({ product }) {

    const [isLiked, setIsLiked] = useState(false);

    const favButtonClick = () => {
        const favoriteProducts = localStorage ? (JSON.parse(localStorage.getItem("favoriteProducts")) || []) : [];
        const existingProductIndex = favoriteProducts.findIndex((item) => item.id === product.id);

        if (localStorage) {

            if (existingProductIndex === -1) {
                favoriteProducts.push(product);
                localStorage.setItem("favoriteProducts", JSON.stringify(favoriteProducts));
                setIsLiked(true);
                toast.success("Added To Fav. Product");
            } else {
                favoriteProducts.splice(existingProductIndex, 1);
                localStorage.setItem("favoriteProducts", JSON.stringify(favoriteProducts));
                setIsLiked(false);
                toast.success("Removed From Fav. Product");
            }
        }

    }

    useEffect(() => {
        if (localStorage) {
            const favoriteProducts = localStorage ? (JSON.parse(localStorage.getItem("favoriteProducts")) || []) : [];
            const existingProductIndex = favoriteProducts.findIndex((item) => item.id === product.id);
            setIsLiked(existingProductIndex !== -1)
        }
    }, [])


    return (
        <div className="group w-40 sm:w-64 rounded relative">
            {localStorage.getItem("authToken") && <span onClick={() => {
                setIsLiked(!isLiked)
                favButtonClick();
            }} className="absolute bg-white cursor-pointer rounded-full  p-2 sm:p-3 right-3 top-3 z-10">
                {
                    !isLiked && <BsHeart color={'black'} className="h-2 w-2 sm:h-4 sm:w-4" />
                }
                {
                    isLiked && <BsHeartFill color={`#f60000`} className="h-2 w-2 sm:h-4 sm:w-4" />
                }
            </span>}
            <Link href={`/product/${product?.id}`} prefetch>
                <div className="flex flex-col justify-center items-center w-full bg-[#f5f5f5] relative" >
                    <Image src={product?.image?.link||"https://dev.cleantech-mart.com/wp-content/uploads/2023/08/agri-drone.jpg"} width={50} height={50} style={{ width: "80%", aspectRatio: 1, mixBlendMode: 'darken' }} />
                    {/* <img src={product?.image?.link||"https://dev.cleantech-mart.com/wp-content/uploads/2023/08/agri-drone.jpg"} width={50} height={50} style={{ width: "80%", aspectRatio: 1, mixBlendMode: 'darken' }} alt={`${product.name}`} /> */}
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
    )
}

export default Product
