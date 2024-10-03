import React, { useEffect, useRef, useState } from "react";
import { Avatar } from "@mui/material";
import { notification } from "../data/dummy-data";
import {
  FluentPersonArrowBack24Filled,
  NotoAngryFace,
  NotoFaceWithTearsOfJoy,
  NotoOrangeHeart,
  NotoSadButRelievedFace,
  TwemojiFire,
  TwemojiRaisingHands,
} from "./CustomIcons";
import '../components/style-navigation.css'
import './Style.css'

export default function NotificationContent() {
  const [windowHeight, setWindowHeight] = useState(window.innerHeight);
  const dropdownRef = useRef(null);
  const [showAllNotification, setShowAllNotification] = useState<boolean>(false);

  useEffect(() => {
    const handleResize = () => {
      setWindowHeight(window.innerHeight);
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const handleShowMoreNotif = () => {
    setShowAllNotification(true);
  };

  const setNotificationDisplay = showAllNotification
    ? notification
    : notification.slice(0, 7);

  return (
    <div
      ref={dropdownRef}
      className="notif-cont absolute right-0 mt-0 w-96 bg-white rounded-md shadow-lg py-2"
      style={{ maxHeight: `${windowHeight - 100}px`, overflowY: "auto" }}
    >
      <div className="custom-scroll-bar max-h-none">
        <div className="blo ck px-4 py-2 text-gray-800 ">
          <h4 className="text-base font-bold">Notifications</h4>
          <hr className="h-px mt-1 mb-1 bg-gray-200 border-0 dark:bg-gray-700" />
        </div>
        {setNotificationDisplay.map((notif) => (
          <div
            key={notif.notificationId}
            className={
              notif.isRead
                ? "bg-gray-100 block px-4 py-1.5 text-xs text-gray-800 hover:bg-gray-100 lg:text-sm cursor-pointer"
                : "block px-4 py-1.5 text-xs text-gray-800 hover:bg-gray-100 lg:text-sm cursor-pointer"
            }
          >
            <div className="flex justify-between space-x-2">
              <div className="profileAndDisc flex items-center space-x-2">
                <div className="flex" style={{ margin: "auto" }}>
                  <Avatar
                    sx={{ width: 38, height: 38 }}
                    alt="Remy Sharp"
                    src={notif.profileURL}
                  />
                </div>
                <div>
                  {notif.notificationType === "reacted" && (
                    <>
                      <span className="font-bold text-sm">
                        {notif.firstName} {notif.middleName} {notif.lastName}
                      </span>
                      <span className="text-sm">
                        {" "}
                        reacted to your post: "{notif.postContent.slice(0, 33)}
                        ..."
                      </span>
                    </>
                  )}

                  {notif.notificationType === "following" && (
                    <>
                      <span className="font-bold text-sm">
                        {notif.firstName} {notif.middleName} {notif.lastName}{" "}
                      </span>
                      <span>stated following you</span>
                    </>
                  )}
                </div>
              </div>
              <div>
                {notif.notificationType === "reacted" && (
                  <>
                    {notif.reaction === "hands-up" && (
                      <TwemojiRaisingHands className="text-4xl" />
                    )}
                    {notif.reaction === "love" && (
                      <NotoOrangeHeart className="text-red-600 text-4xl text-blue-600/100" />
                    )}
                    {notif.reaction === "haha" && (
                      <NotoFaceWithTearsOfJoy className="text-yellow-700 text-4xl text-blue-600/100" />
                    )}
                    {notif.reaction === "fire" && (
                      <TwemojiFire className="text-yellow-400 text-4xl text-blue-600/100" />
                    )}
                    {notif.reaction === "sad" && (
                      <NotoSadButRelievedFace className="text-red-400 text-4xl text-blue-600/100" />
                    )}
                    {notif.reaction === "angry" && (
                      <NotoAngryFace className="text-orange-500 text-4xl text-blue-600/100" />
                    )}
                  </>
                )}
                {notif.notificationType === "following" && (
                  <FluentPersonArrowBack24Filled className="text-4xl cursor-pointer" />
                )}
              </div>
            </div>
            <div className="">
              <span className="text-gray-400 text-center text-xs">
                {notif.timeStamp}
              </span>
            </div>
          </div>
        ))}

        {!showAllNotification && (
          <div className="block text-center px-4 py-2">
            <hr className="h-px mt-1 mb-1 bg-gray-200 border-0 dark:bg-gray-700" />
            <button
              onClick={handleShowMoreNotif}
              className="text-blue-500 text-sm font-bold hover:underline"
            >
              Show More
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
