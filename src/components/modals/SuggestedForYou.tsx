import { useEffect } from 'react'
import { useGetSuggestedForYouQuery, useGetUserQuery } from '../../features/users/usersApiSlice';
import { Avatar } from '@mui/material';
import { UserSearch } from '../../interface/user';
import { FluentPersonArrowBack24Filled } from '../others/CustomIcons';
import { Link } from 'react-router-dom';
import BeatLoadingModal from '../loading/BeatLoadingModal';
import socketSetup from '../../socket-io/socket-setup';
import { showLoadingToast, showToast } from '../utils/ToastUtils';
import { useFollowUserMutation } from '../../features/FollowersFollowing/followersApiSlice';
import { toast } from 'react-toastify';

interface SuggestedForYouProps {
    setShowSuggestedForYou: (value: boolean) => void;
}

export default function SuggestedForYou({ setShowSuggestedForYou }: SuggestedForYouProps) {

    const { data: userInfo } = useGetUserQuery();
    const { data: getSuggestedForYou, error: getSuggestedForYouError, isLoading: isGetSuggestedForYouLoading, refetch: refreshGetSuggestedForYou } = useGetSuggestedForYouQuery(userInfo?._id ?? "", {
        skip: !userInfo || !userInfo._id,
    });
    const [followUser, { isLoading: isLoadingFollowUser}] = useFollowUserMutation();

    useEffect(() => {
        document.body.style.overflow = 'hidden';
        return () => {
            document.body.style.overflow = '';
        };
    }, []);

    useEffect(() => {
        if (isLoadingFollowUser) {
            const loadingToast = showLoadingToast("Processing request...");
    
            return () => toast.dismiss(loadingToast); 
        }
    }, [isLoadingFollowUser]);

    const handleFollow = async (followUserId: string) => {
        if(!followUserId) return
        try {
            await followUser(followUserId).unwrap();
            socketSetup.emit('newFollower', 'follow');
            refreshGetSuggestedForYou();
        } catch(error) {
            showToast('An error occurred. Please reload the page and try again.');
        }
    }

    if (isGetSuggestedForYouLoading) return <BeatLoadingModal/>;

    return (
        <div className='fixed inset-0 z-50 flex items-center justify-center w-full h-full bg-black bg-opacity-50'>
            <div className='relative bg-white rounded-lg shadow p-5 space-y-3 lg:p-6 max-h-[90vh] md:max-h-[80vh] lg:max-h-[70vh] overflow-y-auto w-full max-w-xs md:max-w-md lg:max-w-lg'>
                {/* Header Section */}
                <div className='flex justify-between items-center'>
                    <p className='text-base font-semibold text-center'>Suggested for you</p>
                    <button
                        type="button"
                        className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 flex justify-center items-center"
                        onClick={() => setShowSuggestedForYou(false)}
                    >
                        <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                        </svg>
                    </button>
                </div>
                <hr className="h-px bg-gray-200 border-0" />

                {/* Suggested Users List */}
                <div className='flex flex-col space-y-2'>
                    {getSuggestedForYouError && (<p className='text-sm'>Error loading. Please reload the page.</p>)}
                    {getSuggestedForYou?.map((user: UserSearch) => (
                        <div 
                            key={user._id} 
                            className="block text-xs lg:text-sm"
                        >
                            <div className='flex justify-between space-x-2'>
                                <Link 
                                    to={`/profile/${user.username}/${user._id}`} 
                                    className="w-full flex space-x-2 text-gray-800 hover:bg-gray-300 p-1.5 cursor-pointer rounded"
                                >
                                    <div className="flex items-center space-x-4">
                                        <div className="flex">
                                            <Avatar 
                                                sx={{ width: 38, height: 38 }} 
                                                alt={user.username} 
                                                src={user.avatarUrl}
                                            />
                                        </div>
                                        <div className='flex flex-col'>
                                            <span className="font-bold text-sm">{user.firstName} {user.middleName} {user.lastName}</span>
                                            <span className="text-sm">{user.username}</span>
                                        </div>
                                    </div>
                                    
                                </Link>
                                <div 
                                    className='flex justify-between items-center space-x-2 text-gray-800 hover:bg-gray-300 p-1.5 cursor-pointer rounded'
                                    onClick={() => handleFollow(user._id)}
                                >
                                    <span className="text-3xl cursor-pointer">
                                        <FluentPersonArrowBack24Filled />
                                    </span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}