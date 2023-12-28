"use client"

import Link from 'next/link';
import React from 'react'
import { v4 as uuidv4 } from 'uuid'

function BreadCrumps({ URI = [], lastName }) {

    return (
        <div className='hidden sm:flex flex-wrap text-xs py-4' >
            <div>
                <Link href={'/'}>
                    <span className='cursor-pointer hover:text-lightgrey pr-1'>
                        {'Home '}
                    </span>
                    {" / "}
                </Link>
            </div>

            {URI.map((loc, index) => <div key={uuidv4()}>
                <Link href={`/pages/productlisting/${loc.id}`}>
                    <span className='cursor-pointer hover:text-primary px-1'>
                        {loc.name}
                    </span>
                    {"/"}
                </Link>
            </div>
            )}
            <div>
                <span className='cursor-pointer hover:text-primary px-1'>
                    {lastName}
                </span>
            </div>
        </div>


    )
}

export default BreadCrumps