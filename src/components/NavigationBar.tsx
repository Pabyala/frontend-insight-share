import React, { useEffect, useRef, useState } from 'react'
import { CiSearch } from "react-icons/ci";
import SubmenuProfile from './SubmenuProfile';
import NavigationMenuItems from './NavigationMenuItems';
import NotificationIcon from './NotificationIcon';
import Avatar from '@mui/material/Avatar';
import NotificationContent from './NotificationContent';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import FollowersIcon from './FollowersIcon';

export default function NavigationBar() {

    const [isProfileOpen, setIsProfileOpen] = useState(false);
    const [isNotificationOpen, setIsNotificationOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);
    const toggleNotificationDropdown = () => {
        setIsNotificationOpen(!isNotificationOpen);
    };
    const toggleProfileDropdown = () => {
        setIsProfileOpen(!isProfileOpen);
    };

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsProfileOpen(false);
            }
        };
        // Attach the event listener
        document.addEventListener("mousedown", handleClickOutside);
        // Clean up the event listener
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);


    return (
        <div className="container mx-auto">
            <div className="px-3 pt-3 pb-2">
                <div className="mx-auto flex items-center justify-between">
                    <div className="text-white text-xl font-bold">
                        <a href="#">Logo</a>
                    </div>
                    <div className="relative flex justify-center flex-grow px-4 max-w-md">
                        <input
                            type="text"
                            placeholder="Search..."
                            className="w-full text-xs p-2 pl-10 rounded-md bg-gray-700 text-white outline-none xl:text-sm"
                        />
                        <CiSearch className='absolute left-6 top-2 text-gray-400 xl:left-7 xl:top-2.5' />
                    </div>

                    <div className="flex items-center space-x-4">
                        <div className="relative text-gray-400 hover:text-white">
                            <div>
                                <FollowersIcon  />
                            </div>
                            
                            {/* {isNotificationOpen && (<NotificationContent />)} */}
                        </div>
                        <div className="relative text-gray-400 hover:text-white">
                            <div onClick={toggleNotificationDropdown}>
                            <NotificationIcon  />
                            </div>
                            
                            {isNotificationOpen && (<NotificationContent />)}
                        </div>

                        <div className="relative flex" ref={dropdownRef}>
                            <button
                                onClick={toggleProfileDropdown}
                                className="text-gray-400 hover:text-white focus:outline-none"
                            >
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
                            </button>
                            {isProfileOpen && (<SubmenuProfile />)}
                        </div>
                    </div>
                </div>
                <hr className="h-px mt-2.5 mb-1 bg-gray-200 border-0 dark:bg-gray-700 xl:mt-3 xl:mb-1.5" />
                <NavigationMenuItems />
            </div>
        </div>
    )
}
