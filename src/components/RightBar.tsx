import React from 'react'
import Sponsored from './Sponsored'
import SuggestedFollowing from './SuggestedFollowing'
import './Style.css'

export default function RightBar() {
    return (
        <div className='hidden lg:w-[40%] lg:block xl:w-[26%]'>
            <div
                className="right-bar fixed w-full lg:max-w-[358px] xl:max-w-[290px] 2xl:max-w-[348px] [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-track]:bg-gray-100 [&::-webkit-scrollbar-thumb]:bg-gray-300 dark:[&::-webkit-scrollbar-track]:bg-neutral-700 dark:[&::-webkit-scrollbar-thumb]:bg-neutral-500"
                style={{ zIndex: "1" }}
            >
                <Sponsored/>
                <hr className="h-px bg-gray-200 border-0 dark:bg-gray-700" />
                <SuggestedFollowing/>
            </div>
        </div>
    )
}
