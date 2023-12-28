"use client"
import { Formik } from 'formik';
import React from 'react'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import * as Yup from 'yup'
import 'react-tabs/style/react-tabs.css';
import { toast } from 'react-toastify';
import MultiSelect from 'react-select';

const AddProductSchema = Yup.object().shape({
    username: Yup.string().required("Username is Required")
})


const Up_sells_options = [
    { value: 'chocolate', label: 'Chocolate' },
    { value: 'strawberry', label: 'Strawberry' },
    { value: 'vanilla', label: 'Vanilla' }
]

const Allow_backorders_options = [
    { value: 'Allow', label: 'Allow' },
    { value: 'Do Not Allow', label: 'Do Not Allow' },
    { value: 'Allow but Notify Customer', label: 'Allow but Notify Customer' }
]

const Commission_mode_options = [
    { value: 'By Global Rule', label: 'By Global Rule' },
    { value: 'Percent', label: 'Percent' },
    { value: 'Fixed', label: 'Fixed' },
    { value: 'Percent + Fixed', label: 'Percent + Fixed' }
]

function addCoupons() {
    return (
        <div className='flex flex-col mx-5 sm:mx-14 gap-14 items-center w-full '>
            <Formik
                initialValues={
                    {
                        code: '',
                        description: '',
                        discount_type: '',
                        coupon_amount: false,
                        coupon_expiry_date: false,
                        allow_free_shipping: '',
                        store: '',
                        show_on_store: '',
                        minimum_spend: '',
                        maximum_spend: '',
                        individual_use_only: '',
                        exclude_sale_items: '',
                        exclude_products: '',
                        product_categories: '',
                        exclude_categories: '',
                        email_restrictions: '',
                        usage_limit_per_coupon: '',
                        limit_usage_to_X_items: '',
                        usage_limit_per_user: '',
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
                    <div className="w-full mt-8 px-5 flex flex-col gap-6 bg-white py-10">
                        <h2 className='font-medium text-xl mb-4'>Add Coupon</h2>

                        <div className='flex flex-wrap justify-between gap-8'>
                            <div className='flex flex-col min-w-[300px] flex-1 gap-2'>
                                <label htmlFor='code'>Code</label>
                                <input
                                    id='code'
                                    name='code'
                                    required
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    value={values.code}
                                    className={`bg-littledarkgrey border h-12 w-full outline-none rounded px-4 py-3 focus:border-primary`}
                                    placeholder='Code' />
                            </div>
                        </div>

                        <div className='flex flex-wrap justify-between gap-8'>
                            <div className='flex flex-col min-w-[300px] flex-1 gap-2'>
                                <label htmlFor='description'>Description *</label>
                                <textarea
                                    rows={4}
                                    id='description'
                                    name='description'
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    value={values.description}
                                    className={`bg-littledarkgrey border w-full outline-none rounded px-4 py-3 focus:border-primary`}
                                    placeholder='Description' />
                            </div>
                        </div>

                        <div className='flex flex-wrap justify-between gap-8'>

                            <div className='w-full flex flex-wrap justify-between gap-8'>
                                <div className='flex flex-col min-w-[300px] flex-1 gap-2'>
                                    <label htmlFor='discount_type'>Discount Type</label>
                                    <MultiSelect
                                        isClearable
                                        id='discount_type'
                                        name='discount_type'
                                        value={values.discount_type}
                                        onChange={(e) => {
                                            setFieldValue('discount_type', e)
                                        }}
                                        options={Up_sells_options} />
                                </div>
                            </div>
                            <div className='w-full flex flex-wrap justify-between gap-8'>
                                <div className='flex flex-col min-w-[300px] flex-1 gap-2'>
                                    <label htmlFor='coupon_amount'>Coupon Amount</label>
                                    <input
                                        id='coupon_amount'
                                        name='coupon_amount'
                                        type='number'
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        value={values.coupon_amount}
                                        className={`bg-littledarkgrey border h-12 w-full outline-none rounded px-4 py-3 focus:border-primary`}
                                        placeholder='ABC' />
                                </div>
                            </div>
                            <div className='w-full flex flex-wrap justify-between gap-8'>
                                <div className='flex flex-col min-w-[300px] flex-1 gap-2'>
                                    <label htmlFor='allow_free_shipping'>Allow free shipping</label>
                                    <input
                                        id='allow_free_shipping'
                                        name='allow_free_shipping'
                                        type='checkbox'
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        value={values.allow_free_shipping}
                                        className={`bg-littledarkgrey border h-12 w-full outline-none rounded px-4 py-3 focus:border-primary`}
                                    />
                                </div>
                            </div>
                        </div>

                        <div className='flex flex-wrap justify-between gap-8'>
                            <div className='flex flex-col min-w-[300px] flex-1 gap-2'>
                                <label htmlFor='coupon_expiry_date'>Coupon expiry date </label>
                                <input
                                    id='coupon_expiry_date'
                                    name='coupon_expiry_date'
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    type='date'
                                    value={values.coupon_expiry_date}
                                    className={`bg-littledarkgrey border h-12 w-full outline-none rounded px-4 py-3 focus:border-primary`}
                                    placeholder='ABC' />
                            </div>
                        </div>

                        <div className='flex flex-col flex-wrap justify-between gap-8'>
                            <div className='flex flex-col min-w-[300px] flex-1 gap-2'>
                                <label htmlFor='store'>Store *</label>
                                <MultiSelect
                                    isClearable
                                    id='store'
                                    name='store'
                                    value={values.store}
                                    onChange={(e) => {
                                        setFieldValue('store', e)
                                    }}
                                    options={Up_sells_options} />
                            </div>
                            <div className='flex flex-col min-w-[300px] flex-1 gap-2'>
                                <label htmlFor='show_on_store'>Show on Store</label>
                                <input
                                    id='show_on_store'
                                    name='show_on_store'
                                    type='checkbox'
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    value={values.show_on_store}
                                    className={`bg-littledarkgrey border h-12 w-full outline-none rounded px-4 py-3 focus:border-primary`}
                                    placeholder='ABC' />
                            </div>
                        </div>

                        {/* <h2 className='font-medium text-xl mb-4'>Wholesale Prices</h2>

                        <div className='flex flex-wrap justify-between gap-8'>
                            <div className='flex flex-col min-w-[300px] flex-1 gap-2'>
                                <label htmlFor='wholesale_customer_price'>Wholesale customer Price *</label>
                                <input
                                    id='wholesale_customer_price'
                                    name='wholesale_customer_price'
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    value={values.wholesale_customer_price}
                                    className={`bg-littledarkgrey border h-12 w-full outline-none rounded px-4 py-3 focus:border-primary`}
                                    placeholder='ABC' />
                            </div>
                        </div>

                        <div className='flex flex-wrap justify-between gap-8'>
                            <div className='flex flex-col min-w-[300px] flex-1 gap-2'>
                                <label htmlFor='short_description'>Short Description *</label>
                                <textarea
                                    rows={3}
                                    id='short_description'
                                    name='short_description'
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    value={values.short_description}
                                    className={`bg-littledarkgrey border h-12 w-full outline-none rounded px-4 py-3 focus:border-primary`}
                                    placeholder='ABC' />
                            </div>
                        </div>

                        <div className='flex flex-wrap justify-between gap-8'>
                            <div className='flex flex-col min-w-[300px] flex-1 gap-2'>
                                <label htmlFor='short_description'>Short Description *</label>
                                <textarea
                                    rows={3}
                                    id='short_description'
                                    name='short_description'
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    value={values.short_description}
                                    className={`bg-littledarkgrey border h-12 w-full outline-none rounded px-4 py-3 focus:border-primary`}
                                    placeholder='ABC' />
                            </div>
                        </div>

                        <div className='flex flex-wrap justify-between gap-8'>
                            <div className='flex flex-col min-w-[300px] flex-1 gap-2'>
                                <label htmlFor='description'>Description *</label>
                                <textarea
                                    rows={3}
                                    id='description'
                                    name='description'
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    value={values.description}
                                    className={`bg-littledarkgrey border h-12 w-full outline-none rounded px-4 py-3 focus:border-primary`}
                                    placeholder='ABC' />
                            </div>
                        </div> */}

                        <div className='flex flex-wrap justify-between gap-8'>
                            <Tabs>
                                <TabList
                                    className='react-tabs__tab-list border-none'
                                >
                                    <Tab
                                        disabledClassName="text-base font-mono"
                                        selectedClassName="text-base font-semibold font-mono text-primary border-1-transparent border-b-2 border-b-primary">Restriction</Tab>
                                    <Tab disabledClassName="text-base font-mono"
                                        selectedClassName="text-base font-semibold font-mono text-primary border-1-transparent border-b-2 border-b-primary">Limit</Tab>
                                </TabList>

                                <TabPanel className='flex flex-col gap-6'>
                                    <div className='flex flex-wrap justify-between gap-8'>
                                        <div className='flex flex-col min-w-[300px] flex-1 gap-2'>
                                            <label htmlFor='minimum_spend'>Minimum spend</label>
                                            <input
                                                id='minimum_spend'
                                                name='minimum_spend'
                                                onBlur={handleBlur}
                                                onChange={handleChange}
                                                value={values.sku}
                                                className={`bg-littledarkgrey border h-12 w-full outline-none rounded px-4 py-3 focus:border-primary`}
                                                placeholder='Minimum spend' />
                                        </div>
                                    </div>
                                    <div className='flex flex-wrap justify-between gap-8'>
                                        <div className='flex flex-col min-w-[300px] flex-1 gap-2'>
                                            <label htmlFor='maximum_spend'>Maximum spend</label>
                                            <input
                                                id='maximum_spend'
                                                name='maximum_spend'
                                                onBlur={handleBlur}
                                                onChange={handleChange}
                                                value={values.maximum_spend}
                                                className={`bg-littledarkgrey border h-12 w-full outline-none rounded px-4 py-3 focus:border-primary`}
                                                placeholder='Maximum spend' />
                                        </div>
                                    </div>
                                    <div className='flex flex-wrap'>
                                        <div className='flex flex-col min-w-[300px] flex-1 gap-2'>
                                            <label htmlFor='individual_use_only'>Individual use only</label>
                                            <input
                                                id='individual_use_only'
                                                name='individual_use_only'
                                                type='checkbox'
                                                onBlur={handleBlur}
                                                onChange={handleChange}
                                                value={values.individual_use_only}
                                                className={`bg-littledarkgrey border h-12 w-full outline-none rounded px-4 py-3 focus:border-primary`}
                                            />
                                        </div>
                                    </div>
                                    <div className='flex flex-wrap'>
                                        <div className='flex flex-col min-w-[300px] flex-1 gap-2'>
                                            <label htmlFor='exclude_sale_items'>Exclude sale items</label>
                                            <input
                                                id='exclude_sale_items'
                                                name='exclude_sale_items'
                                                type='checkbox'
                                                onBlur={handleBlur}
                                                onChange={handleChange}
                                                value={values.exclude_sale_items}
                                                className={`bg-littledarkgrey border h-12 w-full outline-none rounded px-4 py-3 focus:border-primary`}
                                            />
                                        </div>
                                    </div>

                                    <div className='flex flex-col flex-wrap justify-between gap-8'>
                                        <div className='flex flex-col min-w-[300px] flex-1 gap-2'>
                                            <label htmlFor='product'>Products</label>
                                            <MultiSelect
                                                isClearable
                                                id='product'
                                                name='product'
                                                value={values.store}
                                                onChange={(e) => {
                                                    setFieldValue('product', e)
                                                }}
                                                isMulti
                                                options={Up_sells_options} />
                                        </div>
                                    </div>

                                    <div className='flex flex-col flex-wrap justify-between gap-8'>
                                        <div className='flex flex-col min-w-[300px] flex-1 gap-2'>
                                            <label htmlFor='exclude_products'>Exclude products</label>
                                            <MultiSelect
                                                isClearable
                                                id='exclude_products'
                                                name='exclude_products'
                                                value={values.exclude_products}
                                                onChange={(e) => {
                                                    setFieldValue('exclude_products', e)
                                                }}
                                                options={Up_sells_options} />
                                        </div>
                                    </div>

                                    <div className='flex flex-col flex-wrap justify-between gap-8'>
                                        <div className='flex flex-col min-w-[300px] flex-1 gap-2'>
                                            <label htmlFor='product_categories'>Product categories</label>
                                            <MultiSelect
                                                isClearable
                                                id='product_categories'
                                                name='product_categories'
                                                value={values.product_categories}
                                                onChange={(e) => {
                                                    setFieldValue('product_categories', e)
                                                }}
                                                options={Up_sells_options} />
                                        </div>
                                    </div>

                                    <div className='flex flex-col flex-wrap justify-between gap-8'>
                                        <div className='flex flex-col min-w-[300px] flex-1 gap-2'>
                                            <label htmlFor='exclude_categories'>Exclude categories</label>
                                            <MultiSelect
                                                isClearable
                                                id='exclude_categories'
                                                name='exclude_categories'
                                                value={values.exclude_categories}
                                                onChange={(e) => {
                                                    setFieldValue('exclude_categories', e)
                                                }}
                                                options={Up_sells_options} />
                                        </div>
                                    </div>

                                    <div className='flex flex-wrap justify-between gap-8'>
                                        <div className='flex flex-col min-w-[300px] flex-1 gap-2'>
                                            <label htmlFor='email_restrictions'>Email Restrictions</label>
                                            <input
                                                id='email_restrictions'
                                                name='email_restrictions'
                                                onBlur={handleBlur}
                                                onChange={handleChange}
                                                value={values.email_restrictions}
                                                className={`bg-littledarkgrey border h-12 w-full outline-none rounded px-4 py-3 focus:border-primary`}
                                                placeholder='Email Restrictions' />
                                        </div>
                                    </div>
                                </TabPanel>
                                <TabPanel className='flex flex-col gap-6 '>

                                    <div className='flex flex-wrap justify-between gap-8'>
                                        <div className='flex flex-col min-w-[300px] flex-1 gap-2'>
                                            <label htmlFor='usage_limit_per_coupon'>Usage limit per coupon</label>
                                            <input
                                                id='usage_limit_per_coupon'
                                                type='number'
                                                name='usage_limit_per_coupon'
                                                onBlur={handleBlur}
                                                onChange={handleChange}
                                                value={values.usage_limit_per_coupon}
                                                className={`bg-littledarkgrey border h-12 w-full outline-none rounded px-4 py-3 focus:border-primary`}
                                                placeholder='Usage limit per coupon' />
                                        </div>
                                    </div>
                                    <div className='flex flex-wrap justify-between gap-8'>
                                        <div className='flex flex-col min-w-[300px] flex-1 gap-2'>
                                            <label htmlFor='limit_usage_to_X_items'>Limit usage to X items*</label>
                                            <input
                                                id='limit_usage_to_X_items'
                                                name='limit_usage_to_X_items'
                                                onBlur={handleBlur}
                                                onChange={handleChange}
                                                value={values.limit_usage_to_X_items}
                                                className={`bg-littledarkgrey border h-12 w-full outline-none rounded px-4 py-3 focus:border-primary`}
                                                placeholder='Limit usage to X items' />

                                        </div>
                                    </div>
                                    <div className='flex flex-wrap justify-between gap-8'>
                                        <div className='flex flex-col min-w-[300px] flex-1 gap-2'>
                                            <label htmlFor='usage_limit_per_user'>Usage limit per user</label>
                                            <input
                                                id='usage_limit_per_user'
                                                name='usage_limit_per_user'
                                                onBlur={handleBlur}
                                                onChange={handleChange}
                                                value={values.usage_limit_per_user}
                                                className={`bg-littledarkgrey border h-12 w-full outline-none rounded px-4 py-3 focus:border-primary`}
                                                placeholder='Usage limit per user' />

                                        </div>
                                    </div>
                                </TabPanel>
                            </Tabs>

                            <div className='flex w-full justify-end gap-8'>
                                <button onClick={() => {

                                }} >Draft</button>

                                <button
                                    onClick={() => {
                                        if (isValid && dirty) {
                                            handleSubmit()
                                        } else {
                                            console.log(errors)
                                            toast.error(errors[Object.keys(errors)[0]]);
                                        }
                                    }
                                    }
                                    disabled={isSubmitting}
                                    type='submit'
                                    className='bg-primary px-12 py-4 text-white rounded'>
                                    Submit
                                </button>

                            </div>

                        </div>

                    </div>
                )}
            </Formik>

        </div>
    )
}

export default addCoupons
