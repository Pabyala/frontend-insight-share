import React, { useState } from 'react';
import { FeArrowRight } from '../../others/CustomIcons';
import { useGetUserFollowersQuery, useGetUserQuery } from '../../../features/users/usersApiSlice';

export default function SettingsPasswordAndSecurity() {

    const { data: userInfo, error: userInfoError, isLoading: isUserInfoLoading } = useGetUserQuery();
    const { data: followersData, isLoading, isError } = useGetUserFollowersQuery();

    const [activeElement, setActiveElement] = useState<string | null>(null);

    const toggleAccordion = (section: string) => {
        setActiveElement((prevSection) => (prevSection === section ? null : section));
    };

    return (
        <div className='bg-white rounded lg:p-2'>
            <p className='p-2 text-sm font-medium lg:text-base'>Password and Security</p>
            <hr className="h-px bg-gray-200 border-0 dark:bg-gray-700" />

            
            <div className='space-y-1 p-2 lg:space-y-2'>
                {/* Change password 1 */}
                <div
                    onClick={() => toggleAccordion('changed-password')}
                    className={`p-2 text-sm bg-gray-200 flex justify-between cursor-pointer ${activeElement === 'changed-password' ? 'rounded-t' : 'rounded'}`}
                >
                    <span className={`lg:text-base ${activeElement === 'changed-password' ? 'font-medium' : ''}`}>Change password</span>
                    <span className={`flex justify-center items-center transform transition-transform duration-300 ${activeElement === 'changed-password' ? 'rotate-90' : ''}`}>
                        <FeArrowRight />
                    </span>
                </div>
                <div
                    className={`bg-gray-200 rounded-b-lg space-y-2 p-2 overflow-hidden transition-all duration-500 ease-in-out ${activeElement === 'changed-password' ? 'h-fit' : 'hidden max-h-0'}`}
                >
                    <div className="flex flex-col space-y-1.5 lg:space-y-2.5">
                        <div className='flex flex-col space-y-1'>
                            <input 
                                className="border-none font-light bg-white rounded focus:outline-none text-sm py-1.5 px-2"
                                type="password" 
                                placeholder='Current password'
                                name="" 
                                id=""
                            />
                        </div>
                        <div className='flex flex-col space-y-1'>
                            <input 
                                className="border-none font-light bg-white rounded focus:outline-none text-sm py-1.5 px-2"
                                type="password" 
                                placeholder='New password'
                                name="" 
                                id=""
                            />
                        </div>
                        <div className='flex flex-col space-y-1'>
                            <input 
                                className="border-none font-light bg-white rounded focus:outline-none text-sm py-1.5 px-2"
                                type="password" 
                                placeholder='Confirm password'
                                name="" 
                                id=""
                            />
                        </div>
                        
                        <button
                            className='text-sm p-1.5 mt-2.5 text-white font-normal rounded bg-blue-600'
                            disabled={true}
                        >
                            Save
                        </button>
                    </div>
                </div>

                {/* Change email */}
                <div
                    onClick={() => toggleAccordion('changed-email')}
                    className={`p-2 text-sm bg-gray-200 flex justify-between cursor-pointer ${activeElement === 'changed-email' ? 'rounded-t' : 'rounded'}`}
                >
                    <span className={`lg:text-base ${activeElement === 'changed-email' ? 'font-medium' : ''}`}>Change email</span>
                    <span className={`flex justify-center items-center transform transition-transform duration-300 ${activeElement === 'changed-email' ? 'rotate-90' : ''}`}>
                        <FeArrowRight />
                    </span>
                </div>
                <div
                    className={`bg-gray-200 rounded-b-lg space-y-2 p-2 overflow-hidden transition-all duration-500 ease-in-out ${activeElement === 'changed-email' ? 'h-fit' : 'hidden max-h-0'}`}
                >
                    <div className="flex flex-col space-y-1.5 lg:space-y-2.5">
                        <div className='flex flex-col space-y-1'>
                            <input 
                                className="border-none font-light bg-white rounded focus:outline-none text-sm py-1.5 px-2"
                                type="email" 
                                placeholder='Current email'
                                name="" 
                                value={userInfo?.email}
                                id=""
                            />
                        </div>
                        <div className='flex flex-col space-y-1'>
                            <input 
                                className="border-none font-light bg-white rounded focus:outline-none text-sm py-1.5 px-2"
                                type="email" 
                                placeholder='New email'
                                name="" 
                                id=""
                            />
                        </div>
                        <button
                            className='text-sm p-1.5 mt-2.5 text-white font-normal rounded bg-blue-600'
                            disabled={true}
                        >
                            Save
                        </button>
                    </div>
                </div>

                
            </div>
        </div>
    );
}