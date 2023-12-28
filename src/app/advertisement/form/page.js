"use client"

import { Formik, Field, Form } from 'formik';
import Image from 'next/image';
import { FiPlus } from 'react-icons/fi'


function Advertisement_Form() {
    return (
        <Formik
            initialValues={{
                account: '',
                fullName: '',
                email: '',
                phoneNo: '',
                section: '',
                title: '',
                category: '',
                price: '',
                location: '',
                description: '',

            }}
            onSubmit={async (values) => {
                await new Promise((r) => setTimeout(r, 500));
                alert(JSON.stringify(values, null, 2));
            }}
        >
            {
                props => (
                    <div className='flex max-w-[1440px] flex-col mx-4 sm:mx-14 mt-4 sm:mt-14 gap-7 sm:gap-14'>
                        <div>
                            <Form className='flex flex-col gap-5'>
                                <div className='flex flex-col'>
                                    <h2 className="font-medium text-2xl pb-10">
                                        Contact Information
                                    </h2>
                                    <div className='flex justify-center flex-col flex-wrap gap-5'>
                                        <div className='flex flex-wrap gap-5'>
                                            <div className='flex-1 min-w-[250px]'>
                                                <label htmlFor="account">Account</label>
                                                <br />
                                                <Field required className="h-[40px] p-4 outline-none border-gray-300 border rounded w-full" id="account" name="acount" placeholder="Account" />
                                                <span className='text-red-600 block text-xs font-normal' >If you want to use a different account, please logout.</span>
                                            </div>
                                            <div className='flex-1 min-w-[250px]'>
                                                <label className='required-mark' htmlFor="fullName">Full Name</label>
                                                <br />
                                                <Field className="h-[40px] p-4 outline-none border-gray-300 border rounded w-full" id="fullName" name="fullName" placeholder="Full Name" />
                                            </div>
                                        </div>
                                        <div className='flex flex-wrap gap-5'>
                                            <div className='flex-1 min-w-[250px]'>
                                                <label className='required-mark' htmlFor="email">Email</label>
                                                <br />
                                                <Field className="h-[40px] p-4 outline-none border-gray-300 border rounded w-full" id="email" name="email" placeholder="Email" type="email" />
                                            </div>
                                            <div className='flex-1 min-w-[250px]'>
                                                <label htmlFor="phoneNo">Phone Number</label>
                                                <br />
                                                <Field className="h-[40px] p-4 outline-none border-gray-300 border rounded w-full" id="phoneNo" name="phoneNo" placeholder="Phone Number" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className='flex flex-col'>
                                    <h2 className="font-medium text-2xl py-10">
                                        Item Information
                                    </h2>
                                    <div className='flex justify-center flex-col gap-5'>
                                        <div className='flex flex-wrap gap-5'>
                                            <div className='flex-1 min-w-[250px]'>
                                                <label className=' required-mark' htmlFor="section">Select Section</label>
                                                <br />
                                                <Field as="select" className="h-[40px] p-4 outline-none border-gray-300 border rounded w-full" component="select" id="section" name="section" placeholder="Select Section">
                                                </Field>
                                            </div>
                                            <div className='flex-1 min-w-[250px]'>
                                                <label className='required-mark' htmlFor="title">Title</label>
                                                <br />
                                                <Field required className="h-[40px] p-4 outline-none border-gray-300 border rounded w-full" id="title" name="title" placeholder="Title" />
                                            </div>
                                        </div>
                                        <div className='flex flex-wrap gap-5'>
                                            <div className='flex-1 min-w-[250px]'>
                                                <label htmlFor="category">Category</label>
                                                <br />
                                                <Field as="select" className="h-[40px] p-4 outline-none border-gray-300 border rounded w-full" id="category" name="category" placeholder="Category" />
                                            </div>
                                            <div className='flex-1 min-w-[250px]'>
                                                <labe className='required-mark' htmlFor="price">Price</labe>
                                                <br />
                                                <Field required className="h-[40px] p-4 outline-none border-gray-300 border rounded w-full" id="price" name="price" placeholder="Price" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div>
                                    <label className='required-mark' htmlFor="location">Location</label>
                                    <br />
                                    <Field required className="h-[40px] p-4 outline-none border-gray-300 border rounded w-full" id="location" name="location" placeholder="Location">
                                    </Field>
                                </div>
                                <div>
                                    <label className='required-mark' htmlFor="description">Description</label>
                                    <br />

                                    <Field required rows={5} as="textarea" className="p-4 outline-none border-gray-300 border rounded w-full" id="description" name="description" placeholder="Description">
                                    </Field>
                                </div>

                                <div>
                                    <label className='required-mark' htmlFor="gallery">Gallery</label>
                                    <br />

                                    <div className='flex gap-4'>
                                        <label htmlFor='gallery-1'>
                                            <span className='flex justify-center items-center bg-greybg w-16 h-16 rounded-md'>
                                                <FiPlus width={15} height={15} />
                                            </span>
                                        </label>
                                        <label htmlFor='gallery-2'>
                                            <span className='flex justify-center items-center  bg-greybg w-16 h-16 rounded-md'>
                                                <FiPlus width={15} height={15} />
                                            </span>
                                        </label>
                                        <label htmlFor='gallery-3'>
                                            <span className='flex justify-center items-center  bg-greybg w-16 h-16 rounded-md'>
                                                <FiPlus width={15} height={15} />
                                            </span>
                                        </label>
                                        <label htmlFor='gallery-4'>
                                            <span className='flex justify-center items-center  bg-greybg w-16 h-16 rounded-md'>
                                                <FiPlus width={15} height={15} />
                                            </span>
                                        </label>
                                    </div>

                                    <Field required type="file" className="hidden" id="gallery-1" name="gallery-1">
                                    </Field>
                                    <Field required type="file" className="hidden" id="gallery-2" name="gallery-2">
                                    </Field>
                                    <Field required type="file" className="hidden" id="gallery-3" name="gallery-3">
                                    </Field>
                                    <Field required type="file" className="hidden" id="gallery-4" name="gallery-4">
                                    </Field>
                                </div>

                                <div className='flex flex-col'>
                                    <h2 className="font-medium text-2xl py-10">
                                        Listing Information
                                    </h2>
                                    <div className='flex flex-row flex-wrap sm:justify-center lg:justify-between gap-5'>
                                        <div className='flex flex-col justify-between w-[350px]'>
                                            <div className='flex flex-row items-start gap-3'>
                                                <Field required className="mt-1" type='radio' name="plan" id='plan' value="free">
                                                </Field>
                                                <div>
                                                    Free Advertise Plan
                                                    <div className='text-xs flex'>
                                                        <img src='/Icons/Calendar_Check.png' width={16} height={16} /> 1 Day
                                                    </div>
                                                    <div className='text-[#FF1717] text-2xl' >
                                                        Rs. 0.0
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className='flex flex-col w-[350px]'>
                                            <div className='flex flex-row items-start gap-3'>
                                                <Field required className="mt-1" type='radio' name="plan" id='plan' value="economic">
                                                </Field>
                                                <div>
                                                    Economic Advertise Plan
                                                    <div className='text-xs flex'>
                                                        <img src='/Icons/Calendar_Check.png' width={16} height={16} /> 7 Days
                                                    </div>
                                                    <div className='text-[#FF1717] text-2xl' >
                                                        Rs. 49.0
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className='flex flex-col w-[350px]'>
                                            <div className='flex flex-row items-start gap-3'>
                                                <Field required className="mt-1" type='radio' name="plan" id='plan' value="business">
                                                </Field>
                                                <div>
                                                    Business Advertise Plan
                                                    <div className='text-xs flex'>
                                                        <img src='/Icons/Calendar_Check.png' width={16} height={16} /> 15 Days
                                                    </div>
                                                    <div className='text-[#FF1717] text-2xl' >
                                                        Rs. 99.0
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                    </div>
                                </div>

                                <div className='flex justify-center my-14'>
                                    <button type="submit" className='mx-auto bg-primary py-4 px-[100px] text-white rounded'>Preview</button>
                                </div>
                            </Form>
                        </div>
                    </div >
                )
            }
        </Formik >
    )
}

export default Advertisement_Form;