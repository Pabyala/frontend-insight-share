import { Avatar } from '@mui/material'
import React from 'react'
import { AntDesignSettingFilled, ClarityUserSolid, FluentPersonArrowBack24Filled, IconoirPostSolid, IonLogOut, MdiGift, MingcuteUserFollow2Fill } from './custom-icons'
import { Link } from 'react-router-dom'

export default function SubmenuProfile() {
    return (
        <div className="absolute top-full right-[0px] mt-[11px] w-[392px] bg-white rounded-md shadow-lg py-2">
            <div className='block px-4 py-2 text-gray-800 hover:bg-gray-100'>
                <div className="flex">
                    <Avatar
                        sx={{ width: 32, height: 32 }}
                        alt="Remy Sharp"
                        src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                    />
                    <div className='flex flex-col ml-2.5'>
                        <span className='text-sm font-semibold'>Eleomar F. Fajutnao</span>
                        <span className='text-sm'>marco@gmail.com</span>
                    </div>
                </div>
            </div>
            <div className="block px-4">
                <hr className="h-px mt-1 mb-1 bg-gray-200 border-0 dark:bg-gray-700" />
            </div>

            <Link to='/profile' className="block px-4 py-1.5 text-sm text-gray-800 hover:bg-gray-100 lg:text-sm" >
                <div className='flex items-center space-x-2'>
                    <div>
                        <ClarityUserSolid className='text-2xl' />
                    </div>
                    <span>Your Profile</span>
                </div>
            </Link>

            <a href="/" className="block px-4 py-1.5 text-sm text-gray-800 hover:bg-gray-100 lg:text-sm" >
                <div className='flex items-center space-x-2'>
                    <div>
                        <MingcuteUserFollow2Fill className='text-2xl' />
                    </div>
                    <span>Following</span>
                </div>
            </a>

            <a href="/" className="block px-4 py-1.5 text-sm text-gray-800 hover:bg-gray-100 lg:text-sm" >
                <div className='flex items-center space-x-2'>
                    <div>
                        <FluentPersonArrowBack24Filled className='text-2xl' />
                    </div>
                    <span>Followers</span>
                </div>
            </a>

            <a href="/" className="block px-4 py-1.5 text-sm text-gray-800 hover:bg-gray-100 lg:text-sm" >
                <div className='flex items-center space-x-2'>
                    <div>
                        <IconoirPostSolid className='text-2xl' />
                    </div>
                    <span>Post</span>
                </div>
            </a>

            <a href="/" className="block px-4 py-1.5 text-sm text-gray-800 hover:bg-gray-100 lg:text-sm" >
                <div className='flex items-center space-x-2'>
                    <div>
                        <MdiGift className='text-2xl' />
                    </div>
                    <span>Today's birthday</span>
                </div>
            </a>

            <a href="/" className="block px-4 py-1.5 text-sm text-gray-800 hover:bg-gray-100 lg:text-sm" >
                <div className='flex items-center space-x-2'>
                    <div>
                        <AntDesignSettingFilled className='text-2xl' />
                    </div>
                    <span>Settings</span>
                </div>
            </a>
            <Link to='/login' className="block px-4 py-1.5 text-sm text-gray-800 hover:bg-gray-100 lg:text-sm" >
                <div className='flex items-center space-x-2'>
                    <div>
                        <IonLogOut className='text-2xl' />
                    </div>
                    <span>Logout</span>
                </div>
            </Link>
        </div>
    )
}