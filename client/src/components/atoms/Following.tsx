import React from "react";
import { useQuery } from "react-query";
import { getUserById } from "../../api/User";
import {Button} from "./../atoms";

interface FollowingProps {
  id: string;
}

const Following = ({ id }: FollowingProps) => {
  const {data} = useQuery(`user${id}`, () =>getUserById(id))

 
  return (
    <div className="flex justify-between items-center">
      <div className="flex gap-3">
        {!data?.profilePicture? (
          <div className="w-12 h-12 bg-gray-200 rounded-full"></div>
        ):(
          <img src={data?.profilePicture} alt="" className="w-12  h-12 rounded-full" />
        )}
        <div className="flex flex-col justify-center text-sm -space-y-1">
          <span className="font-medium">{data?.userName}</span>
          <span className="text text-gray-500">{"@"+data?.firstName+"_"+data?.lastName}</span>
        </div>
      </div>
      <Button className="px-6 py-2 text-white font-medium text-sm ">Follow</Button>
    </div>
  );
};

export default Following;
