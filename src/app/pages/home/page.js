"use client"

import React, { useEffect, useState } from 'react'
import CategoriesRow from '@/app/components/CategoriesRow/CategoriesRow';
import OurProductsRow from '@/app/components/OurProductsRow/OurProductsRow';
import HeroCrousel from '@/app/components/Crousel/Crousel';
import NewsLetter from '@/app/components/NewsLetter/NewsLetter';
import { HOMEPAGE_PRODUCT_CATEOGORIES_PRODUCTS, QUERY_GET_PARENT_PRODUCT_CATEGORIES } from '@/app/graphql/productCategories/queries';
import { useLazyQuery } from '@apollo/client';
import reactLogo from "../../../../public/lottie/animation_llkii2bv.json";
import lottie from "lottie-web";
import { useRouter } from 'next/navigation'

function Home() {
    const [fetchEachRowCategory] = useLazyQuery(QUERY_GET_PARENT_PRODUCT_CATEGORIES);
    const [CategoryandProducts,loading,error] = useLazyQuery(HOMEPAGE_PRODUCT_CATEOGORIES_PRODUCTS);
    console.log(error)
    const [allData, setAllData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [categories, setCategories] = useState([])

    const initialCall = () => {

        setIsLoading(true);

        fetchEachRowCategory()
            .then((result) => result.data)
            .then((data) => {
                const Filterit = data.productCategories.edges.map((node) => node.node);
                setCategories(Filterit);
                console.log(Filterit)
                setIsLoading(false);
            })
            .catch((e) => {
                console.log(e);
                setIsLoading(false);
            })
    }

    useEffect(() => {
        lottie.loadAnimation({
            animationData: reactLogo,
            renderer: "svg", // "canvas", "html"
            loop: true, // boolean
            autoplay: true, // boolean
            container: document.querySelector("#lottie-loading"),
        });

        CategoryandProducts()
            .then((data) => {
                return data.data
            })
            .then((data) => {
                setAllData(data.productCategories.edges)
                console.log("HomePage", data.productCategories.edges);
            })
            .catch((err) => {
                console.log(err);
            })

        initialCall();
    }, []);


    if (isLoading) {
        return <div className='w-full h-96 flex justify-center items-center'>
            <div className='h-20 w-20' id='lottie-loading'></div>
        </div>
    }

    const allCategories = [
        'dGVybToxODg1',
        'dGVybToyMTM0',
        'dGVybToxNzA=', 'dGVybToxOTc=',
        'dGVybToxODAz', 'dGVybToyMzU0',
        'dGVybToxOTU=', 'dGVybToxOTM='
    ]

   
 
    return (
        <>
        <HeroCrousel />
            <div className='flex flex-col mx-5 sm:mx-14 sm:gap-14 gap-7'>
                <CategoriesRow />
                {allData.filter((category) => allCategories.includes(category.node.id)).map((category, index) => (
                    <OurProductsRow key={category.node.id} data={category.node.products} name={category.node.name} id={category.node.id.replace(/=+$/, '')} />
                ))}
                <NewsLetter />
            </div>
        </>
    );
}


export default React.memo(Home);