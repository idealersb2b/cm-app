import NewsLetter from '@/app/components/NewsLetter/NewsLetter'
import React from 'react'
import { RiDeleteBin6Line } from 'react-icons/ri'
import { RxCross2 } from 'react-icons/rx'

const product = [{
    name: "Disposable straws",
    image: "/product/product_img-1.png",
    price: 132,
    tag: "#1024456",
    date: "24/7/2023",
    perprice: "0.9/pc",
},
{
    name: "Disposable straws",
    image: "/product/product_img-1.png",
    price: 132,
    tag: "#1024456",
    date: "24/7/2023",
    perprice: "0.9/pc",
}, {
    name: "Disposable straws",
    image: "/product/product_img-1.png",
    price: 132,
    tag: "#1024456",
    date: "24/7/2023",
    perprice: "0.9/pc",
}, {
    name: "Disposable straws",
    image: "/product/product_img-1.png",
    price: 132,
    tag: "#1024456",
    date: "24/7/2023",
    perprice: "0.9/pc",
}
]

function List() {
    return (
        <>

            <div className='hidden relative md:flex flex-col mx-14 gap-14 overflow-hidden w-full'>
                <div className="container mx-auto">
                    <div className="py-4 overflow-x-auto">
                        <table className="min-w-full leading-normal">
                            <thead className='bg-white'>
                                <tr className='h-20'>
                                    <th
                                        className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wider"
                                    >
                                        Date
                                    </th>
                                    <th
                                        className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wider"
                                    >
                                        Product
                                    </th>
                                    <th
                                        className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wider"
                                    >
                                        Price
                                    </th>
                                    <th
                                        className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wider"
                                    >
                                        Action
                                    </th>
                                </tr>
                            </thead>
                            <div className="mt-5 w-full"></div>
                            <tbody>
                                <tr>
                                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                        <p className="text-gray-900 whitespace-no-wrap">24/7/2023</p>
                                    </td>
                                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                        <div className="flex items-center">
                                            <div className="relative flex-shrink-0 w-10 h-10">
                                                <img
                                                    className="w-full h-full rounded-full"
                                                    src="/product/product_img-1.png"
                                                    alt=""
                                                />
                                                {/* <span className='cursor-pointer absolute right-0 top-0 flex justify-center items-center h-5 w-5 rounded-full bg-red-600'>
                                                        <RxCross2 color='white' />
                                                    </span> */}

                                            </div>
                                            <div className="ml-3">
                                                <p className="text-gray-900 whitespace-no-wrap">
                                                    Disposable straws
                                                </p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                        <p className="text-gray-900 whitespace-no-wrap">
                                            $0.9/pc
                                        </p>

                                    </td>
                                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                        <span
                                            className="relative inline-block px-3 py-1 font-semibold"
                                        >
                                            <p className="flex flex-row justify-end gap-3 text-gray-900 whitespace-no-wrap">
                                                <img src='/account/notes.png' className='p-1 cursor-pointer' />
                                                <img src='/account/pencil.png' className='p-1 cursor-pointer' />
                                                <img src='/account/trash.png' className='p-1 cursor-pointer' />
                                            </p>
                                        </span>
                                    </td>

                                </tr>
                                <div className="mt-8 w-full"></div>
                                <tr>
                                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                        <p className="text-gray-900 whitespace-no-wrap">24/7/2023</p>
                                    </td>
                                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                        <div className="flex items-center">
                                            <div className="relative flex-shrink-0 w-10 h-10">
                                                <img
                                                    className="w-full h-full rounded-full"
                                                    src="/product/product_img-1.png"
                                                    alt=""
                                                />
                                                {/* <span className='cursor-pointer absolute right-0 top-0 flex justify-center items-center h-5 w-5 rounded-full bg-red-600'>
                                                        <RxCross2 color='white' />
                                                    </span> */}

                                            </div>
                                            <div className="ml-3">
                                                <p className="text-gray-900 whitespace-no-wrap">
                                                    Disposable straws
                                                </p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                        <p className="text-gray-900 whitespace-no-wrap">
                                            $0.9/pc
                                        </p>

                                    </td>
                                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                        <span
                                            className="relative inline-block px-3 py-1 font-semibold"
                                        >
                                            <p className="flex flex-row justify-end gap-3 text-gray-900 whitespace-no-wrap">
                                                <img src='/account/notes.png' className='p-1' />
                                                <img src='/account/pencil.png' className='p-1' />
                                                <img src='/account/trash.png' className='p-1' />
                                            </p>
                                        </span>
                                    </td>

                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>

                <div className='flex justify-between'>
                    <button className='border border-lightgrey py-4 px-12 rounded'>Return To Shop</button>
                    <button className='bg-primary text-white py-4 px-12 rounded'>Request Quote</button>
                </div>
            </div>
            <div className='md:hidden grid grid-cols-2 gap-3 mx-2'>
                {product.map((product) => {
                    return (
                        <div className="mt-4  rounded relative" key={product.name}>
                            <span className="absolute bg-white cursor-pointer rounded-full  p-2 sm:p-3 right-3 top-3 z-10">
                                <RiDeleteBin6Line color='#000' className="h-2 w-2 sm:h-4 sm:w-4" />
                            </span>
                            <div className="flex flex-col justify-center items-center w-full bg-[#f5f5f5] relative" >
                                <img src={product.image} style={{ width: "100%", aspectRatio: 1, mixBlendMode: 'darken' }} alt={`${product.name}`} />
                                {/* <Link href={`/product/${product.id}`} className="group-hover:flex justify-center items-center text-white rounded-br-md rounded-bl-md transition-opacity z-10 duration-1000 group-hover:opacity-100 opacity-0 hidden absolute w-full bg-primary bottom-0 h-10 text-xs font-mono">
                        Ask for quote
                    </Link> */}
                            </div>
                            <div className="flex flex-col mx-2 gap-2">
                                <div className="font-mono font-medium text-xs sm:text-lg flex justify-between">
                                    <h4 className=''>
                                        {product.name.substr(0, 50) + (product.name.length > 50 ? "...." : "")}
                                    </h4>
                                </div>
                                <div className='text-xs font-mono font-medium '>{product.date}</div>
                                <div style={{ fontFamily: '__className_6dd009' }} className="text-secondary2 text-sm font-medium">
                                    &#8377; {product.perprice}
                                </div>

                                <div className="border border-bordergrey flex rounded">
                                    <button className="bg-primary hover:text-white text-center text-xs text-white w-full p-2" >
                                        Edit
                                    </button>
                                </div>
                            </div>
                        </div>
                    )
                })}

            </div>
        </>
    )
}

export default List