import React from 'react'
import { followerRequest } from '../../../data/dummy-data'

export default function ProfileListOfFollowers() {

    const setFollowers = followerRequest.slice(0, 6);

    return (
        <div className='flex justify-center items-center w-ful p-0.5 lg:p-0'>
            <div className="relative flex items-center min-w-fit h-[45px] w-[189px] lg:left-[-3px]">
                {setFollowers.map((fol, index) => (
                    <div 
                        key={fol.followerUserId}
                        className='absolute bg-white p-0.5 rounded-full'
                        style={{
                            left: index === 0 ? 0 : `${index * 30}px`,
                            zIndex: index === 0 ? 6 :  6 - index
                        }}
                    >
                        <div className='relative inline-flex cursor-pointer'>
                            <div className="cursor-pointer" >
                                <img
                                    src={fol.avatarUrl}
                                    alt={fol.username}
                                    className="relative inline-block h-[33px] w-[33px] !rounded-full object-cover object-center"
                                />
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}
