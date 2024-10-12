import React, { useEffect, useRef, useState } from "react";
import { CiSearch } from "react-icons/ci";
import SubmenuProfile from "./sub-menu-profile";
import NavigationMenuItems from "./nav-menu-items";
import NotificationIcon from "./mui-nav-notification-icon";
import Avatar from "@mui/material/Avatar";
import NotificationContent from "./notification-content";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import FollowersIcon from "./mui-nav-followers-icon";
import FollowersRequest from "./followers-request-content";
import FollowersRequestContent from "./followers-request-content";
import { IconButton, Tooltip } from "@mui/material";
import SuggestedFollowing from "./SuggestedFollowing";
import Notif from "./Notif";

export default function NavigationBar() {
  const [isProfileOpen, setIsProfileOpen] = useState<boolean>(false);
  const [isNotificationOpen, setIsNotificationOpen] = useState<boolean>(false);
  const [isFollowerOpen, setIsFollowerOpen] = useState<boolean>(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const profileRef = useRef<HTMLDivElement>(null);
  const notificationRef = useRef<HTMLDivElement>(null);
  const followerRef = useRef<HTMLDivElement>(null);

  const toggleFollowersDropdown = () => {
    setIsFollowerOpen(!isFollowerOpen);
    console.log(isFollowerOpen)
    setIsNotificationOpen(false);
    setIsProfileOpen(false);
  };

  const toggleNotificationDropdown = () => {
    setIsNotificationOpen(!isNotificationOpen);
    setIsProfileOpen(false);
    setIsFollowerOpen(false);
  };
  const toggleProfileDropdown = () => {
    setIsProfileOpen(!isProfileOpen);
    setIsNotificationOpen(false);
    setIsFollowerOpen(false);
  };

  //   useEffect(() => {
  //     const handleClickOutside = (event: MouseEvent) => {
  //       if (
  //         dropdownRef.current &&
  //         !dropdownRef.current.contains(event.target as Node)
  //       ) {
  //         setIsProfileOpen(false);
  //         setIsNotificationOpen(false);
  //         setIsFollowerOpen(false);
  //       }
  //     };
  //     document.addEventListener("mousedown", handleClickOutside);
  //     return () => {
  //       document.removeEventListener("mousedown", handleClickOutside);
  //     };
  //   }, []);

  return (
    // <div className="relative bg-white w-full">
    // <div className="w-full fixed flex justify-center items-center z-50 bg-white left-2/4 -translate-x-1/2">
    <div 
      className="w-full flex justify-center items-center fixed bg-slate-700"
      style={{zIndex: '0'}}
    >
      <div className="container">
        <div className="mx-auto pt-3 pb-2 flex items-center justify-between overflow-hidden">
          <div className="flex items-center">
            <div className="text-black text-xl font-bold">
              <a href="#" className="text-bas">Logo</a>
            </div>
            <div className="relative flex justify-center flex-grow px-4 max-w-md">
              <input
                type="text"
                placeholder="Search..."
                className="w-full text-xs p-2 pl-10 rounded-md bg-lightGrayBlue text-slate-950 outline-none xl:text-sm"
              />
              <CiSearch className="absolute left-6 top-2 text-black xl:left-7 xl:top-2.5" />
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <div className="">
              <div
                ref={followerRef}
                className="relative text-gray-400 hover:text-white"
              >
                <div onClick={toggleFollowersDropdown}>
                  <FollowersIcon />
                </div>
              </div>
              {isFollowerOpen && <FollowersRequestContent />}
            </div>

            <div
              ref={notificationRef}
              className="relative text-gray-400 hover:text-white"
            >
              <div onClick={toggleNotificationDropdown}>
                <NotificationIcon />
              </div>
            </div>

            <div className="">
              <div className="flex relative" ref={profileRef}>
                <button
                  onClick={toggleProfileDropdown}
                  className="text-gray-400 hover:text-white focus:outline-none"
                >
                  <Avatar
                    sx={{ width: 32, height: 32 }}
                    alt="Remy Sharp"
                    src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                  />
                </button>
                
              </div>
              {isProfileOpen && <SubmenuProfile />}
            </div>
            
          </div>
        </div>
        {/* <hr className="w-full h-px mt-2.5 mb-1 bg-gray-200 border-0 dark:bg-gray-700 xl:mt-3 xl:mb-1.5" />
        <NavigationMenuItems /> */}
      </div>
      
    </div>
    // </div>
  );
}
