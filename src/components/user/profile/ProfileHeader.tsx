import React, { useState } from 'react';
import ProfileListOfFollowers from './ProfileListOfFollowers';
import { AntDesignSettingFilledWhite, GridiconsCamera, MdiPen } from '../../others/CustomIcons';
import { useGetUserQuery } from '../../../features/users/usersApiSlice';
import DefaultImg from '../../../asset/DefaultImg.jpg'
import DefaultBg from '../../../asset/DefaultBg.png'
import { FollowerData, Followers, UserInfo } from '../../../interface/user';
import ProfileUpdateModal from './ProfileUpdateModal';
import { Link } from 'react-router-dom';
import { useGetFollowersQuery } from '../../../features/FollowersFollowing/followersApiSlice';

interface ProfileHeaderProps {
    userInfo: UserInfo | undefined;
}

export default function ProfileHeader({ userInfo }: ProfileHeaderProps) {

    const [showUpdateProfileModal, setShowUpdateProfileModal] = useState<boolean>(false);
    const { data: authenticatedUserInfo, error: userInfoError, isLoading: isUserInfoLoading } = useGetUserQuery();
    // const { data: followersData, isLoading, isError } = useGetUserFollowersQuery();
    const { data: getFollowers } = useGetFollowersQuery()
    // const { data: getFollowing } = useGetFollowingQuery()
    const authenticatedUserId = authenticatedUserInfo?._id
    const currentUserId = userInfo?._id

    return (
        <div className='w-full mx-auto flex flex-col bg-white rounded'>
            {/* Background Photo */}
            <div className='w-full h-[260px] overflow-hidden relative lg:h-[360px] xl:h-[463px] lg:w-full rounded'>
                {/* <div className='w-full'> */}
                    <img 
                        // src='https://0nepiece.netlify.app/static/media/strawhatpirates.eccf099b1766a064828c.jpg'
                        src={userInfo?.coverPhotoUrl === '' ? DefaultBg : userInfo?.coverPhotoUrl}
                        alt="Background"
                        className='w-full h-full object-cover rounded'
                    />
                {/* </div> */}
                {/* <button 
                    className='text-sm absolute bottom-[15px] right-[30px] p-1.5 bg-gray-200  rounded flex space-x-2 lg:right-[1.5rem] xl:right-[45px]'
                >
                    <span className='text-[20px]'>
                        <GridiconsCamera/>
                    </span>
                    <span className='hidden text-sm md:block'>Edit your cover photo</span>
                </button> */}
            </div>

            {/* Profile Image and Details */}
            <div className='relative flex flex-col items-center -mt-16 pb-5 lg:flex-row lg:px-7 lg:items-end lg:-mt-8 lg:justify-between lg:pb-6 xl:px-12 xl:pb-7'>
                <div className='flex flex-col items-center lg:flex-row lg:items-end lg:space-x-3'>
                    {/* Profile Image */}
                    <div className='w-[128px] h-[128px] rounded-full border-4 border-white lg:w-[168px] lg:h-[168px] relative bg-zinc-600 overflow-hidden'>
                            <img 
                                // src='https://fastly.picsum.photos/id/582/256/256.jpg?hmac=peqwFP3WuZEwg549dK3PuPyou-m-mCW6Hmd3d3bzlrA' 
                                src={userInfo?.avatarUrl === '' ? DefaultImg : userInfo?.avatarUrl}
                                alt="Profile"
                                className='w-full h-full object-cover'
                            />
                        {/* <button 
                            className='text-sm absolute bottom-[5px] right-[0px] p-1.5 bg-gray-200 rounded-full border-2 border-white lg:right-[5px] lg:bottom-[10px]'
                        >
                            <span className='text-[18px] lg:text-[22px]'>
                                <GridiconsCamera/>
                            </span>
                        </button> */}
                    </div>

                    {/* Name and Other Details */}
                    <div className='mt-1 text-center flex flex-col mb-1.5 lg:items-start lg:m-0 lg:mb-[2px]'>
                        <p className='text-xl font-semibold lg:text-2xl'>
                            <span>{userInfo?.firstName} </span> 
                            <span>{userInfo?.middleName} </span> 
                            <span> {userInfo?.lastName}</span>
                        </p>
                        <p className='text-sm text-black lg:text-base italic'>@{userInfo?.username}</p>
                        <p className='text-sm text-gray-600 lg:text-base'>
                            {/* {followersData?.totalFollowers ?? 0} {followersData?.totalFollowers === 1 ? 'follower' : 'followers'} */}

                        </p>
                        {/* <p className='text-sm text-gray-600 lg:text-base'>{followersData?.totalFollowers ?? 0} {followersData?.totalFollowers === 1 ? 'follower' : 'followers'}</p> */}
                        <ProfileListOfFollowers
                            currentUserId={currentUserId}
                        />
                    </div>
                </div>

                {authenticatedUserId === currentUserId ? (
                    <>
                        <div className='flex space-x-2'>
                            <button 
                                onClick={() => setShowUpdateProfileModal(true)}
                                className='bg-gray-200 flex items-center space-x-1.5 py-2 px-4 rounded cursor-pointer hover:bg-gray-300 lg:mb-[7px]'
                            >
                                <span className='text-[18px]'>
                                    <MdiPen/>
                                </span>
                                <span className='text-sm font-medium'>Edit Profile</span>
                            </button>
                            <Link 
                                to={'/settings'}
                                className='bg-blue-600 flex items-center space-x-1.5 py-2 px-4 rounded cursor-pointer hover:bg-blue-700 lg:mb-[7px]'
                            >
                                <span className='text-[18px]'>
                                    <AntDesignSettingFilledWhite/>
                                </span>
                            </Link>
                        </div>
                        {showUpdateProfileModal && (
                            <ProfileUpdateModal
                                onClose={() => setShowUpdateProfileModal(false)}
                            />
                        )}
                    </>
                ) : (
                    <div className='flex space-x-2'>
                        <button
                            className='bg-gray-200 flex items-center space-x-1.5 py-2 px-4 rounded cursor-pointer hover:bg-gray-300 lg:mb-[7px]'
                        >
                            <span className='text-[18px]'>
                                <MdiPen/>
                            </span>
                            <span className='text-sm font-medium'>Follow</span>
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}