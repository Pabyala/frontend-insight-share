import React, { useEffect, useState } from 'react'
import { FluentPeopleTeam48Filled, IconParkSolidBirthdayCake, MaterialSymbolsSchoolRounded, MaterialSymbolsWorkHistory, MdiInternet, MingcuteLocation2Fill, TablerHomeFilled } from '../../others/CustomIcons'
import { Link } from 'react-router-dom'
import { followerRequest } from '../../../data/dummy-data';
import DetailsModal from './DetailsModal';
import ProfileFollowers from './ProfileFollowers';
import { useGetUserQuery } from '../../../features/users/usersApiSlice';
import { Followers, UserDetails, UserInfo } from '../../../interface/user';
import BdayFormater from '../../helper/BdayFormater';
import { useGetFollowersQuery } from '../../../features/FollowersFollowing/followersApiSlice';

interface ProfileIntroProps {
    userInfo: UserInfo | undefined;
}

export default function ProfileIntro({ userInfo }: ProfileIntroProps    ) {

    const [showInputDetails, setShowInputDetails] = useState<boolean>(false)
    const formattedDate = BdayFormater(userInfo?.dateOfBirth);
    const { data: authenticatedUserInfo, error: userInfoError, isLoading: isUserInfoLoading } = useGetUserQuery();
    const authenticatedUserId = authenticatedUserInfo?._id
    const currentUserId = userInfo?._id


    if (isUserInfoLoading) return <div>Loading...</div>;
    if (userInfoError) return <div>Error fetching posts</div>;

    return (
        <div className='w-full flex flex-col space-y-1.5 lg:space-y-2.5'>
            <div className='bg-white rounded p-3'>
                <p className='text-base font-semibold px-1'>Intro</p>
                <div className='flex flex-col px-1 space-y-2'>
                    {/* bio */}
                    <div className='flex flex-col w-full'>
                        {/* {showInputBio} */}
                        <span className='text-sm font-semibold w-full text-center'>My bio</span>
                        <div className='w-full text-center h-fit flex flex-col'>
                                <span className='text-sm text-center pb-3 pt-1'>{userInfo?.bio}</span>
                        </div>
                    </div>

                    {/* details */}
                    <div className='flex flex-col'>
                        {userInfo?.livesIn && (
                            <div className='flex items-center space-x-3 py-2'>
                                <div className='flex'>
                                    <span className='text-[25px]'>
                                        <TablerHomeFilled/>
                                    </span>
                                </div>
                                <div className='flex'>
                                    <p className='text-sm'>Lives in <span className='font-semibold'>{userInfo?.livesIn}</span></p>
                                </div>
                            </div>
                        )}
                        

                        {userInfo?.locFrom && (
                            <div className='flex items-center space-x-3 py-2'>
                                <div className='flex'>
                                    <span className='text-[25px]'>
                                        <MingcuteLocation2Fill/>
                                    </span>
                                </div>
                                <div className='flex'>
                                    <p className='text-sm'>From <span className='font-semibold'>{userInfo?.locFrom}</span></p>
                                </div>
                            </div>
                        )}
                        {userInfo?.isFollowedShow && (
                            <div className='flex items-center space-x-3 py-2'>
                                <div className='flex'>
                                    <span className='text-[25px]'>
                                        <FluentPeopleTeam48Filled/>
                                    </span>
                                </div>
                                <div className='flex'>
                                    <p className='text-sm'>Followed by 
                                        <span className='font-semibold'>   
                                            {/* {followersData?.totalFollowers}  */}
                                        </span>
                                        {/* {followersData?.totalFollowers !== 1 ? 'people' : 'peoples'} */}
                                    </p>
                                </div>
                            </div>
                        )}
                        

                        {userInfo?.studyAt && (
                            <div className='flex items-center space-x-3 py-2'>
                                <div className='flex'>
                                    <span className='text-[25px]'>
                                        <MaterialSymbolsSchoolRounded/>
                                    </span>
                                </div>
                                <div className='flex'>
                                    <p className='text-sm'>Study at <span className='font-semibold'>{userInfo?.studyAt}</span></p>
                                </div>
                            </div>
                        )}
                        
                        {userInfo?.workAt  && (
                            <div className='flex items-center space-x-3 py-2'>
                                <div className='flex'>
                                    <span className='text-[25px]'>
                                        <MaterialSymbolsWorkHistory/>
                                    </span>
                                </div>
                                <div className='flex'>
                                    <p className='text-sm'>
                                        Work at 
                                        <span className='font-semibold'> {userInfo?.workAt.companyName} </span>
                                        as 
                                        <span className='font-semibold'> {userInfo?.workAt.position}</span>
                                    </p>
                                </div>
                            </div>
                        )}
                        
                        {userInfo?.isDateBirthShow && (
                            <div className='flex items-center space-x-3 py-2'>
                                <div className='flex'>
                                    <span className='text-[25px]'>
                                        <IconParkSolidBirthdayCake />
                                    </span>
                                </div>
                                <div className='flex'>
                                    <p className='text-sm'>
                                        Birthday <span className='font-semibold'>{formattedDate}</span>
                                    </p>
                                </div>
                            </div>
                        )}
                        

                        {userInfo?.socials.length !== 0 && (
                            <div className='flex flex-col'>
                                {userInfo?.socials.map((social) => (
                                    <div key={social.urlId} className='flex items-center space-x-3 py-2'>
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
                                            >{social.url}</a>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                        
                        {authenticatedUserId === currentUserId && (
                            <div className='w-full'>
                                <button
                                    onClick={() => setShowInputDetails(true)}
                                    className='w-full p-2 bg-gray-200 rounded text-sm font-medium hover:bg-gray-300'
                                >Edit Details</button>
                                {showInputDetails && (
                                    <DetailsModal
                                        onClose={() => setShowInputDetails(false)}
                                    />
                                )}
                            </div>
                        )}
                    </div>
                </div>
            </div>

            <ProfileFollowers
                currentUserId={currentUserId}
            />
        </div>
    )
}
