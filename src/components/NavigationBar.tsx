import React, { useEffect, useRef, useState } from 'react'
import { FaBell } from "react-icons/fa";
import { CiSearch } from "react-icons/ci";
import SubmenuProfile from './SubmenuProfile';
import NavigationMenuItems from './NavigationMenuItems';

export default function NavigationBar() {
    
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);
    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsDropdownOpen(false);
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
        <div className="container mx-auto bg-gray-800">
            <div className="px-3 pt-3 pb-2 lg:px-8">
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

                    <div className="flex items-center space-x-6">
                        <button className="relative text-gray-400 hover:text-white">
                            <FaBell className='text-xl' />
                            <span className="absolute top-1 right-0 text-xs font-bold text-white bg-red-500 rounded-full px-1 transform translate-x-1 translate-y-[-50%]">
                                2
                            </span>
                        </button>

                        <div className="relative flex" ref={dropdownRef}>
                            <button
                                onClick={toggleDropdown}
                                className="text-gray-400 hover:text-white focus:outline-none"
                            >
                                <img
                                    alt=""
                                    src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                                    className="h-8 w-8 rounded-full"
                                />
                            </button>
                            {isDropdownOpen && ( <SubmenuProfile /> )}
                        </div>
                    </div>
                </div>
                <hr className="h-px mt-2.5 mb-1 bg-gray-200 border-0 dark:bg-gray-700 xl:mt-3 xl:mb-1.5" />
                <NavigationMenuItems/>
            </div>
        </div>
    )
}
