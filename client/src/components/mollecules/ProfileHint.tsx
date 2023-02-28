import React from "react";
import { Link } from "react-router-dom";
import cover from "./../../assets/cover.jpg";
import profile from "./../../assets/profileImg.jpg";

const ProfileHint = () => {
  return (
    <div className="flex flex-col items-center rounded-xl overflow-hidden bg-white shadow-md">
      <div className="relative flex flex-col items-center">
        <img src={cover} alt="" />
        <img
          src={profile}
          alt="profile"
          className="rounded-full shadow-lg shadow-gray/40 w-20 h-20 absolute bottom-0 translate-y-1/2 "
        />
      </div>
      <div className="mt-14 flex flex-col  items-center w-full px-4">
        <span className="font-medium text-lg">Reinand Furu</span>
        <p className=" text-gray-500 mt-1">Senior fullstack proggrammer</p>
        <div className="py-3 border-y border-gray-400 flex divide-x divide-gray-400 w-full items-stretch mt-6">
          <div className="flex flex-col items-center gap-1 flex-1">
            <span className="font-bold">6866</span>
            <span className="text-sm text-gray-400">Followers</span>
          </div>
          <div className="flex flex-col items-center gap-1 flex-1">
            <span className="font-bold">1</span>
            <span className="text-sm text-gray-400">Following</span>
          </div>
        </div>
      </div>
      <div className="py-6 ">
        <Link to="/my-profile" className="font-bold text-orange hover:underline underline-offset-2 ">My Profile</Link>
      </div>
    </div>
  );
};

export default ProfileHint;
