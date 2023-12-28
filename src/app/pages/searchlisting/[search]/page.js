"use client"

import { QUERY_GET_FILTER_PRODUCT_CATEGORY, QUERY_GET_MORE_PRODUCT_CATEGORY } from '@/app/graphql/productCategories/queries';
import { useLazyQuery, useQuery } from '@apollo/client';
import CustomeDD from '@/app/components/Dropdown/Dropdown';
import Shimmer_Product from '@/app/components/Shimmer/Shimmer_Product';
import { v4 as uuidv4 } from 'uuid';
import { useEffect, useRef, useState } from 'react';
import React from "react";
import Product from '@/app/components/Product/Product';
import ReactPaginate from 'react-paginate';
import Dropdown from 'react-multilevel-dropdown';
import { QUERY_GET_PRODUCTS_BASED_ON_SEARCH } from '@/app/graphql/products/queries';
import InfiniteScroll from "react-infinite-scroll-component";
import { cookies } from 'next/dist/client/components/headers';
import { CiFilter } from 'react-icons/ci';
import { VscSettings } from 'react-icons/vsc';

function SearchListing({ params }) {

    const { search } = params

    const [filterSelected, setSelectedFilter] = useState(['DATE', 'DESC']);
    const [priceSelcted, setPriceSelected] = useState([0, 1000000]);
    const [hasMore, setHasMore] = useState(false);
    const [nextPage, setNextPage] = useState(false);
    const [isLoading, setIsLoading] = useState(1);
    const [allProducts, setAllProducts] = useState([]);
    const [filterOptionAvailable, setFilterOptionAvailable] = useState(false)
    const [error, setError] = useState(null);
    const [pageName, setPageName] = useState("")
    const sortRef = useRef(null);


    const [getSearchedProducts] = useLazyQuery(QUERY_GET_PRODUCTS_BASED_ON_SEARCH);

    const formatAllProducts = (data) => {
        const tempProducts = [];
        setHasMore(data.products.pageInfo.hasNextPage);
        // setPageName(data.productCategory.name);
        // setCount(data.productCategory.count);
        setNextPage(data.products.pageInfo.endCursor);
        data.products.edges.forEach((product) => {

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

    const initialAllProductCall = () => {
        setIsLoading(true);
        getSearchedProducts({
            variables: {
                search: decodeURIComponent(search),
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
        getSearchedProducts({
            variables: {
                search: decodeURIComponent(search),
                order: filterSelected[1],
                field: filterSelected[0],
                minPrice: priceSelcted[0],
                maxPrice: priceSelcted[1],
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



    const SetFilter = (optionSelected) => {
        setSelectedFilter(optionSelected.split(' '));
    }

    const setPriceRange = (optionSelected) => {
        setPriceSelected(optionSelected);
    }


    if (error) {
        console.log(error)
        return <div>Error</div>
    }

    return (
        <>
            <div className='flex items-center justify-between mx-4 sm:mx-14 md:hidden py-5 relative'>
                {
                    filterOptionAvailable ? <div className='py-5 w-full top-full absolute z-40 md:hidden bg-greybg gap-5 rounded-lg h-min'>
                        <div className='pr-5 pl-5'>
                            <CustomeDD title="Price range" options={['Metallic', 'Plastic cover', 'Power saver']} setPriceRange={setPriceRange} />
                        </div>
                    </div> : null
                }

                <h3 className='text-xs'>{pageName}</h3>
                <div className='flex flex-row gap-4 '>
                    <button onClick={() => setFilterOptionAvailable(!filterOptionAvailable)} className='relative p-2 bg-littledarkgrey flex flex-row items-center rounded gap-3'>
                        <CiFilter />
                        <span>
                            Filter
                        </span>
                    </button>
                    <button onClick={() => {
                        sortRef.current.toggle();
                    }} className='relative p-2 bg-littledarkgrey flex flex-row items-center rounded gap-3'>
                        <Dropdown ref={sortRef} className="absolute top-0 left-0 bg-red-500 rounded-full">
                            <Dropdown.Item onClick={() => SetFilter('REVIEW_COUNT DESC')} >
                                <span className='px-4'>
                                    Sort by popularity
                                </span>
                            </Dropdown.Item>
                            <Dropdown.Item onClick={() => SetFilter('RATING DESC')} >
                                <span className='px-4'>
                                    Sort by average rating
                                </span>
                            </Dropdown.Item>
                            <Dropdown.Item onClick={() => SetFilter('DATE DESC')} >
                                <span className='px-4'>
                                    Sort by latest
                                </span>
                            </Dropdown.Item>
                            <Dropdown.Item onClick={() => SetFilter('PRICE ASC')} >
                                <span className='px-4'>
                                    Sort by price: low to high
                                </span>
                            </Dropdown.Item>
                            <Dropdown.Item onClick={() => SetFilter('PRICE DESC')} >
                                <span className='px-4'>
                                    Sort by price: high to low
                                </span>
                            </Dropdown.Item>
                        </Dropdown>
                        <VscSettings />
                        <span>
                            Sort
                        </span>
                    </button>
                </div>
            </div>


            <div className='flex justify-center sm:justify-between mx-4 sm:mx-14 gap-4'>
                <div className='w-[280px] hidden md:block bg-greybg gap-5 rounded-lg h-min'>
                    <div className='pr-5 pl-5'>
                        <CustomeDD title="Price range" options={['Metallic', 'Plastic cover', 'Power saver']} setPriceRange={setPriceRange} />
                    </div>

                    <div className='pr-5 pl-5'>
                        <CustomeDD title="Sort By" SetFilter={SetFilter} options={
                            [
                                { title: 'Sort by average rating', value: 'RATING DESC' },
                                { title: 'Sort by latest', value: 'DATE DESC' },
                                { title: 'Sort by price: low to high', value: 'PRICE ASC' },
                                { title: 'Sort by price: high to low', value: 'PRICE DESC' },
                            ]
                        } />
                    </div>
                </div>

                <InfiniteScroll
                    dataLength={allProducts.length}
                    hasMore={hasMore}
                    next={() => nextPageLoad()}
                    className='grid grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-4 md:gap-14'
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

export default SearchListing