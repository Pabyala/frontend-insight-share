import { followerRequest } from "../../data/dummy-data";
import { Avatar } from "@mui/material";
import { FluentPersonArrowBack24Filled, MingcuteUserRemove2Fill } from "../others/CustomIcons";
import { useEffect, useRef, useState } from "react";
import '../style/Style.css'
import { useGetFollowersQuery } from "../../features/FollowersFollowing/followersApiSlice";
import { Link } from "react-router-dom";
import BeatLoading from "../loading/BeatLoading";
import ErrorComponent from "../alert/ErrorComponent";
import { MyFollowers } from "../../interface/followers-type";

interface FollowersRequestContentProps {
  getFollowers?: MyFollowers;
  errorGetFollowers?: any; 
  isLoadingGetFollowers?: boolean;
}

export default function FollowersRequestContent({ getFollowers, errorGetFollowers,isLoadingGetFollowers }: FollowersRequestContentProps) {

  // const { data: getFollowers, error: errorGetFollowers, isLoading: isLoadingGetFollowers, refetch: refetchGetFollowers } = useGetFollowersQuery();
  const [windowHeight, setWindowHeight] = useState(window.innerHeight);
  const dropdownRef = useRef(null);
  const [showAllNotification, setShowAllNotification] = useState<boolean>(false);
  
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

  if (isLoadingGetFollowers) return <BeatLoading/>;
  if (errorGetFollowers) return <ErrorComponent/>;
  return (
    <div
      ref={dropdownRef}
      className="absolute top-full right-[-88px] mt-[12px] w-[392px] bg-white rounded-md shadow-lg py-2 px-2.5"
      style={{ maxHeight: `${windowHeight - 100}px`, overflowY: "auto", zIndex: '2' }}
    >
      <div className="block py-2 text-gray-800 ">
        <span className="text-sm font-semibold">Followed you</span>
        <hr className="h-px mt-1 mb-1 bg-gray-200 border-0 dark:bg-gray-700" />
      </div>
      {setFollowersDisplay && setFollowersDisplay.length > 0 ? (
        setFollowersDisplay.map((follower) => (
          <div key={follower._id} className="block cursor-pointer text-xs text-gray-800 lg:text-sm">
            <Link to={`/profile/${follower.username}/${follower._id}`}>
              <div className="flex justify-between space-x-2 hover:bg-gray-100 px-2 py-1.5 rounded">
                <div className="profileandName flex items-center space-x-4">
                  <div className="flex" style={{ margin: "auto" }}>
                    <Avatar sx={{ width: 38, height: 38 }} alt="Remy Sharp" src={follower.avatarUrl} />
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
                <div className="flex justify-between space-x-2">
                  <div>
                    <MingcuteUserRemove2Fill className="text-3xl cursor-pointer" />
                  </div>
                  <div>
                    <FluentPersonArrowBack24Filled className="text-3xl cursor-pointer" />
                  </div>
                </div>
              </div>
            </Link>
          </div>
        ))
      ) : (
        <div className="text-center py-2 text-gray-500 text-sm">
          No followers list
        </div>
      )}


      {!showAllNotification && (getFollowers?.followersYouDontFollowingBack?.length ?? 0) >= 10 && (
        <div className="block text-center px-2 py-2">
          <hr className="h-px mt-1 mb-1 bg-gray-200 border-0 dark:bg-gray-700" />
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
