"use client"

import React, { useEffect, useState } from 'react';
import Dropdown from 'react-multilevel-dropdown';
import dropData from '../../../../sample_data.json'
import { useRouter } from 'next/navigation';
import { AiFillCaretDown } from 'react-icons/ai';
import { v4 as uuidv4 } from 'uuid';
import { useLazyQuery } from '@apollo/client';
import { toast } from 'react-toastify';
import { QUERY_GET_ALL_PARENT_AND_SUBCATEGORIES_DROPDOWN } from '@/app/graphql/productCategories/queries';

const allData = [
    {
        "icon-b": "/assets/Category Icon/garment-b.png",
        "icon-g": "/assets/Category Icon/garment-g.png",
        "id": "dGVybToxODg1",
        "name": "Eco Friendly Garments"
    },
    {
        "icon-b": "/assets/Category Icon/home-lifestyle-b.png",
        "icon-g": "/assets/Category Icon/home-lifestyle-g.png",
        "id": "dGVybToyMTM0",
        "name": "Eco Friendly Home & Lifestyle"
    },
    {
        "icon-b": "/assets/Category Icon/eco-friendly-led-lights-svg-b.png",
        "icon-g": "/assets/Category Icon/eco-friendly-led-lights-svg-g.png",
        "id": "dGVybToxNzA=",
        "name": "Eco Friendly LED Lights"
    },
    {
        "icon-b": "/assets/Category Icon/eco-friendly-product-b.png",
        "icon-g": "/assets/Category Icon/eco-friendly-product-g.png",
        "id": "dGVybToxOTc=",
        "name": "Eco Friendly products"
    },
    {
        "icon-b": "/assets/Category Icon/personal-care-b.png",
        "icon-g": "/assets/Category Icon/personal-care-g.png",
        "id": "dGVybToxODAz",
        "name": "Natural Personal Care"
    },
    {
        "icon-b": "/assets/Category Icon/energy-efficient-b.png",
        "icon-g": "/assets/Category Icon/energy-efficient-g.png",
        "id": "dGVybToyMzU0",
        "name": "Energy Storage"
    },
    {
        "icon-b": "/assets/Category Icon/energy-efficient-b.png",
        "icon-g": "/assets/Category Icon/energy-efficient-g.png",
        "id": "dGVybToxOTQ=",
        "name": "Energy Efficient Equipment"
    },
    {
        "icon-b": "/assets/Category Icon/organic-products-b.png",
        "icon-g": "/assets/Category Icon/organic-products-g.png",
        "id": "dGVybToxOTY=",
        "name": "Organic Products"
    },
    {
        "icon-b": "/assets/Icons/farming-forestation-b.png",
        "icon-g": "/assets/Icons/farming-forestation-g.png",
        "id": "dGVybToyMzU2",
        "name": "Farming and Forestation"
    },
    {
        "icon-b": "/assets/Icons/green-building-b.png",
        "icon-g": "/assets/Icons/green-building-g.png",
        "id": "dGVybToyMzU1",
        "name": "Green Building Materials"
    },
    {
        "icon-b": "/assets/Category Icon/services-b.png",
        "icon-g": "/assets/Category Icon/services-g.png",
        "id": "dGVybToxOTU=",
        "name": "Services"
    },
    {
        "icon-b": "/assets/Category Icon/solar-energy-b.png",
        "icon-g": "/assets/Category Icon/solar-energy-g.png",
        "id": "dGVybToxOTM=",
        "name": "Solar Energy"
    }]

const sampleFunction = (unFinedData) => {
    const MainData = [];
    unFinedData.edges.forEach((data) => {
        const extractedNestedFields = extractNestedFields(data);
        MainData.push(extractedNestedFields);
    })

    return MainData;
}

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

export const NestedDropdown = ({ nodes }) => {

    const router = useRouter();

    const [selectedId, setSetselectedId] = useState(null)


    return (
        <>

            {
                nodes.map((node) => (
                    <div key={uuidv4()} >
                        <Dropdown.Item key={uuidv4()}
                            className='flex justify-between'
                            onClick={(e) => {
                                e.stopPropagation();
                                console.log(node.id);
                                router.push(`/pages/productlisting/${node.id}`)
                            }}
                        >
                            {node.name}

                            {node.children.length > 0 ? <AiFillCaretDown onClick={(e) => {
                                e.stopPropagation();
                                setSetselectedId(node.id)
                            }} className='text-lightgrey' size={15} /> : null}

                        </Dropdown.Item>

                        {
                            selectedId === node.id ? <NestedDropdown key={uuidv4()} nodes={node.children}
                            /> : null
                        }
                    </div>

                ))
            }
        </>

    );
};

export const Mobile_Multilevel_Dropdown = ({ additionalclassNames, title }) => {

    const [selectedId, setSetselectedId] = useState(null)

    const [productCategories] = useLazyQuery(QUERY_GET_ALL_PARENT_AND_SUBCATEGORIES_DROPDOWN)
    const [isLoading, setIsLoading] = useState(false);
    const [allcategory, setAllCategory] = useState([]);

    const fetchCategories = () => {
        setIsLoading(true);
        productCategories()
            .then(response => response.data)
            .then((data) => data.productCategories)
            .then((data) => {
                data = sampleFunction(data);
                setAllCategory(data);
            }).catch((e) => {
                console.log(e);
                toast(e.message);
            })
            .finally(() => {
                setIsLoading(false);
            })
    }

    const router = useRouter();

    // const nodes = sampleFunction(); // Replace this with your data source

    useEffect(() => {
        fetchCategories();
    }, [])

    return (
        <Dropdown position='right' isDisabled={isLoading} title={title} buttonClassName={`${additionalclassNames}`} >
            {allcategory.filter(e => {
                for (const element of allData) {
                    if (element.id === e.id) {
                        return true;
                    }
                }

                return false;
            }).map((node) => node.children.length === 0 ? (
                <Dropdown.Item
                    key={uuidv4()}
                    className='flex justify-between'
                    onClick={(e) => {
                        e.stopPropagation();
                        console.log(node.id);
                        router.push(`/pages/productlisting/${node.id}`)
                    }} >{node.name}</Dropdown.Item>
            ) : (
                <div key={uuidv4()}>
                    <Dropdown.Item key={uuidv4()}
                        className='flex justify-between'
                        onClick={(e) => {
                            e.stopPropagation();
                            console.log(node.id);
                            router.push(`/pages/productlisting/${node.id}`)
                        }}
                    >
                        {node.name} <AiFillCaretDown onClick={(e) => {
                            e.stopPropagation();
                            if (selectedId === node.id) {
                                setSetselectedId(null)
                            } else {
                                setSetselectedId(node.id)
                            }
                        }} className='text-lightgrey' size={15} />
                    </Dropdown.Item>
                    {
                        selectedId === node.id ? <NestedDropdown key={uuidv4()} nodes={node.children} /> : null
                    }
                </div>
            )
            )}
        </Dropdown>
    );
};

export default Mobile_Multilevel_Dropdown;