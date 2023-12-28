"use client"

import React, { useEffect, useState } from 'react'
import { AiOutlineEye } from 'react-icons/ai'
import { BsThreeDotsVertical } from 'react-icons/bs'
import { MdDeleteOutline } from 'react-icons/md'
import Select from 'react-select'
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';
import { v4 as uuidv4 } from 'uuid'
import { Avatar, Box } from '@mui/material'
import { useRouter } from 'next/navigation'
import useApiWithCustomHeader from '../../../../../../useApiWithCustomHeader';
import Link from 'next/link'
import { toast } from 'react-toastify'


const columns = [
    {
        field: 'product_name', headerName: 'PRODUCT NAME', width: 200, sortable: false, renderCell: (params) => <div className='flex items-center gap-2'>
            <div className='flex items-center rounded-full h-[35px] w-[35px]'>
                <img className='h-[35px] w-[35px]' src={params.row.images[0].src} />
            </div>
            <div>
                {params.row.name}
            </div>
        </div>
    },
    { field: 'sku', headerName: 'SKU', width: 100, sortable: false, },
    { field: 'status', headerName: 'STATUS', width: 100, sortable: false, },
    { field: 'stock_quantity', headerName: 'STOCK', type: 'number', width: 100, sortable: false, },
    { field: 'price', headerName: 'PRICE', sortable: false, width: 100 },
    { field: 'taxonomies', headerName: 'TAXONOMIES', width: 100, sortable: false },
    { field: 'date_created', headerName: 'DATE CREATED', width: 100, sortable: false },
    // {
    //     field: 'action', headerName: 'ACTION', width: 100, sortable: false, renderCell: (params) => <div className='flex items-center gap-3'>
    //         <a href="#" className="text-gray-500 hover:text-primary">
    //             <MdDeleteOutline size={24} />
    //         </a>
    //         <a href="#" className="text-gray-500 hover:text-primary">
    //             <AiOutlineEye size={24} />
    //         </a>
    //         <a href="#" className="text-gray-500 hover:text-primary">
    //             <BsThreeDotsVertical size={24} />
    //         </a>
    //     </div>
    // },
];

// const rows = [
//     { id: uuidv4(), product_image: '/product/product_img-1.png', product_name: ' Disposable straws', sku: '20', status: 'Active', stock: '20', price: '$3428', taxonomies: 'Categories:..', date_created: '22 Oct 2023' },
//     { id: uuidv4(), product_image: '/product/product_img-1.png', product_name: ' Disposable straws', sku: '20', status: 'Active', stock: '20', price: '$3428', taxonomies: 'Categories:..', date_created: '22 Oct 2023' },
//     { id: uuidv4(), product_image: '/product/product_img-1.png', product_name: ' Disposable straws', sku: '20', status: 'Active', stock: '20', price: '$3428', taxonomies: 'Categories:..', date_created: '22 Oct 2023' }
// ];

function Orders() {

    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const [productArray, setProductArray] = useState([]);

    const fetchApiCall = () => {
        const endpoint = 'https://www.dev.cleantech-mart.com/wp-json/wcfmmp/v1/orders/21011';


        //Headers
        const headers = new Headers();
        headers.append('Content-Type', 'application/json');

        const bearerToken = localStorage.getItem('authToken');
        headers.append('Authorization', `Bearer ${bearerToken}`);

        // Fetch request parameters
        const requestOptions = {
            method: 'GET',
            headers: headers,
            // You can add other options here like body for POST requests or query parameters
        };

        setIsLoading(true);

        fetch(endpoint, requestOptions)
            .then(response => response.json())
            .then(data => {
                console.log(data);
            })
            .catch(error => {
                toast.error(error.message)
            })
            .finally(() => {
                setIsLoading(false);
            })
    }

    useEffect(() => {
        fetchApiCall();
    }, [])


    if (isLoading) {
        return <div className='w-full h-96 flex justify-center items-center'>
            <div className='h-20 w-20' id='lottie-loading'></div>
        </div>
    }

    return (
        <div className='mt-9 rounded shadow-md h-max w-full bg-white px-6 pb-6 overflow-hidden'>
            <div className='hidden sm:flex w-full justify-between bg-red px-5 py-6'>
                <Select className='w-32' />
                <div className='flex gap-3'>
                    <input placeholder='Search' className='w-40 h-full outline-none rounded self-end' />
                    <button onClick={() => router.push('/pages/home/vendor/products/addProduct')} className='bg-primary px-6 py-2 text-white rounded'>Add Product</button>
                </div>
            </div>

            <div className='sm:hidden w-full flex flex-wrap justify-between bg-red py-6 gap-4'>
                <div className='flex w-full flex-row justify-between'>
                    <Select className='w-32 h-10' />
                    <Link href="/pages/home/vendor/products/addProduct" className='bg-primary px-6 py-2 text-white rounded text-sm h-10'>Add</Link>
                </div>
                <div className='flex gap-3 h-10 w-full'>
                    <input placeholder='Search' className='w-full h-full outline-none rounded self-end' />
                </div>
            </div>
            <div style={{ width: '100%' }}>
                <DataGrid
                    disableRowSelectionOnClick
                    disableColumnMenu
                    checkboxSelection
                    rows={productArray}
                    columns={columns}
                    initialState={{
                        pagination: {
                            paginationModel: { page: 0, pageSize: 10 },
                        },
                    }}
                    pageSizeOptions={[5, 10]}
                />
            </div>
        </div>
    )
}

export default Orders