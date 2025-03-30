import { Avatar } from "@mui/material";
import { MingcuteUserFollow2Fill } from "../others/CustomIcons";
import { useGetSuggestedForYouQuery, useGetUserQuery } from "../../features/users/usersApiSlice";
import { UserSearch } from "../../interface/user";
import BeatLoading from "../loading/BeatLoading";

export default function SuggestedFollowing() {

  const { data: userInfo } = useGetUserQuery();
  const { data: getSuggestedForYou, isLoading: isGetSuggestedForYouLoading } = useGetSuggestedForYouQuery(userInfo?._id ?? "", {
    skip: !userInfo || !userInfo._id, // Ensure userInfo exists and has an _id
  });

  if(isGetSuggestedForYouLoading) return <BeatLoading/>

  return (
    <div className="bg-white p-1 rounded-sm">
        {getSuggestedForYou?.map((user: UserSearch) => (
          <div
            key={user._id}
            className="block px-1.5 cursor-pointer rounded py-1.5 text-xs text-gray-800 hover:bg-gray-300 lg:text-sm"
          >
              <div className="flex justify-between space-x-2">
                <div className="profileandName flex items-center space-x-4">
                  <div className="flex" style={{ margin: "auto" }}>
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
                </div>
                <div className="flex justify-between space-x-2">
                    <span className="text-3xl cursor-pointer">
                      <MingcuteUserFollow2Fill />
                    </span>
                </div>
              </div>
            {/* </Link> */}
          </div>
        ))}
    </div>
  );
}
