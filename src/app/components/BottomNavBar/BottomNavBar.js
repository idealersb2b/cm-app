"use client"

import { TbHome2 } from 'react-icons/tb'
import { IoPeopleOutline } from 'react-icons/io5'
import { PiNotepadThin } from 'react-icons/pi'
import { HiSpeakerphone } from 'react-icons/hi'
import { useRouter, useSelectedLayoutSegment, usePathname } from 'next/navigation'
import { useEffect } from 'react'
import { isLoggedInVar } from '@/app/Providers'
import { useReactiveVar } from '@apollo/client'

function BottomNavBar() {

    const router = useRouter();
    const activeSegment = usePathname()
    const pathName = activeSegment.split('/').pop()
    const LoggedIn = useReactiveVar(isLoggedInVar)

    useEffect(() => {

    }, [LoggedIn])


    return (
        <div className='flex justify-center'>
            <div className='sm:hidden z-[100]  shadow-2xl fixed bottom-0 flex justify-between flex-row px-3 py-2 bg-white mb-3 rounded-md w-[95%]'>
                <div onClick={() => router.push('/')} className={`flex gap-2 items-center p-3 rounded-lg ${pathName === '' ? 'bg-primary' : null} `}>
                    <TbHome2 size={24} className={`text-lightgrey ${pathName === '' ? 'text-white' : null}`} />
                    <span className={`text-white  ${pathName === '' ? 'block' : 'hidden'}`}>
                        Home
                    </span>
                </div>

                {
                    LoggedIn ? <div onClick={() => router.push('/pages/home/account/myprofile')} className={`flex gap-2 items-center p-3 rounded-lg ${pathName === 'myprofile' ? 'bg-primary' : null} `}>
                        <IoPeopleOutline size={24} className={`text-lightgrey ${pathName === 'myprofile' ? 'text-white' : null}`} />
                        <span className={`text-white  ${pathName === 'myprofile' ? 'block' : 'hidden'}`}>
                            Account
                        </span>
                    </div> : null
                }


                <div onClick={() => router.push('/pages/home/account/list')} className={`flex gap-2 items-center p-3 rounded-lg ${pathName === 'list' ? 'bg-primary' : null} `}>
                    <PiNotepadThin size={24} className={`text-lightgrey ${pathName === 'list' ? 'text-white' : null}`} />
                    <span className={`text-white  ${pathName === 'list' ? 'block' : 'hidden'}`}>
                        My Quotes
                    </span>
                </div>

                {/* <div onClick={() => router.push('/advertisement')} className={`flex gap-2 items-center p-3 rounded-lg ${pathName === 'advertisement' ? 'bg-primary' : null} `}>
                    <HiSpeakerphone size={24} className={`text-lightgrey ${pathName === 'advertisement' ? 'text-white' : null}`} />
                    <span className={`text-white  ${pathName === 'advertisement' ? 'block' : 'hidden'}`}>
                        Messages
                    </span>
                </div> */}
            </div >
        </div>

    )
}

export default BottomNavBar