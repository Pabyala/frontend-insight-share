import React, { useState } from 'react';
import { FeArrowRight } from '../../others/CustomIcons';
import { useGetUserQuery } from '../../../features/users/usersApiSlice';

export default function SettingsPasswordAndSecurity() {

    const { data: userInfo, error: userInfoError, isLoading: isUserInfoLoading } = useGetUserQuery();
    // const { data: followersData, isLoading, isError } = useGetUserFollowersQuery();

    const [activeElement, setActiveElement] = useState<string | null>(null);

    const toggleAccordion = (section: string) => {
        setActiveElement((prevSection) => (prevSection === section ? null : section));
    };

    return (
        <div className='bg-white rounded lg:p-2'>
            <p className='p-2 text-sm font-semibold lg:text-base'>Password and Security</p>
            <hr className="h-px mx-2 bg-gray-200 border-0 dark:bg-gray-700" />

            
            <div className='space-y-1 p-2 lg:space-y-2'>

                <div className='w-full'>
                    <p className='text-sm font-medium mb-1'>Password</p>
                    <div className='w-full'>
                        <input 
                            type="password" 
                            value={'sadsadasdasd'}
                            // onChange={(e) => setUserProfileDetails(prev => (
                            //     { ...prev, firstName: e.target.value }
                            // ))}
                            placeholder='Enter your first name'
                            className='w-full p-1.5 border border-gray-300 font-light focus:border-black focus:outline-none rounded text-sm'
                        />
                    </div>
                </div>

                <div className='w-full'>
                    <p className='text-sm font-medium mb-1'>Email</p>
                    <div className='w-full'>
                        <input 
                            type="email" 
                            value={userInfo?.email}
                            placeholder='Enter your email'
                            className='w-full p-1.5 border border-gray-300 font-light focus:border-black focus:outline-none rounded text-sm'
                            readOnly 
                        />
                    </div>
                </div>

                <div className='w-full flex justify-center'>
                    <button 
                        // onClick={handleSaveDetails}
                        // disabled={isSaveDisabled}
                        // className={`w-full p-2 ${isSaveDisabled ? 'bg-gray-300 cursor-not-allowed' : 'bg-blue-500'} text-white rounded`}
                        className='w-full p-1.5 bg-gray-200 font-semibold hover:bg-gray-300'
                    >
                        Update
                    </button>
                </div>

                <hr className="h-px bg-gray-200 border-0 dark:bg-gray-700" />
            </div>
        </div>
    );
}