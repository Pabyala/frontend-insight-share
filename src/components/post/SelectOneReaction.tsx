import React, { useEffect, useState } from 'react'
import { AntDesignDislikeFilled, NotoOrangeHeart, TwemojiFire, TwemojiRaisingHands } from '../others/CustomIcons'
import { useReactPostMutation } from '../../features/posts/postsApiSlice';
import { useSelector } from 'react-redux';
import { selectCurrentId } from '../../features/auth/authSlice';
import socketInstance from '../../hooks/socket-intance';
import socketSetup from '../../socket-io/socket-setup';
import { io } from 'socket.io-client';

const socket = io('http://localhost:8000', { reconnection: true });

interface SelectOneReactionProps {
    // clicked: boolean;
    // setClicked: React.Dispatch<React.SetStateAction<boolean>>;
    postId: string;
    // handleReaction: (postId: string, reactionType: string) => void;
}

export default function SelectOneReaction({ postId } : SelectOneReactionProps) {

    const [reactToPost] = useReactPostMutation();
    const userId = useSelector(selectCurrentId)

    const handleReactType = async (reactionType: string) => {
        console.log(`You react ${reactionType} to postId: ${postId}`)
        // handleReaction(postId, reactionType);
        try {
            await reactToPost({postId, userId, reactionType})
            // add alert or modal
            // socketSetup.emit('reactPost', reactionType)
            socketSetup.emit('reactPost', reactionType);
        } catch (error) {
            console.log(error)
        }
    }

    // useEffect(() => {
    //     // Listen for the postReaction event
    //     socketInstance.on('postReaction', (reactionData) => {
    //         // Update state or do something with the received reaction data
    //         console.log('Reaction received:', reactionData);
    //         // Here you can update the state of the reactions, so the UI reflects the new reaction
    //     });
    
    //     // Cleanup the listener when the component unmounts
    //     return () => {
    //         socketInstance.off('postReaction');
    //     };
    // }, []);

    return (
        <div className="flex items-center space-x-0.5 bg-white w-fit p-1 rounded-full border border-gray-200">
            <div className='cursor-pointer'>
                <div className="bg-slate-400 p-1 rounded-full border-white border-2 hover:scale-150 transition-transform duration-200 ease-in-out"
                onClick={() => handleReactType('fire')}
                >
                    <span className="flex items-center">
                        <TwemojiFire />
                    </span>
                </div>
            </div>
            <div className='cursor-pointer'>
                <div className="bg-slate-400 p-1 rounded-full border-white border-2 hover:scale-150 transition-transform duration-200 ease-in-out"
                onClick={() => handleReactType('handsUp')}
                >
                    <span className="flex items-center hover:text-base">
                        <TwemojiRaisingHands />
                    </span>
                </div>
            </div>
            <div className='cursor-pointer'>
                <div className="bg-slate-400 p-1 rounded-full border-white border-2 hover:scale-150 transition-transform duration-200 ease-in-out"
                onClick={() => handleReactType('disLike')}
                >
                    <span className="flex items-center">
                        <AntDesignDislikeFilled />
                    </span>
                </div>
            </div>
            <div className='cursor-pointer'>
                <div className="bg-slate-400 p-1 rounded-full border-white border-2 hover:scale-150 transition-transform duration-200 ease-in-out"
                onClick={() => handleReactType('heart')}
                >
                    <span className="flex items-center">
                        <NotoOrangeHeart />
                    </span>
                </div>
            </div>
        </div>
    )
}