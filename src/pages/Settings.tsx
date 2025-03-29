import React, { useState } from 'react';
import Navbar from '../components/navbar/Navbar';
import ProfileHeader from '../components/user/profile/ProfileHeader';
import SettingsPasswordAndSecurity from '../components/user/settings/SettingsPasswordAndSecurity';
import SettingsPersonalDetails from '../components/user/settings/SettingsPersonalDetails';
import SettingsProfileDetails from '../components/user/settings/SettingsProfileDetails';
import { useGetUserQuery } from '../features/users/usersApiSlice';

export default function Settings() {

    const { data: userInfo, error: userInfoError, isLoading: isUserInfoLoading } = useGetUserQuery();
    const [openTab, setOpenTab] = useState<number>(1);

    if (isUserInfoLoading) return <div className='text-sm'>Loading...</div>;
    if (userInfoError) return <div className='text-sm'>Error fetching posts</div>;

    return (
        <div className='flex flex-col pb-5'>
            <Navbar />
            <div className='container mx-auto flex flex-col justify-between pt-[63px] lg:pt-[65px] xl:pt-[68px] relative overflow-hidden space-y-1.5 lg:space-y-3'>
                <ProfileHeader 
                    userInfo={userInfo}
                />
                <div className='space-y-1.5 lg:space-y-3 lg:flex-row lg:justify-between'>
                    <p className='text-sm font-medium pt-1.5 md:text-base lg:text-lg'>Account Setting</p>
                    <hr className="h-px bg-gray-200 border-0 dark:bg-gray-700" />
                    <div className='flex flex-col space-y-2 w-full justify-between lg:flex-row lg:space-y-0'>
                        <div className='w-full h-fit bg-white rounded p-2 lg:w-[35%] lg:p-3'>
                            <ul
                                className="w-full flex space-x-1 md:justify-start md:space-x-3 lg:flex-col lg:space-x-0 lg:space-y-2"
                                role="tablist"
                            >
                                <li className=''>
                                    <a 
                                        className={`text-sm rounded p-1.5 block ${openTab === 1 ? 'bg-gray-200 font-medium' : 'bg-gray-100'} hover:bg-gray-200 lg:text-base`}
                                        onClick={e => {
                                            e.preventDefault();
                                            setOpenTab(1);
                                        }}
                                        data-toggle="tab"
                                        href="#link1"
                                        role="tablist"
                                    >
                                        Profile Details
                                        
                                    </a>
                                </li>

                                <li className=''>
                                    <a 
                                        className={`text-sm rounded p-1.5 block ${openTab === 2 ? 'bg-gray-200 font-medium' : 'bg-gray-100'} hover:bg-gray-200 lg:text-base`}
                                        onClick={e => {
                                            e.preventDefault();
                                            setOpenTab(2);
                                        }}
                                        data-toggle="tab"
                                        href="#link2"
                                        role="tablist"
                                    >
                                        Password & Security
                                    </a>
                                </li>
                                <li className=''>
                                    <a 
                                        className={`text-sm rounded p-1.5 block ${openTab === 3 ? 'bg-gray-200 font-medium' : 'bg-gray-100'} hover:bg-gray-200 lg:text-base`}
                                        onClick={e => {
                                            e.preventDefault();
                                            setOpenTab(3);
                                        }}
                                        data-toggle="tab"
                                        href="#link3"
                                        role="tablist"
                                    >
                                        Personal Details
                                        
                                    </a>
                                </li>
                                
                            </ul>
                        </div>
                        <div className='w-full lg:w-[63%]'>
                            <div className={openTab === 1 ? "block" : "hidden"} id="link1">
                                <SettingsProfileDetails />
                            </div>
                            <div className={openTab === 2 ? "block" : "hidden"} id="link2">
                                <SettingsPasswordAndSecurity />
                            </div>
                            <div className={openTab === 3 ? "block" : "hidden"} id="link3">
                                <SettingsPersonalDetails />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
