import React, { useEffect, useState } from 'react'
import { MdiCloseThick } from '../others/CustomIcons'
import { Avatar } from '@mui/material';
import { useGetUserQuery } from '../../features/users/usersApiSlice';
import DefaultImg from '../../asset/DefaultImg.jpg'
import { Post } from '../../interface/your-posts';
import { useUpdatePostMutation } from '../../features/posts/postsApiSlice';

interface PostData {
    postId: string;
    captionPost: string;
}


interface UpdatePostPropsInterface {
    onClose: () => void;
    selectedPostData: Post | undefined;
}

export default function UpdatePostModal({ onClose, selectedPostData }: UpdatePostPropsInterface) {

    const { _id, captionPost, authorId } = selectedPostData || {}
    const [updatePost] = useUpdatePostMutation();
    const [caption, setCaption] = useState<string>(captionPost || '');
    const [isBtnDisable, setIsBtnDisable] = useState<boolean>(true);

    useEffect(() => {
        setIsBtnDisable(setCaption.length === 0);
    }, [caption]);

    const handleUpdatePost = async () => {
        console.log(isBtnDisable)
        console.log("Updated post")
        try {
            await updatePost({ postId: _id, updatedPost: { captionPost: caption } }).unwrap();
            onClose();
        } catch (error) {
            console.error('Failed to update the post:', error);
        }
    }

    return (
        <div className='fixed inset-0 z-50 flex items-center justify-center w-full h-full overflow-y-auto bg-black bg-opacity-50' >
            <div className='relative p-4 w-full max-w-2xl max-h-full'>
                <div className='relative bg-white rounded-lg shadow dark:bg-gray-700 p-5 space-y-3 lg:p-6'>
                    <div className='flex justify-between'>
                        <div className='flex items-center'>
                            <p className='text-base font-semibold text-center'>Update your post</p>
                        </div>
                        <div className='flex justify-end items-center'>
                            <button
                                type="button"
                                className="text-[22px] bg-gray-200 text-gray-500 border-0 hover:border-0 focus:outline-none bg-transparent hover:bg-transparent hover:outline-none hover:text-gray-600 ml-auto inline-flex items-center popup-close"
                                onClick={onClose}
                            >
                                <MdiCloseThick/>
                            </button>
                        </div>
                    </div>
                    <hr className="h-px bg-gray-200 border-0 dark:bg-gray-700" />
                    <div className="flex space-x-4 mb-3">
                            <Avatar
                                sx={{ width: 40, height: 40 }}
                                alt={authorId?.username}
                                src={authorId?.avatarUrl}
                            />
                            <div className='flex items-center font-semibold  '>
                                <p className='text-sm'>
                                    <span>{authorId?.firstName} </span>
                                    <span>{authorId?.middleName} </span>
                                    <span>{authorId?.lastName}</span>
                                </p>
                            </div>
                        </div>
                        <div className='space-y-2'>
                            <textarea 
                                name="" 
                                id=""
                                onChange={(e) => setCaption(e.target.value)}
                                className="w-full text-base p-2 rounded-md bg-gray-50 border outline-none resize-none max-h-32 overflow-y-auto min-h-28"
                                placeholder={`What's on your mind, ${authorId?.firstName}?`}
                                value={caption}
                            />
                            <button 
                                onClick={handleUpdatePost}
                                disabled={isBtnDisable}
                                className={`bg-blue-500 w-full p-2 text-sm font-medium rounded text-white  ${isBtnDisable ? 'cursor-not-allowed' : 'hover:bg-gray-300'}`}
                            >
                                Post
                            </button>
                        </div>
                </div>
            </div>
        </div>
    )
}