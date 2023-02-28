import React from "react";
import imagePost1 from "./../../assets/postpic1.jpg";
import { BsHeart } from "react-icons/bs";
import { GoComment } from "react-icons/go";
import { IoPaperPlaneOutline } from "react-icons/io5";
import CommentHint from "../atoms/CommentHint";

const Post = () => {
  return (
    <div className="p-4 rounded-xl overflow-hidden bg-white">
      <img src={imagePost1} alt="post1" className="rounded-xl aspect-video" />
      <div className="flex gap-5 pt-4">
        <button title="Like">
          <BsHeart className="w-6 h-6" />
        </button>
        <button title="Comments">
          <GoComment className="w-6 h-6" />
        </button>
        <button title="Share">
          <IoPaperPlaneOutline className="w-6 h-6" />
        </button>
      </div>
      <div className="mt-4 flex flex-col gap-2">
        <span className="text-gray-400 font-medium">{2000} likes</span>
        <p className="">
          <span className="font-bold">Udin</span> Party time{" "}
        </p>

        <div className="flex flex-col gap-1">
          <button className="w-fit text-gray-500">view all 45 comments</button>
          <CommentHint />
          <CommentHint />
        </div>
      </div>
    </div>
  );
};

export default Post;
