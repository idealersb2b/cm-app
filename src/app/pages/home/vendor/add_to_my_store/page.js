"use client"

import { DataGrid } from '@mui/x-data-grid'
import React from 'react'
import { AiOutlineEye } from 'react-icons/ai'
import { BsThreeDotsVertical } from 'react-icons/bs'
import { MdDeleteOutline } from 'react-icons/md'
import Select from 'react-select'
import { v4 as uuidv4 } from 'uuid'

function Add_to_my_store() {

    const columns = [
        {
            field: 'product_name', headerName: 'PRODUCT NAME', width: 200, sortable: false, renderCell: (params) => <div className='flex items-center'>
                <div className='flex items-center rounded-full'>
                    <img className='h-[35px] w-[35px] ' src={params.row.product_image} />
                </div>
                {params.row.product_name}
            </div>
        },
        { field: 'price', headerName: 'PRICE', sortable: false, width: 100 },
        { field: 'taxonomies', headerName: 'TAXONOMIES', width: 350, sortable: false },
        { field: 'store', headerName: 'STORE', width: 100, sortable: false },
        {
            field: 'action', headerName: 'ACTION', width: 100, sortable: false, renderCell: (params) => <div className='flex items-center gap-3'>
                <a href="#" className="text-gray-500 hover:text-primary">
                    <MdDeleteOutline size={24} />
                </a>
                <a href="#" className="text-gray-500 hover:text-primary">
                    <AiOutlineEye size={24} />
                </a>
                <a href="#" className="text-gray-500 hover:text-primary">
                    <BsThreeDotsVertical size={24} />
                </a>
            </div>
        },
    ];

    const rows = [
        {
            id: uuidv4(), product_image: '/product/product_img-1.png', product_name: ' Disposable straws', price: '$3428', taxonomies: `Categories: Eco Friendly products, Eco Medical Supplies,
        Foot Operated Santitizer Stand Locations: Delhi, Narela`, store: 'ABCD'
        },
        {
            id: uuidv4(), product_image: '/product/product_img-1.png', product_name: ' Disposable straws', price: '$3428', taxonomies: `Categories: Eco Friendly products, Eco Medical Supplies,
        Foot Operated Santitizer Stand Locations: Delhi, Narela`, store: 'ABCD'
        },
        {
            id: uuidv4(), product_image: '/product/product_img-1.png', product_name: ' Disposable straws', price: '$3428', taxonomies: `Categories: Eco Friendly products, Eco Medical Supplies,
        Foot Operated Santitizer Stand Locations: Delhi, Narela`, store: 'ABCD'
        },
    ];

    return (
        <div className='mt-9 rounded shadow-md h-max w-full bg-white px-6 pb-6 overflow-hidden'>
            <div className='hidden sm:flex w-full justify-between bg-red px-5 py-6'>
                <Select className='w-32' />
                <div className='flex gap-3'>
                    <input placeholder='Search' className='w-40 h-full outline-none rounded self-end' />
                    <button className='bg-primary px-6 py-2 text-white rounded'>Add Product</button>
                </div>
            </div>

            <div className='sm:hidden w-full flex flex-wrap justify-between bg-red py-6 gap-4'>
                <div className='flex w-full flex-row justify-between'>
                    <Select className='w-32 h-10' />
                    <button className='bg-primary px-6 py-2 text-white rounded text-sm h-10'>Add</button>
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
                    rows={rows}
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

export default Add_to_my_store