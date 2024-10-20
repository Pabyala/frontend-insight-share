import React from "react";
import LeftBar from "../leftbar/LeftBar";
import Timeline from "./Timeline";
import RightBar from "../rightbar/RightBar";

export default function MainContainer() {
  return (
    <div className="container mx-auto flex justify-between pt-[63px] lg:pt-[65px] xl:pt-[68px] relative overflow-hidden">
      <LeftBar/>
      <Timeline/>
      <RightBar/>
    </div>
  );
}
