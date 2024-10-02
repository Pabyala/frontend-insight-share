import { Avatar } from '@mui/material'
import React from 'react'

export default function SubmenuProfile() {
    return (
        <div className="absolute right-0 mt-9 w-52 bg-white rounded-md shadow-lg py-2">
            <div className='block px-4 py-2 text-gray-800 hover:bg-gray-100'>
                <div className="flex">
                    {/* <img
                        alt=""
                        src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                        className="h-8 w-8 rounded-full"
                    /> */}
                    <Avatar
                        sx={{ width: 32, height: 32 }}
                        alt="Remy Sharp"
                        // src="/static/images/avatar/1.jpg" 
                        src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                    />
                    <div className='flex flex-col ml-2.5'>
                        <span className='text-xs'>Eleomar F. Fajutnao</span>
                        <span className='text-xs'>marco@gmail.com</span>
                    </div>
                </div>
            </div>
            <div className="block px-4">
                <hr className="h-px mt-1 mb-1 bg-gray-200 border-0 dark:bg-gray-700" />
            </div>

            <a href="/" className="block px-4 py-1.5 text-xs text-gray-800 hover:bg-gray-100 lg:text-sm" > Your Profile </a>
            <a href="/" className="block px-4 py-1.5 text-xs text-gray-800 hover:bg-gray-100 lg:text-sm" > Settings </a>
            <a href="/" className="block px-4 py-1.5 text-xs text-gray-800 hover:bg-gray-100 lg:text-sm" > Logout </a>
        </div>
    )
}