import { followerRequest } from "../data/dummy-data";
import { Avatar } from "@mui/material";
import {
  FluentPersonArrowBack24Filled,
  MingcuteUserRemove2Fill,
} from "./custom-icons";

export default function FollowersRequestContent() {
  return (
    <div className="absolute right-0 mt-0 w-96 bg-white rounded-md shadow-lg py-2">
      <div className="block px-4 py-2 text-gray-800 ">
        <h4 className="text-base font-bold">Followers</h4>
        <hr className="h-px mt-1 mb-1 bg-gray-200 border-0 dark:bg-gray-700" />
      </div>
      {followerRequest.map((follower) => (
        <div className="block px-4 py-1.5 text-xs text-gray-800 hover:bg-gray-100 lg:text-sm">
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
              <div>
                <MingcuteUserRemove2Fill className="text-3xl cursor-pointer" />
              </div>
              <div>
                <FluentPersonArrowBack24Filled className="text-3xl cursor-pointer" />
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}