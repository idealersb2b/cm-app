"use client"

import NewsLetter from '@/app/components/NewsLetter/NewsLetter';
import { MUTATION_UPDATE_CUSTOMER_BILLING_AND_SHIPPING_METHODS } from '@/app/graphql/customer/mutations';
import { QUERY_GET_CUSTOMER_BILLING_AND_SHIPPING_DETAILS } from '@/app/graphql/customer/queries';
import { useLazyQuery, useMutation } from '@apollo/client';
import React, { useEffect, useRef, useState } from 'react';
import { RxCross2 } from 'react-icons/rx';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation'
import * as Yup from 'yup'
import reactLogo from "../../../../../../public/lottie/animation_llkii2bv.json";

const AddressSchema = Yup.object().shape({
    address1: Yup.string().required("Biling Address Required"),
    state1: Yup.string().required("Biling State Required"),
    city1: Yup.string().required("Biling City Required"),
    phone1: Yup.string().required("Billing Phone required")
        .matches(/^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/, 'Phone number is not valid')
        .min(10, "too short")
        .max(10, "too long"),
    address2: Yup.string().required("Shippping Address Required"),
    state2: Yup.string().required("Shippping State Required"),
    city2: Yup.string().required("Shippping City Required"),
    phone2: Yup.string().required("Shippping Phone required")
        .matches(/^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/, 'Phone number is not valid')
        .min(10, "too short")
        .max(10, "too long"),
});

function MyNewAddress
    () {

    const defaultOptions = {
        loop: true,
        autoplay: true,
        animationData: reactLogo,
        rendererSettings: {
            preserveAspectRatio: "xMidYMid slice"
        }
    };

    const router = useRouter();
    const sameAddressRef = useRef(null);
    const [isDisabled, setIsDisabled] = useState(false);
    const [getAddressDetails] = useLazyQuery(QUERY_GET_CUSTOMER_BILLING_AND_SHIPPING_DETAILS);
    const [editAddressDetails] = useMutation(MUTATION_UPDATE_CUSTOMER_BILLING_AND_SHIPPING_METHODS);

    const [inputShipping, setInputShipping] = useState(false);
    const [inputBilling, setInputBilling] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [billingAddressInput, setBillingAddressInput] = useState({
        address1: "",
        company: "",
        country: "",
        email: "",
        firstName: "",
        lastName: "",
        phone: "",
        postcode: "",
        state: "",
        city: "",
    })
    const [shippingAddressInput, setShippingAddressInput] = useState({
        address1: "",
        company: "",
        country: "",
        email: "",
        firstName: "",
        lastName: "",
        phone: "",
        postcode: "",
        state: "",
        city: "",
    })

    const handleBillingChangeInput = (e) => {
        setBillingAddressInput({
            ...billingAddressInput,
            [e.target.name]: e.target.value
        });
    }

    const handleShippingChangeInput = (e) => {
        setShippingAddressInput({
            ...shippingAddressInput,
            [e.target.name]: e.target.value
        });
    }

    useEffect(() => {
        setIsLoading(true);
        getAddressDetails({
            variables: {
                id: localStorage.getItem('userId')
            }
        })
            .then((data) => data.data)
            .then(data => {
                console.log(data.customer);

                setShippingAddressInput({
                    address1: data.customer.shipping.address1,
                    postcode: data.customer.shipping.postcode,
                    state: data.customer.shipping.state,
                    city: data.customer.shipping.city,
                    phone: data.customer.shipping.phone,
                    company: data.customer.shipping.company,
                    email: data.customer.shipping.email,
                    firstName: data.customer.shipping.firstName,
                    lastName: data.customer.shipping.lastName,
                })

                setBillingAddressInput({
                    address1: data.customer.billing.address1,
                    postcode: data.customer.billing.postcode,
                    state: data.customer.billing.state,
                    city: data.customer.billing.city,
                    phone: data.customer.billing.phone,
                    company: data.customer.billing.company,
                    email: data.customer.billing.email,
                    firstName: data.customer.billing.firstName,
                    lastName: data.customer.billing.lastName,
                })

            })
            .catch((e) => {
                console.log(e)
            })
            .finally(() => {
                setIsLoading(false);
            })
    }, [])


    if (isLoading) {
        return <div className='w-full h-96 flex justify-center items-center'>
            <div>...Loading</div>
        </div>
    }

    return (
        <div className='flex flex-col mx-14 gap-14 max-w-[870px] '>
            <div className="flex flex-col mt-8">
                <h2 className='font-semibold text-4xl'>Addresses</h2>
                <p className='my-6'>
                    The following addresses will be used on the checkout page by default.
                </p>
                <div className='flex flex-row gap-5 flex-wrap justify-between'>
                    <div className='flex flex-col gap-4 lg:w-[400px] max-w-[400px]'>
                        <h3 className='font-semibold text-2xl'>Billing</h3>
                        <input
                            placeholder='Biling Address'
                            className='p-2' name='address1' value={billingAddressInput.address1} onChange={handleBillingChangeInput} />
                        <div className='w-full flex flex-col gap-3'>
                            <input onChange={handleBillingChangeInput} name='firstName' value={billingAddressInput.firstName} className='p-2 w-full' placeholder='First Name' />
                            <input onChange={handleBillingChangeInput} name='lastName' value={billingAddressInput.lastName} className='p-2 w-full' placeholder='Last Name' />
                            <input onChange={handleBillingChangeInput} name='company' value={billingAddressInput.company} className='p-2 w-full' placeholder='Company Name' />
                            <input onChange={handleBillingChangeInput} name='state' value={billingAddressInput.state} className='p-2 w-full' placeholder='State' />
                            <input onChange={handleBillingChangeInput} name='email' value={billingAddressInput.email} className='p-2 w-full' placeholder='Email' />
                            <input onChange={handleBillingChangeInput} name='phone' value={billingAddressInput.phone} className='p-2 w-full' placeholder='Mobile No.' />
                            <input onChange={handleBillingChangeInput} name="postcode" value={billingAddressInput.postcode} className='p-2 w-full' placeholder='Pincode' />
                            <input onChange={handleBillingChangeInput} name='city' value={billingAddressInput.city} className='p-2 w-full' placeholder='City' />
                        </div>
                    </div>
                    <div className='flex flex-col gap-4 lg:w-[400px] max-w-[400px]'>
                        <h3 className='font-semibold text-2xl'>Shipping</h3>

                        <input
                            placeholder='Shipping Address'
                            name='address1'
                            className='p-2' value={shippingAddressInput.address1} disabled={isDisabled} onChange={handleShippingChangeInput} />

                        <div className='w-full flex flex-col gap-3'>
                            <input onChange={handleShippingChangeInput} disabled={isDisabled} name='firstName' value={shippingAddressInput.firstName} className='p-2 w-full' placeholder='First Name' />
                            <input onChange={handleShippingChangeInput} disabled={isDisabled} name='lastName' value={shippingAddressInput.lastName} className='p-2 w-full' placeholder='Last Name' />
                            <input onChange={handleShippingChangeInput} disabled={isDisabled} name='company' value={shippingAddressInput.company} className='p-2 w-full' placeholder='Company Name' />
                            <input onChange={handleShippingChangeInput} disabled={isDisabled} name='state' value={shippingAddressInput.state} className='p-2 w-full' placeholder='State' />
                            <input onChange={handleShippingChangeInput} disabled={isDisabled} name='phone' value={shippingAddressInput.phone} className='p-2 w-full' placeholder='Mobile No.' />
                            <input onChange={handleShippingChangeInput} disabled={isDisabled} name="postcode" value={shippingAddressInput.postcode} className='p-2 w-full' placeholder='Pincode' />
                            <input onChange={handleShippingChangeInput} disabled={isDisabled} name='city' value={shippingAddressInput.city} className='p-2 w-full' placeholder='City' />
                            <div className='w-full flex flex-row gap-3'>
                                <label htmlFor='sameAddress' >Same as Billing</label>
                                <input id='sameAddress' ref={sameAddressRef} onChange={() => {
                                    if (sameAddressRef.current.checked) {
                                        setIsDisabled(true)
                                        setShippingAddressInput(billingAddressInput);
                                    }
                                    else {
                                        setIsDisabled(false);
                                    }
                                }} type='checkbox' className='p-2 w-full' />
                            </div>
                        </div>

                    </div>

                    <button onClick={() => {

                        AddressSchema.validate({
                            address1: billingAddressInput.address1,
                            state1: billingAddressInput.state,
                            city1: billingAddressInput.city,
                            phone1: shippingAddressInput.phone,
                            address2: shippingAddressInput.address1,
                            state2: shippingAddressInput.state,
                            city2: shippingAddressInput.city,
                            phone2: shippingAddressInput.phone
                        }).then((data) => {
                            setIsLoading(true);

                            editAddressDetails({
                                variables: {
                                    clientMutationId: localStorage.getItem('clientMutationId'),
                                    id: localStorage.getItem('userId'),
                                    //Billing Address
                                    address11: billingAddressInput.address1,
                                    company1: billingAddressInput.company,
                                    country1: billingAddressInput.country,
                                    email1: billingAddressInput.email,
                                    firstName1: billingAddressInput.firstName,
                                    lastName1: billingAddressInput.lastName,
                                    phone1: billingAddressInput.phone,
                                    postcode1: billingAddressInput.postcode,
                                    state1: billingAddressInput.state,
                                    city1: billingAddressInput.city,
                                    //Shipping Address 
                                    address12: shippingAddressInput.address1,
                                    company2: shippingAddressInput.company,
                                    country2: shippingAddressInput.country,
                                    email2: billingAddressInput.email,
                                    firstName2: shippingAddressInput.firstName,
                                    lastName2: shippingAddressInput.lastName,
                                    phone2: shippingAddressInput.phone,
                                    postcode2: shippingAddressInput.postcode,
                                    state2: shippingAddressInput.state,
                                    city2: shippingAddressInput.city,
                                }
                            })
                                .then((data) => {
                                    toast.success("Address Saved")
                                })
                                .catch((e) => {
                                    toast.warning(e.message)
                                })
                                .finally(() => {
                                    setIsLoading(false);
                                })
                        })
                            .catch((err) => {
                                toast.error(err.errors[0]);
                            })

                    }} className='py-3 px-4 bg-primary text-white rounded'>
                        Save Changes
                    </button>
                </div>

            </div>
        </div >

    )
}

export default MyNewAddress
