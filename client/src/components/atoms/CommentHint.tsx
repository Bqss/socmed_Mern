import React from "react";
import {BsHeart} from "react-icons/bs"
import { useQuery } from "react-query";
import { getUserById } from "../../api/services/User";
import { Comment } from "../../types/payload";
import { ParentComponent } from "../../types/Props";

interface CommentHintProps extends ParentComponent{
  data: Comment
}

const CommentHint = ({data}:CommentHintProps) => {
  const {data: user , isLoading} = useQuery([`user`,data.userId],() => getUserById(data.userId),{
    enabled : Boolean(data.userId) 
  });
  return (
    <div className="flex justify-between">
      <div className="flex gap-1">
        <span className="font-medium">{user?.userName}</span>
        <p>{data.comment}</p>
      </div>
    </div>
  );
};

export default CommentHint;
