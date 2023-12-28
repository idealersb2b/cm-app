"use client"

import Link from "next/link"
import { BsHeart, BsHeartFill } from "react-icons/bs"
import NewsLetter from "../../components/NewsLetter/NewsLetter"
import { useLazyQuery, useMutation, useQuery } from "@apollo/client"
import { QUERY_GET_PRODUCT } from "@/app/graphql/Product/queries"
import Reviews from "@/app/components/Reviews/Reviews"
import { redirect, useRouter } from "next/navigation"
import RatingStart from "@/app/components/RatingStart/RatingStart"
import { MUTATION_ADD_CART_ITEMS } from "@/app/graphql/cart/mutations"
import { toast } from "react-toastify"
import { useEffect, useState } from "react"
import { v4 as uuidv4 } from 'uuid'
import BreadCrumps from "@/app/components/BreadCrumps/BreadCrumps"
import SocialShare from "@/app/components/SocialShare/SocialShare"
import Lottie from "lottie-web"
import reactLogo from "../../../../public/lottie/animation_llkii2bv.json";
import OurProductsRow from "@/app/components/OurProductsRow/OurProductsRow"
import RecommendedRow from "@/app/components/RecommendedRow.js/RecommendedRow"
import { ColorRing } from "react-loader-spinner"

function Product({ params }) {

    const productId = params.id;

    const router = useRouter();

    const [isLiked, setisLiked] = useState(false);
    const [productNumber, setProductNumber] = useState(null);
    const [productPrice, setProductPrice] = useState(null);
    const [productCounter, setProductCounter] = useState(1);
    const [isLoading, setIsloading] = useState(true);
    const [error, setError] = useState(null);
    const [isPurchasable, setIsPurchasable] = useState(false);
    const [productURI, setProductURI] = useState([]);
    const [imageUrl, setimageUrl] = useState("");
    const [product, setProduct] = useState(null);
    const [attributeSelected, setAttributeSelected] = useState({});
    const [tabSelected, setTabSelected] = useState(1);
    const [ProductDetails] = useLazyQuery(QUERY_GET_PRODUCT);
    const [addItemToCart] = useMutation(MUTATION_ADD_CART_ITEMS);
    const [addToListLoading, setAddToListLoading] = useState(false);

    const handleTabClick = (event, tabno) => {
        event.preventDefault();
        setTabSelected(tabno);
    };

    function findMatchingNode(nodes, attributes) {
        for (const edge of nodes.edges) {
            const node = edge.node;
            const attributesMatch = Object.keys(attributes).every(attributeKey => {
                const matchingAttribute = node.attributes.edges.find(attributeEdge => {
                    const attribute = attributeEdge.node;
                    return attribute.label === attributeKey && attribute.value.split(' ').map(word =>
                        word.charAt(0).toLowerCase() + word.slice(1)
                    ).join('-') === attributes[attributeKey]
                });
                return matchingAttribute !== undefined;
            });
            
            if (attributesMatch) {
                return node;
            }
        }
        return null;
    }

    const solve = (x) => {

        const attribute = {};

        x.map((att) => att.node).filter((node) => node.variation)
            .forEach((obj) => {
                attribute[obj.label] = obj.options
            })

        return Object.keys(attribute).map(key => <div key={uuidv4()} className="flex flex-row my-4 gap-4">
            <div className="flex justify-center items-center font-semibold">
                {key}
            </div>
            <div className="flex gap-4 flex-wrap">
                {attribute[key].map((text) => <button key={uuidv4()} onClick={() => {

                    const currAttribute = { ...attributeSelected, [key]: `${text}` }

                    setAttributeSelected(currAttribute);

                    console.log(currAttribute);

                    if (product) {
                        const value = findMatchingNode(product.product?.variations, currAttribute);
                        console.log("findMatchingNode", value)
                        if (value && value.attributes.edges.length === Object.keys(currAttribute).length) {
                            console.log("Got it");
                            setProductNumber(value.databaseId);
                            setProductPrice(value.price);
                        }
                    }
                }} className={`${attributeSelected[key] && attributeSelected[key] === text ? 'border-primary' : ''} border-2 p-2 rounded `} >{text}</button>)}
            </div>
        </div>
        )
    }
    
    const favButtonClick = () => {
        const favoriteProducts = localStorage ? (JSON.parse(localStorage.getItem("favoriteProducts")) || []) : [];
        const existingProductIndex = favoriteProducts.findIndex((item) => item.id === decodeURIComponent(productId));

        if (localStorage) {

            if (existingProductIndex === -1) {
                favoriteProducts.push({
                    id: decodeURIComponent(productId),
                    name: product.product.name,
                    image: product.product.image,
                    price: product.product.price,
                    productId: product.product.productId,
                    sku: product.product.sku,
                    __typename: product.product.__typename
                });
                localStorage.setItem("favoriteProducts", JSON.stringify(favoriteProducts));
                setisLiked(true);
                toast.success("Added To Fav. Product");
            } else {
                favoriteProducts.splice(existingProductIndex, 1);
                localStorage.setItem("favoriteProducts", JSON.stringify(favoriteProducts));
                setisLiked(false);
                toast.success("Removed From Fav. Product");
            }
        }

    }

    function breadCrumpsMaker(x) {
        let History = [];

        const currentLoc = { name: x.name, id: x.id };

        History.push(currentLoc);


        const remain = x.ancestors.edges.map((loc) => {
            return ({ name: loc.node.name, id: loc.node.id });
        })

        History = History.concat(remain)

        if (!isPurchasable) {
            History.pop();
        }

        History.reverse();


        return History;
    }

    const getProductDetails = () => {
        setIsloading(true)
        ProductDetails({
            variables: { productId: decodeURIComponent(productId) },
        })
            .then((data) => data.data)
            .then((data) => {
                console.log("Particluar Product", data);
                if (data.product.type !== 'VARIABLE') {
                    setProductNumber(data.product.productId);
                }
                setProductPrice(data.product.price)
                setProductURI(breadCrumpsMaker(data.product.productCategories.edges[0].node));
                setIsPurchasable(data.product.purchasable);
                setimageUrl(data.product.image.link);
                setProduct(data);
            })
            .catch((e) => {
                console.log(e);
                // setError(e);
            })
            .finally(() => {
                setIsloading(false);
            })
    }


    useEffect(() => {

        Lottie.loadAnimation({
            animationData: reactLogo,
            renderer: "svg", // "canvas", "html"
            loop: true, // boolean
            autoplay: true, // boolean
            container: document.querySelector("#lottie-loading"),
            speed: 100
        });

        if (localStorage) {
            const favoriteProducts = localStorage ? (JSON.parse(localStorage.getItem("favoriteProducts")) || []) : [];
            const existingProductIndex = favoriteProducts.findIndex((item) => item.id === decodeURIComponent(productId));
            setisLiked(existingProductIndex !== -1)
        }

        getProductDetails();
    }, [productId])

    useEffect(() => {

    }, [isLiked, isPurchasable])

    if (error) {
        router.push('/pages/404');
        return
    }


    return (
        <>
            {
                isLoading ? <div className='w-full h-96 flex justify-center items-center'>
                    <div className='h-20 w-20' id='lottie-loading'></div>
                </div> : <div className='flex flex-col mx-5 sm:mx-14 sm:gap-14 gap-7'>
                    <BreadCrumps URI={productURI} lastName={product?.product?.title} isPurchasable={isPurchasable} />
                    <div className='flex flex-col mx-5 sm:mx-14 sm:gap-14 gap-7'>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-14 ">
                            <div className="grid md:grid-cols-5 gap-3 md:h-[500px]">
                                <div className="hidden md:flex flex-row md:flex-col items-center vertical-image-gallery"
                                >
                                    {
                                        <>
                                            <div key={uuidv4()} onClick={() => setimageUrl(product.product.image.link)}
                                                style={{
                                                    minWidth: "100px"
                                                }}
                                                className="flex justify-center items-center row-span-1 w-24 h-24 m-3 bg-greybg rounded-lg">
                                                <img src={product?.product.image.link} className="w-20 h-20" style={{ objectFit: 'contain', mixBlendMode: 'darken' }} />
                                            </div>
                                            {product?.product?.galleryImages?.edges.map((src) => {
                                                return <div onClick={() => setimageUrl(src.node.link)}
                                                    style={{
                                                        minWidth: "100px"
                                                    }}
                                                    key={src.node.link} className="flex justify-center items-center row-span-1 w-24 h-24 m-3 bg-greybg rounded-lg">
                                                    <img src={src.node.link} className="w-20 h-20" style={{ objectFit: 'contain', mixBlendMode: 'darken' }} />
                                                </div>
                                            })}
                                        </>
                                    }
                                </div>
                                <div className="flex justify-center items-center md:col-span-4 m-3 bg-greybg rounded-lg">
                                    <img src={imageUrl} className="w-[402px] h-[384px] object-contain mix-blend-darken" />
                                </div>
                                <div className="flex  md:hidden flex-row md:flex-col items-center overflow-scroll"
                                >
                                    {
                                        <>
                                            <div key={uuidv4()} onClick={() => setimageUrl(product.product.image.link)}
                                                style={{
                                                    minWidth: "100px"
                                                }}
                                                className="flex justify-center items-center row-span-1 w-24 h-24 m-3 bg-greybg rounded-lg">
                                                <img src={product?.product.image.link} className="w-20 h-20" style={{ objectFit: 'contain', mixBlendMode: 'darken' }} />
                                            </div>
                                            {product?.product?.galleryImages?.edges.map((src) => {
                                                return <div onClick={() => setimageUrl(src.node.link)}
                                                    style={{
                                                        minWidth: "100px"
                                                    }}
                                                    key={src.node.link} className="flex justify-center items-center row-span-1 w-24 h-24 m-3 bg-greybg rounded-lg">
                                                    <img src={src.node.link} className="w-20 h-20" style={{ objectFit: 'contain', mixBlendMode: 'darken' }} />
                                                </div>
                                            })}
                                        </>
                                    }
                                </div>
                            </div>
                            <div className="flex flex-col justify-between">
                                <div className="flex flex-col gap-6">
                                    <h2 className="font-semibold text-xl sm:text-3xl">{product?.product.title}</h2>
                                    <div className="flex flex-wrap flex-row gap-2">
                                        <div className="flex items-center justify-start">
                                            <RatingStart star={product?.product.averageRating} />
                                        </div>
                                        <div className="flex flex-row gap-4 items-center text-[#7e7e7e] leading-5">
                                            <span className="text-base">( {product?.product.reviewCount} )</span>
                                            <span>|</span>
                                            {
                                                product.product.purchasable ? <span className="text-[#00FF66]" >In Stock</span> :
                                                    null
                                            }

                                        </div>
                                    </div>
                                    <div className="flex flex-wrap flex-row gap-2">
                                        <SocialShare />
                                    </div>
                                    <div className="text-secondary2 text-xl sm:text-3xl">{productPrice}</div>
                                </div>

                                <p className="border-2 border-black p-4 rounded-lg text-justify mt-11 mb-20 font-mono text-xs sm:text-sm overflow-hidden" dangerouslySetInnerHTML={{ __html: product.product.shortDescription }}>

                                </p>

                                {
                                    product?.product?.type === "VARIABLE" ?
                                        solve(product.product.attributes.edges)
                                        : null
                                }

                                <div className="flex justify-between items-center gap-3 h-11">
                                    {
                                        isPurchasable ? <div className="border border-bordergrey flex h-full rounded">
                                            <button disabled={productCounter <= 1} className="w-10 hover:bg-primary hover:text-white transition-all cursor-pointer duration-200 text-2xl text-lightgrey" href='#' onClick={() => setProductCounter(productCounter - 1)} >-</button>
                                            <span className="flex justify-center items-center w-10  sm:w-20 border-r border-l border-bordergrey font-mono font-medium">{productCounter}</span>
                                            <button className="w-10 hover:bg-primary hover:text-white transition-all duration-200 text-2xl cursor-pointer text-lightgrey" href='#' onClick={() => setProductCounter(productCounter + 1)}>+</button>
                                        </div> : null
                                    }

                                    {
                                        addToListLoading ?
                                            <ColorRing
                                                visible={true}
                                                height="56"
                                                width="56"
                                                ariaLabel="blocks-loading"
                                                wrapperStyle={{}}
                                                wrapperClass="blocks-wrapper"
                                                colors={['#00b517', '#00b517', '#00b517', '#00b517', '#00b517']}
                                            /> :
                                            <button
                                                onClick={() => {

                                                    // if (!localStorage.getItem('authToken')) {
                                                    //     toast.warn('Your are Not Logged In!')
                                                    //     router.push('/login');
                                                    //     return;
                                                    // }

                                                    if (productNumber === null) {
                                                        toast.warn("Select Varitions");
                                                        return;
                                                    }

                                                    setAddToListLoading(true);
                                                    addItemToCart({
                                                        variables: {
                                                            productId: productNumber,
                                                            quantity: productCounter
                                                        }
                                                    }).then((data) => {
                                                        console.log(data);
                                                        toast.success("Added to Quote")
                                                    }).then(() => {
                                                        router.push('/pages/home/account/list')
                                                    }).catch((e) => {
                                                        console.log(e.debugMessage);
                                                        toast.warning(e.message)
                                                    }).finally(() => {
                                                        setAddToListLoading(false);
                                                    })
                                                }} className="w-full bg-primary font-mono text-white rounded h-full">

                                                Add To List
                                            </button>
                                    }

                                  {localStorage.getItem("authToken") && <div onClick={favButtonClick} className="cursor-pointer h-full min-w-[40px] flex justify-center items-center rounded border-2 border-bordergrey">
                                        {
                                            !isLiked && <BsHeart color={'black'} height={14} width={14} />
                                        }
                                        {
                                            isLiked && <BsHeartFill color={`#f60000`} height={14} width={14} />
                                        }
                                    </div>}
                                </div>
                            </div>
                        </div>
                        <div className="hidden sm:flex flex-col">
                            <div className="flex gap-4">
                                <div className={`px-2 py-3 border border-white border-b-2 transition-all duration-500 ${tabSelected === 1 ? 'border-b-primary' : ''}`}>
                                    <Link href='#' onClick={(e) => handleTabClick(e, 1)} className={`${tabSelected === 1 ? 'text-primary' : 'text-[#757575]'}`}>
                                        Description
                                    </Link>
                                </div>
                                <div className={`px-2 py-3 border border-white border-b-2  transition-all duration-500  ${tabSelected === 2 ? 'border-b-primary' : ''}`}>
                                    <Link href='#' onClick={(e) => handleTabClick(e, 2)} className={`${tabSelected === 2 ? 'text-primary' : 'text-[#757575]'}`}>
                                        Sustainability
                                    </Link>
                                </div>
                                <div className={`px-2 py-3 border border-white border-b-2  transition-all duration-500  ${tabSelected === 3 ? 'border-b-primary' : ''}`}>
                                    <Link href='#' onClick={(e) => handleTabClick(e, 3)} className={`${tabSelected === 3 ? 'text-primary' : 'text-[#757575]'}`}>
                                        Specifications
                                    </Link>
                                </div>
                            </div>
                            <div>
                                {
                                    tabSelected === 1 && <div className='py-6' dangerouslySetInnerHTML={{ __html: product.product.description || "" }}>
                                    </div>
                                }

                                {
                                    tabSelected === 2 && <div className='py-6' dangerouslySetInnerHTML={{ __html: product.product.metaData[13].value }}>
                                    </div>
                                }

                                {
                                    tabSelected === 3 && <div className='py-6' dangerouslySetInnerHTML={{ __html: product.product.shortDescription }}>
                                    </div>
                                }
                            </div>
                        </div>

                        <Reviews productId={product.product.productId} />
                        <RecommendedRow related={product.product.related} />
                        <NewsLetter />
                    </div>
                </div>
            }
        </>


    )
}

export default Product