"use client"

import { Formik } from 'formik';
import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify';

function Settings() {

    const [isLoading, setIsLoading] = useState(false);
    const [settingData, setSettingData] = useState({});

    const initialFunctionCall = () => {

        setIsLoading(true);

        const endpoint = 'https://www.dev.cleantech-mart.com/wp-json/wcfmmp/v1/store-vendors/158';

        // settings/id/${vendor_id}

        // Headers
        const headers = new Headers();
        headers.append('Content-Type', 'application/json');

        const bearerToken = localStorage.getItem('authToken');
        headers.append('Authorization', `Bearer ${bearerToken}`);

        // const sessionToken = localStorage.getItem('woocommerce_session_token');
        // headers.append('woocommerce_session_token', sessionToken); // Use append for custom headers

        // Fetch request parameters
        const requestOptions = {
            method: 'GET',
            headers: headers,
            credentials: "same-origin"
            // You can add other options here like body for POST requests or query parameters
        };

        // Perform the fetch request
        fetch(endpoint, requestOptions)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`Request failed with status: ${response.status}`);
                }
                return response.json();
            })
            .then(data => {
                console.log('Response data:', data);
                setSettingData(data);
                // Handle the response data here
            })
            .catch(error => {
                console.error('Fetch error:', error);
                toast.error(error.message)
                // Handle errors here
                // You can choose to use toast.error(error.message) or any other error handling logic
            })
            .finally(() => {
                setIsLoading(false);
            })

    }

    useEffect(() => {

        initialFunctionCall();

    }, [])

    if (isLoading) {
        return <div>...Loading</div>
    }

    console.log("1", settingData.store_hide_email === "no" ? false : true);

    return (
        <div className='flex flex-col sm:mx-14 gap-14 items-center w-full '>
            <Formik
                initialValues={
                    {
                        store_phone: settingData?.vendor_phone,
                        // aadhar_card_number: settingData.vendor_additional_info[0].value,
                        aadhar_card_image_front: '',
                        aadhar_card_image_back: '',
                        license_number: '',
                        gstin: '',

                        //Store
                        store_email: settingData.vendor_email,
                        store_phone: settingData.vendor_phone,
                        address_1: settingData.vendor_address,
                        address_2: '',
                        country: '',
                        city_town: '',
                        state: '',
                        postcode_zip: '',
                        shop_description: '',
                        shipping_policy: settingData?.vendor_policies?.shipping_policy,
                        refund_policy: settingData?.vendor_policies?.refund_policy,
                        cancellation_return_exchange_policy: settingData?.vendor_policies?.cancellation_policy,
                        store_name_position: settingData.vendor_shop_name,
                        products_per_page: settingData.store_products_per_page,
                        hide_email_from_store: settingData.store_hide_email === "no" ? false : true,
                        hide_phone_from_store: settingData.store_hide_phone === "no" ? false : true,
                        hide_address_from_store: settingData.store_hide_address === "no" ? false : true,
                        hide_map_from_store: '',
                        hide_about_from_store: '',
                        hide_policy_from_store: settingData.store_hide_policy === "no" ? false : true,
                        enable_vacation_mode: '',
                        disable_purchase_during_vacation: '',
                        vacation_type: '',
                        vacation_message: ''
                    }
                }

                validate={values => {
                    const errors = {};
                    if (!values.email) {
                        errors.email = 'Required';
                    } else if (
                        !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
                    ) {
                        errors.email = 'Invalid email address';
                    }
                    return errors;
                }}
                onSubmit={(values, { setSubmitting, resetForm }) => {
                    // setSubmitting(true)

                    console.log(values);
                }}
            >
                {({
                    values,
                    errors,
                    touched,
                    handleChange,
                    handleBlur,
                    handleSubmit,
                    isValid,
                    dirty,
                    isSubmitting,
                }) => (
                    <div className="mt-8 px-5 flex flex-col gap-6 bg-white py-10">
                        <h2 className='font-medium text-xl mb-4'>General Setting</h2>

                        <div className='flex flex-wrap justify-between gap-8'>
                            <div className='flex flex-col min-w-[320px] flex-1 gap-2'>
                                <label htmlFor='store_email'>Store Email </label>
                                <input
                                    id='store_email'
                                    name='store_email'
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    value={values.store_email}
                                    className={`bg-littledarkgrey border h-12 w-full outline-none rounded px-4 py-3 focus:border-primary`}
                                    placeholder='ABC' />
                            </div>
                            <div className='flex flex-col min-w-[320px] flex-1 gap-2'>
                                <label htmlFor='store_phone'>Store Phone</label>
                                <input
                                    id='store_phone'
                                    name='store_phone'
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    value={values.store_phone}
                                    className={`bg-littledarkgrey border h-12 w-full outline-none rounded px-4 py-3 focus:border-primary`}
                                />
                            </div>
                        </div>

                        <div className='flex flex-wrap justify-between'>
                            <div className='flex flex-col min-w-[320px] gap-2'>
                                <label htmlFor='address_1'>Address 1 *</label>
                                <input
                                    id='address_1'
                                    name='address_1'
                                    value={values.address_1}
                                    required
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    className={`bg-littledarkgrey border h-12 w-full outline-none rounded px-4 py-3
                                ${touched.address_1 && values.address_1.length == 0 ? 'border-red-500' : 'focus:border-primary'}
                        `}
                                    placeholder='ABC' />
                            </div>
                            <div className='flex flex-col min-w-[320px] gap-2'>
                                <label htmlFor='address_2'>Address 2</label>
                                <input
                                    id='address_2'
                                    name='address_2'
                                    value={values.address_2}
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    className={`bg-littledarkgrey border h-12 w-full outline-none rounded px-4 py-3
                                ${touched.address_2 && values.address_2.length == 0 ? 'border-red-500' : 'focus:border-primary'}`}
                                    placeholder='DEFG' />
                            </div>
                        </div>

                        <div className='flex flex-wrap justify-between'>
                            <div className='flex flex-col min-w-[320px] gap-2'>
                                <label htmlFor='country'>Country *</label>
                                <input
                                    id='country'
                                    name='country'
                                    value={values.country}
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    className={`bg-littledarkgrey border h-12 w-full outline-none rounded px-4 py-3
                                ${touched.country && values.country.length == 0 ? 'border-red-500' : 'focus:border-primary'}
                        `}
                                    placeholder='ABC' />
                            </div>
                            <div className='flex flex-col min-w-[320px] gap-2'>
                                <label htmlFor='city_town'>City/Town</label>
                                <input
                                    id='city_town'
                                    name='city_town'
                                    value={values.city_town}
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    className={`bg-littledarkgrey border h-12 w-full outline-none rounded px-4 py-3
                                ${touched.city_town && values.city_town.length == 0 ? 'border-red-500' : 'focus:border-primary'}`}
                                    placeholder='DEFG' />
                            </div>
                        </div>

                        <div className='flex flex-wrap justify-between'>
                            <div className='flex flex-col min-w-[320px] gap-2'>
                                <label htmlFor='state'>State *</label>
                                <input
                                    id='state'
                                    name='state'
                                    value={values.state}
                                    required
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    className={`bg-littledarkgrey border h-12 w-full outline-none rounded px-4 py-3
                                ${(touched.state && values.state.length == 0) || errors.state ? 'border-red-500' : 'focus:border-primary'}
                        `}
                                    placeholder='ABC' />
                            </div>
                            <div className='flex flex-col min-w-[320px] gap-2'>
                                <label htmlFor='postcode_zip'>Postcode/Zip</label>
                                <input
                                    id='postcode_zip'
                                    name='postcode_zip'
                                    value={values.postcode_zip}
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    className={`bg-littledarkgrey border h-12 w-full outline-none rounded px-4 py-3
                                ${touched.postcode_zip && values.postcode_zip.length == 0 ? 'border-red-500' : 'focus:border-primary'}`}
                                    placeholder='DEFG' />
                            </div>
                        </div>

                        <div className='flex'>
                            <div className='flex flex-col w-full gap-2'>
                                <h3 className='text-xl font-medium'>Shop Description</h3>
                                <label htmlFor='shop_description'>Shop Description *</label>
                                <textarea
                                    rows={4}
                                    id='shop_description'
                                    name='shop_description'
                                    value={values.shop_description}
                                    required
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    className={`bg-littledarkgrey border w-full outline-none rounded px-4 py-3
                                ${(touched.shop_description && values.shop_description.length == 0) || errors.shop_description ? 'border-red-500' : 'focus:border-primary'}
                        `} placeholder='ABC' />
                            </div>
                        </div>

                        <h3 className='text-xl font-medium'>Policies Setting</h3>
                        <div className='flex flex-row flex-wrap gap-2 justify-between'>
                            <div className='flex flex-col w-full gap-2'>
                                <label htmlFor='shipping_policy'>Shipping Policy *</label>
                                <textarea
                                    rows={4}
                                    id='shipping_policy'
                                    name='shipping_policy'
                                    value={values.shipping_policy}
                                    required
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    className={`bg-littledarkgrey border w-full outline-none rounded px-4 py-3
                                ${(touched.shipping_policy && values.shipping_policy.length == 0) || errors.shipping_policy ? 'border-red-500' : 'focus:border-primary'}
                        `} placeholder='ABC' />
                            </div>
                            <div className='flex flex-col w-full gap-2'>
                                <label htmlFor='refund_policy'>Refund Policy *</label>
                                <textarea
                                    rows={4}
                                    id='refund_policy'
                                    name='refund_policy'
                                    value={values.refund_policy}
                                    required
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    className={`bg-littledarkgrey border w-full outline-none rounded px-4 py-3
                                ${(touched.refund_policy && values.refund_policy.length == 0) || errors.refund_policy ? 'border-red-500' : 'focus:border-primary'}
                        `} placeholder='ABC' />
                            </div>
                            <div className='flex flex-col w-full gap-2'>
                                <label className='whitespace-nowrap' htmlFor='cancellation_return_exchange_policy'>Cancellation/Return/Exchange Policy *</label>
                                <textarea
                                    rows={4}
                                    id='cancellation_return_exchange_policy'
                                    name='cancellation_return_exchange_policy'
                                    value={values.cancellation_return_exchange_policy}
                                    required
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    className={`bg-littledarkgrey border w-full outline-none rounded px-4 py-3
                                ${(touched.cancellation_return_exchange_policy && values.cancellation_return_exchange_policy.length == 0) || errors.cancellation_return_exchange_policy ? 'border-red-500' : 'focus:border-primary'}
                        `} placeholder='ABC' />
                            </div>
                        </div>

                        <h3 className='text-xl font-medium'>Store Visibility Setup</h3>
                        <div className='flex flex-wrap justify-between'>
                            <div className='flex flex-col gap-2'>
                                <label htmlFor='store_name_position'>Store Name Position *</label>
                                <input
                                    id='store_name_position'
                                    name='store_name_position'
                                    value={values.store_name_position}
                                    required
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    className={`bg-littledarkgrey border h-12 w-full outline-none rounded px-4 py-3
                                ${(touched.store_name_position && values.store_name_position.length == 0) || errors.store_name_position ? 'border-red-500' : 'focus:border-primary'}
                        `}
                                    placeholder='ABC' />
                            </div>
                            <div className='flex flex-col gap-2'>
                                <label htmlFor='products_per_page'>Products per page *</label>
                                <input
                                    id='products_per_page'
                                    name='products_per_page'
                                    value={values.products_per_page}
                                    type='number'
                                    required
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    className={`bg-littledarkgrey border h-12 w-full outline-none rounded px-4 py-3
                                ${(touched.products_per_page && values.products_per_page.length == 0) ? 'border-red-500' : 'focus:border-primary'}`}
                                    placeholder='DEFG' />
                            </div>
                        </div>
                        <div className='flex flex-wrap justify-between'>
                            <div className='flex flex-row-reverse gap-2'>
                                <label htmlFor='hide_about_from_store'>Hide Email from Store</label>
                                <input
                                    id='hide_about_from_store'
                                    name='hide_about_from_store'
                                    value={values.hide_about_from_store}
                                    type='checkbox'
                                    required
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    className={`bg-littledarkgrey border h-12 w-full outline-none rounded px-4 py-3
                                ${(touched.hide_about_from_store && values.hide_about_from_store.length == 0) || errors.hide_about_from_store ? 'border-red-500' : 'focus:border-primary'}
                        `}
                                />
                            </div>
                            <div className='flex flex-row-reverse gap-2'>
                                <label htmlFor='hide_phone_from_store'>Hide Phone from Store</label>
                                <input
                                    id='hide_phone_from_store'
                                    name='hide_phone_from_store'
                                    value={values.hide_phone_from_store}
                                    type='checkbox'
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    className={`bg-littledarkgrey border h-12 w-full outline-none rounded px-4 py-3
                                ${(touched.hide_phone_from_store && values.hide_phone_from_store.length == 0) ? 'border-red-500' : 'focus:border-primary'}`}
                                />
                            </div>
                        </div>
                        <div className='flex flex-wrap justify-between'>
                            <div className='flex flex-row-reverse gap-2'>
                                <label htmlFor='hide_address_from_store'>Hide Address from Store</label>
                                <input
                                    id='hide_address_from_store'
                                    name='hide_address_from_store'
                                    value={values.hide_address_from_store}
                                    type='checkbox'
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    className={`bg-littledarkgrey border h-12 w-full outline-none rounded px-4 py-3
                                ${(touched.hide_address_from_store && values.hide_address_from_store.length == 0) || errors.hide_address_from_store ? 'border-red-500' : 'focus:border-primary'}
                        `}
                                />
                            </div>
                            <div className='flex flex-row-reverse gap-2'>
                                <label htmlFor='hide_policy_from_store'>Hide Policy from Store</label>
                                <input
                                    id='hide_policy_from_store'
                                    name='hide_policy_from_store'
                                    value={values.hide_policy_from_store}
                                    type='checkbox'
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    className={`bg-littledarkgrey border h-12 w-full outline-none rounded px-4 py-3
                                ${(touched.hide_policy_from_store && values.hide_policy_from_store.length == 0) ? 'border-red-500' : 'focus:border-primary'}`}
                                />
                            </div>
                        </div>
                        <div className='flex flex-wrap justify-between'>
                            <div className='flex flex-row-reverse gap-2'>
                                <label htmlFor='hide_map_from_store'>Hide Map from Store</label>
                                <input
                                    id='hide_map_from_store'
                                    name='hide_map_from_store'
                                    value={values.hide_map_from_store}
                                    type='checkbox'
                                    required
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    className={`bg-littledarkgrey border h-12 w-full outline-none rounded px-4 py-3
                                ${(touched.hide_map_from_store && values.hide_map_from_store.length == 0) || errors.hide_map_from_store ? 'border-red-500' : 'focus:border-primary'}
                        `}
                                />
                            </div>
                            <div className='flex flex-row-reverse gap-2'>
                                <label htmlFor='hide_about_from_store'>Hide About from Store</label>
                                <input
                                    id='hide_about_from_store'
                                    name='hide_about_from_store'
                                    value={values.hide_about_from_store}
                                    type='checkbox'
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    className={`bg-littledarkgrey border h-12 w-full outline-none rounded px-4 py-3
                                ${(touched.hide_about_from_store && values.hide_about_from_store.length == 0) ? 'border-red-500' : 'focus:border-primary'}`}
                                />
                            </div>
                        </div>

                        <h3 className='text-xl font-medium'>Vacation Mode</h3>
                        <div className='flex flex-wrap justify-between'>
                            <div className='flex flex-row-reverse gap-2'>
                                <label htmlFor='store_name_position'>Enable Vacation Mode</label>
                                <input
                                    id='store_name_position'
                                    name='store_name_position'
                                    value={values.store_name_position}
                                    type='checkbox'
                                    required
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    className={`bg-littledarkgrey border h-12 w-full outline-none rounded px-4 py-3
                                ${(touched.store_name_position && values.store_name_position.length == 0) || errors.store_name_position ? 'border-red-500' : 'focus:border-primary'}
                        `}
                                />
                            </div>
                            <div className='flex flex-row-reverse gap-2'>
                                <label htmlFor='products_per_page'>Disable Purchase During Vacation</label>
                                <input
                                    id='products_per_page'
                                    name='products_per_page'
                                    value={values.products_per_page}
                                    type='checkbox'
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    className={`bg-littledarkgrey border h-12 w-full outline-none rounded px-4 py-3
                                ${(touched.products_per_page && values.products_per_page.length == 0) ? 'border-red-500' : 'focus:border-primary'}`}
                                />
                            </div>
                        </div>

                        <div className='flex'>
                            <div className='flex flex-col w-full gap-2'>
                                <label htmlFor='vacation_type'>Vacation Type *</label>
                                <input
                                    id='vacation_type'
                                    name='vacation_type'
                                    value={values.vacation_type}
                                    required
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    className={`bg-littledarkgrey border w-full outline-none rounded px-4 py-3
                                ${(touched.vacation_type && values.vacation_type.length == 0) ? 'border-red-500' : 'focus:border-primary'}
                        `} placeholder='ABC' />
                            </div>
                        </div>

                        <div className='flex'>
                            <div className='flex flex-col w-full gap-2'>
                                <label htmlFor='vacation_message'>Vacation Message </label>
                                <textarea
                                    rows={4}
                                    id='vacation_message'
                                    name='vacation_message'
                                    value={values.vacation_message}
                                    required
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    className={`bg-littledarkgrey border w-full outline-none rounded px-4 py-3
                              focus:border-primary'`}
                                />
                            </div>
                        </div>

                        <div className='flex justify-end'>
                            <button className='px-4 py-2 bg-primary text-white rounded' >Submit</button>
                        </div>
                    </div>
                )}
            </Formik>

        </div>
    )
}

export default Settings