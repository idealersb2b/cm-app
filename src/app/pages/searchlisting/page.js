// "use client"

import React from 'react';
import { useQuery } from '@apollo/client';
import ReactPaginate from 'react-paginate';
import Dropdown from '@/app/components/Dropdown/Dropdown';
import Product from '@/app/components/Product/Product';
import { QUERY_GET_PRODUCT_CATEGORIES_AND_THEIR_CHILDREN } from '@/app/graphql/productCategories/queries';
import products from '../../../../sample_data.json';
import { useRouter } from 'next/router'; // Import useRouter

// Define the generateStaticParams function for SSG
async function generateStaticParams() {
  // Fetch dynamic data for generating static parameters
  const dynamicData = await fetchDataForStaticGeneration();

  // Generate static parameters based on the dynamic data
  const staticParams = dynamicData.map((item) => ({
    params: { search: item.searchParameter },
  }));

  // Return the array of static parameters
  return staticParams;
}

// Function marked with use client for client-side rendering
function ProductListingComponent({ query }) {
  console.log(query);

  const router = useRouter(); // Use useRouter to access the client-side router object

  const { loading, error, data } = useQuery(QUERY_GET_PRODUCT_CATEGORIES_AND_THEIR_CHILDREN, {
    variables: {
      // Use router.query to access query parameters on the client side
      search: router.query.search,
    },
  });

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error : {error.message}</div>;
  }

  return (
    <>
      <div className='flex mx-14 gap-20'>
        <div className='w-[280px] bg-greybg gap-5 rounded-lg h-min'>
          <div className='pr-5 pl-5 pt-5'>
            <Dropdown title='Sub Category' options={['Indoor Lights', 'Industry Lights', 'Office Space Lights']} />
          </div>

          <div className='pr-5 pl-5'>
            <Dropdown title='Price range' options={['Metallic', 'Plastic cover', 'Power saver']} />
          </div>
        </div>

        <div className='w-max h-max grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-14'>
          {products.map((product) => (
            <Product key={product.node.productId} product={product.node} />
          ))}
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
          nextLabel='>'
          pageCount={5}
          previousLabel='<'
          renderOnZeroPageCount={null}
        />
      </div>
    </>
  );
}

// // Export the function for CSR
// export default useClient(ProductListingComponent); // Wrap the component with useClient

// Export the function for CSR
export default ProductListingComponent;