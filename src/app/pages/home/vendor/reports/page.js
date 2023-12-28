"use client"

import React from 'react'
import { AiOutlineEye } from 'react-icons/ai'
import { BsBarChartFill, BsThreeDotsVertical } from 'react-icons/bs'
import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { MdDeleteOutline } from 'react-icons/md'
import Select from 'react-select'

const data = [
    {
        name: 'Page A',
        uv: 4000,
        pv: -2400,
        amt: 2400,
    },
    {
        name: 'Page B',
        uv: 3000,
        pv: 1398,
        amt: 2210,
    },
    {
        name: 'Page C',
        uv: 2000,
        pv: 9800,
        amt: 2290,
    },
    {
        name: 'Page D',
        uv: 2780,
        pv: 3908,
        amt: 2000,
    },
    {
        name: 'Page E',
        uv: 1890,
        pv: 4800,
        amt: 2181,
    },
    {
        name: 'Page F',
        uv: 2390,
        pv: 3800,
        amt: 2500,
    },
    {
        name: 'Page G',
        uv: 3490,
        pv: 4300,
        amt: 2100,
    },
];

function Reports() {
    return (
        <div className='mt-9 rounded shadow-md h-max w-full bg-white mx-6'>
            <div className='flex flex-col gap-6 w-full'>
                <div className='flex flex-wrap gap-6'>
                    <div className='flex-1 p-5 flex items-center flex-row bg-white rounded gap-3 shadow' >
                        <div className='w-10 h-10 p-2 shadow-md flex items-center justify-center bg-white'>
                            <BsBarChartFill size={20} color='#FFB400' />
                        </div>
                        <div className='flex flex-col justify-between text-lightgrey'>
                            <h5 className='text-xs'>Processing</h5>
                            <p className='text-xl font-medium'>2,856</p>
                        </div>
                    </div>
                    <div className='flex-1 p-5 flex items-center flex-row bg-white rounded gap-3 shadow' >
                        <div className='w-10 h-10 p-2 shadow-md flex items-center justify-center bg-white'>
                            <BsBarChartFill size={20} color='#FFB400' />
                        </div>
                        <div className='flex flex-col justify-between text-lightgrey'>
                            <h5 className='text-xs'>Processing</h5>
                            <p className='text-xl font-medium'>2,856</p>
                        </div>
                    </div>
                    <div className='flex-1 p-5 flex items-center flex-row bg-white rounded gap-3 shadow' >
                        <div className='w-10 h-10 p-2 shadow-md flex items-center justify-center bg-white'>
                            <BsBarChartFill size={20} color='#FFB400' />
                        </div>
                        <div className='flex flex-col justify-between text-lightgrey'>
                            <h5 className='text-xs'>Processing</h5>
                            <p className='text-xl font-medium'>2,856</p>
                        </div>

                    </div>
                    <div className='flex-1 p-5 flex items-center flex-row bg-white rounded gap-3 shadow' >
                        <div className='w-10 h-10 p-2 shadow-md flex items-center justify-center bg-white'>
                            <BsBarChartFill size={20} color='#FFB400' />
                        </div>
                        <div className='flex flex-col justify-between text-lightgrey'>
                            <h5 className='text-xs'>Processing</h5>
                            <p className='text-xl font-medium'>2,856</p>
                        </div>
                    </div>
                </div>
                <div className='flex flex-wrap gap-6'>
                    <div className='flex-1 p-5 flex items-center flex-row bg-white rounded gap-3 shadow' >
                        <div className='w-10 h-10 p-2 shadow-md flex items-center justify-center bg-white'>
                            <BsBarChartFill size={20} color='#FFB400' />
                        </div>
                        <div className='flex flex-col justify-between text-lightgrey'>
                            <h5 className='text-xs'>Processing</h5>
                            <p className='text-xl font-medium'>2,856</p>
                        </div>

                    </div>
                    <div className='flex-1 p-5 flex items-center flex-row bg-white rounded gap-3 shadow' >
                        <div className='w-10 h-10 p-2 shadow-md flex items-center justify-center bg-white'>
                            <BsBarChartFill size={20} color='#FFB400' />
                        </div>
                        <div className='flex flex-col justify-between text-lightgrey'>
                            <h5 className='text-xs'>Processing</h5>
                            <p className='text-xl font-medium'>2,856</p>
                        </div>

                    </div>
                    <div className='flex-1 p-5 flex items-center flex-row bg-white rounded gap-3 shadow' >
                        <div className='w-10 h-10 p-2 shadow-md flex items-center justify-center bg-white'>
                            <BsBarChartFill size={20} color='#FFB400' />
                        </div>
                        <div className='flex flex-col justify-between text-lightgrey'>
                            <h5 className='text-xs'>Processing</h5>
                            <p className='text-xl font-medium'>2,856</p>
                        </div>

                    </div>
                    <div className='flex-1 p-5 flex items-center flex-row bg-white rounded gap-3 shadow' >
                        <div className='w-10 h-10 p-2 shadow-md flex items-center justify-center bg-white'>
                            <BsBarChartFill size={20} color='#FFB400' />
                        </div>
                        <div className='flex flex-col justify-between text-lightgrey'>
                            <h5 className='text-xs'>Processing</h5>
                            <p className='text-xl font-medium'>2,856</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className='w-full flex justify-between bg-red px-5 py-6'>
                Sales report by Date
            </div>
            <div className="w-full h-full shadow-md sm:rounded-lg">
                <ResponsiveContainer
                    width={"100%"}
                    height={500}
                >
                    <BarChart
                        width={"100%"}
                        height={500}
                        data={data}
                        margin={{
                            top: 5,
                            right: 30,
                            left: 20,
                            bottom: 5,
                        }}
                    >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="pv" fill="#8884d8" />
                        <Bar dataKey="uv" fill="#82ca9d" />
                        <Bar dataKey="amt" fill="#FFB400" />
                    </BarChart>
                </ResponsiveContainer>

            </div>
        </div>
    )
}

export default Reports