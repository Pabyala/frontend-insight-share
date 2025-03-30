import { Avatar } from "@mui/material";
import { GravityUiPersonPlus, MingcuteUserFollow2Fill } from "../others/CustomIcons";
import { useGetSuggestedForYouQuery, useGetUserQuery } from "../../features/users/usersApiSlice";
import { UserSearch } from "../../interface/user";
import BeatLoading from "../loading/BeatLoading";
import { Link } from "react-router-dom";

export default function SuggestedFollowing() {

  const { data: userInfo } = useGetUserQuery();
  const { data: getSuggestedForYou, isLoading: isGetSuggestedForYouLoading } = useGetSuggestedForYouQuery(userInfo?._id ?? "", {
    skip: !userInfo || !userInfo._id, // Ensure userInfo exists and has an _id
  });

  const handleFollow = () => {
    console.log('first')
  }

  if(isGetSuggestedForYouLoading) return <BeatLoading/>

  return (
    <div className="bg-white p-1 rounded-sm">
        {getSuggestedForYou?.map((user: UserSearch) => (
          <div
            key={user._id}
            className="block text-xs lg:text-sm"
          >
            <div className="flex justify-between space-x-2">
                <Link to={`/profile/${user.username}/${user._id}`} className=" w-full flex space-x-2 text-gray-800 hover:bg-gray-300 p-1.5 cursor-pointer rounded">
                  <div className="flex" style={{ margin: "" }}>
                    <Avatar
                      sx={{ width: 38, height: 38 }}
                      alt="Remy Sharp"
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
                <div className="flex justify-between items-center space-x-2 text-gray-800 hover:bg-gray-300 p-1.5 cursor-pointer rounded" onClick={handleFollow}>
                    <span className="text-3xl cursor-pointer">
                      <GravityUiPersonPlus />
                    </span>
                </div>
            </div>
          </div>
        ))}
    </div>
  );
}
