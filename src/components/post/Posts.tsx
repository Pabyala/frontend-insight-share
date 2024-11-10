import { Avatar, IconButton, Tooltip } from '@mui/material'
import { useEffect, useState } from 'react'
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { FlatColorIconsFolder, FluentCommentEdit16Filled, MdiPenColored, MingcuteDelete2Fill, NotoOrangeHeart, PhFolderFill, TwemojiFire } from '../others/CustomIcons';
import PostModal from './PostModal';
import SelectOneReaction from './SelectOneReaction';
import { Post } from '../../interface/your-posts';
import PostTextArea from './PostTextarea';
import UpdatePostModal from './UpdatePostModal';
import { useDeletePostMutation, useGetSavedPostQuery, useReactPostMutation, useSavedPostMutation, useUnsavedPostMutation } from '../../features/posts/postsApiSlice';
import TimeAgoPost from './TimeAgoPost';
import { useFollowUserMutation } from '../../features/FollowersFollowing/followersApiSlice';
import { Link } from 'react-router-dom';
import ReactCommentShare from './ReactCommentShare';
import Reactions from './Reactions';
import PostOptions from './PostOptions';

interface PostsProps {
    posts: Post[]; 
    isLoading: boolean;
    error: any;
    // savedPostIds: string[];
    userId: string | undefined;
}

export default function Posts({ posts, isLoading, error, userId }: PostsProps) {

    const [deletePost] = useDeletePostMutation();
    const [savedPost] = useSavedPostMutation();
    const [unsavedPost] = useUnsavedPostMutation();
    const [followUser] = useFollowUserMutation();

    const [openPostModal, setOpenPostModal] = useState<boolean>(false);
    const [openPostTextAre, setOpenPostTextArea] = useState<boolean>(false);
    const [openUpdateModal, setOpenUpdateModal] = useState<boolean>(false);
    const [selectedPost, setSelectedPost] = useState<string>('');
    const [selectedPostId, setSelectedPostId] = useState<string | null>(null);
    const [selectedPostData, setSelectedPostData] = useState<Post>()
    const [isSavedPost, setIsSavedPost] = useState<boolean>(false)
    const [savedPostStatus, setSavedPostStatus] = useState<{ [key: string]: boolean }>({});

    const { data: savedPosts } = useGetSavedPostQuery()
    const mySavedPosts = savedPosts ? savedPosts.savedPosts : [];
    
    const [allSavedPostId, setAllSavedPostId] = useState<string[]>([]);

    useEffect(() => {
        if (!Array.isArray(mySavedPosts) || mySavedPosts.length === 0) return;
        const allPostIds = mySavedPosts.map(post => post._id);
        setAllSavedPostId(allPostIds);
    }, [mySavedPosts]); 


    // check if the post already saved
    useEffect(() => {
        const postStatus = posts.reduce((acc, post) => {
            acc[post._id] = allSavedPostId.includes(post._id);
            return acc;
        }, {} as { [key: string]: boolean });

        setSavedPostStatus(postStatus);
    }, [posts, allSavedPostId]);
    
    // to check if the post is already saved
    const handleOption = (postId: string) => {
        setSelectedPostId((prevId) => (prevId === postId ? null : postId));
        if(allSavedPostId.includes(postId)){
            console.log("Yes")
            setIsSavedPost(true)
        } else {
            setIsSavedPost(false)
            console.log("No")
        }
        
    }

    // to close the modal
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => { 
            if ( selectedPostId &&
                !document.getElementById(`options-${selectedPostId}`)?.contains(event.target as Node)) {
                setSelectedPostId(null);
                setIsSavedPost(false)
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [selectedPostId]);

    if (isLoading) return <div>Loading posts...</div>;
    if (error) return <div>Error loading posts</div>;
    if (!posts || posts.length === 0) return <div>No posts available</div>;

    // handle for modal of post
    const handlePostModal = (postId: string) => {
        setSelectedPost(postId)
        setOpenPostModal(!openPostModal)
    }

    // handle to show the modal for update of post
    const handleShowModalUpdate = (post: Post) => {
        setSelectedPostData(post)
        setOpenUpdateModal(true)
        setSelectedPostId(null);
    }

    // handle to delete the post
    const handleDeletePost = async (postId: string) => {
        if(!postId) return
        try {
            await deletePost(postId).unwrap();
            setSelectedPostId(null);
        } catch (error) {
            console.log(error)
        }
    }

    // handle to save the post
    const handleSavePost = async (postId: string) => {
        if(!postId) return
        try {
            await savedPost(postId).unwrap();
            setSelectedPostId(null);
        } catch (error) {
            console.log(error)
        }
    }

    // handle to unsaved the post
    const handleUnsavedPost = async (postId: string) => {
        if(!postId) return
        try {
            await unsavedPost(postId).unwrap();
            setSelectedPostId(null);
        } catch (error) {
            console.log(error)
        }
    }

    const handleFollowedUser = async (userIdToFollow: string) => {
        // console.log("Author id: ", userIdToFollow)
        // if(!userIdToFollow) return
        // try {
        //     await followUser(userIdToFollow).unwrap();
        // } catch (error) {
        //     console.log(error)
        // }
    }   

    return (
        <div className='flex flex-col pb-3 space-y-2 lg:space-y-3'>
                {posts?.map(post => (
                    <div key={post._id} className='w-full relative'>
                        <div className='bg-lightWhite p-3 rounded'>
                            {/* Profile and more option */}
                            <div className='mb-1'>
                                <div className="flex justify-between">
                                    <div className='flex items-center space-x-3'>
                                        <Link to={'/'}>
                                            <Avatar
                                                sx={{ width: 38, height: 38 }}
                                                alt="Remy Sharp"
                                                src={post?.authorId?.avatarUrl}
                                            />
                                        </Link>
                                        <div className='flex flex-col'>
                                            <div className='flex space-x-2'>
                                                <Link to={'/'} className='text-sm font-semibold text-black'>{post?.authorId?.firstName} {post?.authorId?.middleName} {post?.authorId?.lastName}</Link>
                                            </div>
                                            <p className='text-xs text-slate-600'>
                                                <TimeAgoPost timeStamp={post.createdAt}/>
                                            </p>
                                        </div>
                                    </div>
                                    <div id={`options-${post._id}`} >
                                        <Tooltip title="Options">
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
                                                setSelectedPostData={setSelectedPostData}
                                                setOpenUpdateModal={setOpenUpdateModal}
                                            />
                                        )}
                                        {/* {selectedPostId === post._id && (
                                            <div className='absolute top-[30px] right-[55px] z-[2]'>
                                                <div className='bg-white drop-shadow-lg p-2 flex flex-col items-start border-[1px] rounded'>
                                                    {userId === post.authorId._id && (
                                                        <>
                                                            <div 
                                                                onClick={() => handleShowModalUpdate(post)}
                                                                className='text-sm hover:bg-gray-100 p-1.5 w-full rounded-sm cursor-pointer flex space-x-3 items-center'
                                                            >
                                                                <span className='text-[20px]'><MdiPenColored/></span>
                                                                <span>Update post</span>
                                                            </div>
                                                            <div 
                                                                onClick={() => handleDeletePost(post._id)}
                                                                className='text-sm hover:bg-gray-100 p-1.5 w-full rounded-sm cursor-pointer flex space-x-3 items-center'
                                                            >

                                                                <span className='text-[20px]'><MingcuteDelete2Fill/></span>
                                                                <span>Delete post</span>
                                                            </div>
                                                        </>
                                                    )}
                                                    {isSavedPost ? (
                                                        <div 
                                                            onClick={() => handleUnsavedPost(post._id)}
                                                            className='text-sm hover:bg-gray-100 p-1.5 w-full rounded-sm cursor-pointer flex space-x-3 items-center'
                                                        >
                                                            <span className='text-[20px]'><FlatColorIconsFolder/></span>
                                                            <span>Unsave post</span>
                                                        </div>
                                                    ) : (
                                                        <div 
                                                            onClick={() => handleSavePost(post._id)}
                                                            className='text-sm hover:bg-gray-100 p-1.5 w-full rounded-sm cursor-pointer flex space-x-3 items-center'
                                                        >
                                                            <span className='text-[20px]'><FlatColorIconsFolder/></span>
                                                            <span>Save post</span>
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        )} */}
                                    </div>
                                </div>
                            </div>
                            {/* Post content */}
                            <div className=''>
                                <div className="flex">
                                    <div className="my-2">
                                        {post.captionPost.split('\n').map((line, index) => (
                                            <span key={index}>
                                                {line}
                                                {index < post.captionPost.split('\n').length - 1 && <br />}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </div>
                            <ReactCommentShare 
                                post={post}
                            />
                            <hr className="h-px mt-1 mb-1 bg-gray-200 border-0 dark:bg-gray-700" />
                            {/* react, comment */}
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
                                            onClick={() => handlePostModal(post._id)}
                                        >
                                            <span className='text-sm font-medium text-slate-500'>
                                                Comment
                                            </span>
                                        </div>
                                    </div>
                                    {/* { openPostModal && 
                                        <PostModal 
                                            selectedPost={selectedPost} 
                                            onClose={() => handlePostModal('')} 
                                    />} */}
                                    {/* check if the post is already save */}
                                    {/* <div className='w-1/3 flex items-center justify-center space-x-1 cursor-pointer p-1.5 rounded-full hover:bg-slate-200'>
                                        {savedPostStatus[post._id] ? (
                                            <span className='text-[25px]'>
                                                <FlatColorIconsFolder />
                                            </span>
                                        ) : (
                                            <span className='text-[25px]'>
                                                <PhFolderFill />
                                            </span>
                                        )}
                                    </div> */}
                                </div>
                            </div>
                        </div>
                    </div>
                ))}

                { openPostModal && 
                    (<PostModal 
                        selectedPost={selectedPost} 
                        onClose={() => handlePostModal('')} 
                    />
                )}

                {openPostTextAre && 
                    (<PostTextArea 
                        onClose={() => setOpenPostTextArea(!openPostTextAre)}
                    />
                )}

                {openUpdateModal &&  (
                    <UpdatePostModal
                        onClose={() => setOpenUpdateModal(false)}
                        selectedPostData={selectedPostData}
                    />
                )}
        </div>
    )
}
