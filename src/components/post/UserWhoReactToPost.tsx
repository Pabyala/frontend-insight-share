import React, { useState } from 'react'
import { useGetAllUserWhoReactToPostQuery } from '../../features/posts/postsApiSlice';
import { Avatar } from '@mui/material';
import { AntDesignDislikeFilled, NotoOrangeHeart, TwemojiFire, TwemojiRaisingHands } from '../others/CustomIcons';

type ReactionKeys = 'all' | 'like' | 'fire' | 'handsUp' | 'disLike' | 'heart';

interface UserReactions {
    postId: string;
}

export default function UserWhoReactToPost({ postId }: UserReactions) {

    const [typeOfReaction, setTypeOfReaction] = useState<ReactionKeys>('all');
    const { data: allReaction, error: errorAllReaction, isLoading: isLoadingAllReaction } = useGetAllUserWhoReactToPostQuery({ postId });

    const handleSelectTypeOfReaction = (reactionType: ReactionKeys) => {
        setTypeOfReaction(reactionType);
    };

    const users = allReaction ? allReaction.reactions[typeOfReaction] || [] : [];
    console.log(users)
    

    if (isLoadingAllReaction) return <div>Loading posts...</div>;
    if (errorAllReaction) return <div>Error loading posts</div>;

    return (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-30 backdrop-blur-sm flex items-center justify-center w-full h-full overflow-y-auto">
            <div className="relative p-4 w-full max-w-[450px] max-h-full">
                <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                    {/* <p>Hello world</p> */}
                    <div className='p-4 space-y-2'>
                        <div className='flex items-center space-x-2'>
                            <p className='flex items-center' onClick={() => handleSelectTypeOfReaction('all')}>
                                All
                            </p>
                            { allReaction?.reactions.fire?.length !== 0 && (
                                <p className='flex items-center' onClick={() => handleSelectTypeOfReaction('fire')}>
                                    <TwemojiFire /> 
                                    <span className='ml-[5px]'>
                                        {allReaction?.reactions.fire?.length}
                                    </span>
                                </p>
                            )}

                            { allReaction?.reactions.handsUp?.length !== 0 && (
                                <p className='flex items-center' onClick={() => handleSelectTypeOfReaction('handsUp')}>
                                    <TwemojiRaisingHands />
                                    <span className='ml-[5px]'>
                                        {allReaction?.reactions.handsUp?.length}
                                    </span>
                                </p>
                            )}

                            { allReaction?.reactions.disLike?.length !== 0 && (
                                <p className='flex items-center' onClick={() => handleSelectTypeOfReaction('disLike')}>
                                    <AntDesignDislikeFilled />
                                    <span className='ml-[5px]'>
                                        {allReaction?.reactions.disLike?.length}
                                    </span>
                                </p>
                            )}

                            { allReaction?.reactions.heart?.length !== 0 && (
                                <p className='flex items-center'  onClick={() => handleSelectTypeOfReaction('heart')}>
                                    <NotoOrangeHeart />
                                    <span className='ml-[5px]'>
                                        {allReaction?.reactions.heart?.length}
                                    </span>
                                </p>
                            )}
                        </div>
                        <div className='flex flex-col space-y-2'>
                            {users.map(user => (
                                <div key={user._id} className='flex items-center justify-between'>
                                    <div className='flex items-center space-x-2'>
                                        <Avatar
                                            sx={{ width: 38, height: 38 }}
                                            // alt={comment.from.username}
                                            // src={'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'}
                                            src={user.avatarUrl}
                                        />
                                        <p className='text-sm font-semibold'>
                                            {user.firstName} {user.lastName}
                                        </p>
                                    </div>
                                    <div className='items-center'>
                                        <span className='text-[25px]'>
                                            <NotoOrangeHeart />
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