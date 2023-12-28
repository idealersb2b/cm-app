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
import Link from 'next/link';
import { toast } from 'react-toastify';
import { GraphQLClient } from 'graphql-request';
import { MUTATION_REFRESH_AUTH_TOKEN } from '@/app/graphql/users/mutations';
import cookieCutter from 'cookie-cutter';




// const rows = [
//     { id: uuidv4(), product_image: '/product/product_img-1.png', product_name: ' Disposable straws', sku: '20', status: 'Active', stock: '20', price: '$3428', taxonomies: 'Categories:..', date_created: '22 Oct 2023' },
//     { id: uuidv4(), product_image: '/product/product_img-1.png', product_name: ' Disposable straws', sku: '20', status: 'Active', stock: '20', price: '$3428', taxonomies: 'Categories:..', date_created: '22 Oct 2023' },
//     { id: uuidv4(), product_image: '/product/product_img-1.png', product_name: ' Disposable straws', sku: '20', status: 'Active', stock: '20', price: '$3428', taxonomies: 'Categories:..', date_created: '22 Oct 2023' }
// ];

function Products() {
    const getNewAuthToken = async () => {
        const graphQLClient = new GraphQLClient("https://dev.cleantech-mart.com/graphql");
        const refreshToken = cookieCutter.get('refreshToken')

        if (!refreshToken) {
            return;
        }

        const results = await graphQLClient.request(MUTATION_REFRESH_AUTH_TOKEN, { refreshToken });

        return results.refreshJwtAuthToken.authToken
    };
    
    const columns = [
        {
            field: "Serial Number",
            headerName: "Number",
            filterable: false,
            sortable: false,
            width: 100,
            renderCell: (params) => {
                return params.row.rowIndex + 1
            },
        },
        {
            field: 'product_name', headerName: 'PRODUCT NAME', width: 200, sortable: false, renderCell: (params) => <div className='flex items-center gap-2'>
                <div>
                    {params.row.name}
                </div>
            </div>
        },
        { field: 'status', headerName: 'STATUS', width: 100, sortable: false, },
        { field: 'id', headerName: 'ID', width: 100, sortable: false, },
        { field: 'stock_quantity', headerName: 'STOCK', type: 'number', width: 100, sortable: false, },
        { field: 'price', headerName: 'PRICE', sortable: false, width: 100 },
        { field: 'slug', headerName: 'Product Slug', sortable: false, width: 100 },
        { field: 'short_description', headerName: 'Short Description', width: 100, sortable: false, },
        { field: 'date_created', headerName: 'DATE CREATED', width: 100, sortable: false },
        {
            field: 'action', headerName: 'ACTION', width: 100, sortable: false, renderCell: (params) => <div className='flex items-center gap-3'>
                <a  className="text-gray-500 hover:text-primary" onClick={()=>del(params.id)}>
                    <MdDeleteOutline size={24} />
                </a>
                <a  className="text-gray-500 hover:text-primary" onClick={()=>edit(params.id,0)}>
                    <AiOutlineEye size={24} />
                </a>
                <Link href="/pages/home/vendor/products/editProduct/27288"  className="text-gray-500 hover:text-primary" >
                    <AiOutlineEye size={24} />
                </Link>
            </div>
        },
    ];
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const [productArray, setProductArray] = useState([]);

    const fetchApiCall = () => {

        const VendorId = localStorage ? localStorage.getItem('customerId') : null

        if (!VendorId) {
            toast.error("Login Please");
            router.back('/login');
            return;
        }

        const endpoint = `https://www.dev.cleantech-mart.com/wp-json/wcfmmp/v1/store-vendors/${VendorId}/products/`;

        // Fetch request parameters
        const requestOptions = {
            method: 'GET',
        };

        setIsLoading(true);

        fetch(endpoint, requestOptions)
            .then(response => response.json())
            .then(data => {
                console.log("Data", data);
                setProductArray(data.map((item, index) => ({ rowIndex: index, ...item })));
            })
            .catch(error => {
                toast.error(error.message)
            })
            .finally(() => {
                setIsLoading(false);
            })
    }
    const del =async(id)=>{
        const authToken = await getNewAuthToken();
        let headersList = {
            "Authorization": `Bearer ${authToken}`,
            "Content-Type": "application/json"
        }
        try{
        let a = await fetch(`https://dev.cleantech-mart.com/wp-json/wcfmmp/v1/products/${id}`,{
            method: "DELETE",
            headers: headersList
        });
        let js = await a.json();
        if(!js){
            throw new Error("Something went Wrong!");
        }
        toast.success("product deleted Successfully")
        fetchApiCall();
        console.log(js);
    }
    catch(err){
        console.log(err)
        toast.error(err.message)
    }
    }
    const edit = async(id,upd)=>{
        try{
            const authToken = await getNewAuthToken();
            let headersList = {
                "Authorization": `Bearer ${authToken}`,
                "Content-Type": "application/json"
            }
            let a = await fetch(`https://dev.cleantech-mart.com/wp-json/wcfmmp/v1/products/${id}`,{
                method: "PUT",
                headers: headersList,
                body: JSON.stringify({ "name":"tryedit"}),
            });
            let js = await a.json();
            console.log(js,"edited");
        }
        catch(err){
            console.log(err)
        }
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
                {/* <Select className='w-32' /> */}
                <div className='flex gap-3'>
                    {/* <input placeholder='Search' className='w-40 h-full outline-none rounded self-end' /> */}
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

export default Products