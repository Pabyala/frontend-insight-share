import { followerRequest } from "../../data/dummy-data";
import { Avatar } from "@mui/material";
import { MingcuteUserFollow2Fill } from "../others/CustomIcons";

export default function SuggestedFollowing() {
  return (
    <div className="bg-white p-1">
      <p className="text-sm font-semibold mb-1 lg:text-base">Suggested for you</p>
      <div className="overflow-x-hidden">
        {followerRequest.map((follower) => (
          <div
            key={follower.followerUserId}
            className="block px-1.5 cursor-pointer rounded py-1.5 text-xs text-gray-800 hover:bg-gray-300 lg:text-sm"
          >
            {/* <Link
              to={`/profile/${follower.username}/${follower._id}`}
            > */}
              <div className="flex justify-between space-x-2">
                <div className="profileandName flex items-center space-x-4">
                  <div className="flex" style={{ margin: "auto" }}>
                    <Avatar
                      sx={{ width: 38, height: 38 }}
                      alt="Remy Sharp"
                      src={follower.avatarUrl}
                    />
                  </div>
                  <div>
                    <div>
                      <span className="font-bold text-sm">
                        {follower?.firstName} {follower?.middleName}{" "}
                        {follower.lastName}
                      </span>
                    </div>
                    <div>
                      <span className="text-sm">{follower.username}</span>
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
    </div>
  );
}
