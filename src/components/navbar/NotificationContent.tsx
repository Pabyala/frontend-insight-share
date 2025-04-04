  import { useEffect, useRef, useState } from "react";
  import { Avatar } from "@mui/material";
  import { FluentColorComment48, FluentPersonArrowBack24Filled, NotoAngryFace, NotoFaceWithTearsOfJoy, NotoOrangeHeart, NotoSadButRelievedFace, TwemojiFire, TwemojiRaisingHands, } from "../others/CustomIcons";
  import '.././style/style-navigation.css'
  import '.././style/Style.css'
  import { MyNotification } from "../../interface/notification-types";
import TimeAgoPost from "../post/TimeAgoPost";
import { useMarkAllAsReadMutation, useMarkNotificationAsReadMutation } from "../../features/notification/notificationApiSlice";
import { useGetUserQuery } from "../../features/users/usersApiSlice";
import { showToast } from "../utils/ToastUtils";

interface propsNotificationContent {
  getUserNotification?: MyNotification[];
  refetch: () => Promise<any>;
}

export default function NotificationContent({ getUserNotification, refetch }: propsNotificationContent) {
  const [windowHeight, setWindowHeight] = useState(window.innerHeight);
  const dropdownRef = useRef(null);
  const [showAllNotification, setShowAllNotification] = useState<boolean>(false);
  const [markAllAsRead] = useMarkAllAsReadMutation();
  const [markNotificationAsRead] = useMarkNotificationAsReadMutation();
  const { data: userInfo } = useGetUserQuery();
  const userId = userInfo?._id

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

  const handleMarkAsRead = async (notificationId: string) => {
    try {
      await markNotificationAsRead(notificationId).unwrap();
      refetch(); 
    } catch (error) {
      showToast("Error marking notification as read.", "error");
    }
  }

  const handleMarkAllAsRead = async () => {
    if (!userId) {
      showToast("User ID is missing. Cannot mark notifications as read.");
      return;
    }
    try {
        await markAllAsRead(userId).unwrap();
        refetch();
    } catch (error) {
      showToast("Error marking notifications as read.", "error")
    }
  }

    return (
      <div
        ref={dropdownRef}
        className="notif-cont absolute top-full right-[-44px] mt-[18px] w-[392px] bg-white rounded-md shadow-lg py-2 px-2.5"
        style={{ maxHeight: `${windowHeight - 100}px`, overflowY: "auto", zIndex: '2'}}
      >
        <div className="custom-scroll-bar max-h-none">
          <div className="block py-2 text-gray-800 ">
            <span className="text-sm font-semibold">Notifications</span>
            <hr className="h-px mt-1 mb-1 bg-gray-200 border-0" />
          </div>

          <div className="space-y-1">
            <div className="w-full flex justify-between items-center bg-gray-100 p-1 rounded">
                <div onClick={handleMarkAllAsRead} className="w-full flex justify-center text-blue-600 font-medium cursor-pointer hover:underline text-sm">
                    Mark all as read
                </div>
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
                          <NotoSadButRelievedFace className="text-orange-500 text-4xl text-blue-600/100" />
                        )}
                      </>
                    )}
                    {notif.type === "follow" && (
                      <FluentPersonArrowBack24Filled className="text-4xl cursor-pointer" />
                    )}
                    {notif.type === "comment" && (
                      <FluentColorComment48 className="text-4xl cursor-pointer" />
                    )}
                    {(notif.type === "reactionToComment" || notif.type === "reactionToReply") && (
                      <>
                        {notif.typeOfNotification === "heart" && (
                          <NotoOrangeHeart className="text-red-600 text-4xl text-blue-600/100" />
                        )}
                      </>
                    )}
                  </div>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400 text-center text-xs flex items-center">
                    <TimeAgoPost 
                      timeStamp={notif.createdAt}
                    />
                  </span>
                  <div>
                    <span 
                      className={
                        notif.isRead
                          ? "text-gray-400 text-xs" : "text-blue-600 text-xs font-medium hover:underline"
                      }
                      onClick={() => handleMarkAsRead(notif._id)}
                    >
                      Mark as read
                    </span>
                  </div>
                </div>
              </div>
            ))} 
          </div>


          { getUserNotification && getUserNotification.length >= 6 && !showAllNotification && (
            <div className="block text-center px-4 py-2">
              <hr className="h-px mt-1 mb-1 bg-gray-200 border-0" />
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
