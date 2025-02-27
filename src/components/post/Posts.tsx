import { useEffect, useState } from 'react'
import { Post } from '../../interface/your-posts';
import PostTextArea from './PostTextarea';
import ModalPost from './ModalPost';
import 'react-toastify/dist/ReactToastify.css';
import { io } from 'socket.io-client';
import SinglePost from './SinglePost';
// import { io } from 'socket.io-client';

// const socket = io('/', {
//     reconnection: true
// })
const socket = io('http://localhost:8000', { reconnection: true });

interface PostsProps {
    posts: Post[]; 
    isLoading: boolean;
    error: any;
    // savedPostIds: string[];
    userId: string | undefined;
    refetch: () => Promise<any>;
}

export default function Posts({ posts, isLoading, error, refetch }: PostsProps) {

    // const { data: userInfo, error: userInfoError, isLoading: isUserInfoLoading } = useGetUserQuery();
    // const userId = userInfo?._id
    const [openPostModal, setOpenPostModal] = useState<boolean>(false); 
    const [openPostTextArea, setOpenPostTextArea] = useState<boolean>(false);
    const [isSavedPost, setIsSavedPost] = useState<boolean>(false)
    const [selectedPost, setSelectedPost] = useState<string | null>(null);
    //const [savedPostStatus, setSavedPostStatus] = useState<{ [key: string]: boolean }>({});

    console.log("POSTS", posts)

    useEffect(() => {
        console.log('SOCKET IO', socket)
        socket.on('addReactPost', (newReact: string)=> {
            console.log(newReact)
            refetch();
        })

        socket.on('addCommentToPost', (newReact: string)=> {
            console.log(newReact)
            refetch();
        })
    }, [])

    // const { data: savedPosts } = useGetSavedPostQuery()
    // const mySavedPosts = savedPosts ? savedPosts.savedPosts : [];
    
    // const [allSavedPostId, setAllSavedPostId] = useState<string[]>([]);

    // useEffect(() => {
    //     if (!Array.isArray(mySavedPosts) || mySavedPosts.length === 0) return;
    //     const allPostIds = mySavedPosts.map(post => post._id);
    //     setAllSavedPostId(allPostIds);
    // }, [mySavedPosts]); 


    // check if the post already saved
    // useEffect(() => {
    //     const postStatus = posts.reduce((acc, post) => {
    //         acc[post._id] = allSavedPostId.includes(post._id);
    //         return acc;
    //     }, {} as { [key: string]: boolean });

    //     setSavedPostStatus(postStatus);
    // }, [posts, allSavedPostId]);
    
    // to check if the post is already saved
    // const handleOption = (postId: string) => {
    //     if(!postId) return
    //     setSelectedPostId((prevId) => (prevId === postId ? null : postId));
    //     if(allSavedPostId.includes(postId)){
    //         setIsSavedPost(true)
    //     } else {
    //         setIsSavedPost(false)
    //     }
    // }

    // to close the modal
    // useEffect(() => {
    //     const handleClickOutside = (event: MouseEvent) => { 
    //         if ( selectedPostId &&
    //             !document.getElementById(`options-${selectedPostId}`)?.contains(event.target as Node)) {
    //             setSelectedPostId(null);
    //             setIsSavedPost(false)
    //         }
    //     };
    //     document.addEventListener('mousedown', handleClickOutside);
    //     return () => {
    //         document.removeEventListener('mousedown', handleClickOutside);
    //     };
    // }, [selectedPostId]);

    if (isLoading) return <div className='text-sm'>Loading posts...</div>;
    if (error) return <div className='text-sm'>Error loading posts</div>;
    if (!posts || posts.length === 0) return <div className='text-sm bg-white p-3'>No posts available</div>;



    const handleClosePostModal = () => {
        setSelectedPost(null)
        setOpenPostModal(false)
        refetch()
        // setSelectedPostData(undefined);
    };

    return (
        <div className='flex flex-col pb-3 space-y-2 lg:space-y-3'>
            {posts && posts?.map((post) => (
                <div key={post._id}>
                    <SinglePost
                        openPostModal={openPostModal}
                        setOpenPostModal={setOpenPostModal}
                        openPostTextArea={openPostTextArea}
                        setOpenPostTextArea={setOpenPostTextArea}
                        isSavedPost={isSavedPost}
                        setIsSavedPost={setIsSavedPost}
                        selectedPost={selectedPost}
                        setSelectedPost={setSelectedPost}
                        post={post}
                    />
                </div>
            ))}
                {/* <SinglePost
                    openPostModal={openPostModal}
                    setOpenPostModal={setOpenPostModal}
                    openPostTextAre={openPostTextAre}
                    setOpenPostTextArea={setOpenPostTextArea}
                    isSavedPost={isSavedPost}
                    setIsSavedPost={setIsSavedPost}
                    selectedPost={selectedPost}
                    setSelectedPost={setSelectedPost}
                    post={posts}
                /> */}

                { openPostModal && 
                    // (<PostModal 
                    //     selectedPost={selectedPost} 
                    //     // onClose={() => setOpenPostModal(false)} 
                    //     onClose={handleClosePostModal} 
                    //     selectedPostData={selectedPostData}
                    // />
                    (<ModalPost
                        selectedPost={selectedPost} 
                        onClose={handleClosePostModal} 
                        // onClose={() => setOpenPostModal(false)} 
                        // userId={userId}
                        // selectedPostData={selectedPostData}

                        // post={post}
                        // userId={userId} 
                        // isSavedPost={isSavedPost}
                        // setSelectedPostId={setSelectedPostId}
                        // isSavedPost={isSavedPost}
                        // setSelectedPostId={setSelectedPostId}
                        // selectedPostId={selectedPostId}

                        // userId={userId} 
                        isSavedPost={isSavedPost}
                        // setSelectedPostId={setSelectedPostId}
                        // selectedPostId={selectedPostId}
                    />
                )}

                {openPostTextArea && 
                    (<PostTextArea 
                        onClose={() => setOpenPostTextArea(!openPostTextArea)}
                    />
                )}
        </div>
    )
}
