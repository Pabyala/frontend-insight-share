import React, { useState } from 'react'
import { EmojioneSchool, FluentColorHome16, FluentColorLocationRipple16, FluentColorPeople48, MaterialIconThemeFolderJobOpen, MdiInternet, StreamlineEmojisBirthdayCake1 } from '../../others/CustomIcons'
import DetailsModal from './DetailsModal';
import ProfileFollowers from './ProfileFollowers';
import { useGetUserQuery } from '../../../features/users/usersApiSlice';
import { UserInfo } from '../../../interface/user';
import BdayFormater from '../../helper/BdayFormater';
import { useGetFollowersQuery } from '../../../features/FollowersFollowing/followersApiSlice';

interface ProfileIntroProps {
    userInfo: UserInfo | undefined;
}

export default function ProfileIntro({ userInfo }: ProfileIntroProps    ) {

    const { data: followersData } = useGetFollowersQuery();
    const [showInputDetails, setShowInputDetails] = useState<boolean>(false)
    const formattedDate = BdayFormater(userInfo?.dateOfBirth);
    const { data: authenticatedUserInfo, error: userInfoError } = useGetUserQuery();
    const authenticatedUserId = authenticatedUserInfo?._id
    const currentUserId = userInfo?._id

    // if (isUserInfoLoading) return <BeatLoadingModal/>;
    if (userInfoError) return <div>Error fetching posts</div>;

    return (
        <div className='w-full flex flex-col space-y-1.5 lg:space-y-2.5'>
            <div className='bg-white rounded p-3'>
                <p className='text-sm font-semibold px-1 md:text-base'>Intro</p>
                <div className='flex flex-col px-1 space-y-2'>
                    {/* bio */}
                    <div className='flex flex-col w-full'>
                        {/* {showInputBio} */}
                        <span className='text-sm font-semibold   w-full text-center'>My bio</span>
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
                                        <FluentColorHome16/>
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
                                        <FluentColorLocationRipple16/>
                                    </span>
                                </div>
                                <div className='flex'>
                                    <p className='text-sm'>From <span className='font-semibold'>{userInfo?.locFrom}</span></p>
                                </div>
                            </div>
                        )}
                        {userInfo?.isFollowedShow && followersData?.totalFollowers !== 0 && (
                            <div className='flex items-center space-x-3 py-2'>
                                <div className='flex'>
                                    <span className='text-[25px]'>
                                        <FluentColorPeople48/>
                                    </span>
                                </div>
                                <div className='flex'>
                                <p className='text-sm'>Followed by
                                    <span className='font-semibold text-sm'> {followersData?.totalFollowers} </span>people
                                </p>
                                </div>
                            </div>
                        )}

                        {userInfo?.studyAt && (
                            <div className='flex items-center space-x-3 py-2'>
                                <div className='flex'>
                                    <span className='text-[25px]'>
                                        <EmojioneSchool/>
                                    </span>
                                </div>
                                <div className='flex'>
                                    <p className='text-sm'>Study at <span className='font-semibold'>{userInfo?.studyAt}</span></p>
                                </div>
                            </div>
                        )}
                        
                        {userInfo?.workAt  && userInfo?.workAt.companyName && userInfo?.workAt.position && (
                            <div className='flex items-center space-x-3 py-2'>
                                <div className='flex'>
                                    <span className='text-[25px]'>
                                        <MaterialIconThemeFolderJobOpen/>
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
                                        <StreamlineEmojisBirthdayCake1 />
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
