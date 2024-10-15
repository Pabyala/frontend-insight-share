import React, { useState } from 'react'

interface DetailsPropsInterface {
    onClose: () => void;
}

export default function DetailsModal({onClose}:DetailsPropsInterface) {

    const [isCheckedFollowed, setIsCheckedFollowed] = useState<boolean>(true);
    const [isCheckedBday, setIsCheckedBday] = useState<boolean>(true);

    return (
        <div 
            // onClick={onClose}
            className='fixed inset-0 z-50 flex items-center justify-center w-full h-full overflow-y-auto bg-black bg-opacity-50'
        >
            <div className='relative p-4 w-full max-w-2xl max-h-full'>
                <div className='relative bg-white rounded-lg shadow dark:bg-gray-700 p-4 space-y-2'>
                    <p className='text-base font-semibold text-center'>Update your details</p>
                    <hr className="h-px bg-gray-200 border-0 dark:bg-gray-700" />
                    <div className='w-full'>
                        <p className='text-sm font-medium mb-0.5'>Current City</p>
                        <div className='w-full'>
                            <input 
                                type="text" 
                                placeholder='Enter city'
                                className='w-full p-1.5 border border-gray-300 font-light focus:border-blue-500 focus:outline-none rounded text-sm'
                            />
                        </div>
                    </div>

                    <div className='w-full'>
                        <p className='text-sm font-medium mb-0.5'>Home town</p>
                        <div className='w-full'>
                            <input 
                                type="text" 
                                placeholder='Enter your home town'
                                className='w-full p-1.5 border border-gray-300 font-light focus:border-blue-500 focus:outline-none rounded text-sm'
                            />
                        </div>
                    </div>
                    
                    <div className='w-full'>
                        <p className='text-sm font-medium'>Followed by</p>
                        <div className='w-full'>
                            <div className='w-full flex flex-col'>
                                <label className="inline-flex items-center cursor-pointer">
                                <input 
                                    type="checkbox" 
                                    value="" 
                                    className="sr-only peer" 
                                    onChange={() => setIsCheckedFollowed(!isCheckedFollowed)}
                                    checked={isCheckedFollowed} 
                                />
                                <div className="relative w-11 h-6 bg-gray-200 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-0 after:content-[''] after:absolute after:top-0.5 after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                                <span className="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300">206 people</span>
                                </label>
                            </div>
                            {isCheckedFollowed && (
                                <div className='w-full'>
                                    <span className='text-xs text-gray-700'>It will shown on your profile</span>
                                </div>
                            )}
                        </div>
                    </div>

                    <div className='w-full'>
                        <p className='text-sm font-medium'>Study at </p>
                        <div className='w-full'>
                            <input 
                                type="text" 
                                placeholder='Enter school'
                                className='w-full p-1.5 border border-gray-300 font-light focus:border-blue-500 focus:outline-none rounded text-sm'
                            />
                        </div>
                    </div>

                    <div className='w-full'>
                        <p className='text-sm font-medium'>Work at </p>
                        <div className='w-full'>
                            <input 
                                type="text" 
                                placeholder='Enter company'
                                className='w-full p-1.5 border border-gray-300 font-light focus:border-blue-500 focus:outline-none rounded text-sm'
                            />
                        </div>
                    </div>

                    <div className='w-full'>
                        <p className='text-sm font-medium'>Birthday</p>
                        <div className='w-full'>
                            <div className='w-full flex flex-col'>
                                <label className="inline-flex items-center cursor-pointer">
                                <input 
                                    type="checkbox" 
                                    value="" 
                                    className="sr-only peer" 
                                    onChange={() => setIsCheckedBday(!isCheckedBday)}
                                    checked={isCheckedBday} 
                                />
                                <div className="relative w-11 h-6 bg-gray-200 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-0 after:content-[''] after:absolute after:top-0.5 after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                                <span className="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300">October 22, 2000</span>
                                </label>
                            </div>
                            {isCheckedBday && (
                                <div className='w-full'>
                                    <span className='text-xs text-gray-700'>It will shown on your profile</span>
                                </div>
                            )}
                        </div>
                    </div>

                    <div className='w-full space-y-1'>
                        <p className='text-sm font-medium'>Your socials </p>
                        <div className='flex flex-col space-y-1'>
                            <div className='flex justify-between items-center'>
                                <a 
                                    href="https://github.com/Pabyala/"
                                    className='text-sm text-[#0866FF] w-[75%]'
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >https://github.com/Pabyala</a>

                                <button 
                                className='p-1.5 text-white font-medium text-sm bg-[#0866FF] rounded w-[20%] hover:bg-blue-600'
                                >Edit</button>
                            </div>

                            <div className='flex justify-between items-center'>
                                <a 
                                    href="http://marfportfolio.netlify.app/"
                                    className='text-sm text-[#0866FF] w-[75%]'
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >http://marfportfolio.netlify.app</a>

                                <button 
                                className='p-1.5 text-white font-medium text-sm bg-[#0866FF] rounded w-[20%] hover:bg-blue-600'
                                >Edit</button>
                            </div>
                        </div>
                        <div className='w-full flex justify-between'>
                            <input 
                                type="text" 
                                placeholder='Enter company'
                                className='p-1.5 border border-gray-300 font-light focus:border-blue-500 focus:outline-none rounded text-sm w-[75%]'
                            />
                            <button 
                                className='p-1.5 text-white font-medium text-sm bg-[#0866FF] rounded w-[20%] hover:bg-blue-600'
                            >Add</button>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}
