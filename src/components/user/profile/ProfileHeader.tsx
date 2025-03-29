import { useState } from 'react';
import ProfileListOfFollowers from './ProfileListOfFollowers';
import { AntDesignSettingFilledWhite, MdiPen } from '../../others/CustomIcons';
import { useGetUserQuery } from '../../../features/users/usersApiSlice';
import DefaultImg from '../../../asset/DefaultImg.jpg'
import DefaultBg from '../../../asset/DefaultBg.png'
import { UserInfo } from '../../../interface/user';
import ProfileUpdateModal from './ProfileUpdateModal';
import { Link } from 'react-router-dom';
import { useFollowUserMutation, useGetFollowersQuery, useUnfollowUserMutation } from '../../../features/FollowersFollowing/followersApiSlice';
import socketSetup from '../../../socket-io/socket-setup';
import BeatLoadingModal from '../../loading/BeatLoadingModal';

interface ProfileHeaderProps {
    userInfo: UserInfo | undefined;
}

export default function ProfileHeader({ userInfo }: ProfileHeaderProps) {

    const [showUpdateProfileModal, setShowUpdateProfileModal] = useState<boolean>(false);
    const { data: authenticatedUserInfo, error: userInfoError, isLoading: isUserInfoLoading } = useGetUserQuery();
    const { data: followersData } = useGetFollowersQuery(userInfo?._id);
    const [followUser] = useFollowUserMutation();
    const [unfollowUser] = useUnfollowUserMutation();

    const authenticatedUserId = authenticatedUserInfo?._id
    const currentUserId = userInfo?._id

    const isFollowing = followersData?.allFollowers?.some((follower: any) => follower._id === authenticatedUserId);

    const handleFollowUser = async () => {
        if(!currentUserId) return
        try {
            if (isFollowing) {
                await unfollowUser(currentUserId).unwrap();
                socketSetup.emit('newFollower', 'unfollow');
            } else {
                await followUser(currentUserId).unwrap();
                socketSetup.emit('newFollower', 'follow');
            }
        } catch (error) {
            console.error("Error following user:", error);
            console.log(error)
        }
    }

    // if (isUserInfoLoading) return <BeatLoadingModal/>;
    if (userInfoError) return <div>Error fetching posts</div>;

    return (
        <div className='w-full mx-auto flex flex-col bg-white rounded'>
            {/* Background Photo */}
            <div className='w-full h-[260px] overflow-hidden relative lg:h-[360px] xl:h-[463px] lg:w-full rounded'>
                <img 
                    src={userInfo?.coverPhotoUrl === '' ? DefaultBg : userInfo?.coverPhotoUrl}
                    alt="Background"
                    className='w-full h-full object-cover rounded'
                />
            </div>

            {/* Profile Image and Details */}
            <div className='relative flex flex-col items-center -mt-16 pb-5 lg:flex-row lg:px-7 lg:items-end lg:-mt-8 lg:justify-between lg:pb-6 xl:px-12 xl:pb-7'>
                <div className='flex flex-col items-center lg:flex-row lg:items-end lg:space-x-3'>
                    {/* Profile Image */}
                    <div className='w-[128px] h-[128px] rounded-full border-4 border-white lg:w-[168px] lg:h-[168px] relative bg-zinc-600 overflow-hidden'>
                        <img 
                            src={userInfo?.avatarUrl === '' ? DefaultImg : userInfo?.avatarUrl}
                            alt="Profile"
                            className='w-full h-full object-cover'
                        />
                    </div>

                    {/* Name and Other Details */}
                    <div className='mt-1 text-center flex flex-col mb-1.5 lg:items-start lg:m-0 lg:mb-[2px]'>
                        <p className='text-xl font-semibold lg:text-2xl'>
                            <span>{userInfo?.firstName} </span> 
                            <span>{userInfo?.middleName} </span> 
                            <span> {userInfo?.lastName}</span>
                        </p>
                        <p className='text-sm text-black lg:text-base italic'>@{userInfo?.username}</p>
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
                                <span className='text-sm font-normal'>Edit Profile</span>
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
                            onClick={handleFollowUser}
                            className='bg-gray-200 flex items-center space-x-1.5 py-2 px-4 rounded cursor-pointer hover:bg-gray-300 lg:mb-[7px]'
                        >
                            <span className='text-[18px]'>
                                <MdiPen/>
                            </span>
                            <span className='text-sm font-medium'>{isFollowing ? 'Unfollow' : 'Follow'}</span>
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}