import React, { useState } from "react";
import { Avatar } from "@mui/material";
import PostTextArea from "./PostTextarea";
import { useSelector } from "react-redux";
// import { useGetUserDataQuery } from "../../features/auth/authApiSlice";
import { selectCurrentToken } from "../../features/auth/authSlice";
import { useGetUserQuery } from "../../features/users/usersApiSlice";
import { useAddPostMutation } from "../../features/posts/postsApiSlice";

export default function CreatePost() {
    const [openPostTextAre, setOpenPostTextArea] = useState<boolean>(false);

    const token = useSelector(selectCurrentToken)
    const { data: userInfo, error: errorUserInfo, isLoading: isLoadingUserInfo } = useGetUserQuery();
    // const { data: createPost, error: errorCreatePost, isLoading: isLoadingCreatePost } = useAddPostMutation();
    // const [addPost] = useAddPostMutation();
    
    const toggleShowPostTextArea = () => {
        setOpenPostTextArea(!openPostTextAre);
    };
    return (
        <>
            <div className="w-full flex space-x-4 p-3 mb-3 bg-lightWhite rounded">
                <div className="flex" style={{ margin: "auto" }}>
                    <Avatar
                        sx={{ width: 38, height: 38 }}
                        alt="Remy Sharp"
                        src={userInfo?.avatarUrl}
                    />
                </div>
                <div
                    onClick={toggleShowPostTextArea}
                    className="w-full flex flex-grow cursor-pointer"
                >
                <span className="w-full flex items-center cursor-pointer text-sm py-2 px-3 rounded bg-customGray text-black outline-none">
                    What's on your mind, {userInfo?.firstName}?
                </span>
                </div>
            </div>
            {openPostTextAre && <PostTextArea onClose={toggleShowPostTextArea} />}
        </>
    );
}