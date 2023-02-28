import React from "react";
import {BsHeart} from "react-icons/bs"

const CommentHint = () => {
  return (
    <div className="flex justify-between">
      <div className="flex gap-1">
        <span className="font-bold">nanda</span>
        <p>dsfkljhsdfljhsdfldsfl</p>
      </div>
      <button>
        <BsHeart/>
      </button>
    </div>
  );
};

export default CommentHint;
