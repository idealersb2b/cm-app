"use client"

import Image from 'next/image'
import Link from 'next/link'
import React, { useEffect, useRef, useState } from 'react'
import Select from 'react-select'
import { useRouter, useSelectedLayoutSegment } from 'next/navigation'
import { useLazyQuery, useQuery } from '@apollo/client'
import { QUERY_GET_ALL_PARENT_AND_SUBCATEGORIES_DROPDOWN, QUERY_GET_PARENT_PRODUCT_CATEGORIES, QUERY_GET_PRODUCT_CATEGORIES_BASED_ON_SEARCH_DROPDOWN } from '@/app/graphql/productCategories/queries'
import { useReactiveVar } from '@apollo/client';
import { UsernameInVar, isDashboardInVar, isLoggedInVar } from '@/app/Providers'
import dropData from '../../../../sample_data.json'
import { v4 as uuidv4 } from 'uuid'
import MyDropdownMenu from '../MultilevelDropDown/MultilevelDropDown'
import { FaHamburger, FaStore } from 'react-icons/fa'
import { AiFillHome, AiFillSetting, AiOutlineMenu } from 'react-icons/ai'
import Dropdown from 'react-multilevel-dropdown';
import { destroyCookie } from 'nookies'
import { toast } from 'react-toastify'
import { QUERY_GET_PRODUCTS_SEARCH_DROPDOWN } from '@/app/graphql/Product/queries'
import { DebounceInput } from 'react-debounce-input'

import signUp from '../../../../OTP'
import Mobile_Multilevel_Dropdown from '../Mobile_Multilevel_Dropdown/Mobile_Multilevel_Dropdown'
import { BiSolidDiscount } from 'react-icons/bi'
import { BsFillBoxSeamFill, BsFillJournalBookmarkFill } from 'react-icons/bs'
import { IoPeople } from 'react-icons/io5'
import { MdRateReview, MdReportGmailerrorred, MdSupport } from 'react-icons/md'

const options1 = [
    { value: 'allcategory', label: 'All Category' },
    { value: 'electronic', label: 'Electronic' },
    { value: 'solar', label: 'Solar' }
]

const Loadingoptions = [
    { value: '', label: '' }
]

const options2 = [
    { value: 'allcategory', label: 'Whitefield, Bangalore' },
    { value: 'electronic', label: 'Electronic' },
    { value: 'solar', label: 'Solar' }
]

const colourStyles = {
    control: (styles) => ({ ...styles, backgroundColor: 'white' }),
    option: (styles, { data, isDisabled, isFocused, isSelected }) => {

        return {
            ...styles,
            backgroundColor: isDisabled ? undefined : isSelected ? '#00B517' : isFocused ? 'rgba(0, 181, 23,0.2)' : undefined,
        };
    }
};

function VendorMobileNavbar() {

    const isDashboard = useReactiveVar(isDashboardInVar);

    useEffect(() => {

    }, [isDashboard])

    const activeSegment = useSelectedLayoutSegment()
    const router = useRouter();
    // const { loading: productCategoriesLoading, error: productCategoriesError, data: productCategoriesData } = useQuery(QUERY_GET_PARENT_PRODUCT_CATEGORIES);
    // const [location, setLocation] = useState(null);
    const [search, setSearch] = useState("")
    // const [selectCategory, setSelectCategory] = useState(null)
    // const [isLoggedIn, setisLoggedIn] = useState(false)

    const isLoggedIn = useReactiveVar(isLoggedInVar);
    const userName = useReactiveVar(UsernameInVar);
    const [dropDownApiProduct] = useLazyQuery(QUERY_GET_PRODUCTS_SEARCH_DROPDOWN);
    const [dropDownApiCategory] = useLazyQuery(QUERY_GET_PRODUCT_CATEGORIES_BASED_ON_SEARCH_DROPDOWN);

    const [productSearchResult, setProductSearchResult] = useState([]);

    const [categorySearchResult, setCategorySearchResult] = useState([
        {
            "__typename": "ProductCategory",
            "id": "dGVybToxMzI3",
            "name": "Black Rice Nachos",
            "uri": "/product-category/organic-products/organic-grocery/organic-rice/black-rice-nachos/",
            "slug": "black-rice-nachos"
        }
    ]);
    const [dropdownVisible, setDropdownVisible] = useState(false)

    const hanndleSearchQuery = () => {
        router.push(`/pages/searchlisting/${search}`);

        // Replace this with your search query variable
    }

    const handleInputFocus = () => {
        setDropdownVisible(true);
    };

    const handleInputBlur = () => {
        // Add a slight delay before hiding the dropdown to allow time for clicking on the dropdown options
        setTimeout(() => {
            setDropdownVisible(false);
        }, 200);
    };


    function debounce(func, delay) {
        let timeoutId;
        return function (...args) {
            if (timeoutId) {
                clearTimeout(timeoutId);
            }

            timeoutId = setTimeout(() => {
                func.apply(null, args);
            }, delay);
        };
    }

    const searchAPICall = (query) => {

        dropDownApiCategory({
            variables: {
                search: query
            }
        })
            .then((data) => data.data)
            .then((data) => {
                return data.productCategories.edges.map((category) => category.node);
            })
            .then((data) => {
                setCategorySearchResult(data);
            })
            .catch((e) => {
                console.log(e);
            })


        dropDownApiProduct({
            variables: {
                search: query
            }
        }).then((data) => data.data)
            .then((data) => {
                console.log("Search Data", data);
                return data.products.edges.map((product) => product.node);
            })
            .then((data) => {
                console.log("Result Data", data);
                setProductSearchResult(data);
            })
            .catch(e => {
                console.log(e);
            })
    };



    // const { data, error, loading } = useQuery(QUERY_GET_ALL_PARENT_AND_SUBCATEGORIES_DROPDOWN)

    const extractNestedFields = (data) => {

        const { node } = data;

        const extracted = {
            id: node?.id,
            name: node?.name,
            children: []
        };

        if (node?.children && node?.children?.edges) {
            node.children.edges.forEach((edge) => {
                const childNode = extractNestedFields(edge);
                extracted.children.push(childNode);
            });
        }
        return extracted;
    };


    const getLocation = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const latitude = position.coords.latitude;
                    const longitude = position.coords.longitude;
                    setLocation({ latitude, longitude });
                    console.log(latitude, longitude);
                },
                (error) => {
                    console.error(error.message);
                }
            );
        } else {
            alert('Geolocation is not supported in this browser.');
        }
    };

    const handleSearchChange = (event) => {
        const query = event.target.value;
        setSearch(query);
        if (query.length === 0) {
            return;
        }
        searchAPICall(query);
    };

    function formatCategoryString(urlString) {
        const parts = urlString.split('/').filter(part => part !== '');

        if (parts.length < 4) {
            return ''; // Not enough parts to form the desired category hierarchy
        }

        const formattedParts = parts
            .slice(1, parts.length - 1) // Exclude the first two segments ("/product-category" and "organic-products")
            .map(part => part.replace(/-/g, ' ').replace(/\b\w/g, char => char.toUpperCase())) // Convert to title case
            .join(' > ');

        return formattedParts;
    }

    useEffect(() => {
        // setisLoggedIn(localStorage.getItem('authToken') ? true : false);
    }, [isLoggedIn, userName])

    return (
        <>
            {
                !isDashboard ? null : <div>
                    <div className='flex flex-col sm:hidden sm:flex-row justify-between items-center w-full px-4'>
                        <div className='flex justify-between w-full py-4 items-center'>
                            <Dropdown position='right' buttonClassName={'addhamBurger'}>
                                <Dropdown.Item
                                    key={uuidv4()}
                                    className='flex justify-between p-0'
                                >
                                    <Link
                                        href="/pages/home/vendor/dashboard"
                                        className={`flex h-11 pl-5 items-center group ${activeSegment === 'dashboard' ? "text-white bg-primary rounded-r-full" : "text-lightgrey hover:text-primary "}`}>
                                        <div className="flex">
                                            <AiFillHome size={20} className="mr-3 peer-hover:text-primary" />
                                            Dashboards
                                        </div>
                                    </Link>
                                </Dropdown.Item>
                                <Dropdown.Item
                                    key={uuidv4()}
                                    className='flex justify-between p-0'
                                >
                                    <Link
                                        href="/pages/home/vendor/products"
                                        className={`flex h-11 pl-5 items-center group ${activeSegment === 'products' ? "text-white bg-primary rounded-r-full" : "text-lightgrey hover:text-primary "}`}>
                                        <div className="flex">
                                            <BsFillBoxSeamFill size={20} className="mr-3" />
                                            Products
                                        </div>
                                    </Link>
                                </Dropdown.Item>
                                <Dropdown.Item
                                    key={uuidv4()}
                                    className='flex justify-between p-0'
                                >
                                    <Link
                                        href="/pages/home/vendor/products"
                                        className={`flex h-11 pl-5 items-center group ${activeSegment === 'orders' ? "text-white bg-primary rounded-r-full" : "text-lightgrey hover:text-primary "}`}>
                                        <div className="flex">
                                            <BsFillBoxSeamFill size={20} className="mr-3" />
                                            Orders
                                        </div>
                                    </Link>
                                </Dropdown.Item>
                                {/* <Dropdown.Item
                                    key={uuidv4()}
                                    className='flex justify-between p-0'
                                >
                                    <Link
                                        href="/pages/home/vendor/coupons"
                                        className={`flex h-11 pl-5 items-center group ${activeSegment === 'coupons' ? "text-white bg-primary rounded-r-full" : "text-lightgrey hover:text-primary "}`}>
                                        <div className="flex">
                                            <BiSolidDiscount size={20} className="mr-3" />
                                            Coupons
                                        </div>
                                    </Link>
                                </Dropdown.Item>
                                <Dropdown.Item
                                    key={uuidv4()}
                                    className='flex justify-between p-0'
                                >
                                    <Link
                                        href="/pages/home/vendor/customers"
                                        className={`flex h-11 pl-5 items-center group ${activeSegment === 'customers' ? "text-white bg-primary rounded-r-full" : "text-lightgrey hover:text-primary "}`}>
                                        <div className="flex">
                                            <IoPeople size={20} className="mr-3" />
                                            Customers
                                        </div>
                                    </Link>
                                </Dropdown.Item>
                                <Dropdown.Item
                                    key={uuidv4()}
                                    className='flex justify-between p-0'
                                >
                                    <Link
                                        href="/pages/home/vendor/add_to_my_store"
                                        className={`flex h-11 pl-5 items-center group ${activeSegment === 'add_to_my_store' ? "text-white bg-primary rounded-r-full" : "text-lightgrey hover:text-primary "}`}>
                                        <div className="flex">
                                            <FaStore size={20} className="mr-3" />
                                            Add to my store
                                        </div>
                                    </Link>
                                </Dropdown.Item>
                                <Dropdown.Item
                                    key={uuidv4()}
                                    className='flex justify-between p-0'
                                >
                                    <Link
                                        href="/pages/home/vendor/ledger_book"
                                        className={`flex h-11 pl-5 items-center group ${activeSegment === 'ledger_book' ? "text-white bg-primary rounded-r-full" : "text-lightgrey hover:text-primary "}`}>
                                        <div className="flex">
                                            <BsFillJournalBookmarkFill size={20} className="mr-3" />
                                            Ledger Book
                                        </div>
                                    </Link>
                                </Dropdown.Item>
                                <Dropdown.Item
                                    key={uuidv4()}
                                    className='flex justify-between p-0'
                                >
                                    <Link
                                        href="/pages/home/vendor/reports"
                                        className={`flex h-11 pl-5 items-center group ${activeSegment === 'reports' ? "text-white bg-primary rounded-r-full" : "text-lightgrey hover:text-primary "}`}>
                                        <div className="flex">
                                            <MdReportGmailerrorred size={20} className="mr-3" />
                                            Reports
                                        </div>
                                    </Link>
                                </Dropdown.Item>
                                <Dropdown.Item
                                    key={uuidv4()}
                                    className='flex justify-between p-0'
                                >
                                    <Link
                                        href="/pages/home/vendor/reviews"
                                        className={`flex h-11 pl-5 items-center group ${activeSegment === 'reviews' ? "text-white bg-primary rounded-r-full" : "text-lightgrey hover:text-primary "}`}>
                                        <div className="flex">
                                            <MdRateReview size={20} className="mr-3" />
                                            Reviews
                                        </div>
                                    </Link>
                                </Dropdown.Item>
                                <Dropdown.Item
                                    key={uuidv4()}
                                    className='flex justify-between p-0'
                                >
                                    <Link
                                        href="/pages/home/vendor/support"
                                        className={`flex h-11 pl-5 items-center group ${activeSegment === 'support' ? "text-white bg-primary rounded-r-full" : "text-lightgrey hover:text-primary "}`}>
                                        <div className="flex">
                                            <MdSupport size={20} className="mr-3" />
                                            Support
                                        </div>
                                    </Link>
                                </Dropdown.Item> */}
                                <Dropdown.Item
                                    key={uuidv4()}
                                    className='flex justify-between p-0'
                                >
                                    <Link
                                        href="/pages/home/vendor/settings"
                                        className={`flex h-11 pl-5 items-center group ${activeSegment === 'settings' ? "text-white bg-primary rounded-r-full" : "text-lightgrey hover:text-primary "}`}>
                                        <div className="flex">
                                            <AiFillSetting size={20} className="mr-3" />
                                            Store Details
                                        </div>
                                    </Link>
                                </Dropdown.Item>
                            </Dropdown>
                            {/* <Mobile_Multilevel_Dropdown title={""} additionalclassNames={'addhamBurger'} subMenuVisible={false} /> */}
                            <Image src={'/assets/Frame 1000005954.png'}
                                onClick={() => router.push('/')}
                                width={106} height={42} />

                            {isLoggedIn ? <Dropdown className="customer-left-menu w-9 h-9 rounded-full" >
                                <Dropdown.Item onClick={() => router.push('/pages/home/account/myprofile')} >
                                    <img src='/assets/Icons/mobileIcons/User_3.png' />
                                    <span className='px-4'>
                                        Profile
                                    </span>
                                </Dropdown.Item>
                                <Dropdown.Item onClick={() => {
                                    isDashboardInVar(false);
                                    router.push('/')
                                }} >
                                    <img src='/assets/Icons/mobileIcons/map_paper.png' />  <span className='px-4'>
                                        Home Page
                                    </span>
                                </Dropdown.Item>
                                <Dropdown.Item onClick={() => router.push('/pages/home/account/myaddresses')} >
                                    <img src='/assets/Icons/mobileIcons/Dairy.png' />  <span className='px-4'>
                                        My Addresses
                                    </span>
                                </Dropdown.Item>
                                <Dropdown.Item onClick={() => router.push('/pages/home/account/quoterequest')} >
                                    <img src='/assets/Icons/mobileIcons/Document.png' />  <span className='px-4'>
                                        My Requests
                                    </span>
                                </Dropdown.Item>
                                <Dropdown.Item onClick={() => router.push('/pages/home/account/favourite')} >
                                    <img src='/assets/Icons/mobileIcons/Heart.png' />  <span className='px-4'>
                                        My Wishlist
                                    </span>
                                </Dropdown.Item>
                                <Dropdown.Item onClick={() => router.push('/pages/home/account/aboutus')} >
                                    <img src='/assets/Icons/mobileIcons/Users.png' />  <span className='px-4'>
                                        About Us
                                    </span>
                                </Dropdown.Item>
                                <Dropdown.Item onClick={() => {

                                    localStorage.removeItem('authToken');
                                    localStorage.removeItem('favoriteProducts');
                                    localStorage.removeItem('userId');
                                    localStorage.removeItem('woocommerce_session_token');
                                    localStorage.removeItem('clientMutationId');
                                    localStorage.removeItem('userRole');
                                    localStorage.removeItem('customerId');
                                    localStorage.removeItem('userName');

                                    destroyCookie('refreshToken');

                                    toast.success('You Have been Logout!')

                                    isLoggedInVar(false);
                                    router.push('/');
                                }} >
                                    <img src='/assets/Icons/mobileIcons/Sign-out.png' />  <span className='px-4'>
                                        Logout
                                    </span>
                                </Dropdown.Item>
                            </Dropdown>
                                : <Link href='/login'>
                                    <button className='bg-black h-full text-white py-2 px-4 rounded'>
                                        Login
                                    </button>
                                </Link>
                            }

                        </div>
                    </div>
                </div>
            }
        </>
    )
}

export default VendorMobileNavbar