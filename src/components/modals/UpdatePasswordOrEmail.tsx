import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';

interface PropsUpdatePasswordOrEmail {
    onClose: () => void;
}

export default function UpdatePasswordOrEmail({ onClose }: PropsUpdatePasswordOrEmail) {

    useEffect(() => {
        // prevent scrolling when the modal is open
        document.body.style.overflow = 'hidden';
        return () => {
            // restore body scroll behavior when modal is closed
            document.body.style.overflow = '';
        };
    }, []);
    const navigate = useNavigate();

    const handleUpdateEmail = () => {
        return alert("Under development")
    }

    const handleUpdatePassword = () => {
        navigate("/reset-password-verify");
    }

    return (
        <div className='fixed inset-0 z-50 flex items-center justify-center w-full h-full overflow-y-auto bg-black bg-opacity-50'>
            <div className='relative p-4 w-full max-w-lg max-h-full'>
                <div className='relative bg-white rounded-lg shadow dark:bg-gray-700 p-5 space-y-3 lg:p-6'>
                    <div className='flex justify-between'>
                        <div className='flex items-center'>
                            <p className='text-sm font-semibold text-center'>Select the field you'd like to update:</p>
                        </div>
                        <div className='flex justify-end items-center'>
                            <button
                                type="button"
                                className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                                onClick={onClose}
                            >
                                <svg
                                    className="w-2.5 h-2.5"
                                    aria-hidden="true"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 14 14"
                                >
                                    <path
                                        stroke="currentColor"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                                    />
                                </svg>
                            </button>
                        </div>
                    </div>
                    <hr className="h-px bg-gray-200 border-0 dark:bg-gray-700" />
                    <div className="flex w-full space-x-3">
                        <button onClick={handleUpdateEmail} className='rounded-base p-2 bg-slate-200 w-1/2 text-sm font-medium  hover:bg-slate-300'>Email</button>
                        <button onClick={handleUpdatePassword} className='rounded-base p-2 bg-slate-200 w-1/2 text-sm font-medium  hover:bg-slate-300'>Password</button>
                    </div>
                </div>
            </div>
        </div>
    )
}