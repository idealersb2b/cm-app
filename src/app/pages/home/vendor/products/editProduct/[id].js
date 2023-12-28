"use client"
import { Formik } from 'formik';
import React,{useState,useEffect} from 'react'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import * as Yup from 'yup'
import 'react-tabs/style/react-tabs.css';
import { toast } from 'react-toastify';
import MultiSelect from 'react-select';
import { v4 as uuidv4 } from 'uuid';
import { useRouter } from 'next/navigation'
import { GraphQLClient } from 'graphql-request';
import { MUTATION_REFRESH_AUTH_TOKEN } from '@/app/graphql/users/mutations';
import cookieCutter from 'cookie-cutter'

const AddProductSchema = Yup.object().shape({
    name: Yup.string().required("Product Title is Required"),
    price: Yup.string().required("price is Required"),
    sale_price: Yup.string().required("Sale_price is Required"),
    stock_qty: Yup.string().required("Stock Qty is Required"),
    short_description: Yup.string().required("Short Desc. is Required"),
    description: Yup.string().required("Description is Required"),
    sustainability: Yup.string().required("Sustainability is Required"),
    categories: Yup.array().min(1, 'Categories must not be empty'),
    Tags: Yup.array().min(1, 'Tags must not be empty')

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

function editProduct({params}) {
    const productId = params.id;
    console.log(productId)
    const router = useRouter();

    const getNewAuthToken = async () => {
        const graphQLClient = new GraphQLClient("https://dev.cleantech-mart.com/graphql");
        const refreshToken = cookieCutter.get('refreshToken')

        if (!refreshToken) {
            return;
        }

        const results = await graphQLClient.request(MUTATION_REFRESH_AUTH_TOKEN, { refreshToken });

        return results.refreshJwtAuthToken.authToken
    };

    // const handleFormSubmit = async (values,setSubmitting) => {
    //     const authToken = await getNewAuthToken();
    //     if (!authToken) {
    //         toast.warn("Please Login-in !");
    //         router.push("/login");
    //         return;
    //     }

    //     let headersList = {
    //         "Authorization": `Bearer ${authToken}`,
    //         "Content-Type": "application/json"
    //     }


    //     // let bodyContent = JSON.stringify({
    //     //     "name": values.product_title,
    //     //     // "slug": "test-110",
    //     //     // "date_created": null,
    //     //     // "date_created_gmt": null,
    //     //     "type": "simple",
    //     //     "categories": values.category.map((item) => item.value),
    //     //     "tags": values.tags.map((item) => item.value),
    //     //     "product_custom_taxonomies": [""],
    //     //     "featured_image": "",
    //     //     "gallery_images": [""],
    //     //     "attributes": "",
    //     //     "default_attributes": "",
    //     //     "grouped_products": "",
    //     //     "is_virtual": false,
    //     //     "tax_status": "taxable",
    //     //     "tax_class": "",
    //     //     "weight": "",
    //     //     "length": "",
    //     //     "width": "",
    //     //     "height": "",
    //     //     "shipping_class": "",
    //     //     "sold_individually": "",
    //     //     // "upsell_ids": [33, 44],
    //     //     // "crosssell_ids": [55, 66],
    //     //     "featured": true,
    //     //     "catalog_visibility": "visible",
    //     //     "description": values.description,
    //     //     "short_description": values.short_description,
    //     //     "price": values.price,
    //     //     "regular_price": "",
    //     //     "sale_price": values.sale_price,
    //     //     "sale_date_from": null,
    //     //     "sale_date_upto": null,
    //     //     "manage_stock": true,
    //     //     "backorders": true,
    //     //     "stock_status": true,
    //     //     "stock_quantity": values.stock_qty,
    //     //     "product_url": "",
    //     //     "on_sale": false,
    //     //     "purchasable": false,
    //     //     "total_sales": 0,
    //     //     "virtual": false,
    //     //     "downloadable": false,
    //     //     "downloadable_files": [],
    //     //     "download_limit": "",
    //     //     "download_expiry": ""
    //     // });

    //     try {
    //         let response = await fetch(`https://dev.cleantech-mart.com/wp-json/wcfmmp/v1/products/${productId}`, {
    //             method: "GET",
    //             headers: headersList
    //         });
    //         let data = await response.json();

    //         console.log(data,"getsingle");

    //         if (!data) {
    //             throw new Error("Something went Wrong!");
    //         }
    //     } catch (error) {
    //         toast.error(error.message)
           
    //     }



    // };

    const categories = [
        "Eco Friendly Garments",
        "Female Eco Friendly Garments",
        "Accessories",
        "Stole",
        "Bracelets",
        "Sunglasses",
        "Necklaces",
        "Phone Case",
        "Rings",
        "Earings",
        "Organic Female Undergarments",
        "Organic Bra",
        "Wire-Free Bras",
        "Non-padded bras",
        "Padded bras",
        "Wired Bras",
        "Sports Bra",
        "Panties",
        "All in Panties",
        "Bikini",
        "Shapewear",
        "Thongs",
        "Boy Shorts",
        "Hipster",
        "Maternity",
        "Eco Friendly Kurtas",
        "Eco Friendly Dresses",
        "Upcycled Ready to wear",
        "Pants & Palazzos",
        "Eco Friendly Kids Garments",
        "Girls",
        "Ethnic Wear",
        "kids kurta",
        "Girls Shirts & Tops",
        "Dresses",
        "Bottoms",
        "Co-ord Sets",
        "Accessories",
        "Boys",
        "Boy Shirts & Tops",
        "Boys Kurtas",
        "Boys Bottoms",
        "Boys jumpsuits & Rompers",
        "Boys Sleepwear & Loungewear",
        "Ethnic",
        "Newborn",
        "Newborn Jhabla",
        "Newborn Onesies & Bodysuits",
        "Newborn Ethnic Wear",
        "Newborn Dresses",
        "Newborn Swaddles",
        "Newborn Receiving Blankets",
        "Male Eco Friendly Garments",
        "Tees & Henleys",
        "Accessories For Him",
        "VEGAN CORK JEWELLERY",
        "Sunglasses for Men",
        "Male Pants & Shorts",
        "Male Shirts",
        "Khaadi Clothing",
        "Female",
        "Male",
        "Reshirt",
        "Eco Friendly Home & Lifestyle",
        "Organic Bedsheets",
        "Home Decor Rural Livlihood",
        "Figurine",
        "HandMade Bags",
        "Clutch",
        "sling bag",
        "Water/wine Bottle Cover",
        "Handmade crafts",
        "Wooden window",
        "Handmade showpiece",
        "Eco Friendly LED Lights",
        "Indoor Lights",
        "Architectural LED Lights",
        "LED Slim Surface Lights",
        "4 Ways LED Lights",
        "PVC LED Surface Lights",
        "LED Track Lights",
        "LED Multicolor Panel Lights",
        "LED Rose Gold Lights",
        "LED Spot Cylinder Lights",
        "Ceiling LED Light",
        "LED Down Light",
        "LED Panel Light",
        "LED COB Light",
        "Corner Profile",
        "LED Bulkhead and Ceiling Lights",
        "LED Low Deep COB Light",
        "LED 3 in 1 Panel Light",
        "LED Bulbs",
        "LED Emergency Bulbs",
        "LED Fixtures",
        "LED Wall Light",
        "Recessed LED Light",
        "LED Display Light",
        "Bathroom LED Light",
        "LED Hall Light",
        "Emergency LED Lights",
        "Emergency LED Torch",
        "Emergency LED Bulb",
        "Emergency LED Tube Light",
        "Emergency LED Tabletop",
        "Emergency LED Street Light",
        "Festival LED Lights",
        "LED Strip Lights",
        "LED Toran Lights",
        "LED Rope Lights",
        "LED Lighting Chain",
        "Desk LED Light",
        "LED Table Lamps",
        "LED Table Top Lights",
        "Desktop LED Lights",
        "Industry Lights",
        "Fire Proof Lights",
        "LED High Bay Light",
        "LED Flood Light",
        "Water Proof LED Lights",
        "Warehouse LED Lights",
        "Halogen Lights",
        "LED Gate Lights",
        "Outdoor Lights",
        "LED Gate Light",
        "Garden LED Lights",
        "LED Flood Lights",
        "Solar LED Light",
        "LED Street Lights",
        "LED Rope Light (Water Proof)",
        "LED Focus Light",
        "Office Space Lights",
        "Ceiling LED Lights",
        "LED Desk Lights",
        "LED Picture Lights",
        "LED Fixture Light",
        "LED Conference Lights",
        "LED Restraunt Lights",
        "Filament Light",
        "Wall LED Light",
        "Retro fit LED Light",
        "Wooden pendant hanging light",
        "Antique Light",
        "Hanging LED Light",
        "Fancy LED Light",
        "LED Hospital lights",
        "LED Panel Light",
        "Odd size Panel Light",
        "LED Torch Light",
        "LED Profile Light",
        "Examination Light",
        "Smart Lights",
        "Smart Street Lights",
        "Smart Sensors",
        "Sensor Bulbs",
        "Sensor tubelights",
        "Smart Light Solutions",
        "Smart Bulbs",
        "Others",
        "Drivers",
        "Eco Friendly products",
        "Disposable Products",
        "Disposable Containers",
        "Disposable Glasses",
        "Disposable Cups",
        "Recyclable Packaging Bags",
        "Carry Bags",
        "shopping paper bags",
        "Paper Bags",
        "Non Woven Bag",
        "Paper Bags",
        "Grocery Bag",
        "Garbage and Laundry Bags",
        "Drink Stirrers",
        "Eco Friendly Kitchen Appliance",
        "Aluminium Tope",
        "Aluminium Kadai",
        "Aluminium Saucepan",
        "Aluminium Handi",
        "Paper Plates and Boxes",
        "Eco Medical Supplies",
        "Hand Sanitizer",
        "N95 Face Mask",
        "Surgical Mask",
        "Disposable Face Mask",
        "Safety Face Shields",
        "Foot Operated Santitizer Stand",
        "Eco Friendly Diisposable Cup",
        "Delivery Bags",
        "Energy Consultant",
        "Energy Efficient Equipment",
        "Electrical Vehicle Parts",
        "Controllers",
        "Chargers",
        "Hub Motors",
        "Car Conversion Kit",
        "Other Accessories",
        "Connectors",
        "Lighting Accessories",
        "Smart Sockets",
        "Wifi Sockets",
        "Smart Socket for Mobile Chargers",
        "DC Fans",
        "Programmable Thermostat",
        "Energy Efficient Agri Equipments",
        "Energy Monitoring Device",
        "Next Gen Eco-Friendly Gadgets",
        "Energy Storage",
        "Mechanical Energy Storage",
        "Compressed Air",
        "Flywheel",
        "Hydraulics",
        "Electro Chemical/Batteries",
        "Batteries",
        "Flow Batteries",
        "Super Capacitor",
        "Chemical Energy Storage",
        "Synthetic Fuel",
        "Biogas",
        "Hydrogen",
        "Methane",
        "Farming and Forestation",
        "Sustainable Irrigation",
        "Drip Irrigation",
        "Rainwater Harvesting",
        "Smart Irrigation",
        "Precision Agriculture",
        "GPS/GIS",
        "Sensors",
        "Automated Machinery",
        "Organic Farming",
        "Organic Fertilizer",
        "Organic Pesticide",
        "Organic Seed",
        "Aquaponics and Hydroponics",
        "Aquaponics",
        "Hydroponics",
        "Forestation and Afforestation",
        "Tree Saplings",
        "Agro Equipment",
        "Organic Manure",
        "Flowers Seeds",
        "Green Building Materials",
        "Renewable material",
        "Cork",
        "Cork Products",
        "Insulated Cork Board",
        "Bamboo",
        "Wood",
        "Cellular light weight concrete",
        "Low VOC (Volatile Organic Compound)",
        "Low VOC Adhesive",
        "Low VOC Flooring",
        "Low VOC paints",
        "Green Roof & Wall",
        "Water Efficient Plumbing",
        "Vertical Garden",
        "Vegetable Roofing System",
        "Permeable Paver",
        "Water Recycling",
        "xd bhggmj,,,,,,hnm",
        "Recycled Material",
        "Recycled Concrete",
        "Recycled Steel",
        "Recycled Glass",
        "Membership",
        "Natural Personal Care",
        "Natural Skin Care",
        "Plant Based Skin Care",
        "Natural face Wash",
        "Natural Moisturer",
        "Natural Face Mask",
        "Natural Hair Care",
        "Plant Based Shampoo",
        "Plant Based Conditioner",
        "Plant Based hair oil",
        "Natural Baby Care",
        "Natural Baby Soaps",
        "Natural Baby Cream",
        "Natural Baby Scalp & Body Daily Massage Oils",
        "Natural Baby Lotions",
        "Natural Body Care",
        "Plant Based Soaps Scrubs",
        "Natural Body Wash",
        "Natural Body Lotions",
        "Plant Based Toothbrush",
        "Plant Based Mouthwash",
        "Natural Mens Grooming",
        "Plant Based Aftershave",
        "Plant Based Shaving Cream",
        "Natural Oral Care",
        "Nuclear Energy",
        "Organic Products",
        "Herbs",
        "Herbal seeds",
        "Herbal Fruits",
        "Beans & Pulses",
        "Organic Atta",
        "Organic dals",
        "Organic Pulses",
        "Essentials",
        "Organic Oil",
        "Floral Water",
        "Organic Tea",
        "Herbal Tea",
        "Assam Tea",
        "Home Blend",
        "Black Tea",
        "Dust Tea",
        "Organic Spices",
        "Cereals",
        "Organic Honey & Sugar",
        "Organic Honey",
        "Organic Jaggery",
        "Organic Sugar",
        "Recycle Bag",
        "Recycle Yarn",
        "Recycled Polyester Fabric",
        "Recycled Stationery Items",
        "Reused & Refurbished",
        "Services",
        "Electricians",
        "Interior Designers",
        "Carbon Consultant",
        "Green Building Designers",
        "EV Mechanic",
        "Solar Consultant",
        "Solar Engineer",

    ]

    const tags = [
        "ECO FRIENDLY LED LIGHTS INDOOR LIGHTS CEILING LED LIGHT LED COB LIGHT",
        "4 WAY LED LIGHTS"
        , "4 WAYS LED LIGHTS"
        , "ACCESSORIES"
        , "Animal feed"
        , "ARCHITECTURAL LED LIGHTS"
        , "ARCHITECTURAL LIGHTS"
        , "Bamboo Basket"
        , "Bamboo Lamps"
        , "Bamboo Product"
        , "Bamboo Products"
        , "Bamboo Utensils"
        , "Bamboo Utility"
        , "BATTERIES"
        , "Beans & Pulses"
        , "Beans and Pulses"
        , "bites"
        , "Black Rice Nachos"
        , "blend"
        , "Box Strapping Roll"
        , "BRACELETS"
        , "Bulb"
        , "Bulkhead lights"
        , "caramel"
        , "carry bags"
        , "Ceiling LED Light"
        , "CEILING LED LIGHTS"
        , "Ceiling Lights"
        , "ceiling-light"
        , "cereals"
        , "Chia Seeds"
        , "chicken"
        , "chocolate"
        , "clean-tech"
        , "cob"
        , "cob lights"
        , "coffee"
        , "cold"
        , "COMPRESSED AIR."
        , "controller"
        , "cookies"
        , "CORNER PROFILE"
        , "Cotton shirt"
        , "crackers"
        , "Dairy Creamer"
        , "dairy products"
        , "Delivery bags"
        , "Desk LED Lights"
        , "Disposable Face Mask"
        , "ECO FRIENDLY DRESSES"
        , "ECO FRIENDLY GARMENTS"
        , "ECO FRIENDLY GARMENTS > FEMALE ECO FRIENDLY GARMENTS > ECO FRIENDLY DRESSES"
        , "ECO FRIENDLY GARMENTS > FEMALE ECO FRIENDLY GARMENTS > UPCYCLED READY TO WEAR"
        , "Eco friendly garments > Female Eco Garments > Accessories > Bracelet"
        , "Eco friendly garments > Female Eco Garments > Accessories > Earings"
        , "Eco friendly garments > Female Eco Garments > Accessories > Necklace"
        , "Eco friendly garments > Female Eco Garments > Accessories > Rings"
        , "Eco Friendly Garments > Khaadi clothing > Female"
        , "Eco Friendly Garments > Khaadi clothing > Male"
        , "ECO FRIENDLY GARMENTS > MALE ECO FRIENDLY GARMENTS > ACCESSORIES FOR HIM > VEGAN CORK JEWELLERY"
        , "ECO FRIENDLY GARMENTS > MALE ECO FRIENDLY GARMENTS > TEES & HENLEYS"
        , "Eco Friendly Garments > Male Eco Friendly Garments >Male Pants & Shorts"
        , "Eco Friendly Garments > Male Eco Friendly Garments >Male Shirts"
        , "Eco Friendly Garments >Eco Friendly Home & Lifestyle >Organic Bedsheets"
        , "Eco Friendly Garments >Female Eco Friendly Garments > Girls Shirts & Tops"
        , "Eco Friendly Garments >Female Eco Friendly Garments > Pants & Palazzos"
        , "Eco Friendly Garments >Female Eco Friendly Garments >Eco Friendly Kurtas"
        , "Eco Friendly Garments> Organic Female Undergarments> Organic Bra> Non-Padded Bra"
        , "Eco Friendly Garments> Organic Female Undergarments> Organic Bra> Padded Bra"
        , "Eco Friendly Garments> Organic Female Undergarments> Organic Bra> Sports Bra"
        , "Eco Friendly Garments> Organic Female Undergarments> Organic Bra> Wired Bra"
        , "Eco Friendly Garments> Organic Female Undergarments> Organic Bra> Wired Free Bra"
        , "Eco Friendly Garments> Organic Female Undergarments> Panties> All in Panties> Bikini"
        , "Eco Friendly Garments> Organic Female Undergarments> Panties> All in Panties> Shapewear"
        , "Eco Friendly Garments> Organic Female Undergarments> Panties> All in Panties> Thong"
        , "Eco Friendly Garments>Male Eco friendly Garments>Male Shirts"
        , "Eco Friendly Garments>Reshirt"
        , "ECO FRIENDLY HOME & LIFESTYLE"
        , "Eco Friendly Home & Lifestyle >Home Decor Rural Livlihood> Figurine"
        , "Eco Friendly Home & Lifestyle >Home Decor Rural Livlihood> Handmade Bags"
        , "Eco Friendly Home & Lifestyle >Home Decor Rural Livlihood> Handmade Bags> Clutch"
        , "Eco Friendly Home & Lifestyle >Home Decor Rural Livlihood> Handmade Bags> Sling Bags"
        , "Eco Friendly Home & Lifestyle >Home Decor Rural Livlihood> Handmade Craft"
        , "Eco Friendly Home & Lifestyle >Home Decor Rural Livlihood> handmade Showpieces"
        , "Eco Friendly Home & Lifestyle >Home Decor Rural Livlihood> Water/Wine Bottle Cover"
        , "Eco Friendly Home & Lifestyle >Home Decor Rural Livlihood> Wooden Window"
        , "ECO FRIENDLY LED LIGHT"
        , "Eco Friendly LED Lights"
        , "ECO FRIENDLY LED LIGHTS > INDOOR LIGHTS > EMERGENCY LED LIGHTS > EMERGENCY LED TORCH"
        , "ECO FRIENDLY LED LIGHTS > INDOOR LIGHTS > FESTIVAL LED LIGHTS > LED STRIP LIGHTS"
        , "ECO FRIENDLY LED LIGHTS > INDOOR LIGHTS >LED BULBS>LED WALL LIGHTS"
        , "ECO FRIENDLY LED LIGHTS > OFFICE SPACE LIGHTS > CEILING LED LIGHTS"
        , "ECO FRIENDLY LED LIGHTS > SMART LIGHTS > SMART SENSORS > SENSOR BULBS"
        , "Eco Friendly LED Lights LED Smart COB Deep Spot Light"
        , "Eco Friendly LED Lights LED Smart Panel Light"
        , "Eco Friendly LED Lights LED Smart Strip Light"
        , "ECO FRIENDLY LED LIGHTS. INDOOR LIGHTS"
        , "Eco Friendly LED Lights>Indoor Lights>Architectural LED Lights>4 Ways LED Lights"
        , "ECO FRIENDLY LED LILGHTS"
        , "Eco Friendly Product ---> Eco Friendly Furnitures"


    ]

    async function fetchEditableProduct() {
            const authToken = await getNewAuthToken();
            if (!authToken) {
                toast.warn("Please Login-in !");
                router.push("/login");
                return;
            }
    
            let headersList = {
                "Authorization": `Bearer ${authToken}`,
                "Content-Type": "application/json"
            }
            try {
                let response = await fetch(`https://dev.cleantech-mart.com/wp-json/wcfmmp/v1/products/${productId}`, {
                    method: "GET",
                    headers: headersList
                });
                let data = await response.json();
    
                console.log(data,"getsingle");
    
                if (!data) {
                    throw new Error("Something went Wrong!");
                }
            } catch (error) {
                toast.error(error.message)
        };
        try {

            // const response2 = await axios.get('https://api.example.com/endpoint2');

            // setData1(response1.data);
            // setData2(response2.data);
            // setLoading(false);
        } catch (error) {
            // console.error(error);
            // setLoading(false);
        }
    }
useEffect(()=>{
    fetchEditableProduct()
    //handleFormSubmit()
},[productId])


    return (
        <div className='flex flex-col mx-5 sm:mx-14 gap-14 items-center w-full '>
<h1>edit prodcut</h1>

            <Formik
                initialValues={
                    {
                        simple_product: st.type,
                        product_title: st.name,
                        catalog: false,
                        virtual: false,
                        downloadable: false,
                        price: st.price,
                        sale_price: st.sale_price,
                        category: st.categories,
                        city_town: '',
                        state: '',
                        postcode_zip: '',
                        tags: st.tags,
                        catalog_visibility: st.catalog_visibility,
                        wholesale_customer_price: '',
                        short_description: st.short_description,
                        description: st.description,
                        weight: st.weight,
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
                    handleFormSubmit(values, setSubmitting);

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
                                    defaultValue={"simple"}
                                    className={`bg-littledarkgrey border h-12 w-full outline-none rounded px-4 py-3 focus:border-primary`}
                                    placeholder='ABC'
                                >
                                    <option value="simple" >Simple Product</option>
                                    <option value="variable">Variable Product</option>
                                    <option value="grouped">Grouped Product</option>
                                    <option value="external">External/Affiliate Product</option>
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
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    value={values.product_title}
                                    className={`bg-littledarkgrey border h-12 w-full outline-none rounded px-4 py-3 focus:border-primary`}
                                    placeholder='ABC' />
                            </div>
                        </div>

                        { values.simple_product !== "variable" && <div className='flex flex-wrap justify-between gap-8'>
                            <div className='flex flex-col min-w-[300px] flex-1 gap-2'>
                                <label htmlFor='price'>Price *</label>
                                <input
                                    id='price'
                                    name='price'
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    required
                                    type='number'
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
                                    required
                                    type='number'
                                    onChange={handleChange}
                                    value={values.sale_price}
                                    className={`bg-littledarkgrey border h-12 w-full outline-none rounded px-4 py-3 focus:border-primary`}
                                    placeholder='ABC' />
                            </div>
                        </div>
}
                        <div className='hidden flex-wrap justify-between gap-8'>
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
                                <MultiSelect
                                    id='category'
                                    name='category'
                                    onBlur={handleBlur}
                                    value={values.category}
                                    onChange={(e) => {
                                        console.log();
                                        setFieldValue('category', e)
                                    }}
                                    isMulti
                                    options={categories.map((name) => ({ value: name, label: name }))} />
                            </div>
                            <div className='flex flex-col min-w-[300px] flex-1 gap-2'>
                                <label htmlFor='stock_qty'>Stock Quantity</label>
                                <input
                                    id='stock_qty'
                                    name='stock_qty'
                                    type='number'
                                    required
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    value={values.stock_qty}
                                    className={`bg-littledarkgrey border h-12 w-full outline-none rounded px-4 py-3 focus:border-primary`}
                                    placeholder='ABC' />
                            </div>
                        </div>

                        <div className='hidden flex-wrap justify-between gap-8'>
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
                            <div className='hidden flex-col min-w-[300px] flex-1 gap-2'>
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
                                <label htmlFor='tags'>Tags *</label>
                                <MultiSelect
                                    id='tags'
                                    name='tags'
                                    onBlur={handleBlur}
                                    value={values.tags}
                                    onChange={(e) => {
                                        setFieldValue('tags', e)
                                    }}
                                    isMulti
                                    options={tags.map((name) => ({ value: name, label: name }))} />
                            </div>
                            <div className='flex-col min-w-[300px] flex-1 gap-2 hidden'>
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

                        <h2 className='hidden font-medium text-xl mb-4'>Wholesale Prices</h2>

                        <div className='hidden flex-wrap justify-between gap-8'>
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
                                    required
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
                                    className='react-tabs__tab-list border-none'>
                                    <Tab disabledClassName="text-base font-mono"
                                        selectedClassName="text-base font-semibold font-mono text-primary border-1-transparent border-b-2 border-b-primary">Sustainability</Tab>
                                </TabList>
                                <TabPanel className='hidden flex-col gap-6 '>
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
                            </Tabs>

                            <div className='flex w-full justify-end gap-8'>
                                <button onClick={() => {

                                }} >Cancle</button>

                                <button
                                    onClick={() => {
                                        AddProductSchema.validate({
                                            name: values.product_title,
                                            price: values.price,
                                            sale_price: values.sale_price,
                                            description: values.description,
                                            sustainability: values.sustainability,
                                            short_description: values.short_description,
                                            stock_qty: values.stock_qty,
                                            categories: values.category,
                                            Tags: values.tags
                                        }).then((data) => {
                                            handleSubmit();
                                        }).catch((e) => {
                                            toast.error(e.message);
                                        })

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

export default editProduct;

export async function generateStaticParams() {
    // Your code to fetch dynamic data and generate static parameters
    return [{ params: { id: 'example' } }];
  }
