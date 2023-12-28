"use client"

import { BsBarChartFill, BsChevronDown, BsThreeDotsVertical } from 'react-icons/bs'
import { useLazyQuery } from '@apollo/client';
import { GET_STORE_VENDOR_DETAILS} from "../../../../graphql/userData/queries";
import React, { PureComponent, useEffect, useState } from 'react';
import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, LineChart, Line, Rectangle, ResponsiveContainer } from 'recharts';
import { PieChart, Pie, Sector } from 'recharts';


const Piedata = [
    { name: 'Group A', value: 400 },
    { name: 'Group B', value: 300 },
    { name: 'Group C', value: 300 },
    { name: 'Group D', value: 200 },
];
const PIECOLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

const data = [
    {
        name: 'Page A',
        uv: 4000,
    },
    {
        name: 'Page B',
        uv: 3000,
    },
    {
        name: 'Page C',
        uv: 2000,
    },
    {
        name: 'Page D',
        uv: 2780,
    },
    {
        name: 'Page E',
        uv: 1890,
    },
    {
        name: 'Page F',
        uv: 2390,
    },
    {
        name: 'Page G',
        uv: 3490,
    },
];

const Linedata = [
    {
        name: 'Page A',
        uv: 4000,
        pv: 2400,
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

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

const CustomBar = (props) => {
    const { x, y, width, height, fill } = props;
    const radius = 2; // Adjust the radius as needed

    return (
        <g>
            <Rectangle className='rounded-full' x={x} y={y} width={width} height={height} fill={fill} />
            <circle cx={x + width / 2} cy={y} r={2} fill={fill} />
        </g>
    );
};


function Dashboard() {
    const [vendorDetails] = useLazyQuery(GET_STORE_VENDOR_DETAILS);
    const [vendorInfo, setVendorInfo] = useState()

    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        vendorDetails({variables:{
            vendorId:localStorage.getItem("userId")
        }}).then(e => setVendorInfo(e.data))
        setIsClient(true);
    }, []);

    return (
        <div className='mt-7 flex flex-col gap-6 mx-2 sm:mx-5'>
            <div className='flex flex-row flex-wrap gap-6'>
                <div className='flex flex-col gap-6'>
                    <div className='flex flex-row gap-3 bg-primary rounded px-2 sm:px-7 relative h-[120px] sm:h-[150px]'>
                        <div className='flex flex-col justify-between py-5'>
                            <h3 className='text-white font-medium text-base sm:text-xl'>Good morning {vendorInfo?.user?.name}</h3>
                            <span className='text-white text-xs md:text-sm'>
                                Gautham your sales have increased by 78% from last week,
                                check your total sales of this month.
                            </span>
                        </div>
                        <div className='w-full h-full'>
                            <img src='/assets/3d-image-2 1.png' className=' absolute h-[110%] bottom-0  right-2 sm:right-7' />
                        </div>
                    </div>
                    <div className='flex flex-col sm:flex-row gap-6'>
                        <div className='flex flex-col justify-between h-[180px] p-5 flex-1 bg-white rounded shadow'>
                            <div className='flex justify-between'>
                                <h4 className='font-medium text-xl'>No of orders</h4>
                                <BsThreeDotsVertical />
                            </div>
                            <div className='flex flex-col'>
                                <h3 className='text-4xl font-medium text-lightgrey' >84,895</h3>
                                <div className='text-sm text-lightgrey'>Compared to 74,125 last month</div>
                            </div>
                        </div>
                        <div className='flex flex-col justify-between h-[180px] p-5 flex-1 bg-white rounded shadow'>
                            <div className='flex justify-between'>
                                <h4 className='font-medium text-xl'>No of orders</h4>
                                <BsThreeDotsVertical />
                            </div>
                            <div className='flex flex-col'>
                                <h3 className='text-4xl font-medium text-lightgrey' >84,895</h3>
                                <div className='text-sm text-lightgrey'>Compared to 74,125 last month</div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className='p-5 flex-1 flex flex-col items-center justify-between bg-white rounded gap-4 shadow'>
                    <h3 className='font-medium text-xl gap-4 text-lightgrey self-start' >Total Customers</h3>
                    <div className='w-[200px] h-[200px]'>
                        <div className='w-full h-full rounded-full border-[12px] p-3 border-primary'>
                            <div className='w-full h-full rounded-full border-[12px] p-3 border-[#56ca00]'>
                                <div className='flex justify-center items-center w-full h-full rounded-full border-[12px] border-[#ffb400] font-medium text-2xl text-lightgrey'>
                                    89K
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='flex w-full justify-between'>
                        <div className='flex flex-col gap-1'>
                            <div className='flex gap-2 items-center'>
                                <span className='w-3 h-3 rounded-full bg-primary inline-block'></span>
                                <span className='text-sm font-semibold text-lightgrey'>78,409</span>
                            </div>
                            <div className='text-xs'>
                                <span>Active </span>
                                <span className='inline'>11.9% <BsChevronDown className='text-red-500 inline' size={4.5} /></span>
                            </div>

                        </div>
                        <div className='flex flex-col gap-1'>
                            <div className='flex gap-2 items-center'>
                                <span className='w-3 h-3 rounded-full bg-primary inline-block'></span>
                                <span className='text-sm font-semibold text-lightgrey'>78,409</span>
                            </div>
                            <div className='text-xs'>
                                <span>Active </span>
                                <span className='inline'>11.9% <BsChevronDown className='text-red-500 inline' size={4.5} /></span>
                            </div>

                        </div>
                        <div className='flex flex-col gap-1'>
                            <div className='flex gap-2 items-center'>
                                <span className='w-3 h-3 rounded-full bg-primary inline-block'></span>
                                <span className='text-sm font-semibold text-lightgrey'>78,409</span>
                            </div>
                            <div className='text-xs'>
                                <span>Active </span>
                                <span className='inline'>11.9% <BsChevronDown className='text-red-500 inline' size={4.5} /></span>
                            </div>

                        </div>
                    </div>

                </div>
            </div>
            <div className='w-full flex lg:flex-row flex-col gap-6'>
                {
                    isClient ?
                        <>
                            <div className='w-full bg-white shadow-md rounded'>
                                <h3 className='text-xl font-medium p-5 text-lightgrey'>Sales report by Date</h3>
                                <ResponsiveContainer width={"100%"} height={275}>
                                    <BarChart
                                        barSize={5}
                                        title='Sales report by Date'
                                        height={275}
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
                                        <Bar
                                            dataKey="uv"
                                            fill="#00B517"
                                            shape={<CustomBar radius={2} />} // Adjust the radius as needed
                                        />
                                    </BarChart>
                                </ResponsiveContainer>

                            </div>
                        </> : null
                }

                <div className='w-full bg-white flex flex-col shadow-md' >
                    <div className='flex justify-between items-center'>
                        <h3 className='sm:text-xl text-xs font-medium p-5 text-lightgrey'>Sales by Product</h3>
                        <BsThreeDotsVertical size={24} className='cursor-pointer' />
                    </div>
                    <div className='flex flex-col sm:flex-row'>
                        {
                            isClient ? <div className='flex flex-1'>
                                <ResponsiveContainer minWidth={130} height={224}>
                                    <PieChart width={225} height={224}>
                                        <Pie
                                            data={Piedata}
                                            innerRadius={60}
                                            outerRadius={80}
                                            fill="#8884d8"
                                            paddingAngle={5}
                                            dataKey="value"
                                        >
                                            {Piedata.map((entry, index) => (
                                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                            ))}
                                        </Pie>
                                    </PieChart>
                                </ResponsiveContainer>

                            </div> : null
                        }

                        <div className='flex flex-col flex-1 text-lightgrey justify-between px-3 py-2'>
                            <div className='text-[10px] sm:text-base'>
                                <h4>Total number of Sales</h4>
                                <p>2400</p>
                            </div>
                            <div className='grid grid-cols-2 gap-x-2 gap-y-4 text-[8px] sm:text-base'>
                                <div className='flex gap-1 flex-col'>
                                    <div className='flex items-center'>
                                        <span className='w-3 h-3 inline-block rounded-full bg-primary mr-1'></span>
                                        <h5>Product 1</h5>
                                    </div>
                                    <div>350</div>
                                </div>
                                <div className='flex gap-1 flex-col'>
                                    <div className='flex items-center'>
                                        <span className='w-3 h-3 inline-block rounded-full bg-primary mr-1'></span>
                                        <h5>Product 1</h5>
                                    </div>
                                    <div>350</div>
                                </div>
                                <div className='flex gap-1 flex-col'>
                                    <div className='flex items-center'>
                                        <span className='w-3 h-3 inline-block rounded-full bg-primary mr-1'></span>
                                        <h5>Product 1</h5>
                                    </div>
                                    <div>350</div>
                                </div>
                                <div className='flex gap-1 flex-col'>
                                    <div className='flex items-center'>
                                        <span className='w-3 h-3 inline-block rounded-full bg-primary mr-1'></span>
                                        <h5>Product 1</h5>
                                    </div>
                                    <div>350</div>
                                </div>

                            </div>
                        </div>
                    </div>


                </div>
            </div>

            <div className='flex flex-wrap gap-6'>
                <div className='flex-1 p-5 flex items-center flex-row bg-white rounded gap-3 shadow-md' >
                    <div className='w-10 h-10 p-2 shadow-md flex items-center justify-center bg-white'>
                        <BsBarChartFill size={20} color='#FFB400' />
                    </div>
                    <div className='flex flex-col justify-between text-lightgrey'>
                        <h5 className='text-xs'>Processing</h5>
                        <p className='text-xl font-medium'>2,856</p>
                    </div>

                </div>
                <div className='flex-1 p-5 flex items-center flex-row bg-white rounded gap-3 shadow-md' >
                    <div className='w-10 h-10 p-2 shadow-md flex items-center justify-center bg-white'>
                        <BsBarChartFill size={20} color='#FFB400' />
                    </div>
                    <div className='flex flex-col justify-between text-lightgrey'>
                        <h5 className='text-xs'>Processing</h5>
                        <p className='text-xl font-medium'>2,856</p>
                    </div>

                </div>
                <div className='flex-1 p-5 flex items-center flex-row bg-white rounded gap-3 shadow-md' >
                    <div className='w-10 h-10 p-2 shadow-md flex items-center justify-center bg-white'>
                        <BsBarChartFill size={20} color='#FFB400' />
                    </div>
                    <div className='flex flex-col justify-between text-lightgrey'>
                        <h5 className='text-xs'>Processing</h5>
                        <p className='text-xl font-medium'>2,856</p>
                    </div>

                </div>
                <div className='flex-1 p-5 flex items-center flex-row bg-white rounded gap-3 shadow-md' >
                    <div className='w-10 h-10 p-2 shadow-md flex items-center justify-center bg-white'>
                        <BsBarChartFill size={20} color='#FFB400' />
                    </div>
                    <div className='flex flex-col justify-between text-lightgrey'>
                        <h5 className='text-xs'>Processing</h5>
                        <p className='text-xl font-medium'>2,856</p>
                    </div>
                </div>
            </div>

            <div className='flex flex-col lg:flex-row gap-6'>
                <div className='flex flex-col bg-white shadow-md w-full'>
                    <div className='flex justify-between items-center p-5'>
                        <h3 className='text-xl font-medium text-lightgrey'>Total Inquires</h3>
                        <BsThreeDotsVertical size={20} className='cursor-pointer' />
                    </div>
                    {
                        !isClient ? null :
                            <ResponsiveContainer
                                height={280}
                                width={"100%"} >
                                <LineChart
                                    width={"100%"}
                                    height={280}
                                    data={Linedata}
                                    margin={{
                                        top: 10,
                                        right: 30,
                                        left: 0,
                                        bottom: 0,
                                    }}
                                >
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis dataKey="name" />
                                    <YAxis />
                                    <Tooltip />
                                    <Line connectNulls type="monotone" dataKey="uv" stroke="#8884d8" fill="#8884d8" />
                                </LineChart>
                            </ResponsiveContainer>
                    }

                </div>
                <div className='flex flex-col gap-3 w-full p-5 bg-white shadow-md'>
                    <div className='flex justify-between items-center'>
                        <h3 className='text-xl font-medium text-lightgrey'>Total Inquires</h3>
                        <BsThreeDotsVertical size={20} className='cursor-pointer' />
                    </div>
                    <div className='text-lightgrey text-2xl'>
                        47000
                    </div>
                    <div className="overflow-x-auto h-full">
                        <div className="inline-block w-full align-middle">
                            <table className="min-w-full divide-y divide-gray-200 table-fixed">
                                <thead className="bg-gray-100">
                                    <tr>
                                        <th scope="col" className="py-3 px-6 text-xs font-medium tracking-wider text-left text-gray-700 uppercase">
                                            Name
                                        </th>
                                        <th scope="col" className="py-3 px-6 text-xs font-medium tracking-wider text-left text-gray-700 uppercase">
                                            Inquire
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    <tr className="hover:bg-gray-100">
                                        <td className="py-4 px-6 text-sm font-medium flex items-center text-gray-900 gap-3">
                                            <div className='w-8 h-8 bg-[#B4F8BD] flex justify-center items-center rounded-full text-primary'>P</div>
                                            Pranay
                                        </td>
                                        <td className="py-4 px-6 text-sm font-medium text-gray-900">
                                            Lorem ipsum dolor sit amet consectetur. Platea risus nunc arcu arcu sed non.
                                        </td>
                                    </tr>
                                    <tr className="hover:bg-gray-100">
                                        <td className="py-4 px-6 text-sm font-medium flex items-center text-gray-900 gap-3">
                                            <div className='w-8 h-8 bg-[#B4F8BD] flex justify-center items-center rounded-full text-primary'>P</div>
                                            Pranay
                                        </td>
                                        <td className="py-4 px-6 text-sm font-medium text-gray-900">
                                            Lorem ipsum dolor sit amet consectetur. Platea risus nunc arcu arcu sed non.
                                        </td>
                                    </tr>

                                    <tr className="hover:bg-gray-100">
                                        <td className="py-4 px-6 text-sm font-medium flex items-center text-gray-900 gap-3">
                                            <div className='w-8 h-8 bg-[#B4F8BD] flex justify-center items-center rounded-full text-primary'>P</div>
                                            Pranay
                                        </td>
                                        <td className="py-4 px-6 text-sm font-medium text-gray-900">
                                            Lorem ipsum dolor sit amet consectetur. Platea risus nunc arcu arcu sed non.
                                        </td>
                                    </tr>

                                    <tr className="hover:bg-gray-100">
                                        <td className="py-4 px-6 text-sm font-medium flex items-center text-gray-900 gap-3">
                                            <div className='w-8 h-8 bg-[#B4F8BD] flex justify-center items-center rounded-full text-primary'>P</div>
                                            Pranay
                                        </td>
                                        <td className="py-4 px-6 text-sm font-medium text-gray-900">
                                            Lorem ipsum dolor sit amet consectetur. Platea risus nunc arcu arcu sed non.
                                        </td>
                                    </tr>

                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>


        </div>
    )
}

export default Dashboard