import React from "react";
import LeftContainer from "./left-container";
import CenterContainer from "./center-container";
import RightContainer from "./right-container";
import LeftBar from "./LeftBar";
import Timeline from "./Timeline";
import RightBar from "./RightBar";

export default function MainContainer() {
  return (
    // <div className="container mx-auto flex justify-between pt-[105px] lg:pt-[110px] xl:pt-[115px] relative">
      // {/* <div className="container mx-auto"> */}
        // {/* <div className="container mx-auto relative pt-[105px] lg:pt-[110px] xl:pt-[115px] h-screen"> */}
      // <LeftContainer />
      // <CenterContainer />
      // <RightContainer />
    // </div>

    <div className="container mx-auto flex justify-between pt-[105px] lg:pt-[110px] xl:pt-[115px] relative overflow-hidden">
      {/* <LeftContainer />
      <CenterContainer />
      <RightContainer /> */}
      <LeftBar/>
      <Timeline/>
      <RightBar/>
    </div>
  );
}
