import { Avatar } from "@mui/material";
import Sponsored from "./Sponsored";
import { Link } from "react-router-dom";
import { useGetUserQuery } from "../../features/users/usersApiSlice";
import MenuListLeftBar from "./MenuListLeftBar";

export default function LeftBar() {

    const { data: userInfo } =  useGetUserQuery();
    const userId = userInfo?._id

    return (
        <div className="hidden xl:w-[26%] xl:block">
            <div
                className="h-full fixed overflow-hidden w-full xl:max-w-[290px] 2xl:max-w-[348px]"
                style={{ zIndex: "1" }}
            >
                <div className="w-full flex bg-white p-1.5">
                    <Link to={`/profile/id/${userId}`} className="w-full profileandName flex items-center space-x-3 hover:bg-gray-300 p-1.5 rounded cursor-pointer">
                        <div className="flex">
                            <Avatar
                                sx={{ width: 33, height: 33 }}
                                alt="Remy Sharp"
                                src={userInfo?.avatarUrl}
                            />
                        </div>
                        <div>
                            <p className="font-medium text-sm">
                                <span>{userInfo?.firstName} </span>  
                                <span>{userInfo?.middleName} </span>  
                                <span>{userInfo?.lastName}</span>
                            </p>
                        </div>
                    </Link>
                </div>
                <hr className="h-px bg-gray-200 border-0 dark:bg-gray-700" />
                <MenuListLeftBar/>
                
                <hr className="h-px mb-2 bg-gray-200 border-0 dark:bg-gray-700" />
                <Sponsored/>
            </div>
        </div>
    );
}
