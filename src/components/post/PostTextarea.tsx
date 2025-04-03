import { Avatar } from "@mui/material";
import { useAddPostMutation, useGetPostsForTimelineQuery } from "../../features/posts/postsApiSlice";
import { useEffect, useState } from "react";
import { useGetUserQuery } from "../../features/users/usersApiSlice";
import DefaultImg from '../../asset/DefaultImg.jpg'
import { showErrorToast, showToast } from "../utils/ToastUtils";

interface closePostTextArea {
    onClose: () => void
}

export default function PostTextArea({ onClose }: closePostTextArea) {

    const { data: userInfo } = useGetUserQuery();
    const [addPost] = useAddPostMutation();
    const { data: timelinePosts, error: errorTimelinePosts, isLoading: isLoadingTimelinePosts, refetch: refetchTimelinePosts } = useGetPostsForTimelineQuery();

    const [captionPost, setCaptionPost] = useState<string>('')
    const [isBtnDisable, setIsBtnDisable] = useState<boolean>(false)
    const authorId: string = userInfo?._id || '';

    useEffect(() => {
        document.body.style.overflow = 'hidden';
        return () => {
            document.body.style.overflow = '';
        };
    }, []);

    useEffect(() => {
        setIsBtnDisable(!(captionPost.length > 0 && authorId.length > 0));
    }, [captionPost, authorId]);

    const handleCreatePost = () => {
        if (!userInfo) {
            showErrorToast('User is not authenticated');
            return;
        }

        if (!captionPost || authorId.length === 0) {
            showErrorToast('Required caption and userId');
            return;
        }

        try {
            addPost({ captionPost, authorId }).unwrap();
            refetchTimelinePosts()
            onClose();
            showToast("Your thought has been shared with the world!", "success")
        } catch (error) {
            showErrorToast('Failed to publish post. Please try again.');
        }
    }

    return (
        <div className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex justify-center items-center z-10">
            <div className="relative w-full mx-5 bg-white rounded-lg shadow px-5 flex md:w-[70%] lg:w-[50%] xl:w-[35%]">
                <div className="flex flex-col w-full">
                    <div className="py-5 space-y-3">
                        <div className="flex justify-between items-center">
                            <div className="text-center">
                                <p className="text-base font-bold leading-5 text-slate-900">
                                Create post
                                </p>
                            </div>
                            <div className="flex justify-end items-center">
                                <button
                                    type="button"
                                    className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center"
                                    onClick={onClose}
                                >
                                    <svg
                                        className="w-3 h-3"
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
                        <hr className="h-px bg-gray-200 border-0" />
                        <div className="flex space-x-4">
                            <Avatar
                                sx={{ width: 40, height: 40 }}
                                alt={userInfo?.username}
                                src={userInfo?.avatarUrl === '' ? DefaultImg : userInfo?.avatarUrl}
                            />
                            <div className='flex items-center font-semibold  '>
                                <p className='text-sm'>
                                    <span>{userInfo?.firstName} </span>
                                    <span>{userInfo?.middleName} </span>
                                    <span>{userInfo?.lastName}</span>
                                </p>
                            </div>
                        </div>
                        <div className="h-[150px]">
                            <textarea 
                                name="" 
                                id=""
                                onChange={(e) => setCaptionPost(e.target.value)}
                                className="w-full h-full text-base p-2 rounded-md border outline-none resize-none overflow-y-auto min-h-28 bg-gray-200 "
                                placeholder={`What's on your mind, ${userInfo?.firstName}?`}
                                value={captionPost}
                            />
                        </div>
                        <hr className="h-px bg-gray-200 border-0" />
                        <div className="w-full">
                            <button 
                                onClick={handleCreatePost}
                                disabled={isBtnDisable}
                                className={`bg-blue-500  w-full p-2.5 text-sm font-semibold rounded text-white  ${isBtnDisable ? 'cursor-not-allowed' : 'hover:bg-blue-600'}`}
                            >
                                Post
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
