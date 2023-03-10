import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getUserState } from "../../slices/UserSlice";
import {HiOutlineDotsHorizontal} from  "react-icons/hi"
import cover from "./../../assets/cover.jpg";
import profile from "./../../assets/profileImg.jpg";

const ProfileHint = () => {
  const user = useSelector(getUserState);
  return (
    
      <div className="flex justify-between items-center w-full p-2 rounded-full hover:bg-black/10 ">
        <div className="flex gap-2 items-center">
          {user?.value?.profilePicture ? (
            <img src={user?.value?.profilePicture } alt="" className="w-12 h-12 rounded-full bg-gray-200" />
          ):(
            <div className="w-12 h-12 rounded-full bg-gray-200"></div>
          )}
          <div className="flex flex-col justify-between">
            <span className="font-medium">{user?.value?.userName}</span>
            <span className="text-gray-700">{`@${user?.value?.firstName}_${user?.value?.lastName}`}</span>
          </div>
        </div>
        <button className="font-medium text-xl align-middle p-1 rounded-md hover:bg-black/20">
          <HiOutlineDotsHorizontal/>
        </button>
      </div>
 
  );
};

export default ProfileHint;
