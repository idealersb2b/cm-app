'use client'

import React, { useEffect, useRef, useState } from 'react'
import { BiChevronDown } from 'react-icons/bi'
import { Range } from 'rc-slider';
import 'rc-slider/assets/index.css';
import { useRouter } from 'next/navigation';
import { v4 as uuidv4 } from 'uuid'


function Dropdown({ title, options, parentId, SetFilter, setPriceRange }) {

    const [dropdownOpen, setDropdownOpen] = useState(true)
    const [rangeValue, setRangeValue] = useState([0, 99999])
    const [features, setFeatures] = useState([])
    const [filter, setFilter] = useState('DATE DESC');
    const [rating, setRating] = useState([])
    const [allOptions, setAllOptions] = useState(false);
    const router = useRouter();

    const handleFeaturesChange = (event) => {
        const { value, checked } = event.target;

        // If checkbox is checked, add the value to the array
        if (checked) {
            setFeatures([...features, value]);
        } else {
            // If checkbox is unchecked, remove the value from the array
            setFeatures(features.filter((checkbox) => checkbox !== value));
        }
    }

    const handleRatingChange = (event) => {
        const { value, checked } = event.target;

        // If checkbox is checked, add the value to the array
        if (checked) {
            setRating([...rating, value]);
        } else {
            // If checkbox is unchecked, remove the value from the array
            setRating(rating.filter((checkbox) => checkbox !== value));
        }
    }

    const handleMenu = () => {
        setDropdownOpen(!dropdownOpen);
    }

    useEffect(() => {
    }, [rangeValue])


    return (
        <> {
            options?.length ? <div>
                <div
                    className='h-12 flex justify-between items-center text-base font-semibold'
                    onClick={handleMenu}
                >{title}
                    <span className='cursor-pointer'>
                        <BiChevronDown className={`h-6 w-6 transition-transform duration-500 ${dropdownOpen ? '' : 'rotate-180'}`} color='#8b96a5' />
                    </span>
                </div>
                <>
                    {
                        dropdownOpen && title === 'Sub Category' && <div>
                            {options?.slice(0, 3).map((category) => <div
                                onClick={() => router.push(`/pages/productlisting/${parentId}/${category.id}`)}
                                className={`text-base break-words hover:text-primary cursor-pointer text-gray-400$ ${dropdownOpen ? '' : 'hidden'}`}
                                key={uuidv4()} >
                                {category.name}
                            </div>)}
                            {allOptions && options?.slice(3).map((category) => <div
                                onClick={() => router.push(`/pages/productlisting/${parentId}/${category.id}`)}
                                className={`text-base break-words hover:text-primary cursor-pointer text-gray-400$ ${dropdownOpen ? '' : 'hidden'}`}
                                key={category} >
                                {category.name}
                            </div>)}
                            {options?.length > 3 && <div className='text-base text-primary h-9' onClick={() => setAllOptions(!allOptions)} >
                                {!allOptions ? "See More" : "See Less"}
                            </div>}
                        </div>
                    }

                    {
                        dropdownOpen && title === 'Features' && <div>
                            {options?.map((category) => <div className={`flex gap-3 items-center text-base text-gray-400 h-9 ${dropdownOpen ? '' : 'hidden'}`} key={category} >
                                <input name='feature' value={category} id='feature' checked={features.includes(category)}
                                    onChange={handleFeaturesChange}
                                    type='checkbox' />
                                {category}
                            </div>)}
                            {options.length >= 3 && <button className='text-base text-primary h-9'>See all</button>}
                        </div>
                    }

                    {
                        dropdownOpen && title === 'Price range' && <div>
                            <Range
                                onChange={(e) => {
                                    setRangeValue(e);
                                }}
                                value={rangeValue}
                                allowCross={false}
                                min={0}
                                max={99999}
                            />

                            <div className='flex flex-row justify-between'>
                                <div className='flex flex-col w-5/12'>
                                    <label htmlFor='min'>Min</label>
                                    <input
                                        className='border rounded outline-none p-2'
                                        id='min'
                                        value={rangeValue[0]}
                                        onChange={(e) => {
                                            if (parseInt(e.target.value)) {
                                                const prevRange = [...rangeValue]; // Create a new array
                                                prevRange[0] = parseInt(e.target.value);
                                                setRangeValue(prevRange); // Update state with the new array
                                            }
                                        }}
                                        name='min'
                                        placeholder='0'
                                    />
                                </div>
                                <div className='flex flex-col w-5/12'>
                                    <label htmlFor='max'>Max</label>
                                    <input
                                        className='border rounded outline-none p-2'
                                        id='max'
                                        type='number'
                                        value={rangeValue[1]}
                                        onChange={(e) => {
                                            if (parseInt(e.target.value)) {
                                                const prevRange = [...rangeValue]; // Create a new array
                                                prevRange[1] = parseInt(e.target.value);
                                                setRangeValue(prevRange); // Update state with the new array
                                            }
                                        }}
                                        name='max'
                                        placeholder='99999'
                                    />
                                </div>
                            </div>
                            <button
                                className='mt-2 w-full bg-white rounded-md text-base text-primary h-9 border border-gray-300'
                                onClick={() => setPriceRange(rangeValue)}
                            >
                                Apply
                            </button>
                        </div>
                    }

                    {
                        dropdownOpen && title === 'Sort By' && <div>
                            {options?.map((option) => <div key={uuidv4()} className={`flex gap-3 items-center text-base text-gray-400 h-9 ${dropdownOpen ? '' : 'hidden'}`}>
                                <input className="with-gap" name='condition' value={option.value} checked={option.value === filter} onChange={(e) => {
                                    setFilter(e.target.value)
                                    SetFilter(e.target.value);
                                    console.log(e.target.value)
                                }} type="radio" id={option.title} />
                                <label for={option.title}> {option.title}</label>
                            </div>)
                            }
                        </div>
                    }
                </>
            </div>
                : null
        }
        </>
    )
}

export default Dropdown