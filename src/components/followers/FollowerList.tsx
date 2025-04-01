import { useEffect, useState } from 'react'
import { useFollowUserMutation, useGetFollowersQuery, useGetFollowingQuery, useUnfollowUserMutation } from '../../features/FollowersFollowing/followersApiSlice'
import DefaultImg from '../../asset/DefaultImg.jpg';
import { FluentColorOptions28 } from '../others/CustomIcons';
import BeatLoading from '../loading/BeatLoading';
import { useGetUserQuery } from '../../features/users/usersApiSlice';
import socketSetup from '../../socket-io/socket-setup';
import { showLoadingToast, showToast } from '../utils/ToastUtils';
import { toast } from 'react-toastify';

export default function FollowerList() {

    const { data: userInfo } = useGetUserQuery();
    const { data: getFollowers, error: errorGetFollowers, isLoading: isLoadingGetFollowers } = useGetFollowersQuery()
    const { data: getFollowing, error: errorGtFollowing, isLoading: isLoadingGtFollowing } = useGetFollowingQuery()
    const [followUser, { isLoading: isLoadingFollowUser }] = useFollowUserMutation();
    const [unfollowUser, { isLoading: isLoadingUnfollowUser }] = useUnfollowUserMutation();
    // const [followUser] = useFollowUserMutation();

    const currentUserId = userInfo?._id
    const myFollowers = getFollowers?.allFollowers
    const [showModal, setShowModal] = useState<boolean>(false);
    const [showAllFollowers, setShowAllFollowers] = useState<boolean>(false);

    useEffect(() => {
        if (isLoadingFollowUser || isLoadingUnfollowUser ) {
            const loadingToast = showLoadingToast("Processing request...");
    
            return () => toast.dismiss(loadingToast); 
        }
    }, [isLoadingFollowUser, isLoadingUnfollowUser]);

    // const handleFollowedUser = async (userIdToFollow: string) => {
    //     if(!userIdToFollow) return
    //     try {
    //         await followUser(userIdToFollow).unwrap();
    //     } catch (error) {
    //         showToast("Something went wrong. Please try again.", "error")
    //     }
    // }  

    const handleShowModal = (type: string) => {
        if(!type) return
        if(type === 'Follower'){
            setShowModal(!showModal)
            setShowAllFollowers(false)
        } else {
            setShowModal(!showModal)
            setShowAllFollowers(true)
        }
    }

    const handleFollowingUser = async (followStatus: string) => {
        if(!currentUserId || !followStatus) return
        try {
            if(followStatus === 'Follow back' || 'Follow') {
                await followUser(currentUserId).unwrap();
                socketSetup.emit('newFollower', 'follow');
            } else if (followStatus === 'Unfollow') {
                await unfollowUser(currentUserId).unwrap();
                socketSetup.emit('newFollower', 'unfollow');
            };
        } catch (error) {
            showToast('An error occurred. Please reload the page and try again.')
        }
    }

    if (isLoadingGetFollowers || isLoadingGtFollowing) return <BeatLoading/>;
    if (errorGetFollowers || errorGtFollowing) return <p className='text-sm'>Failed to load followers. Please reload the page.</p>;

    return (
        <div className='flex flex-col pb-3 space-y-2 lg:space-y-3 w-full'>
            <div className='w-full'>
                <div className='bg-lightWhite p-3 rounded relative space-y-2'>
                    <div className='flex justify-between items-center h-[25px]'>
                        <p className="text-sm font-medium lg:text-base">{showAllFollowers ? "User you don't follow back" : 'Followers'}</p>
                        <div className='cursor-pointer' onClick={() => setShowModal(!showModal)}>
                            <span className='text-[25px]'><FluentColorOptions28/></span>
                        </div>
                    </div>
                    {showModal && (
                        <div className='absolute right-[40px] z-10 w-fit p-1.5 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none'>
                            <div className='cursor-pointer text-xs p-1 rounded hover:bg-gray-200' onClick={() => handleShowModal('Follower')}>Followers</div>
                            <div className='cursor-pointer text-xs p-1 rounded hover:bg-gray-200' onClick={() => handleShowModal('DontFollowBack')}>User you don't follow back</div>
                        </div>
                    )}
                    <div className="grid grid-cols-3 gap-4 md:grid-cols-4 md:gap-6 lg:gap-4 lg:grid-cols-3 xl:grid-cols-4">
                        {myFollowers?.map((fol) => {
                            const isFollowers = myFollowers?.some((following) => following._id === fol._id);
                            const isFollowing = getFollowing?.youFollowed?.some((following) => following.following._id === fol._id);

                            const followStatus = isFollowing ? "Unfollow" : isFollowers ? "Follow back" : "Follow";
                            
                            
                            return (
                                <div key={fol._id} className="cursor-pointer bg-white rounded-md overflow-hidden drop-shadow-md border">
                                    <div className='w-full h-[100px] mb-1 md:h-[130px] lg:h-[130px] xl:h-[140px] overflow-hidden'>
                                        <img 
                                            src={fol?.avatarUrl || DefaultImg}
                                            alt={fol.username}
                                            className='w-full h-full object-cover'
                                        />
                                    </div>
                                    <div className='w-full flex flex-col space-y-1 px-1 pb-1 md:px-1.5 md:pb-1.5 lg:px-2 lg:pb-2'>
                                        <p className='text-xs font-medium overflow-hidden whitespace-nowrap text-ellipsis max-w-xs md:text-sm'>{fol.firstName} {fol?.middleName} {fol.lastName}</p>
                                        <button 
                                            onClick={() => handleFollowingUser(followStatus)}
                                            className='p-1 bg-blue-500 text-xs font-normal text-white rounded md:text-sm hover:bg-blue-600'
                                        >
                                            {followStatus}
                                        </button>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </div>
        </div>
    )
}