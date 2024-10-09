import { Avatar } from "@mui/material";
import React from "react";
import { EmojioneV1Newspaper, FluentColorPeople48, StreamlineEmojisWrappedGift2 } from "./custom-icons";

export default function LeftContainer() {
  return (
    <div className="hidden w-3/12 space-y-2 h-screen xl:block">
      <div>
        <div className="profileandName flex items-center space-x-4">
          <div className="flex">
            <Avatar
              sx={{ width: 38, height: 38 }}
              alt="Remy Sharp"
              src="https://fastly.picsum.photos/id/865/256/256.jpg?hmac=nl8-UJCFEQkQonS4z_cfKCfvWzVSGyu_IdzeU6MRMo4"
            />
          </div>
          <div>
            <span className="font-medium text-sm">Eleomar F. Fajutnao</span>
          </div>
        </div>
      </div>

      {/* followers */}
      <div>
        <div className="profileandName flex items-center space-x-4">
          <div className="flex">
            <span className="text-3xl">
              <FluentColorPeople48 />
            </span>
          </div>
          <div>
            <span className="font-medium text-sm">Followers</span>
          </div>
        </div>
      </div>

      {/* posts */}
      <div>
        <div className="profileandName flex items-center space-x-4">
          <div className="flex">
            <span className="text-3xl">
              <EmojioneV1Newspaper />
            </span>
          </div>
          <div>
            <span className="font-medium text-sm">Posts</span>
          </div>
        </div>
      </div>

      <hr className="h-px bg-gray-200 border-0 dark:bg-gray-700" />

      {/* birthday */}
      <div>
        <p className="text-sm font-semibold mb-1">Birthdays</p>
        <div>
          <div className="flex items-center space-x-4">
            <div className="flex">
              <span className="text-3xl">
                <StreamlineEmojisWrappedGift2/>
              </span>
            </div>
            <div>
              <p className="text-sm">
                <span className="font-semibold">Monkey D. Luffy</span>'s birthday is today.
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <div className="flex">
              <span className="text-3xl">
                <StreamlineEmojisWrappedGift2/>
              </span>
            </div>
            <div>
              <p className="text-sm">
                <span className="font-semibold">Monkey D. Garp</span>'s birthday is today.
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <div className="flex">
              <span className="text-3xl">
                <StreamlineEmojisWrappedGift2/>
              </span>
            </div>
            <div>
              <p className="text-sm">
                <span className="font-semibold">Portgas D. Ace</span>'s birthday is today.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
