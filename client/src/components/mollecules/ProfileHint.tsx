import React from "react";
import { useSelector } from "react-redux";
import { getUserState } from "../../slices/UserSlice";
import {HiOutlineDotsHorizontal} from  "react-icons/hi"
import ProfilePicture from "../atoms/ProfilePicture";
import { useQuery } from "react-query";
import { getUserById } from "../../api/services/User";


const ProfileHint = () => {
  const {crediental} = useSelector(getUserState);
  const {data: user} = useQuery(["user", crediental._id],() => getUserById(crediental._id||""),{
    enabled : Boolean(crediental._id)
  });
  
  return (
    
      <div className="flex justify-between items-center w-full p-2 rounded-full hover:bg-black/10 ">
        <div className="flex gap-2 items-center">
          {user?.profilePicture ? (
            <ProfilePicture img={{src: user?.profilePicture }} size="lg" />
          ):(
            <div className="w-12 h-12 rounded-full bg-gray-200"></div>
          )}
          <div className="flex flex-col justify-between">
            <span className="font-medium">{user?.userName}</span>
            <span className="text-gray-700">{`@${user?.firstName}_${user?.lastName}`}</span>
          </div>
        </div>
        <button className="font-medium text-xl align-middle p-1 rounded-md hover:bg-black/20">
          <HiOutlineDotsHorizontal/>
        </button>
      </div>
 
  );
};

export default ProfileHint;
