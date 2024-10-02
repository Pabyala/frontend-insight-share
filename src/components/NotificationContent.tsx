import { Avatar } from '@mui/material'
import React from 'react'
// mui-icons
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import FavoriteIcon from '@mui/icons-material/Favorite';

// react-icons
import { FaAngry } from "react-icons/fa";
import { FaHeart } from "react-icons/fa6";
import { AiFillLike } from "react-icons/ai";
import { FaSadTear } from "react-icons/fa";
import { FaFireAlt } from "react-icons/fa";
import { RiEmotionHappyFill } from "react-icons/ri";
import { FaFaceSurprise } from "react-icons/fa6";
import { reactedToPost } from '../data/dummyData';

export default function NotificationContent() {
    const postContent = "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like)"
    return (
        <div className="absolute right-0 mt-9 w-96 bg-white rounded-md shadow-lg py-2">
            <div className='block px-4 py-2 text-gray-800 '>
                <h4>Notification</h4>
                <hr className="h-px mt-1 mb-1 bg-gray-200 border-0 dark:bg-gray-700" />
            </div>
            {
                reactedToPost.map((reactedPost) => (
                    <div key={reactedPost.authorId} className='block px-4 py-1.5 text-xs text-gray-800 hover:bg-gray-100 lg:text-sm'>
                <div className="flex space-x-2">
                    <div className="flex" style={{ margin: 'auto'}}>
                        <Avatar
                            sx={{ width: 38, height: 38 }}
                            alt="Remy Sharp"
                            src={reactedPost.profileURL}
                        />
                    </div>
                    <span>
                        <span className='font-bold text-sm'>{reactedPost.firstName} {reactedPost.middleName} {reactedPost.lastName}</span>
                        <span className='text-sm'> {reactedPost.reaction} </span>
                        <span className='text-sm'>your post: </span>
                        <span className='text-sm'>"{reactedPost.postContent.slice(0, 40)}..."</span>
                    </span>
                    <div>
                        {reactedPost.reaction === 'like' &&  <AiFillLike className="text-gray-400 text-4xl text-blue-600/100" />}
                        {reactedPost.reaction === 'love' &&  <FaHeart className="text-red-600 text-4xl text-blue-600/100" />}
                        {reactedPost.reaction === 'haha' &&  <RiEmotionHappyFill className="text-yellow-700 text-4xl text-blue-600/100" />}
                        {reactedPost.reaction === 'wow' &&  <FaFaceSurprise className="text-yellow-400 text-4xl text-blue-600/100" />}
                        {reactedPost.reaction === 'sad' &&  <FaSadTear className="text-red-400 text-4xl text-blue-600/100" />}
                        {reactedPost.reaction === 'angry' &&  <FaAngry className="text-orange-500 text-4xl text-blue-600/100" />}
                    </div>
                </div>
                <div className=''>
                    <span className="text-gray-400 text-center text-xs">{reactedPost.timeStamp}</span>
                </div>
            </div>
                ))
            }
        </div>
    )
}


// <div className='block px-4 py-1.5 text-xs text-gray-800 hover:bg-gray-100 lg:text-sm'>
//                 <div className="flex space-x-2">
//                     <div className="flex" style={{ margin: 'auto'}}>
//                         <Avatar
//                             sx={{ width: 38, height: 38 }}
//                             alt="Remy Sharp"
//                             src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
//                         />
//                     </div>
//                     <span>
//                         <span className='font-bold text-sm'>Monkey D. Luffy</span>
//                         <span className='text-sm'> liked </span>
//                         <span className='text-sm'>your post: </span>
//                         <span className='text-sm'>"{postContent.slice(0, 40)}..."</span>
//                     </span>
//                     <div>
//                         <AiFillLike className="text-gray-400 text-4xl text-blue-600/100" />
//                     </div>
//                 </div>
//                 <div className=''>
//                     <span className="text-gray-400 text-center text-xs">2 hours ago</span>
//                 </div>
//             </div>