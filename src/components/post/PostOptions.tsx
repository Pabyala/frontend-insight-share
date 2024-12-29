import React, { useState } from 'react'
import { Post } from '../../interface/your-posts';
import { useDeletePostMutation, useSavedPostMutation, useUnsavedPostMutation } from '../../features/posts/postsApiSlice';
import { FlatColorIconsFolder, MdiPenColored, MingcuteDelete2Fill } from '../others/CustomIcons';
import UpdatePostModal from './UpdatePostModal';

interface PropsPostOptions {
    post: Post;
    userId: string | undefined;
    isSavedPost: boolean;
    // setSelectedPostId: React.Dispatch<React.SetStateAction<string | null>>;
    // setSelectedPostData: React.Dispatch<React.SetStateAction<Post | undefined>>;
    // setOpenUpdateModal: React.Dispatch<React.SetStateAction<boolean>>;
    // postId: string;
    setSelectedPostId: (postId: string) => void;
}

export default function PostOptions({post, userId, isSavedPost, setSelectedPostId}: PropsPostOptions) {

    const [deletePost] = useDeletePostMutation();
    const [savedPost] = useSavedPostMutation();
    const [unsavedPost] = useUnsavedPostMutation();
    const [openUpdatePostModal, setOpenUpdatePostModal] = useState<boolean>(false)
    console.log("IS SAVEDPOST", isSavedPost)

     // handle to show the modal for update of post
    const handleShowModalUpdate = (postId: string) => {
        setSelectedPostId(postId)
        setOpenUpdatePostModal(!openUpdatePostModal)
    }

    // handle to delete the post
    const handleDeletePost = async (postId: string) => {
        if(!postId) return
        try {
            await deletePost(postId).unwrap();
            setSelectedPostId('');
        } catch (error) {
            console.log(error)
        }
    }

    // handle to save the post
    const handleSavePost = async (postId: string) => {
        if(!postId) return
        try {
            await savedPost(postId).unwrap();
            setSelectedPostId('');
        } catch (error) {
            console.log(error)
        }
    }

    // handle to unsaved the post
    const handleUnsavedPost = async (postId: string) => {
        if(!postId) return
        try {
            await unsavedPost(postId).unwrap();
            setSelectedPostId('');
        } catch (error) {
            console.log(error)
        }
    }

    return (
        // <div>PostOptions</div>
    <>
        <div className='absolute top-[30px] right-[55px] z-[2]'>
            <div className='bg-white drop-shadow-lg p-2 flex flex-col items-start border-[1px] rounded'>
                {userId === post.authorId._id && (
                    <>
                        <div 
                            onClick={() => handleShowModalUpdate(post._id)}
                            // onClick={() => setOpenUpdateModal(true)}
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
        {openUpdatePostModal &&  (
            <UpdatePostModal
                onClose={() => setOpenUpdatePostModal(false)}
                // selectedPostData={selectedPostData}
                selectedPostId={post._id}
            />
        )}
    </>
    )
}