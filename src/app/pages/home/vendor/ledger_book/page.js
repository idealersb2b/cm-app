"use client"

import { DataGrid } from '@mui/x-data-grid'
import React from 'react'
import { AiOutlineEye } from 'react-icons/ai'
import { BsFillBarChartFill, BsThreeDotsVertical } from 'react-icons/bs'
import { FaChartLine } from 'react-icons/fa'
import { MdDeleteOutline } from 'react-icons/md'
import Select from 'react-select'
import { v4 as uuidv4 } from 'uuid';

function Ledger_Book() {

    const columns = [
        { field: 'type', headerName: 'Type', width: 150, sortable: false, },
        { field: 'details', headerName: 'DETAILS', width: 150, sortable: false, },
        { field: 'credit', headerName: 'CREDIT', type: 'number', width: 150, sortable: false, },
        { field: 'debit', headerName: 'DEBIT', sortable: false, width: 150 },
        { field: 'date', headerName: 'DATE', width: 150, sortable: false },
    ];

    const rows = [
        { id: uuidv4(), type: 'ABCD', details: 'Lorem ipsum dolor sit', credit: '$3428', debit: '$3428', date: '22 Oct 2023' },
        { id: uuidv4(), type: 'ABCD', details: 'Lorem ipsum dolor sit', credit: '$3428', debit: '$3428', date: '22 Oct 2023' },
        { id: uuidv4(), type: 'ABCD', details: 'Lorem ipsum dolor sit', credit: '$3428', debit: '$3428', date: '22 Oct 2023' },
    ];


    return (
        <div className='mt-9 rounded shadow-md h-max w-full bg-white px-6 pb-6 overflow-hidden'>
            <div className='flex flex-wrap' >
                <div className='p-5 flex items-center flex-row gap-3 w-1/3'>
                    <div className='shadow-md rounded p-3 flex justify-center items-center'>
                        <BsFillBarChartFill size={14} color='#FFB400' />
                    </div>
                    <div className='flex flex-col'>
                        <span className='text-xs text-lightgrey'>Total earning</span>
                        <span className='font-medium text-xl text-lightgrey'>2,856</span>
                    </div>
                </div>
                <div className='p-5 flex items-center flex-row gap-3 w-1/3'>
                    <div className='shadow-md rounded p-3 flex justify-center items-center'>
                        <FaChartLine size={14} color='#16B1FF' />
                    </div>
                    <div className='flex flex-col'>
                        <span className='text-xs text-lightgrey'>Total Refund</span>
                        <span className='font-medium text-xl text-lightgrey'>2,856</span>
                    </div>
                </div>
                <div className='p-5 flex items-center flex-row gap-3 w-1/3'>
                    <div className='shadow-md rounded p-3 flex justify-center items-center'>
                        <BsFillBarChartFill size={14} color='#FFB400' />
                    </div>
                    <div className='flex flex-col'>
                        <span className='text-xs text-lightgrey'>Total earning</span>
                        <span className='font-medium text-xl text-lightgrey'>2,856</span>
                    </div>
                </div>
            </div>
            <div className='w-full flex justify-between bg-red px-5 py-6'>
                <Select className='w-32' />
                <div className='flex gap-6'>
                    <input placeholder='Search' className='w-40 h-full outline-none rounded' />
                    <button className='bg-primary px-6 py-2 text-white rounded'>Add Product</button>
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

export default Ledger_Book