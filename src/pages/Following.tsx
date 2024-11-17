import React from 'react'
import Navbar from '../components/navbar/Navbar'
import ProfileHeader from '../components/user/profile/ProfileHeader'
import MenuListLeftBar from '../components/leftbar/MenuListLeftBar'
import FollowingList from '../components/followers/FollowingList'
import { useGetUserQuery } from '../features/users/usersApiSlice'

export default function Following() {
    const { data: userInfo, error: userInfoError, isLoading: isUserInfoLoading } = useGetUserQuery();
    return (
        <div className='flex flex-col pb-5'>
            <Navbar />
            <div className='container mx-auto flex flex-col justify-between pt-[63px] lg:pt-[65px] xl:pt-[68px] relative overflow-hidden space-y-1.5 lg:space-y-3'>
                <ProfileHeader
                    userInfo={userInfo}
                />
                <div className='flex flex-col space-y-1.5 lg:space-y-0 lg:flex-row lg:justify-between'>
                    <div className='lg:w-[42%]'>
                        <MenuListLeftBar/>
                    </div>
                    <div className='lg:w-[56%]'>
                        <FollowingList/>
                    </div>
                </div>
            </div>
        </div>
    )
}