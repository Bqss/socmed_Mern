import React from "react";
import {Button} from "./../atoms";

interface FollowingProps {
  data: any;
}

const Following = ({ data }: FollowingProps) => {
  const {name, picture } = data;
  return (
    <div className="flex justify-between items-center">
      <div className="flex gap-3">
        <img src={picture?.medium} alt="" className="w-12 h-12 rounded-full" />
        <div className="flex flex-col justify-center text-sm -space-y-1">
          <span className="font-medium">{name.first+" "+name.last}</span>
          <span className="text text-gray-500">{"@"+name.first+name.last}</span>
        </div>
      </div>
      <Button className="px-6 py-2 text-white font-medium text-sm ">Follow</Button>
    </div>
  );
};

export default Following;
