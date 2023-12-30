// Remove the generateStaticParams function and export statement

// "use client"

// Import necessary dependencies
import { useQuery } from '@apollo/client';
import ReactPaginate from 'react-paginate';
import Dropdown from '@/app/components/Dropdown/Dropdown';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Product from '@/app/components/Product/Product';
import { QUERY_GET_PRODUCT_CATEGORY } from '@/app/graphql/productCategories/queries';
  
  // Generate static parameters based on the dynamic data
  const staticParams = dynamicData.map((item) => ({
    params: { id: item.id, search: item.searchParameter },
  }));
  
// Your React component goes here
function SearchListing({ initialData }) {
  const router = useRouter();
  const [data, setData] = useState(initialData);

  const { query } = router; // Access the query object from the router directly

  const { loading, error, data: queryData } = useQuery(QUERY_GET_PRODUCT_CATEGORY, {
    variables: {
      id: decodeURIComponent(query.id),
      search: decodeURIComponent(query.search),
    },
  });

  useEffect(() => {
    // Update the data state when queryData changes
    if (queryData) {
      setData(queryData);
    }
  }, [queryData]);

  if (loading) {
    return <div>...Loading</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <>
      <div className='flex mx-14 gap-20'>
        <div className='w-[280px] bg-greybg gap-5 rounded-lg h-min'>
          <div className='pr-5 pl-5'>
            <Dropdown title="Price range" options={['Metallic', 'Plastic cover', 'Power saver']} />
          </div>
        </div>

        <div className='w-max h-max grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-14'>
          {data.productCategory.childrens.edges.map((product) => (
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
          nextLabel=">"
          // onPageChange={handlePageClick}
          pageCount={5}
          previousLabel="<"
          renderOnZeroPageCount={null}
        />
      </div>
    </>
  );
}

export async function generateStaticParams() {
  
  const dynamicData = await fetchDataForStaticGeneration();

  const staticParams = dynamicData.map((item) => ({
    params: { search: item.searchParameter },
  }));
  
  return staticParams;
}

// Export the function for CSR
// export default useClient(SearchListing); // Wrap the component with useClient

// Export the function for CSR
export default SearchListing;
