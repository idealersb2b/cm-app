"use client"

import Product from '@/app/components/Product/Product';
import ReactPaginate from 'react-paginate';
import Dropdown from '@/app/components/Dropdown/Dropdown';
import { QUERY_GET_MORE_PRODUCT_CATEGORY } from '@/app/graphql/productCategories/queries';
import { useQuery } from '@apollo/client';
import Shimmer_Product from '@/app/components/Shimmer/Shimmer_Product';
import { v4 as uuidv4 } from 'uuid';

function ProductListing({ params }) {

    const productId = params.subid2;

    const { loading, error, data } = useQuery(QUERY_GET_MORE_PRODUCT_CATEGORY, {
        variables: {
            productId: decodeURIComponent(productId)
        }
    });

    console.log("Product List", data);


    if (error) {
        return <div>{error.message}</div>
    }

    console.log(data?.productCategory?.children?.edges.map(subcategory => subcategory.node.name))

    return (
        <>
            <div className='flex mx-14 gap-20'>
                <div className='w-[280px] bg-greybg gap-5 rounded-lg h-min'>
                    <div className='pr-5 pl-5 pt-5'>
                        <Dropdown title="Sub Category" parentId={productId} options={data?.productCategory?.children?.edges.map(subcategory => ({ name: subcategory.node.name, id: subcategory.node.id }))} />
                    </div>

                    <div className='pr-5 pl-5'>
                        <Dropdown title="Price range" options={['Metallic', 'Plastic cover', 'Power saver']} />
                    </div>
                </div>

                <div className='w-max h-max grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-14'>
                    {
                        data?.productCategory?.products?.edges.map((product) =>
                            <Product key={product.node.productId} product={product.node} />
                        )
                    }

                    {
                        loading && <>
                            <Shimmer_Product key={uuidv4()} />
                            <Shimmer_Product key={uuidv4()} />
                            <Shimmer_Product key={uuidv4()} />
                            <Shimmer_Product key={uuidv4()} />
                            <Shimmer_Product key={uuidv4()} />
                            <Shimmer_Product key={uuidv4()} />
                            <Shimmer_Product key={uuidv4()} />
                            <Shimmer_Product key={uuidv4()} />
                            <Shimmer_Product key={uuidv4()} />
                            <Shimmer_Product key={uuidv4()} />
                            <Shimmer_Product key={uuidv4()} />
                            <Shimmer_Product key={uuidv4()} />


                        </>
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

export default ProductListing