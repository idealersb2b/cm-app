"use client"

import Image from 'next/image'
import Link from 'next/link'
import React, { useEffect, useRef, useState } from 'react'
import Select from 'react-select'
import { useRouter, useSelectedLayoutSegment } from 'next/navigation'
import './Header.css';
import { useLazyQuery, useQuery } from '@apollo/client'
import { QUERY_GET_ALL_PARENT_AND_SUBCATEGORIES_DROPDOWN, QUERY_GET_PARENT_PRODUCT_CATEGORIES, QUERY_GET_PRODUCT_CATEGORIES_BASED_ON_SEARCH_DROPDOWN } from '@/app/graphql/productCategories/queries'
import { useReactiveVar } from '@apollo/client';
import { UsernameInVar, isDashboardInVar, isLoggedInVar, isVendorInVar } from '@/app/Providers'
import { v4 as uuidv4 } from 'uuid'
import MyDropdownMenu from '../MultilevelDropDown/MultilevelDropDown'
import Dropdown from 'react-multilevel-dropdown';
import { destroyCookie } from 'nookies'
import { toast } from 'react-toastify'
import { QUERY_GET_PRODUCTS_SEARCH_DROPDOWN } from '@/app/graphql/Product/queries'
import { DebounceInput } from 'react-debounce-input'
import Mobile_Multilevel_Dropdown from '../Mobile_Multilevel_Dropdown/Mobile_Multilevel_Dropdown'
import CheckoutButton from '../CheckoutButton/CheckoutButton'
import { checkout } from '@/app/pages/api/checkout_sessions'

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

function Header() {

    const activeSegment = useSelectedLayoutSegment()
    const router = useRouter();
    // const [productCategories] = useLazyQuery(QUERY_GET_PARENT_PRODUCT_CATEGORIES);
    // const [location, setLocation] = useState(null);
    const [search, setSearch] = useState("")
    // const [selectCategory, setSelectCategory] = useState(null)
    // const [isLoggedIn, setisLoggedIn] = useState(false)
    const isDashboard = useReactiveVar(isDashboardInVar);
    const isVendor = useReactiveVar(isVendorInVar);




    const isLoggedIn = useReactiveVar(isLoggedInVar);
    const userName = useReactiveVar(UsernameInVar);
    const [dropDownApiProduct] = useLazyQuery(QUERY_GET_PRODUCTS_SEARCH_DROPDOWN);
    const [dropDownApiCategory] = useLazyQuery(QUERY_GET_PRODUCT_CATEGORIES_BASED_ON_SEARCH_DROPDOWN);

    const [productSearchResult, setProductSearchResult] = useState([]);
    const [categorySearchResult, setCategorySearchResult] = useState([]);
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
                console.log("All Category", data)
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
    }, [isLoggedIn, userName, isDashboard, isVendor])

    return (

        <>
            {
                isDashboard ? null :
                    <div>
                        <div className='h-[30px] w-full bg-primary'></div>
                        <div className='flex flex-col sm:flex-row justify-between items-center w-full px-4 sm:px-16 sm:py-6 sm:gap-6'>
                            <div className='flex justify-between sm:hidden w-full py-4 items-center'>
                                {/* <AiOutlineMenu width={10} height={10} /> */}
                                <Mobile_Multilevel_Dropdown title={""} additionalclassNames={'addhamBurger'} subMenuVisible={false} />
                                <Image src={'/assets/image 1.png'}
                                    alt='Cleantech Logo'
                                    onClick={() => router.push('/')}
                                    width={106} height={42} />
                                {isLoggedIn ? <Dropdown className="customer-left-menu w-9 h-9 rounded-full" >
                                    <Dropdown.Item onClick={() => router.push('/pages/home/account/myprofile')} >
                                        <img src='/assets/Icons/mobileIcons/User_3.png' />
                                        <span className='px-4'>
                                            Profile
                                        </span>
                                    </Dropdown.Item>
                                    <Dropdown.Item onClick={() => router.push('/pages/home/account/myaddresses')} >
                                        <img src='/assets/Icons/mobileIcons/Dairy.png' />  <span className='px-4'>
                                            My Addresses
                                        </span>

                                    </Dropdown.Item>
                                    {
                                        isVendor ? <Dropdown.Item
                                        >
                                            <Link
                                                className='flex items-center'
                                                target="_blank"
                                                href='https://dev.cleantech-mart.com/login-vendor/'
                                            >
                                                <img src='/assets/Icons/mobileIcons/Users.png' />  <span className='px-4'>
                                                    Go To Dashboard
                                                </span>
                                            </Link>
                                        </Dropdown.Item> :
                                            <Dropdown.Item onClick={() => router.push('/pages/home/account/vendorRegistration')} >
                                                <img src='/assets/Icons/mobileIcons/Users.png' />  <span className='px-4'>
                                                    Become a Vendor
                                                </span>
                                            </Dropdown.Item>
                                    }
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
                            <div className='hidden sm:block logo-wrapper cursor-pointer w-56' onClick={() => {
                                router.push('/');
                            }} >
                                <img src={'/assets/image 1.png'} width={106} className='w-full' height={42} />
                            </div>
                            <div className='flex border-[1px] border-primary rounded-lg w-full sm:w-[650px]'>
                                <div className='relative search-wrapper w-full'>
                                    <DebounceInput
                                        placeholder='Search'
                                        value={search}
                                        minLength={3}
                                        onBlur={handleInputBlur}
                                        onFocus={handleInputFocus}
                                        debounceTimeout={1000}
                                        onChange={handleSearchChange} className='outline-none h-full w-full p-2' />

                                    <div className={`${dropdownVisible ? '' : 'hidden'} absolute z-50 w-full bg-white shadow-lg rounded`}>
                                        {
                                            categorySearchResult.length > 0 ?
                                                <div className='text-center text-lightgrey border-b border-b-lightgrey h-min w-full text-sm flex flex-row cursor-pointer '>
                                                    <h4 className='text-lightgrey p-1 uppercase text-sm'>
                                                        Categories
                                                    </h4>
                                                </div>
                                                : null
                                        }

                                        {
                                            categorySearchResult.map((category) => {
                                                return <div onClick={() => {
                                                    setSearch(category.name);
                                                    router.push(`/pages/productlisting/${category.id}`)
                                                }} className='h-min w-full text-sm p-2 flex flex-col justify-between cursor-pointer hover:bg-gray-300' key={category.id}>
                                                    <div>{category.name}</div>
                                                    <div className='text-red-500'>{formatCategoryString(category.uri)}</div>
                                                </div>
                                            })
                                        }


                                        {
                                            productSearchResult.length > 0 ?
                                                <div className='text-center text-lightgrey border-b border-b-lightgreyh-min w-full text-sm flex flex-row cursor-pointer '>
                                                    <h4 className='text-lightgrey p-1 uppercase text-sm'>
                                                        Products
                                                    </h4>
                                                </div>
                                                : null
                                        }
                                        {
                                            productSearchResult.map((product) => {
                                                return <div onClick={() => {
                                                    setSearch(product.name);
                                                    router.push(`/product/${product.id}`)
                                                }} className='h-min w-full text-sm p-2 flex flex-row justify-between cursor-pointer items-center hover:bg-gray-300' key={product.id}>
                                                    <div>{product.name}</div>
                                                    <div className='text-red-500'>{product.price}</div>
                                                </div>
                                            })
                                        }
                                        {
                                            productSearchResult.length > 1 ?
                                                <div onClick={hanndleSearchQuery} className='text-center text-primary bg-white h-min w-full text-sm p-2 flex flex-row justify-center cursor-pointer items-center hover:bg-gray-300'>
                                                    View All
                                                </div> : null
                                        }
                                        {
                                            productSearchResult.length === 0 && categorySearchResult.length === 0 && search.length != 0 ?
                                                <div className='text-center text-lightgrey bg-white h-min w-full text-sm p-2 flex flex-row justify-center cursor-pointer items-center hover:bg-gray-300'>
                                                    No Product Available
                                                </div> : null
                                        }
                                    </div>

                                </div>
                                <button className='bg-primary text-base text-white py-2 px-7' onClick={hanndleSearchQuery}>
                                    Search
                                </button>
                            </div>
                            <div className='hidden sm:flex gap-3 items-center profile-wrapper cursor-pointer'>
                                {
                                    isLoggedIn ? <div onClick={() => router.push('/pages/home/account/myprofile')} className='cursor-pointer flex items-center gap-3 text-lightgrey'>
                                        <Image src={'/Icons/user-avatar.png'} width={35} height={35} />
                                        <div > {userName}</div>
                                    </div> : <>
                                        <Link href='/login' className='hidden sm:inline' >
                                            <button className='bg-black h-full text-white py-2 px-4 rounded'>
                                                Login
                                            </button>
                                        </Link>
                                        <Link href='/signup' className='hidden sm:inline'>
                                            <button className='bg-black h-full text-white py-2 px-4 rounded'>
                                                Signup
                                            </button>
                                        </Link>
                                    </>
                                }
                            </div>
                        </div>
                        <div className='overflow-x-scroll md:overflow-visible flex h-20 px-5 sm:px-16 justify-between'>
                            <nav className='category-wrapper flex items-center gap-12'>
                                <div className='gap-3 hidden sm:flex'>
                                    {/* <Select styles={colourStyles} className='w-[150px]' classNamePrefix="location-select"
                            placeholder="Categories"
                            value={selectCategory}
                            onChange={(e) => {
                                setSelectCategory(e.label);
                                router.push(`/pages/productlisting/${e.value}`);
                            }}
                            options={allData.map((data) => ({ value: data.id, label: data.name }))}
                            isLoading={productCategoriesLoading}
                        /> */}
                                    <MyDropdownMenu title={"All Categories"} subMenuVisible={true} />
                                </div>
                                <div className='link-wrapper flex gap-5'>
                                    <div className='relative flex flex-col'>
                                        <Link href='/' className={`transition-all duration-200 hover:text-primary ${activeSegment === null ? 'text-primary font-medium' : 'text-lightgrey'}`} prefetch>
                                            Home
                                        </Link>
                                        <span className={`absolute w-full -bottom-3 h-[2.5px] transition-all duration-500 ${activeSegment === null ? 'bg-primary' : ''}`}>
                                        </span>
                                    </div>
                                    <div className='relative group flex flex-col'>
                                        <Link href='/services' className={`transition-all duration-200 hover:text-primary  ${activeSegment === 'services' ? 'text-primary font-medium' : 'text-lightgrey'}`} prefetch>
                                            Services
                                        </Link>
                                        <span className={`absolute w-full -bottom-3 h-[2.5px] transition-all duration-500 ${activeSegment === 'services' ? 'bg-primary' : ''}`}>
                                        </span>
                                    </div>
                                    <div className='relative group flex flex-col'>
                                        <a href='https://carbinnov.com/' className='transition-all duration-200 group-hover:text-primary group-hover:font-medium text-lightgrey'>
                                            Consultancy
                                        </a>
                                        <span className='absolute -bottom-3 w-full h-[2.5px] transition-all duration-500 group-hover:bg-primary '>
                                        </span>
                                    </div>
                                    <div className='relative group flex flex-col'>
                                    {
                                        isVendor ? 
                                            <Link
                                                className='flex items-center'
                                                href='/pages/home/vendor'
                                                prefetch
                                            >
                                                    Go To Dashboard
                                               
                                            </Link>
                                        :
                                             <Link href='/pages/home/account/vendorRegistration' className='transition-all duration-200 group-hover:text-primary group-hover:font-medium text-lightgrey' prefetch>

                                               Become a Vendor
                                                </Link> 
                                    }
                            {/* <Link href='/pages/home/account/vendorRegistration' className='transition-all duration-200 group-hover:text-primary group-hover:font-medium text-lightgrey' prefetch>

Become a Vendor
 </Link>


                          <Link href='/pages/home/vendor/dashboard' className='transition-all duration-200 group-hover:text-primary group-hover:font-medium text-lightgrey' prefetch>

dashboard
 </Link>
 <Link href='/pages/home/vendor/orders/orderDetails' className='transition-all duration-200 group-hover:text-primary group-hover:font-medium text-lightgrey' prefetch>

orderDetails
 </Link>  */}
                                    
                                    {/* <Link href='/pages/home/account/vendorRegistration' className='transition-all duration-200 group-hover:text-primary group-hover:font-medium text-lightgrey' prefetch>
                                            Vendor
                                        </Link> */}
                                    {/* <Link href='/pages/home/vendor' className='transition-all duration-200 group-hover:text-primary group-hover:font-medium text-lightgrey' prefetch>
                                            Vendor
                                        </Link> */}
                                        {/* <a href='https://dev.cleantech-mart.com/login-vendor/' target='__blank' className='transition-all duration-200 group-hover:text-primary group-hover:font-medium text-lightgrey'>
                                            Vendor
                                        </a> */}
                                        <span className='absolute -bottom-3 w-full h-[2.5px] transition-all duration-500 group-hover:bg-primary '>
                                        </span>
                                    </div>
                                    {/* <div className='relative group flex flex-col'>
                                        <Link href='/advertisement' className={`transition-all duration-200 hover:text-primary ${activeSegment === 'advertisement' ? 'text-primary font-medium' : 'text-lightgrey'}`}>
                                            Advertisement
                                        </Link>
                                        <span className={`absolute w-full -bottom-3 h-[2.5px] transition-all duration-500 ${activeSegment === 'advertisement' ? 'bg-primary' : ''}`}>
                                        </span>
                                    </div> */}
                                </div>
                            </nav>
                            {/* <div className='flex-row items-center hidden sm:flex'>
                    <Image src={'/Icons/Map_Marker.png'} width={35} height={35} />
                    <Select styles={colourStyles} className='w-[192px] box-shadow-primary' defaultValue={options2[0]} classNamePrefix="location-select" options={options2} />
                </div> */}
                        </div>
                    </div>
            }
        </>
    )
}

export default Header