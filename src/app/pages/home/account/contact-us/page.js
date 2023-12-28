'use client'

import { BsTelephone } from 'react-icons/bs'
import NewsLetter from '../../../../components/NewsLetter/NewsLetter';
import { Formik } from 'formik';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function ContactUs() {

    return (
        <div className="bg-greybg">
            <Formik
                initialValues={{ name: '', email: '', phone: '', message: '' }}
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
                    setSubmitting(true)
                    setTimeout(() => {
                        alert(JSON.stringify(values, null, 2));
                        setSubmitting(false);
                        resetForm();
                        toast("Your Message is Recorded !")
                    }, 400);
                }}
            >
                {({
                    values,
                    errors,
                    touched,
                    handleChange,
                    handleBlur,
                    handleSubmit,
                    isSubmitting,
                }) => (
                    <div className="w-full mt-8">
                        <div className="h-full flex flex-col gap-9 bg-white px-8 py-10">
                            <div className='flex sm:flex-row flex-wrap justify-between gap-2'>
                                <input
                                    value={values.name}
                                    name='name'
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    required
                                    placeholder='Your Name'
                                    className={`min-w-[230px] flex-1 h-10 px-4 rounded border outline-none
                                         bg-littledarkgrey ${touched.name && values.name.length === 0 ? 'border-red-500' : 'focus:border-primary'}`} />
                                <input
                                    value={values.email}
                                    name='email'
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    placeholder='Your Email'
                                    required
                                    className={`min-w-[230px] flex-1 h-10 px-4 rounded border outline-none
                                         bg-littledarkgrey ${(touched.email && values.email.length === 0) || errors?.email?.length ? 'border-red-500' : 'focus:border-primary'}`} />
                                <input
                                    value={values.phone}
                                    name='phone'
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    placeholder='Your Phone'
                                    required
                                    className={`min-w-[230px] flex-1 h-10 px-4 rounded border outline-none
                                         bg-littledarkgrey ${touched.phone && values.phone.length === 0 ? 'border-red-500' : 'focus:border-primary'}`} />
                            </div>
                            <div className='h-48'>
                                <textarea
                                    value={values.message}
                                    name='message'
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    placeholder='Your Message'
                                    required
                                    className={`w-full px-4 py-4 resize-none h-full rounded border outline-none
                                         bg-littledarkgrey ${touched.message && values.message.length === 0 ? 'border-red-500' : 'focus:border-primary'}`}
                                />
                            </div>
                            <div className='flex justify-end'>
                                <button type="submit" disabled={isSubmitting} onClick={handleSubmit} className='bg-primary px-12 py-4 text-white rounded '>
                                    Send Message
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </Formik>

            <div className='flex flex-row justify-center gap-14 md:flex-nowrap mt-8 bg-white flex-wrap'>
                <div className="w-full items-center md:w-auto flex gap-9">

                    <div className="flex flex-wrap items-center px-9 py-9  gap-9">
                        <div className='w-[250px]'>
                            <div className='flex items-center gap-4 pb-6'>
                                <span className='w-10 h-10 flex justify-center items-center bg-primary rounded-full'>
                                    <BsTelephone width={20} height={20} color='#fff' />
                                </span>
                                <span className='font-medium'>Call To Us</span>
                            </div>
                            <div className='flex flex-col gap-4 text-sm'>
                                <span>
                                    We are available 24/7, 7 days a week.
                                </span>
                                <span>
                                    Phone: 080 - 9876543210s
                                </span>
                            </div>
                        </div>

                        <div className='w-[250px]'>
                            <div className='flex items-center gap-4 pb-6'>
                                <span className='w-10 h-10 flex justify-center items-center bg-primary rounded-full'>
                                    <BsTelephone width={20} height={20} color='#fff' />
                                </span>
                                <span className='font-medium'>Write To US</span>
                            </div>
                            <div className='flex flex-col gap-4 text-sm'>
                                <span>
                                    Fill out our form and we will contact you within 2-4 business hours.
                                </span>
                                <span>
                                    Emails: info@cleantech-mart.com
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>


    )
}

export default ContactUs;