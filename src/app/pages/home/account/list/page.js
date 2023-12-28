"use client"

import NewsLetter from '@/app/components/NewsLetter/NewsLetter'
import { QUERY_GET_CART_DETAILS } from '@/app/graphql/cart/queries'
import { useLazyQuery, useMutation } from '@apollo/client'
import React, { useEffect, useState } from 'react'
import { RxCross2 } from 'react-icons/rx'
import { useRouter } from 'next/navigation'
import { Shimmer } from 'react-shimmer'
// import { MUTATION_CREATE_ORDER } from '@/app/graphql/orders/queries'
import { toast } from 'react-toastify'
import { v4 as uuidv4 } from 'uuid';
import { MUTATION_REMOvE_CART_ITEMS, MUTATION_UPDATE_CART_ITEM_QUANTITIES } from '@/app/graphql/cart/mutations'
import { CHECKOUT_MUTATION, MUTATION_EMPTY_CART } from '@/app/graphql/checkout/mutations'
import { MUTATION_CREATE_ORDER } from '@/app/graphql/orders/mutations'
import { QUERY_GET_CUSTOMER_BILLING_AND_SHIPPING_DETAILS } from '@/app/graphql/customer/queries'
import { RiTreasureMapLine } from 'react-icons/ri'
import { ColorRing } from 'react-loader-spinner'


function List() {

    const [getCartDetails] = useLazyQuery(QUERY_GET_CART_DETAILS, {
        fetchPolicy: "no-cache"
    });
    const [updateCart] = useMutation(MUTATION_UPDATE_CART_ITEM_QUANTITIES);
    const [getAddressDetails] = useLazyQuery(QUERY_GET_CUSTOMER_BILLING_AND_SHIPPING_DETAILS);
    const [processOrder] = useMutation(MUTATION_CREATE_ORDER);
    const [emptyCart] = useMutation(MUTATION_EMPTY_CART);
    const [removeCartItem] = useMutation(MUTATION_REMOvE_CART_ITEMS);
    const [checkoutItems] = useMutation(CHECKOUT_MUTATION);

    const [cartItemList, setCartItemList] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState(false);
    const [isModal, setIsModal] = useState(false);
    const [orderId, setOrderId] = useState(null);
    const [placeOrderLoading, setPlaceOrderLoading] = useState(false);

    const router = useRouter();

    const initialFunctionCall = () => {
        setIsLoading(true);

        getCartDetails()
            .then((result) => {
                if (result.error) {
                    throw new Error(result.error[0].debugMessage)
                }
                return result.data
            })
            .then((data) => {
                setCartItemList(constructCartList(data));
                setIsLoading(false);
            })
            .catch((e) => {
                setError(e);
                setIsLoading(false);
            })
    }

    const sendQuote = async () => {

        setPlaceOrderLoading(true)

        try {
            // Fetch address details using GraphQL
            const result = await getAddressDetails({
                variables: {
                    id: localStorage.getItem('userId'),
                },
            });

            // Check if all required address details are available
            if (
                !result.data.customer.billing.address1 ||
                !result.data.customer.billing.phone ||
                !result.data.customer.billing.state ||
                !result.data.customer.billing.city ||
                !result.data.customer.shipping.address1 ||
                !result.data.customer.shipping.phone ||
                !result.data.customer.shipping.state ||
                !result.data.customer.shipping.city
            ) {
                // If any required address details are missing, return false
                return false;
            }

            // Log the result (for debugging purposes)
            console.log('Result:', result);

            // If all required address details are available, proceed to process the order
            const result2 = await processOrder({
                variables: {
                    customerId: JSON.parse(localStorage.getItem('customerId')),
                    productList: cartItemList.map((item) => ({
                        productId: item.productId,
                        quantity: item.quantity,
                    })),
                    // Billing Address
                    email1: result.data.customer.billing.email,
                    firstName1: result.data.customer.billing.firstName,
                    lastName1: result.data.customer.billing.lastName,
                    address11: result.data.customer.billing.address1,
                    address21: result.data.customer.billing.address2,
                    company1: result.data.customer.billing.company,
                    city1: result.data.customer.billing.city,
                    phone1: result.data.customer.billing.phone,
                    state1: result.data.customer.billing.state,
                    postcode1: result.data.customer.billing.postcode,
                    // Shipping Address
                    address12: result.data.customer.shipping.address1,
                    address22: result.data.customer.shipping.address2,
                    city2: result.data.customer.shipping.city,
                    email2: result.data.customer.shipping.email,
                    firstName2: result.data.customer.shipping.firstName,
                    lastName2: result.data.customer.shipping.lastName,
                    company2: result.data.customer.shipping.company,
                    phone2: result.data.customer.shipping.phone,
                    postcode2: result.data.customer.shipping.postcode,
                    state2: result.data.customer.shipping.state,
                    transactionId: uuidv4(),
                },
            })

            const { data } = result2;
            // Order processing successful
            toast.success('Order Added');
            console.log(data);
            setIsModal(true);
            setOrderId(data.createOrder.orderId);
            setCartItemList([]);
            setPlaceOrderLoading(false);

        } catch (error) {
            // Error during GraphQL query
            console.error(error);
            toast.error(error.message);
            setPlaceOrderLoading(false);
        }

    };

    const constructCartList = (result) => {
        let CartList = [];

        result.cart.contents
            .edges.forEach((order) => {
                const currentItem = {};
                currentItem.key = order.node.key
                currentItem.quantity = order.node.quantity
                currentItem.subtotal = order.node.subtotal
                currentItem.name = order.node.product.node.name
                currentItem.productId = order.node.product.node.productId
                currentItem.image = order.node.product.node.image.link
                currentItem.price = (order.node.subtotal.replace(/[^\d.-]/g, '')) / order.node.quantity
                currentItem.total = (order.node.total.replace(/[^\d.-]/g, '')) / order.node.quantity

                CartList.push(currentItem);
            })
        console.log(result);
        console.log(CartList);

        return CartList;
    }

    const updateOrderQuantity = (e, key) => {

        const currList = cartItemList.map((item) => {
            if (item.key !== key) {
                return item;
            } else {
                item.quantity = e.target.valueAsNumber
                return item;
            }
        })

        setCartItemList([...currList]);
    }

    useEffect(() => {
        initialFunctionCall();
    }, [])

    if (error) {
        return <div>Error {error.message}</div>
    }


    return (
        <div className='relative flex flex-col mx-5 sm:mx-14 gap-14 overflow-hidden'>
            <div className={`z-50 fixed overflow-hidden backdrop-blur h-full w-full ${isModal ? 'flex justify-center items-center' : "hidden"}`} style={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",

            }} >
                <div className='flex justify-between flex-col w-[364px] min-w-[250px] h-[400px] bg-white items-center rounded px-8 py-6'>
                    <div className='flex self-end'>
                        <img src='/assets/Icons/cross.png' className='p-3 cursor-pointer' onClick={() => setIsModal(false)} />
                    </div>
                    <div className='flex flex-col items-center gap-2 px-9'>
                        <div className='h-16 w-16 rounded-full flex justify-center items-center' style={{ background: "rgba(161, 255, 173, 0.27)" }}>
                            <img src='/assets/Icons/tick.png' />
                        </div>
                        <div className='text-2xl text-[#00B517]'>Success</div>
                        <p className='text-[#777777] text-center'>You request was sent successfully</p>
                        <p className='text-[#777777] text-center'>You will receive the vendor details on your mail</p>
                    </div>
                    <div className='h-16 border rounded w-full m-5 text-center flex justify-center items-center'>
                        Order id : {orderId}
                    </div>
                    <button className='bg-primary text-white px-12 py-3 rounded' onClick={() => router.push('/')} >
                        Return to Shop
                    </button>
                </div>
            </div>
            <div className="hidden sm:block container mx-auto">
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
                                <th
                                    className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wider"
                                >
                                    Total
                                </th>
                            </tr>
                        </thead>


                        <tbody>
                            {
                                cartItemList.map((item, index) => {
                                    return <tr key={item.key}>
                                        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                            <div className="flex items-center">
                                                <div className="relative flex-shrink-0 w-10 h-10">
                                                    <img
                                                        className="w-full h-full rounded-full"
                                                        src={item.image}
                                                        alt=""
                                                    />
                                                    <span onClick={() => {
                                                        // Delete from Here
                                                        removeCartItem({
                                                            variables: {
                                                                all: true
                                                            }
                                                        }).then((data) => {
                                                            toast.success("Item Removed")
                                                            const currList = cartItemList.filter((product) => product.key !== item.key)
                                                            setCartItemList(currList);
                                                            console.log(data);
                                                        })
                                                            .catch((e) => {
                                                                toast.warn(e.message);
                                                            })
                                                    }
                                                    } className='cursor-pointer absolute right-0 top-0 flex justify-center items-center h-5 w-5 rounded-full bg-red-600'>
                                                        <RxCross2 color='white' />
                                                    </span>

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
                                                <input type='number' className='outline-none h-11 w-16 border rounded border-lightgrey px-2'
                                                    defaultValue={item.quantity}
                                                    min={1}
                                                    onChange={(e) => updateOrderQuantity(e, item.key)}
                                                    step={1} />
                                            </p>
                                        </td>
                                        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                            <span
                                                className="relative inline-block px-3 py-1 font-semibold"
                                            >
                                                <p className="text-gray-900 whitespace-no-wrap">₹{item.quantity * (item?.price || 0)}
                                                </p>
                                            </span>
                                        </td>
                                        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                            <span
                                                className="relative inline-block px-3 py-1 font-semibold"
                                            >
                                                <p className="text-gray-900 whitespace-no-wrap">₹{item.quantity * (item.total)}
                                                </p>
                                            </span>
                                        </td>
                                        {index != cartItemList.length - 1 && <div className="mt-8 w-full"></div>}
                                    </tr>

                                })

                            }
                        </tbody>
                    </table>
                    {
                        isLoading &&
                        <div className='table-row-shimmer'>
                            <Shimmer height={102} className='w-full rounded' />
                            <div className="mt-8 w-full"></div>
                            <Shimmer height={102} className='w-full rounded' />
                            <div className="mt-8 w-full"></div>
                            <Shimmer height={102} className='w-full rounded' />
                        </div>
                    }
                </div>
            </div>

            <div className='sm:hidden grid grid-cols-2 gap-3 mx-4 '>
                {cartItemList?.map((item, index, arr) => {
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
                                <div className='text-xs font-mono font-medium '>{item.price}</div>
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

            <div className='flex flex-col sm:flex-row gap-3 justify-between'>
                <button className='border border-lightgrey py-4 px-12 rounded' onClick={() => router.push('/')} >Return To Shop</button>
                <button className='bg-primary text-white py-4 px-12 rounded' onClick={() => {

                    updateCart({
                        variables: {
                            items: cartItemList.map((item) => (
                                {
                                    key: item.key,
                                    quantity: item.quantity
                                }
                            )),
                            clientMutationId: localStorage.getItem('clientMutationId')
                        }
                    })
                        .then((data) => {
                            toast.success("Cart Updated")
                            console.log(data);
                        })
                        .catch((e) => {
                            toast.error(e.message)
                        })
                }} >Update Quote</button>
                <button className='bg-primary text-white py-4 px-12 rounded'
                    onClick={sendQuote} >
                    {
                        placeOrderLoading ? <ColorRing
                            visible={true}
                            height="16"
                            width="16"
                            ariaLabel="blocks-loading"
                            wrapperClass="blocks-wrapper"
                            colors={['#fff', '#fff', '#fff', '#fff', '#fff']}
                        /> : "Place an Order"
                    }
                </button>
            </div>


        </div>
    )
}

export default List