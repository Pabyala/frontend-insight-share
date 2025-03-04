import { useEffect, useState } from 'react'
import { Post } from '../../interface/your-posts';
import PostTextArea from './PostTextarea';
import ModalPost from './ModalPost';
import 'react-toastify/dist/ReactToastify.css';
import { io } from 'socket.io-client';
import SinglePost from './SinglePost';
import socketSetup from '../../socket-io/socket-setup';

interface PostsProps {
    posts: Post[]; 
    isLoading: boolean;
    error: any;
    // savedPostIds: string[];
    // userId: string | undefined;
    refetch: () => Promise<any>;
}

export default function Posts({ posts, isLoading, error, refetch }: PostsProps) {

    const [openPostModal, setOpenPostModal] = useState<boolean>(false); 
    const [openPostTextArea, setOpenPostTextArea] = useState<boolean>(false);
    const [isSavedPost, setIsSavedPost] = useState<boolean>(false)
    const [selectedPost, setSelectedPost] = useState<string | null>(null);

    useEffect(() => {
        socketSetup.on('deletedPost', (currentPostId: string)=> {
            console.log(currentPostId)
            refetch()
        })
    }, [])

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
                        postId={post._id}
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
