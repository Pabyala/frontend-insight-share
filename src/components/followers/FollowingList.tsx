import { useGetFollowingQuery, useUnfollowUserMutation } from '../../features/FollowersFollowing/followersApiSlice'
import DefaultImg from '../../asset/DefaultImg.jpg';
import BeatLoading from '../loading/BeatLoading';
import socketSetup from '../../socket-io/socket-setup';
import { showLoadingToast, showToast } from '../utils/ToastUtils';
import { useEffect } from 'react';
import { toast } from 'react-toastify';

export default function FollowingList() {
    const { data: getFollowing, error: errorGtFollowing, isLoading: isLoadingGtFollowing } = useGetFollowingQuery()
    const [unfollowUser, { isLoading: isLoadingUnfollowUser }] = useUnfollowUserMutation();
    const myFollowing = getFollowing?.youFollowed
    const totalFollowing = getFollowing?.totalFollowing

    useEffect(() => {
        if (isLoadingUnfollowUser) {
            const loadingToast = showLoadingToast("Processing request...");
    
            return () => toast.dismiss(loadingToast);
        }
    }, [isLoadingUnfollowUser]);

    const handleUnfollow = async (unfollowUserId: string) => {
        if(!unfollowUserId) return
        try {
            await unfollowUser(unfollowUserId).unwrap();
            socketSetup.emit('newFollower', 'unfollow');
        } catch (error) {
            showToast('An error occurred. Please reload the page and try again.')
        }
    }

    if (isLoadingGtFollowing) return <BeatLoading/>;
    if (errorGtFollowing) return <p className='text-sm'>Failed to load following.</p>;
    if (totalFollowing === 0) return <p className='text-sm bg-white p-3'>No following</p>;
    
    return (
        <div className='flex flex-col pb-3 space-y-2 lg:space-y-3'>
            <div className='w-full'>
                <div className='bg-lightWhite p-3 rounded space-y-2'>
                    <div className='flex items-center h-[25px]'>
                        <p className='text-sm font-medium lg:text-base'>Following</p>
                    </div>
                    <div className="grid grid-cols-3 gap-4 md:grid-cols-4 md:gap-6 lg:gap-4 lg:grid-cols-3 xl:grid-cols-4">
                        {myFollowing?.map((fol) => (
                            <div key={fol._id} className="cursor-pointer bg-white rounded-md overflow-hidden drop-shadow-md border">
                                <div className='w-full h-[100px] mb-1 md:h-[130px] lg:h-[130px] xl:h-[140px] overflow-hidden'>
                                    <img 
                                        src={fol.following?.avatarUrl || DefaultImg}
                                        alt={fol.follower}
                                        className='w-full h-full object-cover'
                                    />
                                </div>
                                <div className='w-full flex flex-col space-y-1 px-1 pb-1 md:px-1.5 md:pb-1.5 lg:px-2 lg:pb-2'>
                                    <p className='text-xs font-medium overflow-hidden whitespace-nowrap text-ellipsis max-w-xs md:text-sm'>{fol.following.firstName} {fol.following?.middleName} {fol.following.lastName}</p>
                                    <button 
                                        onClick={() => handleUnfollow(fol.following._id)}
                                        className='p-1 bg-blue-500 text-xs font-normal text-white rounded md:text-sm hover:bg-blue-600'
                                    >
                                        Unfollow
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}