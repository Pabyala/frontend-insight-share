import { Avatar } from "@mui/material";
import { FluentPersonArrowBack24Filled } from "../others/CustomIcons";
import { useEffect, useRef, useState } from "react";
import '../style/Style.css'
import { Link } from "react-router-dom";
import BeatLoading from "../loading/BeatLoading";
import ErrorComponent from "../alert/ErrorComponent";
import { MyFollowers } from "../../interface/followers-type";
import { useFollowUserMutation } from "../../features/FollowersFollowing/followersApiSlice";
import socketSetup from "../../socket-io/socket-setup";
import { showLoadingToast, showToast } from "../utils/ToastUtils";
import { toast } from "react-toastify";

interface FollowersRequestContentProps {
  getFollowers?: MyFollowers;
  errorGetFollowers?: any; 
  isLoadingGetFollowers?: boolean;
}

export default function FollowersRequestContent({ getFollowers, errorGetFollowers,isLoadingGetFollowers }: FollowersRequestContentProps) {

  const [followUser, { isLoading }] = useFollowUserMutation();
  const [windowHeight, setWindowHeight] = useState(window.innerHeight);
  const dropdownRef = useRef(null);
  const [showAllNotification, setShowAllNotification] = useState<boolean>(false);

  useEffect(() => {
      if (isLoading) {
          const loadingToast = showLoadingToast("Processing request...");
  
        return () => toast.dismiss(loadingToast); 
      }
  }, [isLoading]);

  useEffect(() => {
    const handleResize = () => {
      setWindowHeight(window.innerHeight);
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const handleShowMoreNotif = () => {
    setShowAllNotification(true);
  };

  const setFollowersDisplay = showAllNotification 
  ? getFollowers?.followersYouDontFollowingBack : getFollowers?.followersYouDontFollowingBack?.slice(0, 7);

  const handleFollow = async (followerId: string) => {
    if(!followerId) return
    try {
      await followUser(followerId).unwrap();
      socketSetup.emit('newFollower', 'follow');
    } catch (error) {
      showToast('An error occurred. Please reload the page and try again.')
    }
  }

  return (
    <div
      ref={dropdownRef}
      className="absolute top-full right-[-88px] mt-[18px] w-[392px] bg-white rounded-md shadow-lg py-2 px-2.5"
      style={{ maxHeight: `${windowHeight - 100}px`, overflowY: "auto", zIndex: '2' }}
    >
      <div className="block py-2 text-gray-800 ">
        <span className="text-sm font-semibold">Followed you</span>
        <hr className="h-px mt-1 mb-1 bg-gray-200 border-0" />
      </div>
      {errorGetFollowers && (<ErrorComponent/>)}
      {isLoadingGetFollowers && (<BeatLoading/>)}
      {setFollowersDisplay && setFollowersDisplay.length > 0 ? (
        setFollowersDisplay.map((follower) => (
          <div key={follower._id} className="block text-xs lg:text-sm">
            <div className="flex w-full justify-between space-x-2">
              <Link to={`/profile/${follower.username}/${follower._id}`} className="w-full flex space-x-2 hover:bg-gray-300 px-2 py-1.5 rounded">
                <div className="flex items-center space-x-4">
                  <div className="flex" style={{ margin: "auto" }}>
                    <Avatar 
                      sx={{ width: 38, height: 38 }} 
                      alt={follower.username}
                      src={follower.avatarUrl} />
                  </div>
                  <div>
                    <div>
                      <span className="font-semibold text-sm">
                        {follower?.firstName} {follower?.middleName} {follower.lastName}
                      </span>
                    </div>
                    <div>
                      <span className="text-sm">{follower.username}</span>
                    </div>
                  </div>
                </div>
              </Link>
              <div className="flex justify-between items-center hover:bg-gray-300 p-1.5 cursor-pointer rounded" onClick={() => handleFollow(follower._id)}>
                <FluentPersonArrowBack24Filled className="text-3xl cursor-pointer" />
              </div>
            </div>
          </div>
        ))
      ) : (
        <div className="text-center py-2 text-gray-500 text-sm">
          No followers list
        </div>
      )}


      {!showAllNotification && (getFollowers?.followersYouDontFollowingBack?.length ?? 0) >= 10 && (
        <div className="block text-center px-2 py-2">
          <hr className="h-px mt-1 mb-1 bg-gray-200 border-0" />
          <button
            onClick={handleShowMoreNotif}
            className="w-full text-blue-500 text-sm font-semibold hover:underline p-1 hover:bg-gray-100 rounded"
          >
            Show More
          </button>
        </div>
      )}
    </div>
  );
}
