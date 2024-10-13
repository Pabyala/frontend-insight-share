import React from 'react'
import { FluentPeopleTeam48Filled, MdiInternet, MingcuteLocation2Fill, TablerHomeFilled } from './custom-icons'
import { Link } from 'react-router-dom'
import { followerRequest } from '../data/dummy-data';

export default function ProfileIntro() {

    const setFollowers = followerRequest.slice(0, 9);

    return (
        <div className='w-full flex flex-col space-y-1.5 lg:space-y-2.5'>
            <div className='bg-white rounded p-3'>
                <p className='text-base font-semibold px-1'>Intro</p>
                <div className='flex flex-col px-1 space-y-2'>
                    {/* bio */}
                    <div className='flex flex-col items-center w-full'>
                        <span className='text-sm text-center py-3'>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor.</span>
                        <button
                            className='w-full p-2 bg-gray-200 rounded text-sm font-medium hover:bg-gray-300'
                        >Edit Bio</button>
                    </div>

                    {/* details */}
                    <div className='flex flex-col'>
                        <div className='flex items-center space-x-3 py-2'>
                            <div className='flex'>
                                <span className='text-[25px]'>
                                    <TablerHomeFilled/>
                                </span>
                            </div>
                            <div className='flex'>
                                <p className='text-sm'>Lives in <span className='font-semibold'>Marikina City</span></p>
                            </div>
                        </div>

                        <div className='flex items-center space-x-3 py-2'>
                            <div className='flex'>
                                <span className='text-[25px]'>
                                    <MingcuteLocation2Fill/>
                                </span>
                            </div>
                            <div className='flex'>
                                <p className='text-sm'>From <span className='font-semibold'>Odiongan, Romblon</span></p>
                            </div>
                        </div>

                        <div className='flex items-center space-x-3 py-2'>
                            <div className='flex'>
                                <span className='text-[25px]'>
                                    <FluentPeopleTeam48Filled/>
                                </span>
                            </div>
                            <div className='flex'>
                                <p className='text-sm'>Followed by <span className='font-semibold'>206 people</span></p>
                            </div>
                        </div>

                        <div className='flex items-center space-x-3 py-2'>
                            <div className='flex'>
                                <span className='text-[25px]'>
                                    <MdiInternet/>
                                </span>
                            </div>
                            <div className='flex'>
                                <a 
                                    href="https://github.com/Pabyala"
                                    className='text-sm text-[#0866FF]'
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >https://github.com/Pabyala</a>
                            </div>
                        </div>

                        <div className='flex items-center space-x-3 py-2'>
                            <div className='flex'>
                                <span className='text-[25px]'>
                                    <MdiInternet/>
                                </span>
                            </div>
                            <div className='flex'>
                                <a 
                                    href="http://marfportfolio.netlify.app/"
                                    className='text-sm text-[#0866FF]'
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >http://marfportfolio.netlify.app</a>
                            </div>
                        </div>

                        <button
                            className='w-full p-2 bg-gray-200 rounded text-sm font-medium hover:bg-gray-300'
                        >Edit Details</button>
                    </div>
                </div>
            </div>

            <div className='bg-white rounded p-3 space-y-2'>
                <div className='px-1 flex justify-between'>
                    <p className='text-base font-semibold'>Followers</p>
                    <p className='text-base'>
                        <Link to='/' className='text-sm text-[#0866FF]'>See all followers</Link>
                    </p>
                </div>

                <div className="grid grid-cols-3 gap-4 md:grid-cols-4 md:gap-6 lg:gap-3 lg:grid-cols-3">
                    {setFollowers.map((fol) => (
                        <div className="cursor-pointer">
                            <div className='w-full h-[112px] rounded mb-1 md:h-[140px] lg:h-[100px] xl:h-[130px]'>
                                <img 
                                    src={fol.avatarUrl}
                                    alt={fol.username}
                                    className='w-full h-full object-cover rounded'
                                />
                            </div>
                            <p className='text-xs font-medium md:text-sm'>{fol.firstName} {fol.middleName} {fol.lastName}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}
