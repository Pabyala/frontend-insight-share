import { Avatar } from "@mui/material";
import React, { useState } from "react";
import { CiSearch } from "react-icons/ci";
import PostTextArea from "./post-textarea";
import CreatePost from "./CreatePost";
import Posts from "./Posts";

export default function CenterContainer() {

  return (
    <div className="relative flex flex-col xl:w-5/12 bg-slate-500">
      {/* <div className="w-full flex flex-col flex-grow h-[calc(100vh-105px)] lg:h-[calc(100vh-110px)] xl:h-[calc(100vh-115px)] xl:w-5/12 overflow-y-auto"> */}
        {/* Create Post Content */}
        {/* <div className="overflow-y-auto"> */}
      <CreatePost/>
      <Posts/>
    {/* </div> */}
    </div>
  );
}
