import React, { useEffect } from 'react'
import { useGetSuggestedForYouQuery, useGetUserQuery } from '../../features/users/usersApiSlice';
import { Avatar } from '@mui/material';
import { UserSearch } from '../../interface/user';
import { MingcuteUserFollow2Fill } from '../others/CustomIcons';
import { Link } from 'react-router-dom';
import BeatLoadingModal from '../loading/BeatLoadingModal';

interface SuggestedForYouProps {
    setShowSuggestedForYou: (value: boolean) => void;
}

export default function SuggestedForYou({ setShowSuggestedForYou }: SuggestedForYouProps) {

    const { data: userInfo } = useGetUserQuery();
    const { data: getSuggestedForYou, error: getSuggestedForYouError, isLoading: isGetSuggestedForYouLoading } = useGetSuggestedForYouQuery(userInfo?._id ?? "", {
        skip: !userInfo || !userInfo._id, // Ensure userInfo exists and has an _id
    });

    useEffect(() => {
        // prevent scrolling when the modal is open
        document.body.style.overflow = 'hidden';
        return () => {
          // restore body scroll behavior when modal is closed
            document.body.style.overflow = '';
        };
    }, []);

    if (isGetSuggestedForYouLoading) return <BeatLoadingModal/>;
    if (getSuggestedForYouError) return <p className='text-sm'>Error loading. Please reload the page.</p>;

    return (
        <div className='fixed inset-0 z-50 flex items-center justify-center w-full h-full bg-black bg-opacity-50'>
            <div className='relative bg-white rounded-lg shadow dark:bg-gray-700 p-5 space-y-3 lg:p-6 max-h-[90vh] md:max-h-[80vh] lg:max-h-[70vh] overflow-y-auto w-full max-w-xs md:max-w-md lg:max-w-lg'>
                {/* Header Section */}
                <div className='flex justify-between items-center'>
                    <p className='text-base font-semibold text-center'>Suggested for you</p>
                    <button
                        type="button"
                        className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                        onClick={() => setShowSuggestedForYou(false)}
                    >
                        <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                        </svg>
                    </button>
                </div>
                <hr className="h-px bg-gray-200 border-0 dark:bg-gray-700" />

                {/* Suggested Users List */}
                <div className='flex flex-col space-y-2'>
                    {getSuggestedForYou?.map((user: UserSearch) => (
                        <div key={user._id} className="block px-1.5 cursor-pointer rounded py-1.5 text-xs text-gray-800 hover:bg-gray-300 lg:text-sm">
                            <Link to={`/profile/${user.username}/${user._id}`} className="flex justify-between space-x-2">
                                <div className="profileandName flex items-center space-x-4">
                                    <div className="flex">
                                        <Avatar sx={{ width: 38, height: 38 }} alt={user.username} src={user.avatarUrl} />
                                    </div>
                                    <div className='flex flex-col'>
                                        <span className="font-bold text-sm">{user.firstName} {user.middleName} {user.lastName}</span>
                                        <span className="text-sm">{user.username}</span>
                                    </div>
                                </div>
                                <div className="flex justify-between space-x-2">
                                    <span className="text-3xl cursor-pointer">
                                        <MingcuteUserFollow2Fill />
                                    </span>
                                </div>
                            </Link>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}