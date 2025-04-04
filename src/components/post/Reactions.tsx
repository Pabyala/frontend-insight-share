import { AntDesignDislikeFilled, NotoOrangeHeart, NotoSadButRelievedFace, TwemojiFire, TwemojiRaisingHands } from '../others/CustomIcons';
import { Post } from '../../interface/your-posts';
import { useSelector } from 'react-redux';
import { selectCurrentId } from '../../features/auth/authSlice';

const reactions = [
    { component: <TwemojiFire />, id: 1, style: { zIndex: 5, left: 0 } },
    { component: <TwemojiRaisingHands />, id: 2, style: { zIndex: 4, left: "21px" } },
    { component: <AntDesignDislikeFilled />, id: 3, style: { zIndex: 3, left: "42px" } },
    { component: <NotoOrangeHeart />, id: 4, style: { zIndex: 2, left: "63px" } },
]

interface PostsProps {
    post: Post; 
}
export default function Reactions({ post }: PostsProps) {

    const userId = useSelector(selectCurrentId)
    // destructuring the type of reaction from post
    const { fire, handsUp, disLike, heart } = post.reactions;
    // check if the user has reacted to the post
    let currentReaction: string | null = null;

    // check if the user has reacted with each type of reaction; set currentReaction accordingly.
    if (fire?.some(reaction => reaction._id === userId)) currentReaction = "fire";
    else if (handsUp?.some(reaction => reaction._id === userId)) currentReaction = "handsUp";
    else if (disLike?.some(reaction => reaction._id === userId)) currentReaction = "disLike";
    else if (heart?.some(reaction => reaction._id === userId)) currentReaction = "heart";

    return (
        <>
            {currentReaction ? (
                <div className="relative flex items-center h-full w-[120px]">
                <div className="absolute w-full">
                    <div className=" flex justify-center items-center w-full space-x-1">
                        <div className="rounded-full bg-slate-400 p-1 border-white border-2">
                            {currentReaction === "fire" && (<TwemojiFire />)}
                            {currentReaction === "handsUp" && (<TwemojiRaisingHands />)}
                            {/* {currentReaction === "disLike" && (<AntDesignDislikeFilled />)} */}
                            {currentReaction === "disLike" && (<NotoSadButRelievedFace className='text-[18px]' />)}
                            {currentReaction === "heart" && (<NotoOrangeHeart />)}
                        </div>
                        <div>
                            {currentReaction === "fire" && (<p className="flex text-sm">Fire</p>)}
                            {currentReaction === "handsUp" && (<p className="flex text-sm">Hands up</p>)}
                            {/* {currentReaction === "disLike" && (<p className="flex text-sm">Unlike</p>)} */}
                            {currentReaction === "disLike" && (<p className="flex text-sm">Sad</p>)}
                            {currentReaction === "heart" && (<p className="flex text-sm">Heart</p>)}  
                        </div>
                    </div>
                </div>
                </div>
            ) : 
            (
                <div className="relative flex items-center h-full w-[90px]">
                    {reactions.map((reaction) => (
                        <div
                        key={reaction.id}
                        className="absolute top-0 bg-slate-400 p-1 rounded-full border-white border-2"
                        style={reaction.style}
                        >
                        <span className="text-sm">{reaction.component}</span>
                        </div>
                    ))}
                </div>
            )}
        </>
    )
}