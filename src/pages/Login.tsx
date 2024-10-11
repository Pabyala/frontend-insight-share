import React from 'react';
import { Link } from 'react-router-dom';

export default function Login() {
    return (
        <div className="w-full flex flex-col items-center justify-center min-h-screen bg-gray-100">

            <div className="w-full flex flex-col justify-center mb-8">
                <h2 className="text-2xl text-center font-bold text-blue-600 lg:text-3xl lg:mb-1">Insight Share</h2>
                <p className="text-base text-gray-600 w-f text-center">
                    Connect with friends and the world around you on Insight Share.
                </p>
            </div>


            <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md space-y-4">
                <input
                    type="text"
                    placeholder="Email or Phone Number"
                    className="text-sm w-full p-2.5 border border-gray-300 rounded focus:ring-customGray focus:bg-customGray focus:outline-none"
                />
                <input
                    type="password"
                    placeholder="Password"
                    className="text-sm w-full p-2.5 border border-gray-300 rounded focus:ring-customGray focus:bg-customGray focus:outline-none"
                />
                <button className="w-full text-sm font-semibold rounded p-2.5 bg-gray-200 text-slate-700 hover:bg-gray-300 hover:text-black transition-colors">
                    Log In
                </button>

                <div className="text-center mt-4">
                    <a className="text-blue-600 cursor-pointer text-sm">Forgot Password?</a>
                </div>

                <hr className="my-6" />

                <div className='flex justify-center items-center text-center'>
                    <Link 
                        to='/register' 
                        className="w-full text-sm bg-green-500 text-white p-2.5 rounded font-semibold hover:bg-green-600 hover:text-white transition-colors">
                        Create New Account
                    </Link>
                </div>
            </div>
        </div>
    );
}
