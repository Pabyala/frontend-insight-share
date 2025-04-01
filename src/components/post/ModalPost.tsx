import { useEffect, useState } from 'react'
import { useGetPostByIdQuery } from '../../features/posts/postsApiSlice';
import { Avatar, IconButton, Tooltip } from '@mui/material';
import MoreVertIcon from "@mui/icons-material/MoreVert";
import TimeAgoPost from './TimeAgoPost';
import ReactCommentShare from './ReactCommentShare';
import Reactions from './Reactions';
import SelectOneReaction from './SelectOneReaction';
import PostOptions from './PostOptions';
import CommentsAndReplies from './CommentsAndReplies';
import { useGetUserQuery } from '../../features/users/usersApiSlice';
import BeatLoading from '../loading/BeatLoading';
import ErrorComponent from '../alert/ErrorComponent';

interface PostModalInterface {
    onClose: () => void;
    selectedPost: string | null;
    isSavedPost: boolean;
}

export default function ModalPost({ onClose, selectedPost, isSavedPost }: PostModalInterface) {

    const { data: post, error: errorPost, isLoading: isLoadingPost, refetch: refreshPost } = useGetPostByIdQuery(selectedPost!, {
        skip: !selectedPost,
    });
    const { data: userInfo, error: userInfoError, isLoading: isUserInfoLoading } = useGetUserQuery();
    const userId = userInfo?._id
    const [selectedPostId, setSelectedPostId] = useState<string | null>(null);


    useEffect(() => {
        if (selectedPost) {
            refreshPost();
        }
    }, [selectedPost, refreshPost]);

    useEffect(() => {
        document.body.style.overflow = 'hidden';
        return () => {
            document.body.style.overflow = '';
        };
    }, []);

    const handleOption = (postId: string) => {
        // setOpenOption(true)
        setSelectedPostId(postId)
    }

    if (isLoadingPost || isUserInfoLoading) return <BeatLoading/>;
    if (errorPost || userInfoError) return <ErrorComponent/>;
    if (!post) return <div>No posts available</div>;

    return (
        <div
            className="fixed inset-0 z-50 bg-black bg-opacity-30 backdrop-blur-sm flex items-center justify-center w-full h-full overflow-y-auto"
            style={{
                marginTop: '0px'
            }}
        >
            <div className="relative p-4 w-full max-w-2xl max-h-full ">
                <div className="relative bg-white rounded-lg shadow">
                    {/* header: name of post and close btn */}
                    <div className="flex items-center justify-between px-3 py-2.5 md:p-5 border-b rounded-t">
                        <h4 className="text-base font-semibold text-center text-black">
                            {post?.authorId.firstName} {post?.authorId.middleName} {post?.authorId.lastName}'s Post
                        </h4>
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

                    <div className="px-3 py-2 md:p-5">
                        {/* user avatar and name */}
                        <div className="mb-1">
                            <div className="flex justify-between ">
                                <div className="flex items-center space-x-3">
                                    <Avatar
                                        sx={{ width: 38, height: 38 }}
                                        alt={post?.authorId.username}
                                        src={post?.authorId.avatarUrl}
                                    />
                                    <div className="flex flex-col">
                                        <span className="text-sm font-semibold text-black">
                                            {post?.authorId.firstName} {post?.authorId.middleName} {post?.authorId.lastName}
                                        </span>
                                        <span className="text-xs text-slate-600">
                                            <TimeAgoPost 
                                                timeStamp={post?.createdAt}
                                            />
                                        </span>
                                    </div>
                                </div>
                                <Tooltip title="Show more">
                                    <IconButton
                                        onClick={() => handleOption(post._id)}
                                    >
                                        <MoreVertIcon />
                                    </IconButton>
                                </Tooltip>
                                {selectedPostId === post._id && (
                                    <PostOptions
                                        post={post}
                                        userId={userId} 
                                        isSavedPost={isSavedPost}
                                        setSelectedPostId={setSelectedPostId}
                                    />
                                )}
                            </div>
                        </div>

                        {/* Post content */}
                        <div className="">
                            <div className="flex">
                                <div className="my-2">
                                <span className="text-sm">
                                    {post?.captionPost.split('\n').map((line, index) => (
                                        <span key={index} className='text-base'>
                                            {line}
                                            {index < post?.captionPost.split('\n').length - 1 && <br />}
                                        </span>
                                    ))}
                                </span>
                                </div>
                            </div>
                        </div>

                        {/* numbers of react, comment, and share */}
                        <ReactCommentShare 
                            post={post}
                        />
                        <hr className="h-px my-1 bg-gray-200 border-0" />
                        {/* react, comment, share */}
                        <div className='pt-1'>
                            <div  className='w-full flex justify-between'>
                                <div 
                                    className='w-1/3 flex items-center justify-center space-x-1 relative group rounded-full hover:bg-slate-200 cursor-pointer'
                                >
                                    <div className='space-x-2 block h-[26px]'>
                                        <Reactions
                                            post={post}
                                        />
                                    </div>
                                    <div 
                                        className={`absolute bottom-full  mb-2 opacity-0 scale-0 group-hover:opacity-100 group-hover:scale-100 transition-transform duration-300 ease-in-out origin-center flex items-center space-x-1`}
                                    >
                                        <SelectOneReaction 
                                            postId={post._id}
                                        />
                                    </div>
                                </div>
                                <div className='w-1/3 flex items-center justify-center'>
                                    <div 
                                        data-dropdown-toggle="mega-menu-dropdown"
                                        className='w-full flex items-center justify-center space-x-1 cursor-pointer relative group p-1.5 rounded-full hover:bg-slate-200'
                                    >
                                        <span className='text-sm font-medium text-slate-500'>
                                            Comment
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <hr className="h-px my-1 bg-gray-200 border-0" />
                        <div className='py-1.5'>
                            <CommentsAndReplies
                                userId={userId}
                                selectedPost={selectedPost}
                                postId={post._id}
                                post={post}
                                refetch={refreshPost}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
