import { Avatar } from "@mui/material";
import React from "react";
import {
  EmojioneV1Newspaper,
  FluentColorPeople48,
  StreamlineEmojisWrappedGift2,
} from "./custom-icons";
import Sponsored from "./Sponsored";
import { Link } from "react-router-dom";

export default function LeftBar() {
    return (
        <div className="hidden xl:w-[26%] xl:block">
            <div
                className="h-full fixed overflow-hidden w-full xl:max-w-[290px] 2xl:max-w-[348px] py-2"
                style={{ zIndex: "1" }}
            >
                {/* profile */}
                <Link to='/profile' className="profileandName flex items-center space-x-3 hover:bg-gray-300 p-1.5 rounded cursor-pointer">
                    <div className="flex">
                        <Avatar
                            sx={{ width: 33, height: 33 }}
                            alt="Remy Sharp"
                            src="https://fastly.picsum.photos/id/865/256/256.jpg?hmac=nl8-UJCFEQkQonS4z_cfKCfvWzVSGyu_IdzeU6MRMo4"
                        />
                    </div>
                    <div>
                        <span className="font-medium text-sm">Eleomar F. Fajutnao</span>
                    </div>
                </Link>

                {/* followers */}
                    <Link to='/' className="profileandName flex items-center space-x-3 hover:bg-gray-300 p-1.5 rounded cursor-pointer">
                        <div className="flex">
                            <span className="text-3xl">
                                <FluentColorPeople48 />
                            </span>
                        </div>
                        <div>
                            <span className="font-medium text-sm">Followers</span>
                        </div>
                    </Link>

                {/* posts */}
                {/* <div> */}
                    <Link to='/' className="profileandName flex items-center space-x-3 hover:bg-gray-300 p-1.5 rounded mb-2">
                        <div className="flex">
                            <span className="text-3xl">
                                <EmojioneV1Newspaper />
                            </span>
                        </div>
                        <div>
                            <span className="font-medium text-sm">Posts</span>
                        </div>
                    </Link>
                {/* </div> */}

                <hr className="h-px mb-2 bg-gray-200 border-0 dark:bg-gray-700" />

                <Sponsored/>

                {/* birthday */}
                {/* <div className="">
                    <p className="text-sm font-semibold mb-1">Birthdays</p>
                        <div className="flex items-center space-x-3 hover:bg-gray-300 p-1.5 rounded cursor-pointer">
                            <div className="flex">
                                <span className="text-3xl">
                                    <StreamlineEmojisWrappedGift2 />
                                </span>
                            </div>
                            <div>
                                <p className="text-sm">
                                    <span className="font-semibold">Monkey D. Luffy</span>'s
                                    birthday is today.
                                </p>
                            </div>
                        </div>
                        <div className="flex items-center space-x-3 hover:bg-gray-300 p-1.5 rounded cursor-pointer">
                            <div className="flex">
                                <span className="text-3xl">
                                    <StreamlineEmojisWrappedGift2 />
                                </span>
                            </div>
                            <div>
                                <p className="text-sm">
                                    <span className="font-semibold">Monkey D. Garp</span>'s
                                    birthday is today.
                                </p>
                            </div>
                        </div>
                        <div className="flex items-center space-x-3 hover:bg-gray-300 p-1.5 rounded cursor-pointer">
                            <div className="flex">
                                <span className="text-3xl">
                                    <StreamlineEmojisWrappedGift2 />
                                </span>
                            </div>
                            <div>
                                <p className="text-sm">
                                    <span className="font-semibold">Portgas D. Ace</span>'s
                                    birthday is today.
                                </p>
                            </div>
                        </div>
                </div> */}
            </div>
        </div>
    );
}
