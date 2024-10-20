import React from 'react'
import Navbar from '../components/navbar/Navbar'
import ProfileHeader from '../components/user/profile/ProfileHeader'
import ProfileIntro from '../components/user/profile/ProfileIntro'
import Posts from '../components/post/Posts'

export default function Profile() {
    return (
        <div className='flex flex-col'>
            <Navbar/>
            <div className='container mx-auto flex flex-col justify-between pt-[63px] lg:pt-[65px] xl:pt-[68px] relative overflow-hidden space-y-1.5 lg:space-y-3'>
                <ProfileHeader/>
                <div className='flex flex-col space-y-1.5 lg:space-y-0 lg:flex-row lg:justify-between'>
                    <div className='lg:w-[42%]'>
                        <ProfileIntro/>
                    </div>
                    <div className='lg:w-[56%]'>
                        <Posts/>
                    </div>
                </div>
            </div>
        </div>
    )
}
