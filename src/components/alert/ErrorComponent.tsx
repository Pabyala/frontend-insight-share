import React from 'react'

export default function ErrorComponent() {
    return (
        <div className="flex items-center justify-center h-full w-full">
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg shadow-md max-w-md text-center">
                <h4 className="text-sm font-semibold">Something went wrong</h4>
                <p className="text-sm">An error occurred while fetching data. Please refresh the page.</p>
            </div>
        </div>
    )
}