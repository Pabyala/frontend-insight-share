import { AntDesignDislikeFilled, NotoOrangeHeart, TwemojiFire, TwemojiRaisingHands } from '../others/CustomIcons'
import { useReactPostMutation } from '../../features/posts/postsApiSlice';
import { useSelector } from 'react-redux';
import { selectCurrentId } from '../../features/auth/authSlice';
import socketSetup from '../../socket-io/socket-setup';
import { showToast } from '../utils/ToastUtils';

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
        try {
            await reactToPost({postId, userId, reactionType})
            socketSetup.emit('addReactPost', reactionType);
        } catch (error) {
            showToast('An error occurred. Please reload the page and try again.', 'error')
        }
    }

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