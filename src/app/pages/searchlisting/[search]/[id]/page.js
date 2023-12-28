"use client"

import Product from '@/app/components/Product/Product';
import products from '../../../../../../sample_data.json';
import ReactPaginate from 'react-paginate';
import Dropdown from '@/app/components/Dropdown/Dropdown';
import { useParams } from 'next/navigation'
import { useQuery } from '@apollo/client';
import { QUERY_GET_PRODUCT_CATEGORY } from '@/app/graphql/productCategories/queries';

function SearchListing({ params }) {

    const { loading, error, data } = useQuery(QUERY_GET_PRODUCT_CATEGORY, {
        variables: {
            id: decodeURIComponent(params.id),
            search: decodeURIComponent(params.search),
        }
    });

    if (loading) {
        return <div>...Loading</div>
    }

    if (error) {
        console.log(error)
        return <div>Error</div>
    }

    console.log("Searched Data", data);

    return (
        <>
            <div className='flex mx-14 gap-20'>
                <div className='w-[280px] bg-greybg gap-5 rounded-lg h-min'>
                    <div className='pr-5 pl-5'>
                        <Dropdown title="Price range" options={['Metallic', 'Plastic cover', 'Power saver']} />
                    </div>
                </div>

                <div className='w-max h-max grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-14'>
                    {
                        data.productCategory.childrens.edges.map((product) =>
                            <Product key={product.node.productId} product={product.node} />
                        )
                    }
                </div>
            </div>
            <div className='flex justify-end mx-14'>
                <ReactPaginate
                    className='flex border border-littledarkgrey rounded'
                    pageClassName='w-10 h-11 flex justify-center items-center text-base text-lightgrey bg-white font-medium border border-littledarkgrey'
                    nextClassName='w-10 h-11 flex justify-center items-center'
                    previousClassName='w-10 h-11 flex justify-center items-center'
                    activeLinkClassName='text-primary'
                    disabledLinkClassName='text-lightgrey'
                    activeClassName='text-primary bg-littledarkgrey'
                    nextLabel=">"
                    // onPageChange={handlePageClick}
                    pageCount={5}
                    previousLabel="<"
                    renderOnZeroPageCount={null}
                />
            </div>
        </>
    )
}

export default SearchListing