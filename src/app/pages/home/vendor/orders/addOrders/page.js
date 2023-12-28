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

function addProduct() {
    return (
        <div className='flex flex-col mx-5 sm:mx-14 gap-14 items-center w-full '>
            <Formik
                initialValues={
                    {
                        simple_product: '',
                        product_title: '',
                        catalog: false,
                        virtual: false,
                        downloadable: false,
                        price: '',
                        sale_price: '',
                        category: '',
                        city_town: '',
                        state: '',
                        postcode_zip: '',
                        tags: '',
                        catalog_visibility: '',
                        wholesale_customer_price: '',
                        short_description: '',
                        description: '',
                        weight: '',
                        length: '',
                        width: '',
                        height: '',
                        shipping_class: '',
                        processing_time: '',
                        sku: '',
                        manage_stock: false,
                        stock_qty: 0,
                        allow_backorders: '',
                        sold_individually: 0,
                        Up_sells: null,
                        Cross_sells: '',
                        tax_status: '',
                        tax_class: '',
                        hsn_code: '',
                        is_assembly_required: '',
                        power_source: '',
                        sustainability: '',
                        minimum_order_quantity: '',
                        unit_of_measure: '',
                        policy_tab_label: '',
                        shipping_policy: '',
                        refund_policy: '',
                        cancellation_return_rxchange_policy: '',
                        commission_for: 'Admin',
                        commission_mode: '',
                        commission_percent: '',
                        commission_fixed: '',
                        enable_tax: '',
                        tax_label: '',
                        tax_percent: '',
                        commission_fixed: '',
                        commission_percent: ''
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
                        <h2 className='font-medium text-xl mb-4'>Add Product</h2>

                        <div className='flex flex-wrap justify-between gap-8'>
                            <div className='flex flex-col min-w-[300px] flex-1 gap-2'>
                                <label htmlFor='simple_product'>Simple Product</label>
                                <select
                                    id='simple_product'
                                    name='simple_product'
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    value={values.simple_product}
                                    className={`bg-littledarkgrey border h-12 w-full outline-none rounded px-4 py-3 focus:border-primary`}
                                    placeholder='ABC'
                                >
                                    <option value="Simple Product" >Simple Product</option>
                                    <option value="Variable Product">Variable Product</option>
                                    <option value="Grouped Product">Grouped Product</option>
                                    <option value="External/Affiliate Product">External/Affiliate Product</option>
                                </select>
                                {/* <input
                                    id='simple_product'
                                    name='simple_product'
                                    required
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    value={values.simple_product}
                                    className={`bg-littledarkgrey border h-12 w-full outline-none rounded px-4 py-3 focus:border-primary`}
                                    placeholder='ABC' /> */}
                            </div>
                            <div className='flex flex-col min-w-[300px] flex-1 gap-2'>
                                <label htmlFor='product_title'>Product Title</label>
                                <input
                                    id='product_title'
                                    name='product_title'
                                    required
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    value={values.product_title}
                                    className={`bg-littledarkgrey border h-12 w-full outline-none rounded px-4 py-3 focus:border-primary`}
                                    placeholder='ABC' />
                            </div>
                        </div>

                        <div className='flex flex-wrap justify-between gap-8'>
                            <div className='flex flex-col min-w-[300px] flex-1 gap-2'>
                                <label htmlFor='price'>Price *</label>
                                <input
                                    id='price'
                                    name='price'
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    value={values.price}
                                    className={`bg-littledarkgrey border h-12 w-full outline-none rounded px-4 py-3 focus:border-primary`}
                                    placeholder='ABC' />
                            </div>
                            <div className='flex flex-col min-w-[300px] flex-1 gap-2'>
                                <label htmlFor='sale_price'>Sales Price *</label>
                                <input
                                    id='sale_price'
                                    name='sale_price'
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    value={values.sale_price}
                                    className={`bg-littledarkgrey border h-12 w-full outline-none rounded px-4 py-3 focus:border-primary`}
                                    placeholder='ABC' />
                            </div>
                        </div>

                        <div className='flex flex-wrap justify-between gap-8'>
                            <div className='flex justify-end flex-row-reverse min-w-[300px] flex-1 gap-2'>
                                <label htmlFor='catalog'>Catalog</label>
                                <input
                                    id='catalog'
                                    name='catalog'
                                    type='checkbox'
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    value={values.catalog}
                                    className={`bg-littledarkgrey border h-12 w-full outline-none rounded px-4 py-3 focus:border-primary`}
                                    placeholder='ABC' />
                            </div>
                            <div className='flex justify-end flex-row-reverse min-w-[300px] flex-1 gap-2'>
                                <label htmlFor='virtual'>virtual</label>
                                <input
                                    id='virtual'
                                    name='virtual'
                                    type='checkbox'
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    value={values.virtual}
                                    className={`bg-littledarkgrey border h-12 w-full outline-none rounded px-4 py-3 focus:border-primary`}
                                    placeholder='ABC' />
                            </div>
                            <div className='flex justify-end flex-row-reverse min-w-[300px] flex-1 gap-2'>
                                <label htmlFor='downloadable'>Downloadable</label>
                                <input
                                    id='downloadable'
                                    name='downloadable'
                                    type='checkbox'
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    value={values.downloadable}
                                    className={`bg-littledarkgrey border h-12 w-full outline-none rounded px-4 py-3 focus:border-primary`}
                                    placeholder='ABC' />
                            </div>
                        </div>

                        <div className='flex flex-wrap justify-between gap-8'>
                            <div className='flex flex-col min-w-[300px] flex-1 gap-2'>
                                <label htmlFor='category'>Category *</label>
                                <input
                                    id='category'
                                    name='category'
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    value={values.category}
                                    className={`bg-littledarkgrey border h-12 w-full outline-none rounded px-4 py-3 focus:border-primary`}
                                    placeholder='ABC' />
                            </div>
                            <div className='flex flex-col min-w-[300px] flex-1 gap-2'>
                                <label htmlFor='city_town'>City/Town</label>
                                <input
                                    id='city_town'
                                    name='city_town'
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    value={values.city_town}
                                    className={`bg-littledarkgrey border h-12 w-full outline-none rounded px-4 py-3 focus:border-primary`}
                                    placeholder='ABC' />
                            </div>
                        </div>

                        <div className='flex flex-wrap justify-between gap-8'>
                            <div className='flex flex-col min-w-[300px] flex-1 gap-2'>
                                <label htmlFor='state'>State *</label>
                                <input
                                    id='state'
                                    name='state'
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    value={values.state}
                                    className={`bg-littledarkgrey border h-12 w-full outline-none rounded px-4 py-3 focus:border-primary`}
                                    placeholder='ABC' />
                            </div>
                            <div className='flex flex-col min-w-[300px] flex-1 gap-2'>
                                <label htmlFor='postcode_zip'>Postcode/Zip</label>
                                <input
                                    id='postcode_zip'
                                    name='postcode_zip'
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    value={values.postcode_zip}
                                    className={`bg-littledarkgrey border h-12 w-full outline-none rounded px-4 py-3 focus:border-primary`}
                                    placeholder='ABC' />
                            </div>
                        </div>

                        <div className='flex flex-wrap justify-between gap-8'>
                            <div className='flex flex-col min-w-[300px] flex-1 gap-2'>
                                <label htmlFor='tags'>Tags</label>
                                <input
                                    id='tags'
                                    name='tags'
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    value={values.tags}
                                    className={`bg-littledarkgrey border h-12 w-full outline-none rounded px-4 py-3 focus:border-primary`}
                                    placeholder='Tags Seperated by commas' />
                            </div>
                            <div className='flex flex-col min-w-[300px] flex-1 gap-2'>
                                <label htmlFor='catalog_visibility'>Catalog Visibility</label>
                                <input
                                    id='catalog_visibility'
                                    name='catalog_visibility'
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    value={values.catalog_visibility}
                                    className={`bg-littledarkgrey border h-12 w-full outline-none rounded px-4 py-3 focus:border-primary`}
                                    placeholder='ABC' />
                            </div>
                        </div>

                        <h2 className='font-medium text-xl mb-4'>Wholesale Prices</h2>

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
                        </div>

                        <div className='flex flex-wrap justify-between gap-8'>
                            <Tabs>
                                <TabList
                                    className='react-tabs__tab-list border-none'
                                >
                                    <Tab
                                        disabledClassName="text-base font-mono"
                                        selectedClassName="text-base font-semibold font-mono text-primary border-1-transparent border-b-2 border-b-primary">Inventory</Tab>
                                    <Tab disabledClassName="text-base font-mono"
                                        selectedClassName="text-base font-semibold font-mono text-primary border-1-transparent border-b-2 border-b-primary">Shipping</Tab>
                                    <Tab disabledClassName="text-base font-mono"
                                        selectedClassName="text-base font-semibold font-mono text-primary border-1-transparent border-b-2 border-b-primary">Linked</Tab>
                                    <Tab disabledClassName="text-base font-mono"
                                        selectedClassName="text-base font-semibold font-mono text-primary border-1-transparent border-b-2 border-b-primary">Tax</Tab>
                                    <Tab disabledClassName="text-base font-mono"
                                        selectedClassName="text-base font-semibold font-mono text-primary border-1-transparent border-b-2 border-b-primary">All mandate points</Tab>
                                    <Tab disabledClassName="text-base font-mono"
                                        selectedClassName="text-base font-semibold font-mono text-primary border-1-transparent border-b-2 border-b-primary">Sustainability</Tab>
                                    <Tab disabledClassName="text-base font-mono"
                                        selectedClassName="text-base font-semibold font-mono text-primary border-1-transparent border-b-2 border-b-primary">Minimum Order Quantity
                                    </Tab>
                                    <Tab disabledClassName="text-base font-mono"
                                        selectedClassName="text-base font-semibold font-mono text-primary border-1-transparent border-b-2 border-b-primary">Units Of Measure
                                    </Tab>
                                    <Tab disabledClassName="text-base font-mono"
                                        selectedClassName="text-base font-semibold font-mono text-primary border-1-transparent border-b-2 border-b-primary">Product Policies
                                    </Tab>
                                    <Tab disabledClassName="text-base font-mono"
                                        selectedClassName="text-base font-semibold font-mono text-primary border-1-transparent border-b-2 border-b-primary">Commission
                                    </Tab>
                                </TabList>

                                <TabPanel className='flex flex-col gap-6'>
                                    <div className='flex flex-wrap justify-between gap-8'>
                                        <div className='flex flex-col min-w-[300px] flex-1 gap-2'>
                                            <label htmlFor='sku'>SKU</label>
                                            <input
                                                id='sku'
                                                name='sku'
                                                onBlur={handleBlur}
                                                onChange={handleChange}
                                                value={values.sku}
                                                className={`bg-littledarkgrey border h-12 w-full outline-none rounded px-4 py-3 focus:border-primary`}
                                                placeholder='ABC' />
                                        </div>
                                    </div>
                                    <div className='flex flex-wrap justify-between gap-8'>
                                        <div className='flex flex-row min-w-[300px] flex-1 gap-5'>
                                            <label htmlFor='manage_stock'>Manage Stock?</label>
                                            <input
                                                type='checkbox'
                                                id='manage_stock'
                                                name='manage_stock'
                                                onBlur={handleBlur}
                                                onChange={handleChange}
                                                value={values.manage_stock}
                                                className={`bg-littledarkgrey border h-12 w-full outline-none rounded px-4 py-3 focus:border-primary`}
                                            />
                                        </div>
                                    </div>

                                    {
                                        values.manage_stock ? <div className='flex flex-wrap justify-between gap-8'>
                                            <div className='flex flex-col min-w-[300px] flex-1 gap-2'>
                                                <label htmlFor='stock_qty'>Stock Qty</label>
                                                <input
                                                    id='stock_qty'
                                                    name='stock_qty'
                                                    onBlur={handleBlur}
                                                    type='number'
                                                    onChange={handleChange}
                                                    value={values.stock_qty}
                                                    className={`bg-littledarkgrey border h-12 w-full outline-none rounded px-4 py-3 focus:border-primary`}
                                                    placeholder='ABC' />
                                            </div>
                                        </div> : null
                                    }
                                    {
                                        values.manage_stock ? <div className='flex flex-wrap justify-between gap-8'>
                                            <div className='flex flex-col min-w-[300px] flex-1 gap-2'>
                                                <label htmlFor='allow_backorders'>Allow Backorders</label>
                                                <MultiSelect
                                                    id='allow_backorders'
                                                    name='allow_backorders'
                                                    onBlur={handleBlur}
                                                    options={Allow_backorders_options}
                                                    value={values.allow_backorders}
                                                    onChange={(e) => {
                                                        setFieldValue('allow_backorders', e);
                                                    }}
                                                />
                                            </div>
                                        </div> : null
                                    }


                                    <div className='flex flex-wrap justify-between gap-8'>
                                        <div className='flex flex-row min-w-[300px] flex-1 gap-5'>
                                            <label htmlFor='sold_individually'>Sold Individually</label>
                                            <input
                                                id='sold_individually'
                                                name='sold_individually'
                                                type='checkbox'
                                                onBlur={handleBlur}
                                                onChange={handleChange}
                                                value={values.sold_individually}
                                                className={`bg-littledarkgrey border h-12 w-full outline-none rounded px-4 py-3 focus:border-primary`}
                                                placeholder='ABC' />
                                        </div>
                                    </div>
                                </TabPanel>
                                <TabPanel className='flex flex-col gap-6 '>
                                    <h2 className='font-medium text-xl mb-4'>Shipping</h2>

                                    <div className='flex flex-wrap justify-between gap-8'>
                                        <div className='flex flex-col min-w-[300px] flex-1 gap-2'>
                                            <label htmlFor='weight'>Weight (g) *</label>
                                            <input
                                                id='weight'
                                                name='weight'
                                                onBlur={handleBlur}
                                                onChange={handleChange}
                                                value={values.weight}
                                                className={`bg-littledarkgrey border h-12 w-full outline-none rounded px-4 py-3 focus:border-primary`}
                                                placeholder='ABC' />
                                        </div>
                                    </div>
                                    <div className='flex flex-wrap justify-between gap-8'>
                                        <div className='flex flex-col min-w-[300px] flex-1 gap-2'>
                                            <label htmlFor='length'>Dimensions (mm) *</label>
                                            <input
                                                id='length'
                                                name='length'
                                                onBlur={handleBlur}
                                                onChange={handleChange}
                                                value={values.length}
                                                className={`bg-littledarkgrey border h-12 w-full outline-none rounded px-4 py-3 focus:border-primary`}
                                                placeholder='Length' />
                                            <input
                                                id='width'
                                                name='width'
                                                onBlur={handleBlur}
                                                onChange={handleChange}
                                                value={values.width}
                                                className={`bg-littledarkgrey border h-12 w-full outline-none rounded px-4 py-3 focus:border-primary`}
                                                placeholder='Width' />
                                            <input
                                                id='height'
                                                name='height'
                                                onBlur={handleBlur}
                                                onChange={handleChange}
                                                value={values.height}
                                                className={`bg-littledarkgrey border h-12 w-full outline-none rounded px-4 py-3 focus:border-primary`}
                                                placeholder='Height' />
                                        </div>
                                    </div>
                                    <div className='flex flex-wrap justify-between gap-8'>
                                        <div className='flex flex-col min-w-[300px] flex-1 gap-2'>
                                            <label htmlFor='shipping_class'>Shipping Class *</label>
                                            <input
                                                id='shipping_class'
                                                name='shipping_class'
                                                onBlur={handleBlur}
                                                onChange={handleChange}
                                                value={values.shipping_class}
                                                className={`bg-littledarkgrey border h-12 w-full outline-none rounded px-4 py-3 focus:border-primary`}
                                                placeholder='ABC' />
                                        </div>
                                    </div>
                                    <div className='flex flex-wrap justify-between gap-8'>
                                        <div className='flex flex-col min-w-[300px] flex-1 gap-2'>
                                            <label htmlFor='processing_time'>Processing Time *</label>
                                            <input
                                                id='processing_time'
                                                name='processing_time'
                                                onBlur={handleBlur}
                                                onChange={handleChange}
                                                value={values.processing_time}
                                                className={`bg-littledarkgrey border h-12 w-full outline-none rounded px-4 py-3 focus:border-primary`}
                                                placeholder='ABC' />
                                        </div>
                                    </div>

                                </TabPanel>
                                <TabPanel>
                                    <div className='w-full flex flex-wrap justify-between gap-8'>
                                        <div className='flex flex-col min-w-[300px] flex-1 gap-2'>
                                            <label htmlFor='Up_sells'>Up Sells</label>
                                            <MultiSelect
                                                id='Up_sells'
                                                name='Up_sells'
                                                value={values.Up_sells}
                                                onChange={(e) => {
                                                    setFieldValue('Up_sells', e)
                                                }}
                                                isMulti
                                                options={Up_sells_options} />
                                        </div>

                                        <div className='flex flex-col min-w-[300px] flex-1 gap-2'>
                                            <label htmlFor='Cross_sells'>Cross-sells</label>
                                            <MultiSelect
                                                id='Cross_sells'
                                                name='Cross_sells'
                                                value={values.Cross_sells}
                                                onChange={(e) => {
                                                    setFieldValue('Cross_sells', e)
                                                }}
                                                isMulti
                                                options={Up_sells_options} />
                                        </div>
                                    </div>
                                </TabPanel>
                                <TabPanel>
                                    <div className='w-full flex flex-wrap justify-between gap-8'>
                                        <div className='flex flex-col min-w-[300px] flex-1 gap-2'>
                                            <label htmlFor='tax_status'>Tax Status</label>
                                            <MultiSelect
                                                id='tax_status'
                                                name='tax_status'
                                                value={values.tax_status}
                                                onChange={(e) => {
                                                    setFieldValue('tax_status', e)
                                                }}
                                                isMulti
                                                options={Up_sells_options} />
                                        </div>

                                        <div className='flex flex-col min-w-[300px] flex-1 gap-2'>
                                            <label htmlFor='tax_class'>Tax Class</label>
                                            <MultiSelect
                                                id='tax_class'
                                                name='tax_class'
                                                value={values.tax_class}
                                                onChange={(e) => {
                                                    setFieldValue('tax_class', e)
                                                }}
                                                isMulti
                                                options={Up_sells_options} />
                                        </div>
                                    </div>
                                </TabPanel>
                                <TabPanel className='flex flex-col gap-6'>
                                    <h2 className='font-medium text-xl mb-4'>All mandate points
                                    </h2>
                                    <div className='w-full flex flex-wrap justify-between gap-8'>
                                        <div className='flex flex-col min-w-[300px] flex-1 gap-2'>
                                            <label htmlFor='hsn_code'>HSN Code</label>
                                            <MultiSelect
                                                id='hsn_code'
                                                name='hsn_code'
                                                value={values.hsn_code}
                                                onChange={(e) => {
                                                    setFieldValue('hsn_code', e)
                                                }}
                                                options={Up_sells_options} />
                                        </div>
                                    </div>
                                    <div className='flex flex-wrap justify-between gap-8'>
                                        <div className='flex flex-row min-w-[300px] flex-1 gap-5'>
                                            <label htmlFor='is_assembly_required'>is Assembly Required (yes/no)</label>
                                            <input
                                                type='checkbox'
                                                id='is_assembly_required'
                                                name='is_assembly_required'
                                                onBlur={handleBlur}
                                                onChange={handleChange}
                                                value={values.is_assembly_required}
                                                className={`bg-littledarkgrey border h-12 w-full outline-none rounded px-4 py-3 focus:border-primary`}
                                            />
                                        </div>
                                    </div>
                                    <div className='w-full flex flex-wrap justify-between gap-8'>
                                        <div className='flex flex-col min-w-[300px] flex-1 gap-2'>
                                            <label htmlFor='power_source'>Power Source</label>
                                            <MultiSelect
                                                id='power_source'
                                                name='power_source'
                                                value={values.power_source}
                                                onChange={(e) => {
                                                    setFieldValue('power_source', e)
                                                }}
                                                options={Up_sells_options} />
                                        </div>
                                    </div>
                                </TabPanel>
                                <TabPanel className='flex flex-col gap-6 '>
                                    <h2 className='font-medium text-xl mb-4'>Extra Sustainability Fields</h2>
                                    <div className='flex flex-wrap justify-between gap-8'>
                                        <div className='flex flex-col min-w-[300px] flex-1 gap-2'>
                                            <label htmlFor='sustainability'>Sustainability</label>
                                            <textarea
                                                rows={4}
                                                id='sustainability'
                                                name='sustainability'
                                                onBlur={handleBlur}
                                                onChange={handleChange}
                                                value={values.sustainability}
                                                className={`bg-littledarkgrey border h-12 w-full outline-none rounded px-4 py-3 focus:border-primary`}
                                                placeholder='ABC' />
                                        </div>
                                    </div>
                                </TabPanel>
                                <TabPanel className='flex flex-col gap-6 '>
                                    <h2 className='font-medium text-xl mb-4'>Minimum Order Quantity
                                    </h2>
                                    <div className='flex flex-wrap justify-between gap-8'>
                                        <div className='flex flex-col min-w-[300px] flex-1 gap-2'>
                                            <label htmlFor='minimum_order_quantity'>Minimum order quantity</label>
                                            <textarea
                                                rows={4}
                                                id='minimum_order_quantity'
                                                name='minimum_order_quantity'
                                                onBlur={handleBlur}
                                                onChange={handleChange}
                                                value={values.minimum_order_quantity}
                                                className={`bg-littledarkgrey border h-12 w-full outline-none rounded px-4 py-3 focus:border-primary`}
                                                placeholder='Add Minimum Order Quantity buyer can place' />
                                        </div>
                                    </div>
                                </TabPanel>
                                <TabPanel className='flex flex-col gap-6 '>
                                    <h2 className='font-medium text-xl mb-4'>Units Of Measure</h2>
                                    <div className='flex flex-wrap justify-between gap-8'>
                                        <div className='flex flex-col min-w-[300px] flex-1 gap-2'>
                                            <label htmlFor='unit_of_measure'>Units Of Measure</label>
                                            <input
                                                rows={4}
                                                id='unit_of_measure'
                                                name='unit_of_measure'
                                                onBlur={handleBlur}
                                                onChange={handleChange}
                                                value={values.unit_of_measure}
                                                className={`bg-littledarkgrey border h-12 w-full outline-none rounded px-4 py-3 focus:border-primary`}
                                                placeholder='Unit of Measurement' />
                                        </div>
                                    </div>
                                </TabPanel>
                                <TabPanel className='flex flex-col gap-6 '>
                                    <div className='flex flex-wrap justify-between gap-8'>
                                        <div className='flex flex-col min-w-[300px] flex-1 gap-2'>
                                            <label htmlFor='policy_tab_label'>Policy Tab Label</label>
                                            <input
                                                id='policy_tab_label'
                                                name='policy_tab_label'
                                                onBlur={handleBlur}
                                                onChange={handleChange}
                                                value={values.policy_tab_label}
                                                className={`bg-littledarkgrey border h-12 w-full outline-none rounded px-4 py-3 focus:border-primary`}
                                                placeholder='Policy Tab Label' />
                                        </div>
                                    </div>
                                    <div className='flex flex-wrap justify-between gap-8'>
                                        <div className='flex flex-col min-w-[300px] flex-1 gap-2'>
                                            <label htmlFor='shipping_policy'>Shipping Policy</label>
                                            <textarea
                                                rows={4}
                                                id='shipping_policy'
                                                name='shipping_policy'
                                                onBlur={handleBlur}
                                                onChange={handleChange}
                                                value={values.shipping_policy}
                                                className={`bg-littledarkgrey border h-12 w-full outline-none rounded px-4 py-3 focus:border-primary`}
                                                placeholder='Shipping Policy' />
                                        </div>
                                    </div>
                                    <div className='flex flex-wrap justify-between gap-8'>
                                        <div className='flex flex-col min-w-[300px] flex-1 gap-2'>
                                            <label htmlFor='refund_policy'>Refund Policy</label>
                                            <textarea
                                                rows={4}
                                                id='refund_policy'
                                                name='refund_policy'
                                                onBlur={handleBlur}
                                                onChange={handleChange}
                                                value={values.refund_policy}
                                                className={`bg-littledarkgrey border h-12 w-full outline-none rounded px-4 py-3 focus:border-primary`}
                                                placeholder='Refund Policy' />
                                        </div>
                                    </div>
                                    <div className='flex flex-wrap justify-between gap-8'>
                                        <div className='flex flex-col min-w-[300px] flex-1 gap-2'>
                                            <label htmlFor='cancellation_return_rxchange_policy'>Cancellation/Return/Exchange Policy</label>
                                            <textarea
                                                rows={4}
                                                id='cancellation_return_rxchange_policy'
                                                name='cancellation_return_rxchange_policy'
                                                onBlur={handleBlur}
                                                onChange={handleChange}
                                                value={values.cancellation_return_rxchange_policy}
                                                className={`bg-littledarkgrey border h-12 w-full outline-none rounded px-4 py-3 focus:border-primary`}
                                                placeholder='Cancellation/Return/Exchange Policy' />
                                        </div>
                                    </div>
                                </TabPanel>
                                <TabPanel className='flex flex-col gap-6 '>
                                    <div className='flex flex-wrap justify-between gap-8'>
                                        <div className='flex flex-col min-w-[300px] flex-1 gap-2'>
                                            <label htmlFor='commission_for'>Commission For</label>
                                            <input
                                                id='commission_for'
                                                name='commission_for'
                                                onBlur={handleBlur}
                                                onChange={handleChange}
                                                disabled
                                                value={values.commission_for}
                                                className={`bg-littledarkgrey border h-12 w-full outline-none rounded px-4 py-3 focus:border-primary`}
                                                placeholder='Policy Tab Label' />
                                        </div>
                                    </div>
                                    <div className='flex flex-col min-w-[300px] flex-1 gap-2'>
                                        <label htmlFor='commission_mode'>Commission Mode</label>
                                        <MultiSelect
                                            id='commission_mode'
                                            name='commission_mode'
                                            value={values.commission_mode}
                                            onChange={(e) => {
                                                setFieldValue('commission_mode', e)
                                            }}
                                            options={Commission_mode_options} />
                                    </div>
                                    {
                                        values.commission_mode.value === 'Fixed' ?
                                            <div className='flex flex-col min-w-[300px] flex-1 gap-2'>
                                                <label htmlFor='commission_fixed'>Commission Fixed</label>
                                                <input
                                                    id='commission_fixed'
                                                    name='commission_fixed'
                                                    value={values.commission_fixed}
                                                    onChange={handleChange}
                                                    onBlur={handleBlur}
                                                    className={`bg-littledarkgrey border h-12 w-full outline-none rounded px-4 py-3 focus:border-primary`}
                                                />
                                            </div>
                                            : null
                                    }

                                    {
                                        values.commission_mode.value === 'Percent' ?
                                            <div className='flex flex-col min-w-[300px] flex-1 gap-2'>
                                                <label htmlFor='commission_percent'>Commission Percent</label>
                                                <input
                                                    id='commission_percent'
                                                    name='commission_percent'
                                                    value={values.commission_percent}
                                                    onChange={handleChange}
                                                    onBlur={handleBlur}
                                                    className={`bg-littledarkgrey border h-12 w-full outline-none rounded px-4 py-3 focus:border-primary`}
                                                />
                                            </div> : null
                                    }
                                    {
                                        values.commission_mode.value !== 'By Global Rule' ?
                                            <>
                                                <div className='flex flex-wrap justify-between gap-8'>
                                                    <div className='flex flex-row min-w-[300px] flex-1 gap-2'>
                                                        <label htmlFor='enable_tax'>Enable Tax</label>
                                                        <input
                                                            type='checkbox'
                                                            id='enable_tax'
                                                            name='enable_tax'
                                                            onBlur={handleBlur}
                                                            onChange={handleChange}
                                                            value={values.enable_tax}
                                                            className={`bg-littledarkgrey border h-12 w-full outline-none rounded px-4 py-3 focus:border-primary`}
                                                            placeholder='Policy Tab Label' />
                                                    </div>
                                                </div>
                                                <div className='flex flex-wrap justify-between gap-8'>
                                                    <div className='flex flex-col min-w-[300px] flex-1 gap-2'>
                                                        <label htmlFor='tax_label'>Tax Label</label>
                                                        <input
                                                            id='tax_label'
                                                            name='tax_label'
                                                            onBlur={handleBlur}
                                                            onChange={handleChange}
                                                            value={values.tax_label}
                                                            className={`bg-littledarkgrey border h-12 w-full outline-none rounded px-4 py-3 focus:border-primary`}
                                                            placeholder='Tab Label' />
                                                    </div>
                                                </div>
                                                <div className='flex flex-wrap justify-between gap-8'>
                                                    <div className='flex flex-col min-w-[300px] flex-1 gap-2'>
                                                        <label htmlFor='tax_percent'>Tax Percent (%)</label>
                                                        <input
                                                            id='tax_percent'
                                                            name='tax_percent'
                                                            onBlur={handleBlur}
                                                            onChange={handleChange}
                                                            value={values.tax_percent}
                                                            className={`bg-littledarkgrey border h-12 w-full outline-none rounded px-4 py-3 focus:border-primary`}
                                                        />
                                                    </div>
                                                </div>
                                            </>

                                            :
                                            null
                                    }
                                </TabPanel>
                            </Tabs>

                            <div className='flex w-full justify-end gap-8'>
                                <button onClick={() => {

                                }} >Cancle</button>

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
                                    Save
                                </button>

                            </div>

                        </div>

                    </div>
                )}
            </Formik>

        </div>
    )
}

export default addProduct
