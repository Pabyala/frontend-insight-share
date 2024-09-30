import React from 'react';

export default function Navbar2() {

    const [isOpen, setIsOpen] = React.useState(false);
    const toggleMenu = () => {
        setIsOpen(!isOpen);
    }

    return (
        // <div className='mx-auto max-w-7xl px-2 sm:px-6 lg:px-8'>
            <nav className="bg-white shadow-md flex items-center justify-between py-2 px-2 sm:px-6 lg:px-8">
                {/* Left Section */}
                <div className="flex items-center">
                    {/* Logo */}
                    <div className="font-bold text-xl text-gray-800">MyLogo</div>

                    {/* Search Input */}
                    {/* <div className="flex-grow mx-4">
                        <input
                            type="text"
                            placeholder="Search..."
                            className="w-full p-2 border rounded-lg"
                        />
                    </div> */}
                </div>

                {/* Center Section */}
                <div className="flex-grow flex justify-center px-3">
                <input
                            type="text"
                            placeholder="Search..."
                            className=" p-2 border rounded-lg"
                        />
                    {/* <ul className="flex space-x-4">
                        <li className="hover:text-blue-500 cursor-pointer">Home</li>
                        <li className="hover:text-blue-500 cursor-pointer">About Us</li>
                    </ul> */}
                </div>

                {/* Right Section */}
                <div className="flex items-center space-x-4">
                    {/* Notifications Icon */}
                    <div className="relative">
                        <button className="relative text-gray-800 focus:outline-none">
                            {/* Notification SVG */}
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
                                    d="M15 17h5l-1.405 1.405A2 2 0 0116 22a2 2 0 01-2-2h-1m5-6h-5V5a2 2 0 00-2-2h-2a2 2 0 00-2 2v6a2 2 0 002 2h1m6 0V5"
                                />
                            </svg>
                            {/* Badge for notifications */}
                            <span className="absolute top-0 right-0 h-2 w-2 bg-red-500 rounded-full"></span>
                        </button>
                    </div>

                    {/* User Avatar */}
                    <div className="relative">
                        <button className="focus:outline-none" onClick={toggleMenu}>
                            <img
                                src="https://via.placeholder.com/40" // Placeholder for avatar image
                                alt="User Avatar"
                                className="rounded-full h-10 w-10"
                            />
                        </button>
                        {/* Dropdown Menu */}
                        {isOpen && 
                        <div className="absolute right-0 mt-2 w-48 bg-white border rounded-lg shadow-lg hidden group-hover:block">
                            <ul className="py-2">
                                <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">Profile</li>
                                <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">Logout</li>
                            </ul>
                        </div>
                        }
                    </div>
                </div>
            </nav>
        // </div>
    );
}
