import React, { useEffect, useRef, useState } from "react";
import { CiSearch } from 'react-icons/ci'
import { FluentColorPeople48, FluentEmojiBell } from './custom-icons'
import FollowersRequestContent from "./followers-request-content";
import NotificationContent from "./notification-content";
import SubmenuProfile from "./sub-menu-profile";

export default function Navbar() {

    const [countFollower, setCountFollower] = useState<number>(4)
    const [showFollowerMenu, setShowFollowerMenu] = useState<boolean>(false);
    const [showNotificationMenu, setShowNotificationMenu] = useState<boolean>(false);
    const [showProfileMenu, setShowProfileMenu] = useState<boolean>(false);

    return (
        <div className='container mx-auto pt-3 pb-2 flex items-center justify-between bg-white'>
            {/* logo and search */}
            <div className='flex items-center md:space-x-3'>
                <div className="text-black text-xl font-bold">
                    <a href="#" className="text-bas">Logo</a>
                </div>
                <div className="relative flex justify-center flex-grow px-4 max-w-md">
                    <input
                        type="text"
                        placeholder="Search..."
                        className="w-full text-xs p-2 pl-10 rounded-md bg-lightGrayBlue text-slate-950 outline-none xl:text-sm"
                    />
                    <CiSearch className="absolute left-6 top-2 text-black xl:left-7 xl:top-2.5" />
                </div>
            </div>

            {/* follower, notification, profile */}
            <div className='flex items-center justify-end space-x-3'>
                {/* follower */}
                    <div className="relative inline-flex">
                        <button 
                            onClick={() => setShowFollowerMenu(!showFollowerMenu)}
                            className="flex items-center rounded-full bg-gray-200 border p-1 border-transparent text-center  text-white transition-all  hover:bg-gray-300 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none" type="button"
                        >
                            <span className='text-xl'>
                                <FluentColorPeople48/>
                            </span>
                        </button>
                        {countFollower != 0 && (
                            <span className="absolute top-0.5 right-0.5 grid min-h-[18px] min-w-[18px] translate-x-2/4 -translate-y-2/4 place-items-center rounded-full bg-red-500 p-0.5 text-[12px] font-medium leading-none text-white content-['']">
                            {countFollower}
                            </span>
                        )}
                        {showFollowerMenu && (
                            <FollowersRequestContent/>
                        )}
                    </div>

                {/* notification */}
                    <div className="relative inline-flex">
                        <button 
                            onClick={() => setShowNotificationMenu(!showNotificationMenu)}
                            className="flex items-center rounded-full bg-gray-200 border p-1 border-transparent text-center  text-white transition-all  hover:bg-gray-300 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none" type="button"
                        >
                            <span className='text-xl'>
                                <FluentEmojiBell/>
                            </span>
                        </button>
                        {countFollower != 0 && (
                            <span className="absolute top-0.5 right-0.5 grid min-h-[18px] min-w-[18px] translate-x-2/4 -translate-y-2/4 place-items-center rounded-full bg-red-500 p-0.5 text-[12px] font-medium leading-none text-white content-['']">
                            {countFollower}
                            </span>
                        )}
                        {showNotificationMenu && (
                            <NotificationContent/>
                        )}
                    </div>

                {/* profile */}
                    <div className="relative inline-flex">
                        <div
                            onClick={() => setShowProfileMenu(!showProfileMenu)}
                        >
                            <img
                                src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&amp;ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&amp;auto=format&amp;fit=crop&amp;w=1480&amp;q=80"
                                alt="profile picture"
                                className="relative inline-block h-[33px] w-[33px] !rounded-full object-cover object-center"
                            />
                        </div>
                        {showProfileMenu && (
                            <SubmenuProfile/>
                        )}
                    </div>
            </div>
        </div>
    )
}
