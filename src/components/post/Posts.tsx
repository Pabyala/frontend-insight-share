import { useEffect, useState } from 'react'
import { Post } from '../../interface/your-posts';
import PostTextArea from './PostTextarea';
import ModalPost from './ModalPost';
import 'react-toastify/dist/ReactToastify.css';
import SinglePost from './SinglePost';
import socketSetup from '../../socket-io/socket-setup';
import ErrorComponent from '../alert/ErrorComponent';

interface PostsProps {
    posts: Post[]; 
    // isLoading: boolean;
    error: any;
    // savedPostIds: string[];
    // userId: string | undefined;
    refetch: () => Promise<any>;
}

export default function Posts({ posts, error, refetch }: PostsProps) {

    const [openPostModal, setOpenPostModal] = useState<boolean>(false); 
    const [openPostTextArea, setOpenPostTextArea] = useState<boolean>(false);
    const [isSavedPost, setIsSavedPost] = useState<boolean>(false)
    const [selectedPost, setSelectedPost] = useState<string | null>(null);

    useEffect(() => {
        socketSetup.on('deletedPost', ()=> {
            refetch()
        })
    }, [refetch])

    if (!posts || posts.length === 0) return <div className='text-sm bg-white p-3'>No posts available</div>;

    const handleClosePostModal = () => {
        setSelectedPost(null)
        setOpenPostModal(false)
        // refetch()
    };

    return (
        <div className='flex flex-col pb-3 space-y-2 lg:space-y-3'>
            {error ? (
                <div className='px-2'>
                    <ErrorComponent/>
                </div>
            ) : (posts && posts?.map((post) => (
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
            )))}
                { openPostModal && 
                    (<ModalPost
                        selectedPost={selectedPost} 
                        onClose={handleClosePostModal} 
                        isSavedPost={isSavedPost}
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
