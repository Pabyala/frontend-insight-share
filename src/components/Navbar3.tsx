import React, { useEffect, useRef, useState } from 'react'

export default function Navbar3() {
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
    <nav className="bg-gray-800 p-4">
    <div className="container mx-auto flex items-center justify-between">
      {/* Left: Logo */}
      <div className="text-white text-xl font-bold">
        <a href="#">Logo</a>
      </div>

      {/* Center: Search bar */}
      <div className="flex-grow px-4 max-w-md">
        <input
          type="text"
          placeholder="Search..."
          className="w-full p-2 rounded-md bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Right: Notification and Profile Icons */}
      <div className="flex items-center space-x-6">
        {/* Notification Icon */}
        <a href="#" className="text-gray-400 hover:text-white">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
            />
          </svg>
        </a>

        {/* Profile Icon */}
        <div className="relative" ref={dropdownRef}>
            <button
              onClick={toggleDropdown}
              className="text-gray-400 hover:text-white focus:outline-none"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5.121 18.364A9 9 0 0112 21a9 9 0 016.879-2.636M15 10a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
            </button>

            {/* Dropdown menu */}
            {isDropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-2">
                <a
                  href="#"
                  className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
                >
                  Your Profile
                </a>
                <a
                  href="#"
                  className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
                >
                  Settings
                </a>
                <a
                  href="#"
                  className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
                >
                  Logout
                </a>
              </div>
            )}
          </div>
      </div>
    </div>
  </nav>
  )
}
