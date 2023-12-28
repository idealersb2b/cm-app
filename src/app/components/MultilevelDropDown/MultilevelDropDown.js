"use client"

import React, { useEffect, useState } from 'react';
import Dropdown from 'react-multilevel-dropdown';
// import dropData from '../../../../sample_data.json'
import { useRouter } from 'next/navigation';
import { useLazyQuery } from '@apollo/client';
import { QUERY_GET_ALL_PARENT_AND_SUBCATEGORIES_DROPDOWN } from '@/app/graphql/productCategories/queries';
import { toast } from 'react-toastify';

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

const sampleFunction = (sample) => {
    const MainData = [];
    sample.edges.forEach((data) => {
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

    return (
        <Dropdown.Submenu position="right" className="w-min">
            {nodes.map((node) => (
                <Dropdown.Item key={node.id}
                    onClick={(e) => {
                        e.stopPropagation();
                        console.log(node.id);
                        router.push(`/pages/productlisting/${node.id}`)
                    }}
                >
                    {node.name}
                    {node.children.length > 0 && (
                        <NestedDropdown nodes={node.children}
                        />
                    )}
                </Dropdown.Item>
            ))}
        </Dropdown.Submenu>
    );
};

export const MyDropdownMenu = ({ subMenuVisible, additionalclassNames, title }) => {

    const router = useRouter();

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
                toast.error(e.message);
            })
            .finally(() => {
                setIsLoading(false);
            })
    }

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
            }).map((node) =>
                node.children.length === 0 || !subMenuVisible ? (
                    <Dropdown.Item
                        onClick={(e) => {
                            e.stopPropagation();
                            console.log(node.id);
                            router.push(`/pages/productlisting/${node.id}`)
                        }} key={node.id}>{node.name}</Dropdown.Item>
                ) : (
                    <Dropdown.Item key={node.id}
                        onClick={(e) => {
                            e.stopPropagation();
                            console.log(node.id);
                            router.push(`/pages/productlisting/${node.id}`)
                        }}
                    >
                        {node.name}
                        <NestedDropdown nodes={node.children} />
                    </Dropdown.Item>
                )
            )}
        </Dropdown>
    );
};

export default MyDropdownMenu;