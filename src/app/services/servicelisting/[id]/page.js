"use client"

import Product from '@/app/components/Product/Product';
import products from '../../../../../sample_data.json';
import ReactPaginate from 'react-paginate';
import Dropdown from '@/app/components/Dropdown/Dropdown';
import { QUERY_GET_FILTER_PRODUCT_CATEGORY, QUERY_GET_MORE_PRODUCT_CATEGORY, QUERY_GET_SERVICE } from '@/app/graphql/productCategories/queries';
import { useLazyQuery, useQuery } from '@apollo/client';
import Shimmer_Product from '@/app/components/Shimmer/Shimmer_Product';
import { v4 as uuidv4 } from 'uuid';
import { useEffect, useState } from 'react';
import { set } from 'cookie-cutter';
import InfiniteScroll from "react-infinite-scroll-component";
import React from "react";
import { render } from "react-dom";
import BreadCrumps from '@/app/components/BreadCrumps/BreadCrumps';


function ProductListing({ params }) {

    const productId = params.id;

    const [pageNo, setPageNo] = useState(1);
    const [isLoading, setIsLoading] = useState(1);
    const [allProducts, setAllProducts] = useState([]);
    const [error, setError] = useState(null);
    const [count, setCount] = useState(0);
    const [filterSelected, setSelectedFilter] = useState(['DATE', 'DESC']);
    const [priceSelcted, setPriceSelected] = useState([0, 1000000]);
    const [hasMore, setHasMore] = useState(false);
    const [nextPage, setNextPage] = useState(false);
    const [isPurchasable, setIsPurchasable] = useState(false);
    const [pageURI, setPageURI] = useState([]);
    const [getAllProducts] = useLazyQuery(QUERY_GET_MORE_PRODUCT_CATEGORY)
    const [getFilteredAllProducts] = useLazyQuery(QUERY_GET_SERVICE)
    const [pageName, setPageName] = useState("")

    const [allcategory, setAllCategory] = useState([])

    const formatAllProducts = (data) => {

        console.log(data)

        const tempProducts = [];
        const tempCategories = data.productCategory;
        setPageURI(breadCrumpsMaker(data.productCategory))
        setIsPurchasable(false);
        setPageName(data.productCategory.name);
        setCount(data.productCategory.count);
        setAllCategory(tempCategories);
        setHasMore(data.productCategory.products.pageInfo.hasNextPage);
        setNextPage(data.productCategory.products.pageInfo.endCursor);
        data.productCategory.products.edges.forEach((product) => {
            // let tempProduct = {};

            // tempProduct.name = product.node.name
            // tempProduct.id = product.node.id
            // tempProduct.price = product.node.price
            // tempProduct.id = product.node.id
            // tempProduct.productId = product.node.productId
            // tempProduct.image = product.node.image.link

            tempProducts.push(product);
        })

        return tempProducts;
    }

    function breadCrumpsMaker(x) {
        let History = [];


        const remain = x.ancestors.edges.map((loc) => {
            return ({ name: loc.node.name, id: loc.node.id });
        })

        History = History.concat(remain)

        if (!isPurchasable) {
            History.pop();
        }

        History.reverse();


        return History;
    }

    const initialAllProductCall = () => {
        setIsLoading(true);
        getFilteredAllProducts({
            variables: {
                id: decodeURIComponent(productId),
                order: filterSelected[1],
                field: filterSelected[0],
                minPrice: priceSelcted[0],
                maxPrice: priceSelcted[1]
            }
        })
            .then((data) => {
                return data.data
            })
            .then((data) => {
                const tempproducts = formatAllProducts(data);
                setAllProducts(tempproducts);
                setIsLoading(false);
            })
            .catch((e) => {
                setError(e.message);
                setIsLoading(false);
            })
    }

    const nextPageLoad = () => {
        setIsLoading(true);
        getFilteredAllProducts({
            variables: {
                id: decodeURIComponent(productId),
                after: nextPage
            }
        })
            .then((data) => {
                return data.data
            })
            .then((data) => {
                const tempproducts = formatAllProducts(data);
                setAllProducts([...allProducts, ...tempproducts]);
                setIsLoading(false);
            })
            .catch((e) => {
                setError(e.message);
                setIsLoading(false);
            })
    }

    useEffect(() => {
        initialAllProductCall();
    }, [filterSelected, priceSelcted])


    if (error) {
        return <div>{error.message}</div>
    }

    return (
        <>
{productId}
            <div className='flex justify-center sm:justify-between mx-4 sm:mx-14 gap-4'>
                <BreadCrumps URI={pageURI} lastName={pageName} isPurchasable={isPurchasable} />
            </div>

            <div className='flex justify-center sm:justify-normal mx-4 sm:mx-14 gap-20'>
                <InfiniteScroll
                    dataLength={allProducts.length}
                    hasMore={hasMore}
                    next={() => nextPageLoad()}
                    className='grid grid-cols-2 xl:grid-cols-4 2xl:grid-cols-4 gap-4 md:gap-14'
                >
                    {
                        allProducts?.map((product) => {
                            return <Product key={uuidv4()} product={product.node} />
                        }
                        )
                    }
                </InfiniteScroll>
            </div>
        </>
    )
}

export default ProductListing