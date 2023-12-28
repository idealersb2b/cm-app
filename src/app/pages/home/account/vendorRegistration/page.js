"use client"

import { checkout } from '@/app/pages/api/checkout_sessions.js';
import { Formik } from 'formik';
import dynamic from 'next/dynamic';
import { useState } from 'react';
import { RxCross1 } from 'react-icons/rx'
import { TiTick } from 'react-icons/ti'
import { toast } from 'react-toastify';
import { v4 as uuidv4 } from 'uuid';
import * as Yup from 'yup';

const StepperComponent = dynamic(() => import('../../../../components/CustomStepper/CustomStepper.js'), {
    ssr: false,
});

const SignupSchema = Yup.object().shape({
    username: Yup.string().min(5, 'Too Short!').max(15, 'Too Long!').required("Username is Required"),
    email: Yup.string().email('Invalid email').required('Email is Required'),
    address_1: Yup.string().required("Address is Required"),
    country: Yup.string().required("Country  is Required"),
    state: Yup.string().required("State  is Required"),
    postcode_zip: Yup.string().length(6).required("Postcode/Zip is Required"),
    store_phone: Yup.string().matches(/^[0-9]{10}$/, 'Invalid phone number').required("Store Phone is Required"),
    store_name: Yup.string(),
    aadhar_card_number: Yup.string().matches(/^[0-9]{12}$/, 'Invalid Aadhar number').required("Aadhar Card Number is Required"),
    aadhar_card_image_front: Yup.mixed().required("Aadhar Card Image (Front) is Required"),
    aadhar_card_image_back: Yup.mixed().required("Aadhar Card Image (Back) is Required"),
    license_number: Yup.string().required("Shop License Number is Required"),
    gstin: Yup.string().required("GSTIN is Required"),
    password: Yup.string().required("Password is Required"),
    confirm_password: Yup.string().required('Confirm Password is required')
        .oneOf([Yup.ref('password'), null], 'Passwords must match'),
    agree_condition: Yup.boolean().oneOf([true], "Agree to T&C").required("T&C is Required")
});

function VendorRegistration() {

    const [currentStep, setCurrentStep] = useState(0);
    const [productId, setProductId] = useState(null);
    const [registrationSuccessFul, setRegistrationSuccessFul] = useState(true);

    const registrationCall = (values, setSubmitting) => {
        const apiUrl = 'https://www.dev.cleantech-mart.com/wp-json/store-vendor-registration-api/v1/register';

        const formData = new FormData();

        formData.append("username", values.username);
        formData.append("email", values.email);
        formData.append("password", values.password);

        formData.append("meta[first_name]", values.first_name);
        formData.append("meta[last_name]", values.last_name);
        formData.append("meta[address1]", values.address_1);
        formData.append("meta[address2]", values.address_2);
        formData.append("meta[country]", "India");
        formData.append("meta[wcfm_register_member]", "yes");
        formData.append("meta[wp_user_level]", 6);
        formData.append("meta[wp_capabilities][0][wcfm_vendor]", 1);
        formData.append("meta[wcfm_membership_paymode]", "free");
        formData.append("meta[billing_first_name]", values.first_name);
        formData.append("meta[shipping_first_name]", values.first_name);
        formData.append("meta[billing_last_name]", values.last_name);
        formData.append("meta[shipping_last_name]", values.last_name);
        formData.append("meta[billing_address_1]", values.address_1);
        formData.append("meta[_wcfm_billing_address_1]", values.address_1);
        formData.append("meta[shipping_address_1]", values.address_1);
        formData.append("meta[_wcfm_shipping_address_1]", values.address_1);
        formData.append("meta[billing_address_2]", values.address_2);
        formData.append("meta[_wcfm_billing_address_2]", values.address_2);
        formData.append("meta[shipping_address_2]", values.address_2);
        formData.append("meta[_wcfm_shipping_address_2]", values.address_2);
        formData.append("meta[billing_city]", values.city_town);
        formData.append("meta[shipping_city]", values.city_town);
        formData.append("meta[_wcfm_billing_city]", values.city_town);
        formData.append("meta[_wcfm_shipping_city]", values.city_town);
        formData.append("meta[billing_state]", values.state);
        formData.append("meta[shipping_state]", values.state);
        formData.append("meta[_wcfm_billing_state]", values.state);
        formData.append("meta[_wcfm_shipping_state]", values.state);
        formData.append("meta[billing_postcode]", values.postcode_zip);
        formData.append("meta[shipping_postcode]", values.postcode_zip);
        formData.append("meta[_wcfm_billing_postcode]", values.postcode_zip);
        formData.append("meta[_wcfm_shipping_postcode]", values.postcode_zip);
        formData.append("meta[_disable_vendor]", 0);
        formData.append("meta[wcfm_vendor_verification_data][0][social_verification_status]", "approve");
        formData.append("meta[um_member_directory_data][0][account_status]", "approved");
        formData.append("meta[um_member_directory_data][0][hide_in_members]", false);
        formData.append("meta[um_member_directory_data][0][profile_photo]", false);
        formData.append("meta[um_member_directory_data][0][cover_photo]", false);
        formData.append("meta[um_member_directory_data][0][verified]", false);

        formData.append("vendor_shop_name", values.store_name);
        formData.append("store_hide_email", "no");
        formData.append("store_hide_phone", "no");
        formData.append("store_hide_address", "no");
        formData.append("store_hide_description", "no");
        formData.append("store_hide_policy", "no");
        formData.append("store_products_per_page", 10);
        formData.append("vendor_email", values.store_name);
        formData.append("vendor_phone", values.store_phone);
        formData.append("vendor_address", values.address_1);
        formData.append("disable_vendor", "no");
        formData.append("is_store_offline", "no");
        formData.append("vendor_shop_logo", "https://dev.cleantech-mart.com/wp-content/uploads/2023/01/store-logo.png");
        formData.append("vendor_banner_type", "image");
        formData.append("vendor_banner", "https://dev.cleantech-mart.com/wp-content/uploads/2023/01/store-banner-01.jpg");
        formData.append("mobile_banner", "https://dev.cleantech-mart.com/wp-content/uploads/2023/01/store-banner-01.jpg");
        formData.append("vendor_list_banner_type", "image");
        formData.append("vendor_list_banner", "https://dev.cleantech-mart.com/wp-content/uploads/2023/01/store-banner-01.jpg");
        formData.append("store_rating", "0");
        formData.append("shop-license-number", values.license_number);
        formData.append("aadhaar_number", values.aadhar_card_number);
        formData.append("upload-aadhar-card-image-front", "/Users/vignesh/Downloads/Bill_Gates.jpeg");
        formData.append("gstin", values.gstin);
        formData.append("wcfm_register_member", "yes");
        formData.append("wp_user_level", 6);

        fetch(apiUrl, {
            method: 'POST',
            body: formData,
        }).then((response) => {
            return response.json();
        }).then((data) => {

            if (data.error) {
                throw new Error(data.error)
            }

            console.log('Registration successful:', data);

            if (productId === null) {
                setCurrentStep(3);
            }

            toast.success(data.message);
            setRegistrationSuccessFul(true);

        }).catch((e) => {
            console.log(e);
            toast.error(e.message);
        }).finally(() => {
            setSubmitting(false);
        })
    };
    
    let arr = [
        {
        id:1,
        plan:"Free",
        paymentStatus:"No Payment Required",
        rupees:"₹0.0",
        limits:"This is a Free Plan with very limited to no features at all.",
        freeRegistration:true,
        oneDedicatedAds:false,
        twoDedicatedAds:false,
        completeBackendSupport:true,
        visibility2X:false,
        "2daysInstagramPaidCampign":false,
        fullyCostimizedDashboard:false,
        "3xVisiblity":false,
        unRestrictedProductEntry:false,
        potentialLeads:false,
        price:null
        },
        {
        id:2,
        plan:"Gold",
        paymentStatus:"for each 30 Day(s)18% GST will be applied",
        rupees:"₹1500",
        limits:"Subscribe as a Gold vendor and avail following benifits",
        freeRegistration:true,
        oneDedicatedAds:true,
        twoDedicatedAds:false,
        completeBackendSupport:true,
        visibility2X:true,
        "2daysInstagramPaidCampign":true,
        fullyCostimizedDashboard:true,
        "3xVisiblity":false,
        unRestrictedProductEntry:false,
        potentialLeads:true,
        price:"price_1NhrMTSGfBzi8lNdGo4hRrxT"
        },
        {
        id:3,
        plan:"Platinum",
        paymentStatus:"for each 180 Day(s) 18% GST will be applied",
        rupees:"₹7500",
        limits:"Subscribe as a platinum member and avail following benifits",
        freeRegistration:true,
        oneDedicatedAds:false,
        twoDedicatedAds:true,
        completeBackendSupport:true,
        "2Xvisibility":false,
        "2daysInstagramPaidCampign":true,
        fullyCostimizedDashboard:true,
        "3xVisiblity":true,
        unRestrictedProductEntry:true,
        potentialLeads:true,
        price:"price_1NhrMTSGfBzi8lNdGo4hRrxT"
        }
    ]
    //console.log(  localStorage.getItem('userId'))
 
    return (
        <div className='mt-8 mx-auto w-full'>
            {currentStep <= 2 ? <StepperComponent step={currentStep} /> : null}
            <div className='flex gap-4 flex-wrap justify-center w-full'>
            {
                    currentStep == 0 && arr.map((e) => <div key={e.id} className='flex flex-col w-[274px] shadow-xl bg-white'>
                        <div className='px-4 pt-4 border-b-2 border-b-primary' >
                            <div className='flex flex-col font-medium gap-2'>
                                <div className='text-lightgrey text-lg'>
                                    {e.plan}
                                </div>
                                <div className='flex flex-col text-primary text-4xl'>
                                    <span>
                                       {e.rupees}
                                    </span>
                                </div>
                            </div>
                            <div className='my-3 text-lightgrey'>
                                <p className='text-xs'>{e.paymentStatus}</p>
                                <p>{e.limits}</p>
                            </div>
                        </div>
                        <div className='flex flex-col px-4 py-4 gap-12 w-full'>
                            <div className='flex flex-col gap-6 py-4'>
                                <li className='list-none text-xs text-lightgrey'>
                                    {e.freeRegistration ? 
                                    <TiTick color='#00B517' width={15} height={15} className='rounded-full border-2 border-primary inline mr-1' /> :
                                    <RxCross1 color='#db4444' width={10} height={10} className='rounded-full border-2 border-secondary2 inline mr-1' />
                                    }
                                    Free Registration
                                </li>
                                <li className='list-none text-xs text-lightgrey'>
                                    {e.oneDedicatedAds ? 
                                    <TiTick color='#00B517' width={15} height={15} className='rounded-full border-2 border-primary inline mr-1' /> :
                                    <RxCross1 color='#db4444' width={10} height={10} className='rounded-full border-2 border-secondary2 inline mr-1' />
                                    }
                                    One Dedicated Advertisement Space 
                                </li>
                                <li className='list-none text-xs text-lightgrey'>
                                    {e.twoDedicatedAds ? 
                                     <TiTick color='#00B517' width={15} height={15} className='rounded-full border-2 border-primary inline mr-1' /> :
                                     <RxCross1 color='#db4444' width={10} height={10} className='rounded-full border-2 border-secondary2 inline mr-1' />
                                    }
                                    Two Dedicated Advertisement Space  
                                </li>
                                <li className='list-none text-xs text-lightgrey'>
                                    {e.completeBackendSupport ?
                                     <TiTick color='#00B517' width={15} height={15} className='rounded-full border-2 border-primary inline mr-1' /> :
                                     <RxCross1 color='#db4444' width={10} height={10} className='rounded-full border-2 border-secondary2 inline mr-1' />
                                    }
                                    Complete Backend Support  
                                </li>
                                <li className='list-none text-xs text-lightgrey'>
                                    {e["2Xvisibility"] ?
                                   <TiTick color='#00B517' width={15} height={15} className='rounded-full border-2 border-primary inline mr-1' /> :
                                   <RxCross1 color='#db4444' width={10} height={10} className='rounded-full border-2 border-secondary2 inline mr-1' />
                                    }
                                    2x Visibility  
                                </li>
                                <li className='list-none text-xs text-lightgrey'>
                                    {e["2daysInstagramPaidCampign"] ? 
                                    <TiTick color='#00B517' width={15} height={15} className='rounded-full border-2 border-primary inline mr-1' /> :
                                    <RxCross1 color='#db4444' width={10} height={10} className='rounded-full border-2 border-secondary2 inline mr-1' />
                                    }
                                    2 Days Instagram Paid Campaign per Month
                                </li>
                                <li className='list-none text-xs text-lightgrey'>
                                    {e.fullyCostimizedDashboard ?
                                    <TiTick color='#00B517' width={15} height={15} className='rounded-full border-2 border-primary inline mr-1' /> :
                                    <RxCross1 color='#db4444' width={10} height={10} className='rounded-full border-2 border-secondary2 inline mr-1' />
                                    }
                                    Fully Customized Dashboard  
                                </li>
                                <li className='list-none text-xs text-lightgrey'>
                                    {e["3xVisiblity"] ?
                                    <TiTick color='#00B517' width={15} height={15} className='rounded-full border-2 border-primary inline mr-1' /> :
                                    <RxCross1 color='#db4444' width={10} height={10} className='rounded-full border-2 border-secondary2 inline mr-1' />
                                    }
                                    3x Visiblity
                                </li>
                                <li className='list-none text-xs text-lightgrey'>
                                    {e.unRestrictedProductEntry ?
                                    <TiTick color='#00B517' width={15} height={15} className='rounded-full border-2 border-primary inline mr-1' /> :
                                    <RxCross1 color='#db4444' width={10} height={10} className='rounded-full border-2 border-secondary2 inline mr-1' />
                                    }
                                    Unrestricted Product Entry  
                                </li>
                                <li className='list-none text-xs text-lightgrey'>
                                    {e.potentialLeads ?
                                    <TiTick color='#00B517' width={15} height={15} className='rounded-full border-2 border-primary inline mr-1' /> :
                                    <RxCross1 color='#db4444' width={10} height={10} className='rounded-full border-2 border-secondary2 inline mr-1' />
                                    }
                                    Potential Leads  
                                </li>
                            </div>
                        </div>

                        <button className='bg-primary text-white rounded py-4 mt-11 mb-11' onClick={() => {
                            setCurrentStep(1);
                            setProductId(e.price);
                            console.log(e.price)
                        }}>
                            Subscribe Now
                        </button>
                    </div>)

                }
                {/* {
                    currentStep == 0 && [null, "price_1NhrMTSGfBzi8lNdGo4hRrxT", "price_1NhrMTSGfBzi8lNdGo4hRrxT"].map((value) => <div key={uuidv4()} className='flex flex-col w-[274px] shadow-xl bg-white'>
                        <div className='px-4 pt-4 border-b-2 border-b-primary' >
                            <div className='flex flex-col font-medium gap-2'>
                                <div className='text-lightgrey text-lg'>
                                    Free
                                </div>
                                <div className='flex flex-col text-primary text-4xl'>
                                    <span>
                                        0.0
                                    </span>
                                    <span className='text-xl'>
                                        /30 Days
                                    </span>
                                </div>
                            </div>
                            <div className='my-3 text-lightgrey'>
                                <p className='text-xs'>No Payment Required</p>
                                <p>This is a Free Plan with very limited to no features at all.</p>
                            </div>
                        </div>
                        <div className='flex flex-col px-4 py-4 gap-12 w-full'>
                            <div className='flex flex-col gap-6 py-4'>
                                <li className='list-none text-xs text-lightgrey'>
                                    <TiTick color='#00B517' width={15} height={15} className='rounded-full border-2 border-primary inline mr-1' />
                                    Free Registration
                                </li>
                                <li className='list-none text-xs text-lightgrey'>
                                <TiTick color='#00B517' width={15} height={15} className='rounded-full border-2 border-primary inline mr-1' />
                                    Complete Backend Support
                                </li>
                                <li className='list-none text-xs text-lightgrey'>
                                    <RxCross1 color='#db4444' width={10} height={10} className='rounded-full border-2 border-secondary2 inline mr-1' />
                                    Potential Leads
                                </li>
                                <li className='list-none text-xs text-lightgrey'>
                                    <RxCross1 color='#db4444' width={10} height={10} className='rounded-full border-2 border-secondary2 inline mr-1' />
                                    Fully Customized Dashboard
                                </li>
                                <li className='list-none text-xs text-lightgrey'>
                                    <RxCross1 color='#db4444' width={10} height={10} className='rounded-full border-2 border-secondary2 inline mr-1' />
                                    One Dedicated Advertisement Space
                                </li>
                                <li className='list-none text-xs text-lightgrey'>
                                    <RxCross1 color='#db4444' width={10} height={10} className='rounded-full border-2 border-secondary2 inline mr-1' />
                                    Two Dedicated Advertisement Space
                                </li>
                                <li className='list-none text-xs text-lightgrey'>
                                    <RxCross1 color='#db4444' width={10} height={10} className='rounded-full border-2 border-secondary2 inline mr-1' />
                                    Catalog Design
                                </li>
                            </div>
                        </div>

                        <button className='bg-primary text-white rounded py-4 mt-11' onClick={() => {
                            setCurrentStep(1);
                            setProductId(value)
                        }}>
                            Subscribe Now
                        </button>
                    </div>)

                } */}
                <div className='flex flex-col mx-14 gap-14 items-center w-full '>
                    {currentStep >= 1 && currentStep <= 2 && <Formik
                        initialValues={
                            {
                                username: '',
                                email: '',
                                first_name: '',
                                last_name: '',
                                address_1: '',
                                address_2: '',
                                country: '',
                                city_town: '',
                                state: '',
                                postcode_zip: '',
                                store_phone: '',
                                store_name: '',
                                aadhar_card_number: '',
                                aadhar_card_image_front: '',
                                aadhar_card_image_back: '',
                                license_number: '',
                                gstin: '',
                                password: '',
                                confirm_password: '',
                                agree_condition: '',
                            }
                        }

                        validationSchema={SignupSchema}
                        onSubmit={(values, { setSubmitting, resetForm }) => {
                            setSubmitting(true)


                            registrationCall(values, setSubmitting)


                        }}
                    >
                        {({
                            values,
                            errors,
                            touched,
                            setFieldValue,
                            handleChange,
                            handleBlur,
                            handleSubmit,
                            isValid,
                            dirty,
                            isSubmitting,
                        }) => (
                            <div className="mt-8 px-20 flex flex-col gap-6 bg-white py-10">
                                <h2 className='font-medium text-xl mb-4'>Registration</h2>

                                <div className='flex flex-wrap justify-between gap-8'>
                                    <div className='flex flex-col min-w-[300px] flex-1 gap-2'>
                                        <label htmlFor='username'>Username *</label>
                                        <input
                                            id='username'
                                            name='username'
                                            required
                                            onBlur={handleBlur}
                                            onChange={handleChange}
                                            value={values.username}
                                            className={`bg-littledarkgrey border h-12 w-full outline-none rounded px-4 py-3 
                                            ${touched.username && errors.username ? 'border-red-500' : 'focus:border-primary'}`}
                                            placeholder='MIN 5 MAX 15 alphanumeric characters' />
                                    </div>
                                    <div className='flex flex-col min-w-[320px] flex-1 gap-2'>
                                        <label htmlFor='email'>Email *</label>
                                        <input
                                            id='email'
                                            name='email'
                                            required
                                            onBlur={handleBlur}
                                            onChange={handleChange}
                                            value={values.email}
                                            className={`bg-littledarkgrey border h-12 w-full outline-none rounded px-4 py-3
                                            ${(touched.email && values.email.length == 0) || errors.email ? 'border-red-500' : 'focus:border-primary'}
                                    `}
                                            placeholder='Example@gmail.com' />
                                    </div>
                                </div>

                                <div className='flex flex-wrap justify-between gap-8'>
                                    <div className='flex flex-col w-full gap-2'>
                                        <label htmlFor='first_name'>First Name</label>
                                        <input
                                            id='first_name'
                                            name='first_name'
                                            value={values.first_name}
                                            required
                                            onBlur={handleBlur}
                                            onChange={handleChange}
                                            className={`bg-littledarkgrey border h-12 w-full outline-none rounded px-4 py-3
                                            ${touched.first_name && values.first_name.length == 0 ? 'border-red-500' : 'focus:border-primary'}
                                    `}
                                            placeholder='ABC' />
                                    </div>
                                    <div className='flex flex-col w-full gap-2'>
                                        <label htmlFor='PhoneNumber'>Last Name</label>
                                        <input
                                            id='last_name'
                                            name='last_name'
                                            value={values.last_name}
                                            required
                                            onBlur={handleBlur}
                                            onChange={handleChange}
                                            className={`bg-littledarkgrey border h-12 w-full outline-none rounded px-4 py-3
                                            ${touched.last_name && values.last_name.length == 0 ? 'border-red-500' : 'focus:border-primary'}`}
                                            placeholder='DEFG' />
                                    </div>
                                </div>

                                <div className='flex flex-wrap justify-between gap-8'>
                                    <div className='flex flex-col w-full gap-2'>
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
                                    <div className='flex flex-col w-full gap-2'>
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

                                <div className='flex flex-wrap justify-between gap-8'>
                                    <div className='flex flex-col w-full gap-2'>
                                        <label htmlFor='country'>Country *</label>
                                        <input
                                            id='country'
                                            name='country'
                                            value={values.country}
                                            required
                                            onBlur={handleBlur}
                                            onChange={handleChange}
                                            className={`bg-littledarkgrey border h-12 w-full outline-none rounded px-4 py-3
                                            ${(touched.country && values.country.length == 0) || errors.country ? 'border-red-500' : 'focus:border-primary'}
                                    `}
                                            placeholder='ABC' />
                                    </div>
                                    <div className='flex flex-col w-full gap-2'>
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

                                <div className='flex flex-wrap justify-between gap-8'>
                                    <div className='flex flex-col w-full  gap-2'>
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
                                    <div className='flex flex-col w-full  gap-2'>
                                        <label htmlFor='postcode_zip'>Postcode/Zip</label>
                                        <input
                                            id='postcode_zip'
                                            name='postcode_zip'
                                            value={values.postcode_zip}
                                            onBlur={handleBlur}
                                            onChange={handleChange}
                                            className={`bg-littledarkgrey border h-12 w-full outline-none rounded px-4 py-3
                                             focus:border-primary`}
                                            placeholder='DEFG' />
                                    </div>
                                </div>
                                <div className='flex flex-wrap justify-between gap-8'>
                                    <div className='flex flex-col w-full gap-2'>
                                        <label htmlFor='store_name'>Store Name *</label>
                                        <input
                                            id='store_name'
                                            name='store_name'
                                            value={values.store_name}
                                          
                                            onBlur={handleBlur}
                                            onChange={handleChange}
                                            className={`bg-littledarkgrey border h-12 w-full outline-none rounded px-4 py-3
                                            ${(touched.store_name && values.store_name.length == 0) || errors.store_phone ? 'border-red-500' : 'focus:border-primary'}
                                    `}
                                            placeholder='ABC' />
                                    </div>
                                </div>


                                <div className='flex flex-wrap justify-between gap-8'>
                                    <div className='flex flex-col w-full gap-2'>
                                        <label htmlFor='first_name'>Store Phone *</label>
                                        <input
                                            id='store_phone'
                                            name='store_phone'
                                            value={values.store_phone}
                                            required
                                            onBlur={handleBlur}
                                            onChange={handleChange}
                                            className={`bg-littledarkgrey border h-12 w-full outline-none rounded px-4 py-3
                                            ${(touched.store_phone && values.store_phone.length == 0) || errors.store_phone ? 'border-red-500' : 'focus:border-primary'}
                                    `}
                                            placeholder='ABC' />
                                    </div>
                                    <div className='flex flex-col w-full gap-2'>
                                        <label htmlFor='aadhar_card_number'>Aadhar Card Number *</label>
                                        <input
                                            id='aadhar_card_number'
                                            name='aadhar_card_number'
                                            value={values.aadhar_card_number}
                                            required
                                            onBlur={handleBlur}
                                            onChange={handleChange}
                                            className={`bg-littledarkgrey border h-12 w-full outline-none rounded px-4 py-3
                                            ${(touched.aadhar_card_number && values.aadhar_card_number.length == 0) || errors.aadhar_card_number ? 'border-red-500' : 'focus:border-primary'}`}
                                            placeholder='DEFG' />
                                    </div>
                                </div>

                                <div className='flex flex-wrap justify-between gap-8'>
                                    <div className='flex flex-col w-full gap-2'>
                                        <label className='w-full' htmlFor='aadhar_card_image_front'>Upload Aadhar Card Image (Front) *</label>
                                        <input
                                            id='aadhar_card_image_front'
                                            name='aadhar_card_image_front'
                                            required
                                            type="file"
                                            accept="image/*"
                                            onBlur={handleBlur}
                                            onChange={(e) => {
                                                setFieldValue('aadhar_card_image_front', e.currentTarget.files[0]);
                                            }}
                                            className={`bg-littledarkgrey border h-12 w-full outline-none rounded px-4 py-3
      ${(touched.aadhar_card_image_front && !values.aadhar_card_image_front) || errors.aadhar_card_image_front ? 'border-red-500' : 'focus:border-primary'}
    `}
                                            placeholder='Select file'
                                        />
                                    </div>
                                    <div className='flex flex-col w-full gap-2'>
                                        <label className='w-full' htmlFor='aadhar_card_image_back'>Upload Aadhar Card Image (Back) *</label>
                                        <input
                                            id='aadhar_card_image_back'
                                            name='aadhar_card_image_back'
                                            required
                                            type="file"
                                            accept="image/*"
                                            onBlur={handleBlur}
                                            onChange={(e) => {
                                                setFieldValue('aadhar_card_image_back', e.currentTarget.files[0]);
                                            }}
                                            className={`bg-littledarkgrey border h-12 w-full outline-none rounded px-4 py-3
      ${(touched.aadhar_card_image_back && !values.aadhar_card_image_back) || errors.aadhar_card_image_back ? 'border-red-500' : 'focus:border-primary'}
    `}
                                            placeholder='Select file'
                                        />
                                    </div>
                                </div>
                                <div className='flex flex-wrap justify-between gap-8'>
                                    <div className='flex flex-col w-full gap-2'>
                                        <label htmlFor='first_name'>Shop License Number *</label>
                                        <input
                                            id='license_number'
                                            name='license_number'
                                            value={values.license_number}
                                            required
                                            onBlur={handleBlur}
                                            onChange={handleChange}
                                            className={`bg-littledarkgrey border h-12 w-full outline-none rounded px-4 py-3
                                            ${(touched.license_number && values.license_number.length == 0) || errors.license_number ? 'border-red-500' : 'focus:border-primary'}
                                    `}
                                            placeholder='000000000' />
                                    </div>
                                    <div className='flex flex-col w-full gap-2'>
                                        <label htmlFor='gstin'>GSTIN *</label>
                                        <input
                                            id='gstin'
                                            name='gstin'
                                            value={values.gstin}
                                            required
                                            onBlur={handleBlur}
                                            onChange={handleChange}
                                            className={`bg-littledarkgrey border h-12 w-full outline-none rounded px-4 py-3
                                            ${(touched.gstin && values.gstin.length == 0) || errors.gstin ? 'border-red-500' : 'focus:border-primary'}`}
                                            placeholder='000000000' />
                                    </div>
                                </div>

                                <div className='flex flex-wrap justify-between gap-8'>
                                    <div className='flex flex-col w-full gap-2'>
                                        <label htmlFor='password'>Password *</label>
                                        <input
                                            id='password'
                                            name='password'
                                            value={values.password}
                                            required
                                            onBlur={handleBlur}
                                            onChange={handleChange}
                                            className={`bg-littledarkgrey border h-12 w-full outline-none rounded px-4 py-3
                                            ${(touched.password && values.password.length == 0) || errors.password ? 'border-red-500' : 'focus:border-primary'}
                                    `}
                                            placeholder='Password' />
                                    </div>
                                    <div className='flex flex-col w-full gap-2'>
                                        <label htmlFor='confirm_password'>Confirm Password *</label>
                                        <input
                                            id='confirm_password'
                                            name='confirm_password'
                                            value={values.confirm_password}
                                            required
                                            onBlur={handleBlur}
                                            onChange={handleChange}
                                            className={`bg-littledarkgrey border h-12 w-full outline-none rounded px-4 py-3
                                            ${(touched.confirm_password && values.confirm_password.length == 0) || errors.confirm_password ? 'border-red-500' : 'focus:border-primary'}`}
                                            placeholder='Confirm Password' />
                                    </div>
                                </div>

                                <div className='flex flex-wrap'>
                                    <div className='flex w-full gap-2'>
                                        <input
                                            type='checkbox'
                                            id='agree_condition'
                                            name='agree_condition'
                                            required
                                            value={values.agree_condition}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                        />
                                        <label className={`w-full ${errors.agree_condition ? 'text-secondary2' : ''}`} htmlFor='agree_condition'>Agree To Terms & Conditions *</label>
                                    </div>
                                </div>

                                <div className='flex w-full justify-end gap-8'>
                                    <button onClick={() => {

                                    }} >Cancle</button>
                                    {
                                        productId ? <button
                                            onClick={() => {
                                                if (isValid && dirty) {
                                                    handleSubmit()
                                                    
                                                    checkout({
                                                        userId: 711,
                                                        lineItems: [
                                                            {
                                                                price: productId,
                                                                quantity: 1
                                                            }
                                                        ]
                                                    })
                                                } else {
                                                    toast.error(errors[Object.keys(errors)[0]]);
                                                }
  


                                                // checkout({
                                                //     userId: 711,
                                                //     lineItems: [
                                                //         {
                                                //             price: productId,
                                                //             quantity: 1
                                                //         }
                                                //     ]
                                                // })
                                            }
                                            }
                                            disabled={isSubmitting}
                                            type='submit'
                                            className='bg-primary px-12 py-4 text-white rounded'>
                                            Proceed To Payment
                                        </button> :

                                     <button
                                        onClick={() => {

                                            if (isValid && dirty) {
                                                handleSubmit()
                                            } else {
                                                toast.error(errors[Object.keys(errors)[0]]);
                                            }
                                        }
                                        }
                                        disabled={isSubmitting}
                                        type='submit'
                                        className='bg-primary px-12 py-4 text-white rounded'>
                                        Register
                                     </button>
                                    
                                    }
                                </div>
                            </div>
                        )}
                    </Formik>
                    }
                    {currentStep == 3 ? <>
                        <div className='min-w-[240px] w-[340px]'>
                            <img src='/assets/vendor.png' className='w-full' />
                        </div>

                        <div className='min-w-[240px] text-center flex flex-col gap-5'>
                            <h3 className='text-3xl font-medium text-black'>Thank You</h3>
                            <p className='text-2xl font-medium text-lightgrey'>Your Registration is Successful</p>
                        </div>

                        <div className='w-[340px] flex justify-center items-center'>
                            <button className='bg-primary px-12 py-4 text-white rounded min-w-max'>
                                Visit Vendor Dashboard
                            </button>
                        </div>
                    </> : null
                    }


                </div>
            </div>
        </div>

    )
}

export default VendorRegistration