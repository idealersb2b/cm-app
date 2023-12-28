"use client"

import { QUERY_ALL_MY_QUOTES } from '@/app/graphql/cart/queries'
import { useLazyQuery, useMutation, useQuery } from '@apollo/client'
import React, { useEffect, useState } from 'react'
import { RxCross2 } from 'react-icons/rx'
import { useRouter } from 'next/navigation'
import { Shimmer } from 'react-shimmer'
import { MUTATION_CREATE_ORDER } from '@/app/graphql/orders/queries'
import { toast } from 'react-toastify'
import { v4 as uuidv4 } from 'uuid';
import { BsHeart, BsHeartFill } from 'react-icons/bs'


function QuoteRequest() {

    const [quotes, setQuotes] = useState([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)

    const [productCounter, setProductCounter] = useState(10)



    const [allMyQuotes] = useLazyQuery(QUERY_ALL_MY_QUOTES);

    const initialFunctionCall = () => {
        setLoading(true);
        allMyQuotes({
            variables: {
                customerId: JSON.parse(localStorage.getItem('customerId'))
            }
        }).then(data => {
            setQuotes(constructOrderList(data));
            setLoading(false);
        }).catch(e => {
            console.log(e);
            setError(e);
            setLoading(false);
        })
    }

    const constructOrderList = (result) => {

        let OrderList = [];

        const data = result.data;
        data.orders.edges.forEach((order) => {
            order.node.lineItems.edges.forEach((item) => {
                const currentItem = {};
                currentItem.quantity = item.node.quantity
                currentItem.subtotal = item.node.subtotal
                currentItem.name = item.node.product.node.name
                currentItem.image = item.node.product.node.image.link
                currentItem.price = item.node.product.node.price
                OrderList.push(currentItem);
            })
        })

        return OrderList;
    }


    useEffect(() => {

        initialFunctionCall();
    }, [])



    if (error) {
        return <div>Error {error.message}</div>
    }



    const [isLiked, setIsLiked] = useState(false)
    const product = [{
        name: "Disposable straws",
        image: "https://i.pinimg.com/564x/16/78/08/16780802eb36185658321bd731caee19.jpg",
        price: 132,
        tag: "#1024456",
        date: "24/7/2023",
        perprice: "0.9/pc",
    },
    {
        name: "Disposable straws",
        image: "https://i.pinimg.com/564x/16/78/08/16780802eb36185658321bd731caee19.jpg",
        price: 132,
        tag: "#1024457",
        date: "24/7/2023",
        perprice: "0.9/pc",
    }, {
        name: "Disposable straws",
        image: "https://i.pinimg.com/564x/16/78/08/16780802eb36185658321bd731caee19.jpg",
        price: 132,
        tag: "#1024458",
        date: "24/7/2023",
        perprice: "0.9/pc",
    }, {
        name: "Disposable straws",
        image: "https://i.pinimg.com/564x/16/78/08/16780802eb36185658321bd731caee19.jpg",
        price: 132,
        tag: "#1024456",
        date: "24/7/2023",
        perprice: "0.9/pc",
    }, {
        name: "Disposable straws",
        image: "https://i.pinimg.com/564x/16/78/08/16780802eb36185658321bd731caee19.jpg",
        price: 132,
        tag: "#1024456",
        date: "24/7/2023",
        perprice: "0.9/pc",
    }, {
        name: "Disposable straws",
        image: "https://i.pinimg.com/564x/16/78/08/16780802eb36185658321bd731caee19.jpg",
        price: 132,
        tag: "#1024456",
        date: "24/7/2023",
        perprice: "0.9/pc",
    },
    ]
    const favButtonClick = () => {

    }



    return (
        <>
            <div className='hidden relative md:flex flex-col mx-14 gap-14 overflow-hidden w-full'>
                <div className="container mx-auto">
                    <div className="py-4 overflow-x-auto">
                        <table className="min-w-full leading-normal">
                            <thead className='bg-white mb-5'>
                                <tr className='h-20'>
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
                                        Quantity
                                    </th>
                                    <th
                                        className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wider"
                                    >
                                        Subtotal
                                    </th>
                                </tr>
                            </thead>


                            <tbody>
                                {quotes?.map((item, index, arr) => {
                                    return <>
                                        <tr key={uuidv4()}>
                                            <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                                <div className="flex items-center">
                                                    <div className="relative flex-shrink-0 w-10 h-10">
                                                        <img
                                                            className="w-full h-full rounded-full"
                                                            src={item.image}
                                                            alt=""
                                                        />
                                                    </div>
                                                    <div className="ml-3">
                                                        <p className="text-gray-900 whitespace-no-wrap">
                                                            {item.name}
                                                        </p>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                                <p className="text-gray-900 whitespace-no-wrap">{item.price}</p>
                                            </td>
                                            <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                                <p className="text-gray-900 whitespace-no-wrap">
                                                    <input type='number' disabled className='outline-none h-11 w-16 border rounded border-lightgrey px-2' defaultValue={item.quantity} step={1} />
                                                </p>
                                            </td>
                                            <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                                <span
                                                    className="relative inline-block px-3 py-1 font-semibold"
                                                >
                                                    <p className="text-gray-900 whitespace-no-wrap">{item.subtotal}</p>
                                                </span>
                                            </td>
                                        </tr>
                                        {
                                            (index !== arr.length - 1) && <div className="mt-8 w-full"></div>
                                        }
                                    </>

                                })
                                }
                            </tbody>
                        </table>
                        {
                            loading &&
                            <div className='table-row-shimmer'>
                                Loading ...
                            </div>
                        }
                    </div>
                </div>
            </div>
            {/* <div className='flex justify-center sm:justify-normal  sm:mx-14 gap-20'> */}
            <div className=' md:hidden grid grid-cols-2 gap-3 mx-4 '>
                {quotes?.map((item, index, arr) => {
                    return (
                        <div key={uuidv4()} className="mt-4  rounded relative">
                            {/* <span onClick={() => setIsLiked(!isLiked)} className="absolute bg-white cursor-pointer rounded-full  p-2 sm:p-3 right-3 top-3 z-10">
                                {
                                    !isLiked && <BsHeart color={'black'} className="h-2 w-2 sm:h-4 sm:w-4" onClick={favButtonClick} />
                                }
                                {
                                    isLiked && <BsHeartFill color={`#f60000`} className="h-2 w-2 sm:h-4 sm:w-4" onClick={favButtonClick} />
                                }
                            </span> */}
                            <div className="flex flex-col justify-center items-center w-full bg-[#f5f5f5] relative" >
                                <img src={item.image} style={{ width: "100%", aspectRatio: 1, mixBlendMode: 'darken' }} alt={`${item.name}`} />
                                {/* <Link href={`/product/${product.id}`} className="group-hover:flex justify-center items-center text-white rounded-br-md rounded-bl-md transition-opacity z-10 duration-1000 group-hover:opacity-100 opacity-0 hidden absolute w-full bg-primary bottom-0 h-10 text-xs font-mono">
                        Ask for quote
                    </Link> */}
                            </div>
                            <div className="flex flex-col mx-2 gap-2">
                                <div className="font-mono font-medium text-xs sm:text-lg flex justify-between">
                                    <h3 className=''>
                                        {item.name.substr(0, 50) + (item.name.length > 50 ? "...." : "")}
                                    </h3>
                                </div>
                                <div className='text-xs font-mono font-medium '>{product.price}</div>
                                <div style={{ fontFamily: '__className_6dd009' }} className="text-secondary2 text-sm font-medium">
                                    &#8377; {item.quantity}
                                </div>

                                <div className="border border-bordergrey flex justify-between h-full rounded">
                                    <button disabled className="flex px-2 hover:bg-primary hover:text-white transition-all duration-500 text-2xl text-lightgrey" onClick={() => setProductCounter(productCounter - 1)} >-</button>
                                    <span className="flex flex-1 justify-center items-center sm:w-20 border-r border-l border-bordergrey font-mono font-medium">{item.quantity}</span>
                                    <button disabled className="bg-primary px-2 transition-all duration-500 text-2xl text-lightgrey">+</button>
                                </div>
                            </div>
                        </div>
                    )
                })}

            </div>
        </>
    )
}

export default QuoteRequest