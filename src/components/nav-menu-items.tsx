import React from 'react'

export default function NavigationMenuItems() {
    return (
        <nav>
            <div className="flex justify-center">
                <div className="flex space-x-4">
                    <a href="#" className="rounded-md px-2 py-1 text-xs font-medium text-gray-300 hover:text-white lg:text-sm">Home</a>
                    <a href="#" className="rounded-md px-2 py-1 text-xs font-medium text-gray-300 hover:text-white lg:text-sm">All Post</a>
                </div>
            </div>
        </nav>
    )
}
