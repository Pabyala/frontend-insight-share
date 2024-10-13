import React from 'react'
import Navbar from '../components/Navbar'
import ProfileHeader from '../components/ProfileHeader'
import ProfileUserPost from '../components/ProfileUserPost'
import ProfileIntro from '../components/ProfileIntro'
import Posts from '../components/Posts'

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
