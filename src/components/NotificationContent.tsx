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
import { notification, follower } from '../data/dummyData';
import { Icon } from '@iconify/react';
import { FluentPersonArrowBack24Filled, NotoAngryFace, NotoFaceWithTearsOfJoy, NotoOrangeHeart, NotoSadButRelievedFace, TwemojiFire, TwemojiRaisingHands } from './CustomIcons';

export default function NotificationContent() {

    return (
        <div className="absolute right-0 mt-0 w-96 bg-white rounded-md shadow-lg py-2">
            <div className='block px-4 py-2 text-gray-800 '>
                <h4 className='text-base'>Notification</h4>
                <hr className="h-px mt-1 mb-1 bg-gray-200 border-0 dark:bg-gray-700" />
            </div>
            {notification.map((notif) => (
                <div key={notif.notificationId} className={notif.isRead ? 'bg-gray-100 block px-4 py-1.5 text-xs text-gray-800 hover:bg-gray-100 lg:text-sm cursor-pointer' : 'block px-4 py-1.5 text-xs text-gray-800 hover:bg-gray-100 lg:text-sm cursor-pointer'}>
                    <div className="flex justify-between space-x-2">
                        <div className="profileAndDisc flex items-center space-x-2">
                            <div className="flex" style={{ margin: 'auto' }}>
                                <Avatar
                                    sx={{ width: 38, height: 38 }}
                                    alt="Remy Sharp"
                                    src={notif.profileURL}
                                />
                            </div>
                            <div>
                                {notif.notificationType === 'reacted' && (
                                    <>
                                        <span className='font-bold text-sm'>{notif.firstName} {notif.middleName} {notif.lastName}</span>
                                        <span className='text-sm'> reacted to your post: "{notif.postContent.slice(0, 33)}..."</span>
                                    </>
                                )}

                                {notif.notificationType === 'following' && (
                                    <>
                                        <span className='font-bold text-sm'>{notif.firstName} {notif.middleName} {notif.lastName} </span>
                                        <span>stated following you</span>
                                    </>
                                )}

                            </div>
                        </div>
                        <div>
                            {notif.notificationType === 'reacted' && (
                                <>
                                    {notif.reaction === 'hands-up' && <TwemojiRaisingHands className="text-4xl" />}
                                    {notif.reaction === 'love' && <NotoOrangeHeart className="text-red-600 text-4xl text-blue-600/100" />}
                                    {notif.reaction === 'haha' && <NotoFaceWithTearsOfJoy className="text-yellow-700 text-4xl text-blue-600/100" />}
                                    {notif.reaction === 'fire' && <TwemojiFire className="text-yellow-400 text-4xl text-blue-600/100" />}
                                    {notif.reaction === 'sad' && <NotoSadButRelievedFace className="text-red-400 text-4xl text-blue-600/100" />}
                                    {notif.reaction === 'angry' && <NotoAngryFace className="text-orange-500 text-4xl text-blue-600/100" />}
                                </>
                            )}
                            {notif.notificationType === 'following' && (
                                <FluentPersonArrowBack24Filled className="text-4xl cursor-pointer" />
                            )}
                        </div>
                    </div>
                    <div className=''>
                        <span className="text-gray-400 text-center text-xs">{notif.timeStamp}</span>
                    </div>
                </div>
            ))}
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