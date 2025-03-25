  import { useEffect, useRef, useState } from "react";
  import { Avatar } from "@mui/material";
  import { AntDesignDislikeFilled, FluentColorComment48, FluentPersonArrowBack24Filled, NotoAngryFace, NotoFaceWithTearsOfJoy, NotoOrangeHeart, NotoSadButRelievedFace, TwemojiFire, TwemojiRaisingHands, } from "../others/CustomIcons";
  import '.././style/style-navigation.css'
  import '.././style/Style.css'
  import { MyNotification } from "../../interface/notification-types";
import TimeAgoPost from "../post/TimeAgoPost";

interface propsNotificationContent {
  getUserNotification?: MyNotification[];
}

export default function NotificationContent({ getUserNotification }: propsNotificationContent) {
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

    return (
      <div
        ref={dropdownRef}
        className="notif-cont absolute top-full right-[-44px] mt-[12px] w-[392px] bg-white rounded-md shadow-lg py-2 px-2.5"
        style={{ maxHeight: `${windowHeight - 100}px`, overflowY: "auto", zIndex: '2'}}
      >
        <div className="custom-scroll-bar max-h-none">
          <div className="block py-2 text-gray-800 ">
            <span className="text-sm font-semibold">Notifications</span>
            <hr className="h-px mt-1 mb-1 bg-gray-200 border-0 dark:bg-gray-700" />
          </div>

          {getUserNotification?.map((notif) => (
            <div
              key={notif._id}
              className={
                notif.isRead
                  ? "block px-2 py-1.5 text-xs text-gray-800 hover:bg-gray-100 lg:text-sm cursor-pointer rounded" : "bg-gray-100 block px-2 py-1.5 text-xs text-gray-800 hover:bg-gray-100 lg:text-sm cursor-pointer rounded"
              }
            >
              <div 
                className="flex justify-between space-x-2"
              >
                <div className="profileAndDisc flex items-center space-x-2">
                  <div className="flex" style={{ margin: "auto" }}>
                    <Avatar
                      sx={{ width: 38, height: 38 }}
                      alt="Remy Sharp"
                      src={notif.senderId.avatarUrl}
                    />
                  </div>
                  <div>
                    {/* FOR REACTION */}
                    {notif.type === "reaction" && (
                      <>
                        <span className="font-semibold text-sm">
                          {notif.senderId.firstName} {notif.senderId.middleName} {notif.senderId.lastName}
                        </span>
                        <span className="text-sm">
                          {" "}
                          reacted to your post: "{notif.postId?.captionPost.slice(0, 25)}
                          ..."
                        </span>
                      </>
                    )}

                    {/* FOR REACTION TO COMMENT*/}
                    {notif.type === "reactionToComment" && (
                      <>
                        <span className="font-semibold text-sm">
                          {notif.senderId.firstName} {notif.senderId.middleName} {notif.senderId.lastName}
                        </span>
                        <span className="text-sm">
                          {" "}
                          {notif?.message} "{notif.commentId?.comment.slice(0, 25)}
                          ..."
                        </span>
                      </>
                    )}

                    {/* FOR REACTION TO FOLLOWED USER*/}
                    {notif.type === "follow" && (
                      <>
                        <span className="font-semibold text-sm">
                          {notif.senderId.firstName} {notif.senderId.middleName} {notif.senderId.lastName}
                        </span>
                        <span className="text-sm">
                          {" "}
                          {notif?.message}.
                        </span>
                      </>
                    )}

                    {/* FOR REACTION TO REPLY*/}
                    {notif.type === "reactionToReply" && (
                      <>
                        <span className="font-semibold text-sm">
                          {notif.senderId.firstName} {notif.senderId.middleName} {notif.senderId.lastName}
                        </span>
                        <span className="text-sm">
                          {" "}
                          {notif?.message} "{notif.commentId?.replies?.[0]?.comment.slice(0, 25)}
                          ..."
                        </span>
                      </>
                    )}

                    {/* FOR COMMENT */}
                    {notif.type === "comment" && (
                      <>
                        <span className="font-semibold text-sm">
                          {notif.senderId.firstName} {notif.senderId.middleName} {notif.senderId.lastName}
                        </span>
                        <span className="text-sm">
                          {" "}
                          commented on your post. "{notif.postId?.captionPost.slice(0, 25)}
                          ..."
                        </span>
                      </>
                    )}
                    
                  </div>
                </div>
                <div>
                  {notif.type === "reaction" && (
                    <>
                      {notif.typeOfNotification === "handsUp" && (
                        <TwemojiRaisingHands className="text-4xl" />
                      )}
                      {notif.typeOfNotification === "heart" && (
                        <NotoOrangeHeart className="text-red-600 text-4xl text-blue-600/100" />
                      )}
                      {notif.typeOfNotification === "haha" && (
                        <NotoFaceWithTearsOfJoy className="text-yellow-700 text-4xl text-blue-600/100" />
                      )}
                      {notif.typeOfNotification === "fire" && (
                        <TwemojiFire className="text-yellow-400 text-4xl text-blue-600/100" />
                      )}
                      {notif.typeOfNotification === "sad" && (
                        <NotoSadButRelievedFace className="text-red-400 text-4xl text-blue-600/100" />
                      )}
                      {notif.typeOfNotification === "angry" && (
                        <NotoAngryFace className="text-orange-500 text-4xl text-blue-600/100" />
                      )}
                      {notif.typeOfNotification === "disLike" && (
                        <AntDesignDislikeFilled className="text-orange-500 text-4xl text-blue-600/100" />
                      )}
                    </>
                  )}
                  {notif.type === "follow" && (
                    <FluentPersonArrowBack24Filled className="text-4xl cursor-pointer" />
                  )}
                  {notif.type === "comment" && (
                    <FluentColorComment48 className="text-4xl cursor-pointer" />
                  )}
                  {notif.type === "reactionToComment" || notif.type === "reactionToReply" && (
                    <>
                      {notif.typeOfNotification === "heart" && (
                        <NotoOrangeHeart className="text-red-600 text-4xl text-blue-600/100" />
                      )}
                    </>
                  )}
                </div>
              </div>
              <div className="">
                <span className="text-gray-400 text-center text-xs">
                  <TimeAgoPost 
                    timeStamp={notif.createdAt}
                  />
                </span>
              </div>
            </div>
          ))} 

          { getUserNotification && getUserNotification.length >= 6 && !showAllNotification && (
            <div className="block text-center px-4 py-2">
              <hr className="h-px mt-1 mb-1 bg-gray-200 border-0 dark:bg-gray-700" />
              <button
                onClick={handleShowMoreNotif}
                className="text-blue-500 text-sm font-semibold hover:underline"
              >
                Show More
              </button>
            </div>
          )}
        </div>
      </div>
    );
  }
