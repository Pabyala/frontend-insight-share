import { Avatar, IconButton, Tooltip } from "@mui/material";
import React, { useEffect } from "react";
import ReactCommentShare from "./ReactCommentShare";
import AllReactions from "./AllReactions";
import SelectOneReaction from "./SelectOneReaction";
import { FluentCommentEdit16Filled, FluentShare28Filled } from "./custom-icons";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { dummyPosts } from "../data/dummy-post";

interface Reaction {
    userId: string;
}

interface Comment {
    commentId: string;
    userId: string;
    text: string;
    firstName: string;
    middleName: string;
    lastName: string;
    avatarUrl: string;
    timestamp: string;
    replies?: Reply[]; 
}

interface Reply {
    replyId: string;
    userId: string;
    text: string;
    firstName: string;
    middleName: string;
    lastName: string;
    avatarUrl: string;
    timestamp: string;
}

interface Post {
    postId: string;    
    authorId: string;       
    captionPost: string;
    firstName: string;
    middleName: string;
    lastName: string;
    authorAvatarUrl: string;  
    reactions: {
        like: Reaction[];    
        heart: Reaction[];   
    };
    comments: Comment[];    
    createdAt?: string;    
    updatedAt?: string;     
}

interface ClosePostTextArea {
    onClose: () => void;
    selectedPost: string;
}



export default function PostModal({ onClose, selectedPost }: ClosePostTextArea) {
    const handleOverlayClick = (event: React.MouseEvent<HTMLDivElement>) => {
        if (event.currentTarget === event.target) {
        onClose();
        }
    };

    useEffect(() => {
        const selectedPostData = dummyPosts.find(post => post.postId === selectedPost);
        if (selectedPostData) {
            console.log("Post: ", selectedPostData);
        }
    }, [selectedPost]);
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center w-full h-full overflow-y-auto bg-black bg-opacity-50"
      onClick={handleOverlayClick}
    >
      <div className="relative p-4 w-full max-w-2xl max-h-full">
        <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
          {/* header: name of post and close btn */}
          <div className="flex items-center justify-between px-3 py-2.5 md:p-5 border-b rounded-t dark:border-gray-600">
            <h4 className="text-base font-semibold text-center text-black dark:text-white">
              Eleomar Fajutnao's Post
            </h4>
            <button
              type="button"
              className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
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
              <div className="flex justify-between">
                <div className="flex items-center space-x-3">
                  <Avatar
                    sx={{ width: 38, height: 38 }}
                    alt="Remy Sharp"
                    src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                  />
                  <div className="flex flex-col">
                    <span className="text-sm font-semibold text-black">
                      Eleomar F. Fajutnao
                    </span>
                    <span className="text-xs text-slate-600">9m ago</span>
                  </div>
                </div>
                <div>
                  <Tooltip title="Show more">
                    <IconButton>
                      <MoreVertIcon />
                    </IconButton>
                  </Tooltip>
                </div>
              </div>
            </div>

            {/* Post content */}
            <div className="">
              <div className="flex">
                <div className="my-2">
                  <span className="text-sm">
                    In publishing and graphic design, Lorem ipsum is a
                    placeholder text commonly used to demonstrate the visual
                    form of a document or a typeface without relying on
                    meaningful content. Lorem ipsum may be used as a placeholder
                    before the final copy is available.
                  </span>
                </div>
              </div>
            </div>

            {/* numbers of react, comment, and share */}
            {/* <ReactCommentShare /> */}

            <hr className="h-px my-1 bg-gray-200 border-0 dark:bg-gray-700" />

            {/* react, comment, share */}
            <div className="pt-1">
              <div className="w-full flex justify-between">
                <div
                  className="w-1/3 flex items-center justify-center space-x-1 relative group p-1.5 rounded-full hover:bg-slate-200 cursor-pointer"
                  style={{ minWidth: "100px", minHeight: "24px" }}
                >
                  <div className="flex items-center justify-center space-x-2">
                    {/* <NotoOrangeHeart className='text-lg'/>
                                        <span className='text-sm font-medium text-slate-500'>Heart</span> */}
                    <AllReactions />
                  </div>
                  <div className="absolute bottom-full  mb-2 opacity-0 scale-0 group-hover:opacity-100 group-hover:scale-100 transition-transform duration-300 ease-in-out origin-center flex items-center space-x-1">
                    <SelectOneReaction />
                  </div>
                </div>
                <div
                  className="w-1/3 flex items-center justify-center space-x-1 cursor-pointer relative group p-1.5 rounded-full hover:bg-slate-200"
                  // onClick={handlePostModal}
                >
                  <FluentCommentEdit16Filled className="text-lg" />
                  <span className="text-sm font-medium text-slate-500">
                    Comment
                  </span>
                </div>

                <div className="w-1/3 flex items-center justify-center space-x-1 cursor-pointer p-1.5   rounded-full hover:bg-slate-200">
                  <FluentShare28Filled className="text-lg" />
                  <span className="text-sm font-medium text-slate-500">
                    Share
                  </span>
                </div>
              </div>
            </div>

            {/* all comment */}
            <hr className="h-px my-1 bg-gray-200 border-0 dark:bg-gray-700" />
            <div>
              <div>
                <div className="w-full flex space-x-1 py-1">
                  <div className="flex py-1">
                    <Avatar
                      sx={{ width: 38, height: 38 }}
                      alt="Remy Sharp"
                      src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                    />
                  </div>
                  <div>
                    <div>
                      <div className="w-full flex flex-col flex-grow cursor-pointer bg-slate-200 rounded-lg p-1.5">
                        <span className="text-sm font-semibold text-black">
                          Eleomar F. Fajutnao
                        </span>
                        <span className="w-full flex text-sm text-black xl:text-sm">
                          Hindi ko gets Parang code ko Hindi ko gets pano gumana
                          Moral lesson "Paano"
                        </span>
                      </div>
                      <div className="flex space-x-5">
                        <div className="text-xs">
                          <span>1h ago</span>
                        </div>
                        <div className="text-xs">
                          <span>Like</span>
                        </div>
                        <div className="text-xs">
                          <span>Reply</span>
                        </div>
                      </div>
                    </div>
                    {/* reply comment */}
                    <div className="w-full flex space-x-1 py-1">
                      <div className="flex py-1">
                        <Avatar
                          sx={{ width: 38, height: 38 }}
                          alt="Remy Sharp"
                          src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                        />
                      </div>
                      <div>
                        <div className="w-full flex flex-col flex-grow cursor-pointer bg-slate-200 rounded-lg p-1.5">
                          <span className="text-sm font-semibold text-black">
                            Eleomar F. Fajutnao
                          </span>
                          <span className="w-full flex text-sm text-black xl:text-sm">
                            Hindi ko gets Parang code ko Hindi ko gets pano
                            gumana Moral lesson "Paano"
                          </span>
                        </div>
                        <div className="flex space-x-5">
                          <div className="text-xs">
                            <span>1h ago</span>
                          </div>
                          <div className="text-xs">
                            <span>Like</span>
                          </div>
                          <div className="text-xs">
                            <span>Reply</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
