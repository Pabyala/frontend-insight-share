import { Avatar } from "@mui/material";
import { FluentPersonArrowBack24Filled } from "../others/CustomIcons";
import { useGetSuggestedForYouQuery, useGetUserQuery } from "../../features/users/usersApiSlice";
import { UserSearch } from "../../interface/user";
import BeatLoading from "../loading/BeatLoading";
import { Link } from "react-router-dom";
import { useFollowUserMutation } from "../../features/FollowersFollowing/followersApiSlice";
import { showLoadingToast, showToast } from "../utils/ToastUtils";
import socketSetup from "../../socket-io/socket-setup";
import { useEffect } from "react";
import { toast } from "react-toastify";

export default function SuggestedFollowing() {

  const { data: userInfo } = useGetUserQuery();
  const { data: getSuggestedForYou, isLoading: isGetSuggestedForYouLoading, refetch: refreshGetSuggestedForYou } = useGetSuggestedForYouQuery(userInfo?._id ?? "", {
    skip: !userInfo || !userInfo._id,
  });
  const [followUser, { isLoading: isLoadingFollowUser}] = useFollowUserMutation();

  useEffect(() => {
      if (isLoadingFollowUser) {
          const loadingToast = showLoadingToast("Processing request...");
  
        return () => toast.dismiss(loadingToast); 
      }
  }, [isLoadingFollowUser]);

  const handleFollow = async (followUserId: string) => {
    if(!followUserId) return
    try {
      await followUser(followUserId).unwrap();
      socketSetup.emit('newFollower', 'follow');
      refreshGetSuggestedForYou();
    } catch(error) {
      showToast('An error occurred. Please reload the page and try again.');
    }
  }

  return (
    <div className="bg-white p-1 rounded-sm">
        {isGetSuggestedForYouLoading && <BeatLoading/>}
        {!isGetSuggestedForYouLoading && getSuggestedForYou?.map((user: UserSearch) => (
          <div
            key={user._id}
            className="block text-xs lg:text-sm"
          >
            <div className="flex justify-between space-x-2">
                <Link to={`/profile/${user.username}/${user._id}`} className=" w-full flex space-x-2 text-gray-800 hover:bg-gray-300 p-1.5 cursor-pointer rounded">
                  <div className="flex" style={{ margin: "" }}>
                    <Avatar
                      sx={{ width: 38, height: 38 }}
                      alt={user.username}
                      src={user.avatarUrl}
                    />
                  </div>
                  <div>
                    <div>
                      <span className="font-bold text-sm">
                        {user?.firstName} {user?.middleName}{" "}
                        {user.lastName}
                      </span>
                    </div>
                    <div>
                      <span className="text-sm">{user.username}</span>
                    </div>
                  </div>
                </Link>
                <div 
                  className="flex justify-between items-center space-x-2 text-gray-800 hover:bg-gray-300 p-1.5 cursor-pointer rounded" 
                  onClick={() => handleFollow(user._id)}
                >
                    <span className="text-3xl cursor-pointer">
                      <FluentPersonArrowBack24Filled />
                    </span>
                </div>
            </div>
          </div>
        ))}
    </div>
  );
}
