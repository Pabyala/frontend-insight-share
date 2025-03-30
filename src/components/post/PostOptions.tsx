import { useState } from 'react'
import { Post } from '../../interface/your-posts';
import { useDeletePostMutation, useSavedPostMutation, useUnsavedPostMutation } from '../../features/posts/postsApiSlice';
import { FlatColorIconsFolder, MdiPenColored, MingcuteDelete2Fill } from '../others/CustomIcons';
import UpdatePostModal from './UpdatePostModal';
import ConfirmAlert from '../alert/ConfirmAlert';
import socketSetup from '../../socket-io/socket-setup';
import { showToast } from '../utils/ToastUtils';

interface PropsPostOptions {
    post: Post;
    userId: string | undefined;
    isSavedPost: boolean;
    // setSelectedPostId: React.Dispatch<React.SetStateAction<string | null>>;
    // setSelectedPostData: React.Dispatch<React.SetStateAction<Post | undefined>>;
    // setOpenUpdateModal: React.Dispatch<React.SetStateAction<boolean>>;
    // postId: string;
    setSelectedPostId: (postId: string) => void;
    // setSelectedPostId = React.Dispatch<React.SetStateAction<string | null>>;
}

export default function PostOptions({post, userId, isSavedPost, setSelectedPostId}: PropsPostOptions) {

    const [deletePost] = useDeletePostMutation();
    const [savedPost] = useSavedPostMutation();
    const [unsavedPost] = useUnsavedPostMutation();
    const [openDeleteModal, setOpenDeleteModal] = useState<boolean>(false)
    const [openUpdatePostModal, setOpenUpdatePostModal] = useState<boolean>(false)
    const [currentPostId, setCurrentPostId] = useState<string>('')

     // handle to show the modal for update of post
    const handleShowModalUpdate = (postId: string) => {
        setOpenUpdatePostModal(!openUpdatePostModal)
        setSelectedPostId(postId)
    }

    const handleConfirmDeletePost = async () => {
        try {
            await deletePost(currentPostId).unwrap();
            setSelectedPostId('');
            socketSetup.emit('deletedPost', currentPostId);
            showToast('Deleted successfully', 'success')
        } catch (error) {
            alert(error)
        }
        setCurrentPostId('')
    }

    // handle to delete the post
    const handleDeletePost = (postId: string) => {
        if(!postId) return
        setOpenDeleteModal(true)
        setCurrentPostId(postId)
    }

    // handle to save the post
    const handleSavePost = async (postId: string) => {
        setSelectedPostId('')
        if(!postId) return
        try {
            await savedPost(postId).unwrap();
            setSelectedPostId('');
            showToast('Post saved successfully', 'success')
        } catch (error) {
            showToast('An error occurred. Please try again later.', 'error')
        }
    }

    // handle to unsaved the post
    const handleUnsavedPost = async (postId: string) => {
        setSelectedPostId('')
        if(!postId) return
        try {
            await unsavedPost(postId).unwrap();
            setSelectedPostId('');
            showToast('Post unsaved successfully', 'success')
        } catch (error) {
            showToast('An error occurred. Please try again later.', 'error')
        }
    }

    const handleCancel = () => {
        setOpenDeleteModal(false)
        setCurrentPostId('')
        setSelectedPostId('')
    }

    return (
        <>
            <div className='absolute top-[30px] right-[55px] z-[2]'>
                <div className='bg-white drop-shadow-lg p-2 flex flex-col items-start border-[1px] rounded'>
                    {userId === post.authorId._id && (
                        <>
                            <div 
                                onClick={() => handleShowModalUpdate(post._id)}
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
                    setSelectedPostId={setSelectedPostId}
                />
            )}
            {openDeleteModal && (
                <ConfirmAlert
                    message='Are you sure you want to delete this post?'
                    onConfirm={handleConfirmDeletePost}
                    onCancel={handleCancel}
                />
            )}
        </>
    )
}