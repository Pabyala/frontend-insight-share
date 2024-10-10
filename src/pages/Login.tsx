import React from 'react';
import { Link } from 'react-router-dom';

export default function Login() {
    return (
        <div className="container flex flex-col items-center justify-center min-h-screen bg-gray-100">

            <div className="flex flex-col items-center mb-8">
                <h2 className="text-4xl font-bold text-blue-600">Insight Share</h2>
                <p className="text-lg text-gray-600">
                    Connect with friends and the world around you on Insight Share.
                </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md space-y-4">
                <input
                    type="text"
                    placeholder="Email or Phone Number"
                    className="text-sm w-full p-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-customGray focus:bg-customGray"
                />
                <input
                    type="password"
                    placeholder="Password"
                    className="text-sm w-full p-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-customGray focus:bg-customGray"
                />
                <button className="w-full text-sm bg-gray-200 text-slate-500 p-3 rounded-lg font-bold hover:bg-gray-300">
                    Log In
                </button>

                <div className="text-center mt-4">
                    <Link to='/register' className="text-blue-600 hover:underline text-sm">Forgot Password?</Link>
                </div>

                <hr className="my-6" />

                <button className="w-full text-sm bg-green-500 text-white p-3 rounded-lg font-bold hover:bg-green-600">
                    Create New Account
                </button>
            </div>
        </div>
    );
}
