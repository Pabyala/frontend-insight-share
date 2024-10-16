import React from 'react'

export default function NavigationMenuItems() {
    return (
        <div className='' style={{zIndex: '1'}}>
            <div className="flex justify-center">
                <div className="flex space-x-4">
                    <a href="#" className="rounded-md px-2 py-1 text-xs font-medium text-black hover:text-stone-600 lg:text-sm">Home</a>
                    <a href="#" className="rounded-md px-2 py-1 text-xs font-medium text-black hover:text-stone-600 lg:text-sm">All Post</a>
                </div>
            </div>
        </div>
    )
}
