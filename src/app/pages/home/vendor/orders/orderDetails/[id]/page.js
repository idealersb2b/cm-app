"use client"

import { Box, Button, Modal, Typography } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { Formik } from 'formik';
import Link from 'next/link';
import React, { useState } from 'react'
import MultiSelect from 'react-select';
import { v4 as uuidv4 } from 'uuid'

const Order_status_options = [
    { value: 'wc-pending', label: 'Pending payment' },
    { value: "wc-processing", label: 'Processing' },
    { value: 'wc-on-hold', label: 'On hold' },
    { value: 'wc-completed', label: 'Completed' },
    { value: 'wc-cancelled', label: 'Cancelled' },
    { value: 'wc-refunded', label: 'Refunded' },
    { value: 'wc-failed', label: 'Failed' },
    { value: 'wc-checkout-draft', label: 'New Quote Request' },
    { value: 'wc-ywraq-new', label: 'Pending Quote' },
    { value: 'wc-ywraq-pending', label: 'Expired Quote' },
    { value: 'wc-ywraq-expired', label: 'Accepted Quote' },
    { value: 'wc-ywraq-accepted', label: 'Draft' },
    { value: 'wc-ywraq-rejected', label: 'Rejected Quote' },
]

const Override_checkout_fields_options = [
    { value: '', label: 'Do not override Billing and Shipping Info' },
    { value: "both", label: 'Override Billing and Shipping Info' },
    { value: 'billing', label: 'Override Billing Info' },
    { value: 'shipping', label: 'Override Shipping Info' },
]

const columns = [
    {
        field: 'product_name', headerName: 'Item', width: 200, sortable: false, renderCell: (params) => <div className='flex items-center'>
            <div className='flex items-center rounded-full'>
                <img className='h-[35px] w-[35px] ' src={params.row.product_image} />
            </div>
            {params.row.product_name}
        </div>
    },
    { field: 'sku', headerName: 'SKU', width: 100, sortable: false },
    { field: 'status', headerName: 'QTY', width: 100, sortable: false },
    { field: 'stock', headerName: 'TOTAL', type: 'number', width: 100, sortable: false }

];

const rows = [
    { id: uuidv4(), product_image: '/product/product_img-1.png', product_name: ' Disposable straws', sku: 'IDEFLILALSSL03', status: 'Active', stock: '20', price: '$3428', taxonomies: 'Categories:..', date_created: '22 Oct 2023' },
    { id: uuidv4(), product_image: '/product/product_img-1.png', product_name: ' Disposable straws', sku: '20', status: 'Active', stock: '20', price: '$3428', taxonomies: 'Categories:..', date_created: '22 Oct 2023' },
    { id: uuidv4(), product_image: '/product/product_img-1.png', product_name: ' Disposable straws', sku: '20', status: 'Active', stock: '20', price: '$3428', taxonomies: 'Categories:..', date_created: '22 Oct 2023' }
];


const style = {
    position: 'absolute',
    display: 'flex',
    gap: 2,
    flexDirection: 'column',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '-webkit-fill-available',
    minWidth: 300,
    bgcolor: 'background.paper',
    borderRadius: 2,
    boxShadow: 24,
    p: 4,
};


function page() {

    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);


    return (
        <div className='flex flex-col mx-5 sm:mx-14 gap-14 items-center w-full '>
            <Formik
                initialValues={
                    {
                        order_status: '',
                        customer_name: "",
                        customer_email: "",
                        customer_message: "",
                        attach_message_to_the_quote_before_the_table_list: "",
                        attach_message_to_the_quote_after_the_table_list: "",
                        optional_attachment: "",
                        expire_date: "",
                        send_the_customer_to_pay_for_quote: "",
                        override_checkout_fields: "",
                        lock_the_editing_of_fields_selected_above: "",
                        override_shipping: "",
                    }
                }


                onSubmit={(values, { setSubmitting, resetForm }) => {
                    setSubmitting(true)

                    console.log(values)

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
                    <div className='mt-9 rounded shadow-md h-max w-full flex flex-col px-6 pb-6 sm:gap-5 gap-14'>
                        <div className='w-full bg-white rounded justify-between bg-red px-5 py-6 text-primary font-semibold'>
                            Order #23350Accepted Quote
                        </div>
                        <div className='flex flex-col w-full bg-white rounded justify-between bg-red px-5 py-6  gap-4'>
                            <div>
                                Order date: August 2, 2023 @1:43 pm
                            </div>

                            <div className='flex flex-col flex-1 gap-2'>
                                <label htmlFor='order_status'>Order status:</label>
                                <MultiSelect
                                    id='order_status'
                                    name='order_status'
                                    value={values.order_status}
                                    onChange={(e) => {
                                        setFieldValue('order_status', e)
                                    }}
                                    isClearable
                                    options={Order_status_options} />
                            </div>
                            <div>Customer: <Link className='text-primary hover:underline' href='#' >
                                View other orders</Link> → Sourabh Shantaram Gaikwad (#681 - saurabhgaikwad.g@gmail.com)</div>
                            <div>Customer IP: 49.36.50.201</div>

                            <div className='flex flex-wrap w-full justify-between gap-6'>
                                <div className='flex flex-col gap-2'>
                                    <h4 className='text-primary border-b-2 border-b-littledarkgrey'> Billing Details</h4>
                                    <div>Sourabh Shantaram Gaikwad Gaikwad
                                        Maharashtra</div>
                                    <div>Email: saurabhgaikwad.g@gmail.com</div>
                                    <div>Phone: 9359166329</div>
                                </div>
                                <div className='flex flex-col gap-2'>
                                    <h4 className='text-primary border-b-2 border-b-littledarkgrey'> Billing Details</h4>
                                    <div>Sourabh Shantaram Gaikwad Gaikwad
                                        Maharashtra</div>
                                    <div>Email: saurabhgaikwad.g@gmail.com</div>
                                    <div>Phone: 9359166329</div>
                                </div>
                            </div>
                        </div>

                        <div className='flex flex-col w-full bg-white rounded justify-between bg-red px-5 py-6  gap-4'>
                            <div className='w-full px-2 py-2 bg-primary text-start text-white'>
                                Order Items
                            </div>

                            <div style={{ width: '100%' }}>
                                <DataGrid
                                    disableRowSelectionOnClick
                                    disableColumnMenu
                                    hideFooterPagination
                                    rows={rows}
                                    columns={columns}
                                />
                            </div>

                            <div className='flex flex-wrap justify-between'>
                                <div>
                                    <h2>Coupon(s) Used</h2>
                                    <div>discount #23350 (august 26, 2023 12:28 am)</div>
                                </div>
                                <div className='w-[300px]'>
                                    <div className='grid grid-cols-2'>
                                        <div>Discount:</div>
                                        <div>₹72.0</div>
                                    </div>
                                    <div className='grid grid-cols-2'>
                                        <div>Order Total:</div>
                                        <div>₹2,628.0</div>
                                    </div>
                                    <div className='grid grid-cols-2'>
                                        <div>Vendor(s) Earning:</div>
                                        <div>₹2,162.8</div>
                                    </div>
                                    <div className='grid grid-cols-2'>
                                        <div>Admin Fee:</div>
                                        <div>₹465.2</div>
                                    </div>
                                </div>
                            </div>

                            <div className='w-full flex justify-end'>
                                <button className='bg-primary rounded text-white p-2' onClick={handleOpen}>
                                    Edit
                                </button>
                            </div>

                        </div>

                        <div className='flex flex-col w-full bg-white rounded justify-between bg-red px-5 py-6  gap-4'>
                            <div className='w-full px-2 py-2 bg-primary text-start text-white'>
                                Request a Quote Order Settings
                            </div>

                            <div className='flex flex-wrap justify-between gap-8'>
                                <div className='flex flex-col flex-1 gap-2'>
                                    <label htmlFor='customer_name'>Customer's name</label>
                                    <input
                                        id='customer_name'
                                        name='customer_name'
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        value={values.customer_name}
                                        className={`bg-littledarkgrey border h-12 w-full outline-none rounded px-4 py-3 focus:border-primary`}
                                        placeholder='Customer Name' />
                                </div>
                            </div>

                            <div className='flex flex-wrap justify-between gap-8'>
                                <div className='flex flex-col flex-1 gap-2'>
                                    <label htmlFor='customer_email'>Customer's email</label>
                                    <input
                                        rows={3}
                                        id='customer_email'
                                        name='customer_email'
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        value={values.customer_email}
                                        className={`bg-littledarkgrey border h-12 w-full outline-none rounded px-4 py-3 focus:border-primary`}
                                        placeholder='Customer Email' />
                                </div>
                            </div>

                            <div className='flex flex-wrap justify-between gap-8'>
                                <div className='flex flex-col flex-1 gap-2'>
                                    <label htmlFor='customer_message'>Customer's message</label>
                                    <textarea
                                        rows={3}
                                        id='customer_message'
                                        name='customer_message'
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        value={values.customer_message}
                                        className={`bg-littledarkgrey border w-full outline-none rounded px-4 py-3 focus:border-primary`}
                                        placeholder='Customer Message' />
                                </div>
                            </div>

                            <div className='flex flex-wrap justify-between gap-8'>
                                <div className='flex flex-col flex-1 gap-2'>
                                    <label htmlFor='attach_message_to_the_quote_before_the_table_list'>Attach message to the quote before the table list (optional)</label>
                                    <textarea
                                        rows={3}
                                        id='attach_message_to_the_quote_before_the_table_list'
                                        name='attach_message_to_the_quote_before_the_table_list'
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        value={values.attach_message_to_the_quote_before_the_table_list}
                                        className={`bg-littledarkgrey border w-full outline-none rounded px-4 py-3 focus:border-primary`}
                                    />
                                </div>
                            </div>
                            <div className='flex flex-wrap justify-between gap-8'>
                                <div className='flex flex-col flex-1 gap-2'>
                                    <label htmlFor='attach_message_to_the_quote_after_the_table_list'>Attach message to the quote after the table list (optional)</label>
                                    <textarea
                                        rows={3}
                                        id='attach_message_to_the_quote_after_the_table_list'
                                        name='attach_message_to_the_quote_after_the_table_list'
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        value={values.attach_message_to_the_quote_after_the_table_list}
                                        className={`bg-littledarkgrey border w-full outline-none rounded px-4 py-3 focus:border-primary`}
                                    />
                                </div>
                            </div>

                            <div className='flex flex-wrap justify-between gap-8'>
                                <div className='flex flex-col flex-1 gap-2'>
                                    <label htmlFor='expire_date'>Expire date (optional)</label>
                                    <input
                                        rows={3}
                                        id='expire_date'
                                        name='expire_date'
                                        type='date'
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        value={values.expire_date}
                                        className={`bg-littledarkgrey border w-full outline-none rounded px-4 py-3 focus:border-primary`}
                                    />
                                </div>
                            </div>

                            <div className='flex flex-wrap justify-between gap-8'>
                                <div className='flex flex-row min-w-[300px] flex-1 gap-4'>
                                    <label htmlFor='send_the_customer_to_pay_for_quote'>Send the customer to "Pay for Quote"</label>
                                    <input
                                        id='send_the_customer_to_pay_for_quote'
                                        name='send_the_customer_to_pay_for_quote'
                                        type='checkbox'
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        value={values.send_the_customer_to_pay_for_quote}
                                        className={`bg-littledarkgrey border w-full outline-none rounded px-4 py-3 focus:border-primary`}
                                    />
                                </div>
                            </div>

                            <div className='flex flex-col flex-1 gap-2'>
                                <label htmlFor='override_checkout_fields'>Override checkout fields</label>
                                <MultiSelect
                                    id='override_checkout_fields'
                                    name='override_checkout_fields'
                                    value={values.override_checkout_fields}
                                    onChange={(e) => {
                                        setFieldValue('override_checkout_fields', e)
                                    }}
                                    options={Override_checkout_fields_options} />
                            </div>

                            <div className='flex flex-wrap justify-between gap-8'>
                                <div className='flex flex-row min-w-[300px] flex-1 gap-4'>
                                    <label htmlFor='lock_the_editing_of_fields_selected_above'>Lock the editing of fields selected above</label>
                                    <input
                                        id='lock_the_editing_of_fields_selected_above'
                                        name='lock_the_editing_of_fields_selected_above'
                                        type='checkbox'
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        value={values.lock_the_editing_of_fields_selected_above}
                                        className={`bg-littledarkgrey border w-full outline-none rounded px-4 py-3 focus:border-primary`}
                                    />
                                </div>
                            </div>

                            <div className='flex flex-wrap justify-between gap-8'>
                                <div className='flex flex-row min-w-[300px] flex-1 gap-4'>
                                    <label htmlFor='override_shipping'>Override shipping</label>
                                    <input
                                        id='override_shipping'
                                        name='override_shipping'
                                        type='checkbox'
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        value={values.override_shipping}
                                        className={`bg-littledarkgrey border w-full outline-none rounded px-4 py-3 focus:border-primary`}
                                    />
                                </div>
                            </div>

                            <div className='w-full flex sm:justify-end justify-center gap-4'>
                                <button className='p-2 text-base bg-primary text-white rounded'>VIEW PDF</button>
                                <button className='p-2 text-base bg-primary text-white rounded'>SEND QUOTE</button>
                            </div>

                        </div>
                        <div className='flex flex-col w-full bg-white rounded justify-between bg-red px-5 py-6  gap-4'>
                            <div className='w-full px-2 py-2 bg-primary text-start text-white'>
                                Order Notes
                            </div>

                            <div className='flex flex-col justify-between gap-8 text-sm'>
                                <div className='flex flex-row justify-between flex-1 w-full gap-2 bg-littledarkgrey px-2 py-2 rounded'>
                                    <div className='flex flex-1'>new note</div>
                                    <div className='flex flex-1'>added on August 26, 2023 at 12:27 am by thedealersteam@gmail.com</div>
                                </div>
                                <div className='flex flex-row justify-between flex-1 w-full gap-2 bg-littledarkgrey px-2 py-2 rounded'>
                                    <div className='flex flex-1'>Order status changed from Pending Quote to Accepted Quote.</div>
                                    <div className='flex flex-1'>added on August 2, 2023 at 1:46 pm</div>
                                </div>
                            </div>

                            <div className='flex flex-wrap justify-between gap-8'>
                                <div className='flex flex-col flex-1 gap-2'>
                                    <label htmlFor='add'>Add note</label>
                                    <textarea
                                        id='customer_name'
                                        name='customer_name'
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        value={values.customer_name}
                                        className={`bg-littledarkgrey border w-full outline-none rounded px-4 py-3 focus:border-primary`}
                                    />
                                </div>
                            </div>

                            <div className='flex flex-wrap justify-between gap-8'>
                                <div className='flex flex-col flex-1 gap-2'>
                                    <label htmlFor='add'>Name</label>
                                    <input
                                        id='customer_name'
                                        name='customer_name'
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        value={values.customer_name}
                                        className={`bg-littledarkgrey border w-full outline-none rounded px-4 py-3 focus:border-primary`}
                                    />
                                </div>
                            </div>

                            <div className='flex flex-wrap justify-between gap-8'>
                                <div className='flex flex-col  flex-1 gap-2'>
                                    <label htmlFor='add'>File</label>
                                    <input
                                        id='customer_name'
                                        name='customer_name'
                                        type='file'
                                        accept="image/*"
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        value={values.customer_name}
                                        className={`bg-littledarkgrey border w-full outline-none rounded px-4 py-3 focus:border-primary`}
                                    />
                                </div>
                            </div>

                            <div className='flex flex-col flex-1 gap-2'>
                                <label htmlFor='override_checkout_fields'>Note Type</label>
                                <MultiSelect
                                    id='override_checkout_fields'
                                    name='override_checkout_fields'
                                    value={values.override_checkout_fields}
                                    onChange={(e) => {
                                        setFieldValue('override_checkout_fields', e)
                                    }}
                                    options={Override_checkout_fields_options} />
                            </div>

                            <div className='w-full flex sm:justify-end justify-center gap-4'>
                                <button className='p-2 text-base bg-primary text-white rounded'>ADD</button>
                            </div>

                        </div>
                    </div>
                )}
            </Formik>



            {/* Modal */}
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <div style={{ width: '100%' }}>
                        <DataGrid
                            disableRowSelectionOnClick
                            disableColumnMenu
                            hideFooter
                            rows={rows}
                            columns={columns}
                        />
                    </div>

                    <div className='flex flex-wrap justify-between gap-8'>
                        <div className='flex flex-col flex-1 gap-2'>
                            <label>Apply Discount</label>
                            <input
                                className={`bg-littledarkgrey border h-12 w-full outline-none rounded px-4 py-3 focus:border-primary`}
                            />
                        </div>
                    </div>
                    <div className='flex flex-wrap justify-between gap-8'>
                        <div className='flex flex-col flex-1 gap-2'>
                            <label>Note to Customer</label>
                            <textarea
                                rows={3}
                                className={`bg-littledarkgrey border w-full outline-none rounded px-4 py-3 focus:border-primary`}
                            />
                        </div>
                    </div>

                    <button className='p-4 bg-primary text-white' >Submit</button>
                </Box>
            </Modal>

        </div>
    )
}

export default page