import React from 'react';
import ProfileListOfFollowers from './ProfileListOfFollowers';
import { MdiPen } from './custom-icons';

export default function ProfileHeader() {
    return (
        <div className='w-full mx-auto flex flex-col bg-white rounded'>
            {/* Background Photo */}
            <div className='w-full h-[260px] overflow-hidden relative lg:h-[360px] xl:h-[463px] lg:w-full rounded'>
                <img 
                    src='https://0nepiece.netlify.app/static/media/strawhatpirates.eccf099b1766a064828c.jpg'
                    alt="Background"
                    className='w-full h-full object-cover rounded'
                />
            </div>

            {/* Profile Image and Details */}
            <div className='relative flex flex-col items-center -mt-16 pb-5 lg:flex-row lg:px-7 lg:items-end lg:-mt-8 lg:justify-between lg:pb-6 xl:px-12 xl:pb-7'>
                <div className='flex flex-col items-center lg:flex-row lg:items-end lg:space-x-3'>
                    {/* Profile Image */}
                    <div className='w-[128px] h-[128px] rounded-full overflow-hidden border-4 border-white lg:w-[168px] lg:h-[168px]'>
                        <img 
                            src='https://fastly.picsum.photos/id/582/256/256.jpg?hmac=peqwFP3WuZEwg549dK3PuPyou-m-mCW6Hmd3d3bzlrA' 
                            alt="Profile"
                            className='w-full h-full object-cover'
                        />
                    </div>

                    {/* Name and Other Details */}
                    <div className='mt-1 text-center flex flex-col mb-1.5 lg:items-start lg:m-0 lg:mb-[2px]'>
                        <p className='text-xl font-semibold lg:text-2xl'>Marco D. Phoenix</p>
                        <p className='text-sm text-gray-600 lg:text-base'>2.1k followers</p>
                        <ProfileListOfFollowers/>
                    </div>
                </div>

                <div className='flex'>
                    <button 
                        className='bg-gray-200 flex items-center space-x-1.5 py-2 px-4 rounded cursor-pointer hover:bg-gray-300 lg:mb-[7px]'
                    >
                        <span className='text-[18px]'>
                            <MdiPen/>
                        </span>
                        <span className='text-sm font-medium'>Edit Profile</span>
                    </button>
                </div>
            </div>
        </div>
    );
}
