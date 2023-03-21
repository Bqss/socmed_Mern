import CommentHint from "../atoms/CommentHint";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { Post as post, User } from "../../types/payload";
import { HiOutlineDotsHorizontal } from "react-icons/hi";
import ProfilePicture from "../atoms/ProfilePicture";
import { getUserById } from "../../api/services/User";
import { Link } from "react-router-dom";

import { useState } from "react";
import PostDetail from "./PostDetail";
import Likes from "../organism/Likes";
import PostButtons from "./PostBButtons";
import NewComment from "./NewComment";

import { Menu } from "@mantine/core";
import PostApi from "../../api/services/Post";
import { toast } from "react-hot-toast";
import { isSelf } from "../../utils";
import { useSelector } from "react-redux";
import { getUserState } from "../../slices/UserSlice";

interface PostProps {
  data: post;
}

const Post = ({ data }: PostProps) => {
  const { data: creator } = useQuery<User>(["user",data.creator], () =>
    getUserById(data.creator)
  );
  const {crediental:user} = useSelector(getUserState);
  const { mutate: deletePost } = useMutation(PostApi.deletePost);
  const queryClient = useQueryClient();
  const [isOpenDetail, setIsOpenDetail] = useState<boolean>(false);

  const slf = isSelf({ currentId: data.creator, userId: user?._id || "" });

  const deleteHandler = () => {
    deletePost(
      { postId: data._id },
      {
        onSuccess() {
          queryClient.invalidateQueries("posts");
          toast.success("success deleting post");
        },
      }
    );
  };

  return (
    <>
      <PostDetail
        data={data}
        creator={creator}
        isOpen={isOpenDetail}
        onClose={() => setIsOpenDetail(false)}
      />
      <div className="p-4 py-6 rounded-xl overflow-hidden bg-white ">
        <div className="flex gap-4">
          <ProfilePicture
            img={{ src: creator?.profilePicture, alt: creator?.userName }}
            size="lg"
            className="flex-shrink-0"
          />
          <div className="flex flex-col flex-1">
            <div className="flex justify-between gap-2 items-center ">
              <span className="space-x-2">
                <Link to={`/${creator?._id}`} className="hover:underline">
                  <span className="font-bold ">{creator?.userName}</span>
                </Link>
                <Link to={`/${creator?._id}`}>
                  <span className="text-gray-600 text-sm">
                    {"@" + creator?.firstName + "_" + creator?.lastName}
                  </span>
                </Link>
              </span>
              {slf && (
                <Menu width={200} shadow="md">
                  <Menu.Target>
                    <button>
                      <HiOutlineDotsHorizontal className="w-5 h-5" />
                    </button>
                  </Menu.Target>
                  <Menu.Dropdown>
                    <Menu.Item onClick={deleteHandler}>Delete</Menu.Item>
                  </Menu.Dropdown>
                </Menu>
              )}
            </div>
            <p>{data.desc}</p>
            <div className="mt-4">
              {data.media && (
                <img
                  src={data?.media.url}
                  alt="post1"
                  className="rounded-md object-contain  aspect-video w-auto"
                />
              )}
            </div>

            <PostButtons
              postData={data}
              onDetailReq={() => setIsOpenDetail(true)}
            />

            <div className="mt-2 flex flex-col gap-2 text-sm">
              {data.likes?.length > 0 && (
                <Likes dataLikes={data.likes} detailToggler={() => {}} />
              )}
              {data.comments.length > 0 && (
                <div className="flex flex-col gap-1 ">
                  {data.comments.length > 2 && (
                    <button
                      className="w-fit text-gray-500"
                      onClick={() => setIsOpenDetail(true)}
                    >
                      {`view all ${data.comments.length} comments`}
                    </button>
                  )}
                  {data.comments.slice(0, 2).map((comment, i) => (
                    <CommentHint data={comment} key={i} />
                  ))}
                </div>
              )}
              <NewComment postData={data} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Post;
