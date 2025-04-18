import { useEffect, useState } from 'react'
import { Avatar } from '@mui/material';
import DefaultImg from '../../asset/DefaultImg.jpg'
import { useGetPostByIdQuery, useUpdatePostMutation } from '../../features/posts/postsApiSlice';
import { showToast } from '../utils/ToastUtils';
import BeatLoadingModal from '../loading/BeatLoadingModal';

interface UpdatePostPropsInterface {
    onClose: () => void;
    // selectedPostData: Post | undefined;
    selectedPostId: string | null;
    setSelectedPostId: (postId: string) => void;
}

export default function UpdatePostModal({ onClose, selectedPostId, setSelectedPostId }: UpdatePostPropsInterface) {

    const { data: post, error: errorPost, isLoading: isLoadingPost, refetch: refreshPost } = useGetPostByIdQuery(selectedPostId!, {
        skip: !selectedPostId, // skip the query if postId is falsy (undefined/null).
    }); 
    const [updatePost] = useUpdatePostMutation();
    const myCaptionPost = post?.captionPost;
    const [caption, setCaption] = useState<string | undefined>(myCaptionPost);
    const [isBtnDisable, setIsBtnDisable] = useState<boolean>(true);

    useEffect(() => {
        if (post?.captionPost !== undefined) {
            setCaption(post.captionPost);
        }
    }, [post?.captionPost]);

    useEffect(() => {
        setIsBtnDisable(!caption || setCaption.length === 0);
    }, [caption]);

    useEffect(() => {
        document.body.style.overflow = 'hidden';
        return () => {
            document.body.style.overflow = '';
        };
    }, []);

    const handleUpdatePost = async () => {
        try {
            await updatePost({ postId: post?._id, updatedPost: { captionPost: caption } }).unwrap();
            onClose();
            setSelectedPostId('')
            refreshPost();
        } catch (error) {
            showToast('An error occurred. Please reload the page and try again.', 'error')
        }
    }

    const handleCloseModal = () => {
        onClose();
        setSelectedPostId('')
    }

    if (isLoadingPost) return <BeatLoadingModal/>;
    if (errorPost) return <div>Error loading posts</div>;
    if (!post) return <div>No posts available</div>;

    return (
        <div className='fixed inset-0 z-50 flex items-center justify-center w-full h-full overflow-y-auto bg-black bg-opacity-50' >
            <div className='relative p-4 w-full max-w-2xl max-h-full'>
                <div className='relative bg-white rounded-lg shadow p-5 space-y-3 lg:p-6'>
                    <div className='flex justify-between'>
                        <div className='flex items-center'>
                            <p className='text-base font-semibold text-center'>Update your post</p>
                        </div>
                        <div className='flex justify-end items-center'>
                            <button
                                type="button"
                                className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center"
                                onClick={handleCloseModal}
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
                    <div className="flex space-x-4 mb-3">
                            <Avatar
                                sx={{ width: 40, height: 40 }}
                                alt={post?.authorId.username}
                                src={post?.authorId.avatarUrl === '' ? DefaultImg : post?.authorId.avatarUrl}
                            />
                            <div className='flex items-center font-semibold  '>
                                <p className='text-sm'>
                                    <span>{post?.authorId.firstName} </span>
                                    <span>{post?.authorId.middleName} </span>
                                    <span>{post?.authorId.lastName}</span>
                                </p>
                            </div>
                        </div>
                        <div className='space-y-2'>
                            <textarea 
                                name="" 
                                id=""
                                onChange={(e) => setCaption(e.target.value)}
                                className="w-full text-base p-2 rounded-md border outline-none resize-none max-h-32 overflow-y-auto h-[150px] bg-gray-200"
                                placeholder={`What's on your mind, ${post?.authorId.firstName}?`}
                                value={caption}
                            />
                            <button 
                                onClick={handleUpdatePost}
                                disabled={isBtnDisable}
                                className={`bg-blue-500 w-full p-2.5 text-sm font-medium rounded text-white  ${isBtnDisable ? 'cursor-not-allowed' : 'hover:bg-blue-600'}`}
                            >
                                Update
                            </button>
                        </div>
                </div>
            </div>
        </div>
    )
}