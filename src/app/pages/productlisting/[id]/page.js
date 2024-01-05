"use client"

import Product from '@/app/components/Product/Product';
import CustomeDD from '@/app/components/Dropdown/Dropdown';
import Dropdown from 'react-multilevel-dropdown';
import { QUERY_GET_FILTER_PRODUCT_CATEGORY } from '@/app/graphql/productCategories/queries';
import { useLazyQuery } from '@apollo/client';
import { v4 as uuidv4 } from 'uuid';
import { useEffect, useRef, useState } from 'react';
import InfiniteScroll from "react-infinite-scroll-component";
import { CiFilter } from 'react-icons/ci'
import { VscSettings } from 'react-icons/vsc'
import BreadCrumps from '@/app/components/BreadCrumps/BreadCrumps';

function ProductListing({ params }) {

    const productId = params.id;

    const [isLoading, setIsLoading] = useState(true);
    const [allProducts, setAllProducts] = useState([]);
    const [error, setError] = useState(null);
    const [filterSelected, setSelectedFilter] = useState(['DATE', 'DESC']);
    const [priceSelcted, setPriceSelected] = useState([0, 1000000]);
    const [hasMore, setHasMore] = useState(false);
    const [nextPage, setNextPage] = useState(false);
    const [pageURI, setPageURI] = useState([]);
    const [pageName, setPageName] = useState("")

    const sortRef = useRef(null);
    const [getFilteredAllProducts] = useLazyQuery(QUERY_GET_FILTER_PRODUCT_CATEGORY)
    const [filterOptionAvailable, setFilterOptionAvailable] = useState(false)
    const [allcategory, setAllCategory] = useState([])


    const formatAllProducts = (data) => {
        const tempProducts = [];
        const tempCategories = data.productCategory;
        setPageURI(breadCrumpsMaker(data.productCategory));
        setPageName(data.productCategory.name);
        setAllCategory(tempCategories);
        setHasMore(data.productCategory.products.pageInfo.hasNextPage);
        setNextPage(data.productCategory.products.pageInfo.endCursor);
        data.productCategory.products.edges.forEach((product) => {

            tempProducts.push(product);
        })

        return tempProducts;
    }

    function breadCrumpsMaker(x) {
        let History = [];

        const currentLoc = { name: x.name, id: x.id };

        History.push(currentLoc);

        const remain = x.ancestors?.edges.map((loc) => {
            return ({ name: loc.node.name, id: loc.node.id });
        })

        History = History.concat(remain || [])

        History.reverse();

        History.pop();

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
                console.log("Products Data", data)
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


    if (error) {
        return <div>{error.message}</div>
    }

    const SetFilter = (optionSelected) => {
        setSelectedFilter(optionSelected.split(' '));
    }

    const setPriceRange = (optionSelected) => {
        setPriceSelected(optionSelected);
    }

    return (
        <>
            <div className='flex items-center justify-between mx-4 sm:mx-14 md:hidden py-5 relative'>
                {
                    filterOptionAvailable ? <div className='py-5 w-full top-full absolute z-40 md:hidden bg-greybg gap-5 rounded-lg h-min'>
                        <div className='pr-5 pl-5'>
                            <CustomeDD title="Sub Category" parentId={productId} options={allcategory?.children?.edges.map(subcategory => ({ name: subcategory.node.name, id: subcategory.node.id }))} />
                        </div>
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
                <BreadCrumps URI={pageURI} lastName={pageName} />
            </div>
            <div className='flex justify-center sm:justify-between mx-4 sm:mx-14 gap-4'>


                <div className='w-[280px] hidden md:block bg-greybg gap-5 rounded-lg h-min'>
                    <div className='pr-5 pl-5 pt-5'>
                        <CustomeDD title="Sub Category" parentId={productId} options={allcategory?.children?.edges.map(subcategory => ({ name: subcategory.node.name, id: subcategory.node.id }))} />
                    </div>
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

export default ProductListing