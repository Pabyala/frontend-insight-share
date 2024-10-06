import { Avatar } from "@mui/material";
import React, { useState } from "react";
import { CiSearch } from "react-icons/ci";
import PostTextArea from "./post-textarea";
import CreatePost from "./CreatePost";
import Posts from "./Posts";

export default function CenterContainer() {

  return (
    <div className="w-full flex flex-col h-screen  xl:w-5/12">
        {/* Create Post Content */}
      <CreatePost/>
      <Posts/>
    </div>
  );
}
