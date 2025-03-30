import { useEffect, useState } from 'react'
import { useGetAllUserWhoReactToPostQuery } from '../../features/posts/postsApiSlice';
import { Avatar } from '@mui/material';
import { AntDesignDislikeFilled, NotoOrangeHeart, TwemojiFire, TwemojiRaisingHands } from '../others/CustomIcons';
import BeatLoadingModal from '../loading/BeatLoadingModal';
import ErrorAlert from '../alert/ErrorAlert';

type ReactionKeys = 'all' | 'like' | 'fire' | 'handsUp' | 'disLike' | 'heart';

interface UserReactions {
    postId: string;
    onClose: () => void;
}

export default function UserWhoReactToPost({ postId, onClose }: UserReactions) {

    const [typeOfReaction, setTypeOfReaction] = useState<ReactionKeys>('all');
    const { data: allReaction, error: errorAllReaction, isLoading: isLoadingAllReaction } = useGetAllUserWhoReactToPostQuery({ postId });

    useEffect(() => {
        document.body.style.overflow = 'hidden';
        return () => {
            document.body.style.overflow = '';
        };
    }, []);

    const handleSelectTypeOfReaction = (reactionType: ReactionKeys) => {
        setTypeOfReaction(reactionType);
    };

    const users = allReaction ? allReaction.reactions[typeOfReaction] || [] : [];
    
    if (isLoadingAllReaction) return <BeatLoadingModal/>;
    if (errorAllReaction) return <ErrorAlert message='Error reactions.' onClose={onClose} />;

    return (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-30 backdrop-blur-sm flex items-center justify-center w-full h-full overflow-y-auto">
            <div className="relative p-4 w-full max-w-[450px] max-h-full">
                <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                    <div className='p-4 space-y-2'>
                        <div className='flex justify-between pl-1'>
                            <div className='flex items-center space-x-2'>
                                <p className='flex items-center cursor-pointer' onClick={() => handleSelectTypeOfReaction('all')}>
                                    All
                                </p>
                                { allReaction?.reactions.fire?.length !== 0 && (
                                    <p 
                                        className='flex items-center cursor-pointer' 
                                        onClick={() => handleSelectTypeOfReaction('fire')}
                                    >
                                        <TwemojiFire /> 
                                        <span className='ml-[5px]'>
                                            {allReaction?.reactions.fire?.length}
                                        </span>
                                    </p>
                                )}

                                { allReaction?.reactions.handsUp?.length !== 0 && (
                                    <p 
                                        className='flex items-center cursor-pointer' 
                                        onClick={() => handleSelectTypeOfReaction('handsUp')}
                                    >
                                        <TwemojiRaisingHands />
                                        <span className='ml-[5px]'>
                                            {allReaction?.reactions.handsUp?.length}
                                        </span>
                                    </p>
                                )}

                                { allReaction?.reactions.disLike?.length !== 0 && (
                                    <p 
                                        className='flex items-center cursor-pointer' 
                                        onClick={() => handleSelectTypeOfReaction('disLike')}
                                    >
                                        <AntDesignDislikeFilled />
                                        <span className='ml-[5px]'>
                                            {allReaction?.reactions.disLike?.length}
                                        </span>
                                    </p>
                                )}

                                { allReaction?.reactions.heart?.length !== 0 && (
                                    <p 
                                        className='flex items-center cursor-pointer' 
                                        onClick={() => handleSelectTypeOfReaction('heart')}
                                    >
                                        <NotoOrangeHeart />
                                        <span className='ml-[5px]'>
                                            {allReaction?.reactions.heart?.length}
                                        </span>
                                    </p>
                                )}
                            </div>

                            <div>
                                <button
                                    type="button"
                                    className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-6 h-6 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                                    onClick={onClose}
                                >
                                    <svg
                                        className="w-2.5 h-2.5"
                                        aria-hidden="true"
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 14 14"
                                    >
                                        <path
                                        stroke="currentColor"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                                        />
                                    </svg>
                                </button>
                            </div>
                        </div>
                        <hr className="h-px bg-gray-200 border-0 dark:bg-gray-700" />
                        <div className='flex flex-col space-y-2'>
                            {users.map(user => (
                                <div key={user._id} className='flex items-center justify-between'>
                                    <div className='flex items-center space-x-2'>
                                        <Avatar
                                            sx={{ width: 38, height: 38 }}
                                            alt={user.username}
                                            src={user.avatarUrl}
                                        />
                                        <p className='text-sm font-semibold'>
                                            {user.firstName} {user.lastName}
                                        </p>
                                    </div>
                                    <div className='items-center'>
                                        <span className='text-[25px]'>
                                            {user.reactionType === 'fire' && <TwemojiFire />}
                                            {user.reactionType === 'handsUp' && <TwemojiRaisingHands />}
                                            {user.reactionType === 'disLike' && <AntDesignDislikeFilled />}
                                            {user.reactionType === 'heart' && <NotoOrangeHeart />}
                                        </span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}