import React from "react";
import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import { getUserById } from "../../api/services/User";
import { Comment as CommentPayload } from "../../types/payload";
import ProfilePicture from "./ProfilePicture";

interface CommentProps {
  data: CommentPayload;
}

const Comment = ({ data }: CommentProps) => {
  const { data: c } = useQuery(`user${data.userId}`, () =>
    getUserById(data.userId)
  );
  return (
    <div className="flex gap-3">
      <ProfilePicture img={{ src: c?.profilePicture }} size="lg" />
      <div className="flex flex-col gap-1">
        <div className="flex items-center gap-2">
          <Link to={`/${data?.userId}`} className="hover:underline">
            <span className="font-bold ">{c?.userName}</span>
          </Link>
          <p className="text-sm">{data.comment}</p>
        </div>
        <div className="flex text-xs text-gray-500 gap-5 ">
          <span className="">1 D</span>
          <button>Reply</button>
        </div>
      </div>
    </div>
  );
};

export default Comment;
