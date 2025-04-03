import React from 'react'
import { Link } from 'react-router-dom'

export default function NotFound() {
    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100 px-4">
            <div className="text-center">
                <h1 className="text-6xl font-bold text-red-600">404</h1>
                <p className="text-2xl text-gray-800 mt-4">Page Not Found</p>
                <p className="text-lg text-gray-500 mt-2">Sorry, the page you are looking for doesn't exist.</p>
                <Link
                to='/'
                className="mt-6 inline-block px-6 py-1.5 bg-blue-600 text-white rounded hover:bg-blue-700 transition-all"
                > Go Home </Link>
            </div>
        </div>
    )
}
