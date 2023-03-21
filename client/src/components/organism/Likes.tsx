import React from "react";
import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import { getUserById } from "../../api/services/User";
import { Post } from "../../types/payload";
import ProfilePicture from "../atoms/ProfilePicture";

interface LikesProps {
  dataLikes: Post["likes"];
  detailToggler: () => void;
}

const Likes = ({ dataLikes, detailToggler }: LikesProps) => {
  const { data: commentor } = useQuery([`user`,dataLikes.at(0)], () =>
    getUserById(dataLikes?.at(0)|| ""),
    {
      enabled : Boolean(dataLikes.at(0)) 
    }
  );

  return (
    <div className="flex items-center gap-1">
      <div className="">
        <ProfilePicture img={{src: commentor?.profilePicture}} size="sm"/>
      </div>
      <span className="text-gray-400 ">
        Liked by <Link className="font-bold text-gray-400" to={`${dataLikes.at(0)}`}>{ commentor?.userName}</Link>
      </span>
      {dataLikes?.length > 2 && (
        <button className="text-gray-400 font-medium" onClick={detailToggler}>
          Others
        </button>
      )}
    </div>
  );
};

export default Likes;
