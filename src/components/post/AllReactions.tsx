import React from "react";
import { AntDesignDislikeFilled, NotoOrangeHeart, TwemojiFire, TwemojiRaisingHands, } from "../others/CustomIcons";

export default function AllReactions() {
    return (
    // <div className='flex bg-black'>
    <div
      // className="all-reaction relative flex items-center min-w-fit h-[24px] w-full"
      className="all-reaction relative flex items-center h-[24px] min-w-[90px]"
    >
      <div
        className="absolute bg-slate-400 p-1 rounded-full border-white border-2"
        style={{ zIndex: "5" }}
      >
        <span className="text-sm">
          <TwemojiFire />
        </span>
      </div>
      <div
        className="absolute bg-slate-400 p-1 rounded-full border-white border-2"
        style={{ zIndex: "4", left: "21px" }}
      >
        <span className="text-sm">
          <TwemojiRaisingHands />
        </span>
      </div>
      <div
        className="absolute bg-slate-400 p-1 rounded-full border-white border-2"
        style={{ zIndex: "3", left: "42px" }}
      >
        <span className="text-sm">
          <AntDesignDislikeFilled />
        </span>
      </div>

      <div
        className="absolute bg-slate-400 p-1 rounded-full border-white border-2"
        style={{ zIndex: "2", left: "63px" }}
      >
        <span className="text-sm">
          <NotoOrangeHeart />
        </span>
      </div>
    </div>
    // </div>
  );
}
