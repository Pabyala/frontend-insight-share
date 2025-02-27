import React, { useEffect, useState } from "react";
import { Post } from "../../interface/your-posts";
import ReactCommentShare from "./ReactCommentShare";
import Reactions from "./Reactions";
import SelectOneReaction from "./SelectOneReaction";
import PostOptions from "./PostOptions";
import { Avatar, IconButton, Tooltip } from "@mui/material";
import { Link } from "react-router-dom";
import TimeAgoPost from "./TimeAgoPost";
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { useGetUserQuery } from "../../features/users/usersApiSlice";
import { useGetPostByIdQuery } from "../../features/posts/postsApiSlice";
import socketSetup from "../../socket-io/socket-setup";

interface PostProps {
    post: Post;
    openPostModal: boolean;
    setOpenPostModal: (open: boolean) => void;
    openPostTextArea: boolean;
    setOpenPostTextArea: (open: boolean) => void;
    isSavedPost: boolean;
    setIsSavedPost: (open: boolean) => void;
    selectedPost: string | null;
    setSelectedPost: (open: string) => void;   
}

export default function SinglePost({ post, openPostModal, openPostTextArea, isSavedPost, selectedPost, setOpenPostModal, setOpenPostTextArea, setIsSavedPost, setSelectedPost }: PostProps) {

    const { data: userInfo, error: userInfoError, isLoading: isUserInfoLoading } = useGetUserQuery();
    const { data: singPost, error: errorPost, isLoading: isLoadingPost, refetch: refreshPost } = useGetPostByIdQuery(post._id!,{
            skip: !post._id, // skip the query if postId is falsy (undefined/null).
    });
    const userId = userInfo?._id
    const [selectedPostId, setSelectedPostId] = useState<string | null>(null);
    const [allSavedPostId, setAllSavedPostId] = useState<string[]>([]);

    useEffect(() => {
        console.log('SOCKET IO', socketSetup)
        socketSetup.on('addReactPost', (newReact: string)=> {
            console.log(newReact)
            refreshPost();
        })

        socketSetup.on('addCommentToPost', (newReact: string)=> {
            console.log(newReact)
            refreshPost();
        })
    }, [])

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

    // to check if the post is already saved
    const handleOption = (postId: string) => {
        if(!postId) return
        setSelectedPostId((prevId) => (prevId === postId ? null : postId));
        if(allSavedPostId.includes(postId)){
            setIsSavedPost(true)
        } else {
            setIsSavedPost(false)
        }
    }


    // handle for modal of post
    const handlePostModal = (postId: string) => {
        console.log("Open post modal!")
        setSelectedPost(postId)
        setOpenPostModal(!openPostModal)
        // setSelectedPostId((prevId) => (prevId === postId ? null : postId));
        // if(allSavedPostId.includes(postId)){
        //     console.log("Yes")
        //     setIsSavedPost(true)
        // } else {
        //     setIsSavedPost(false)
        //     console.log("No")
        // }
    }

    return (
        <>
            {/* {post?.map((post) => ( */}
                <div key={post._id} className="w-full relative">
                    <div className="bg-lightWhite p-3 rounded">
                        {/* Profile and more option */}
                        <div className="mb-1">
                            <div className="flex justify-between">
                                <div className="flex items-center space-x-3">
                                    <Link
                                        to={`/profile/${post.authorId.username}/${post.authorId._id}`}
                                    >
                                        <Avatar
                                            sx={{ width: 38, height: 38 }}
                                            alt={post.authorId.username}
                                            src={post?.authorId?.avatarUrl}
                                        />
                                    </Link>
                                    <div className="flex flex-col">
                                        <div className="flex space-x-2">
                                            <Link
                                                to={`/profile/${post.authorId.username}/${post.authorId._id}`}
                                                className="text-sm font-semibold text-black"
                                            >
                                                {post?.authorId?.firstName} {post?.authorId?.middleName}{" "}
                                                {post?.authorId?.lastName}
                                            </Link>
                                        </div>
                                        <p className="text-xs text-slate-600">
                                            <TimeAgoPost timeStamp={post.createdAt} />
                                        </p>
                                    </div>
                                </div>
                                <div id={`options-${post._id}`}>
                                    <Tooltip title="Options">
                                        <IconButton onClick={() => handleOption(post._id)}>
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
                        </div>
                        {/* Post content */}
                        <div className="">
                            <div className="flex">
                                <div className="my-2">
                                {post.captionPost.split("\n").map((line, index) => (
                                    <span key={index}>
                                        {line}
                                        {index < post.captionPost.split("\n").length - 1 && (
                                            <br />
                                        )}
                                    </span>
                                ))}
                                </div>
                            </div>
                        </div>
                        <ReactCommentShare post={post} />
                        <hr className="h-px mt-1 mb-1 bg-gray-200 border-0 dark:bg-gray-700" />
                        {/* react, comment */}
                        <div className="pt-1">
                            <div className="w-full flex justify-between">
                                <div className="w-1/3 flex items-center justify-center space-x-1 relative group rounded-full hover:bg-slate-200 cursor-pointer">
                                    <div className="space-x-2 block h-[26px]">
                                        <Reactions post={post} />
                                    </div>
                                    <div
                                        className={`absolute bottom-full  mb-2 opacity-0 scale-0 group-hover:opacity-100 group-hover:scale-100 transition-transform duration-300 ease-in-out origin-center flex items-center space-x-1`}
                                    >
                                        <SelectOneReaction postId={post._id} />
                                    </div>
                                </div>
                                <div className="w-1/3 flex items-center justify-center">
                                    <div
                                        data-dropdown-toggle="mega-menu-dropdown"
                                        className="w-full flex items-center justify-center space-x-1 cursor-pointer relative group p-1.5 rounded-full hover:bg-slate-200"
                                        onClick={() => handlePostModal(post._id)}
                                    >
                                        <span className="text-sm font-medium text-slate-500">
                                        Comment
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            {/* ))} */}
        </>
    );
}
