import React from "react";
import { AiOutlineHeart } from "react-icons/ai";
import { GoComment } from "react-icons/go";
import { IoPaperPlaneOutline } from "react-icons/io5";
import { useMutation, useQueryClient } from "react-query";
import { useSelector } from "react-redux";
import PostApi from "../../api/services/Post";
import { getUserState } from "../../slices/UserSlice";
import { Post } from "../../types/payload";
import { ParentComponent } from "../../types/Props";
import { isLiked } from "../../utils";


interface PostButtonsProps extends ParentComponent{
  postData : Post,
  onDetailReq : () => void,
  
}

const PostButtons = ({postData, onDetailReq, className}:PostButtonsProps) => {

  const { mutateAsync: likePost, isLoading: otwLike } = useMutation(
    PostApi.likePost
  );
  const { mutateAsync: unlikePost, isLoading: otwUnlike } = useMutation(
    PostApi.unlikePost
  );
  const user = useSelector(getUserState);
  const queryClient = useQueryClient();
  const liked = isLiked({ PostData: postData, userId: user.value._id });

  const likeHandler = async (event: React.MouseEvent) => {
    event.preventDefault();
    try {
      !liked
        ? await likePost({ postId: postData?._id })
        : await unlikePost({ postId: postData?._id });
      queryClient.invalidateQueries("posts");
    } catch (err) {}
  };
  return (
    <div className={["flex gap-5  pt-4",className].join(" ")}>
      <button title="Like" onClick={likeHandler}>
        <AiOutlineHeart
          className={(liked
            ? "stroke-button-grad1 fill-button-grad1"
            : " stroke-black "
          ).concat(" h-6 w-6")}
        />
      </button>
      <button
        title="Comments"
        className="hover:text-gray-500"
        onClick={onDetailReq}
      >
        <GoComment className="w-5 h-5" />
      </button>
      <button title="Share" className="hover:text-gray-500">
        <IoPaperPlaneOutline className="w-5 h-5" />
      </button>
    </div>
  );
};

export default PostButtons;
