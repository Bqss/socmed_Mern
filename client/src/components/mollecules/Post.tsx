import CommentHint from "../atoms/CommentHint";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { Post as post, User } from "../../types/payload";
import ProfilePicture from "../atoms/ProfilePicture";
import { getUserById } from "../../api/services/User";
import { Link } from "react-router-dom";
import PostApi from "../../api/services/Post";

import { useState } from "react";
import PostDetail from "./PostDetail";
import Likes from "../organism/Likes";
import PostButtons from "./PostBButtons";

interface PostProps {
  data: post;
}

const Post = ({ data }: PostProps) => {
  const { data: creator } = useQuery<User>(`user${data.creator}`, () =>
    getUserById(data.creator)
  );
  const [isOpenDetail, setIsOpenDetail] = useState<boolean>(false);
  const [comment, setComment] = useState<string>("");

  const queryClient = useQueryClient();
  const { mutateAsync: addComment } = useMutation(PostApi.addComment);

  const commentHandler = async (event: React.FormEvent) => {
    event.preventDefault();
    await addComment(
      {
        comment,
        postId: data._id,
      },
      {
        onSuccess: () => {
          queryClient.invalidateQueries("posts");
          setComment("");
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
            <div className="flex gap-2 items-center ">
              <Link to={`/${creator?._id}`} className="hover:underline">
                <span className="font-bold ">{creator?.userName}</span>
              </Link>
              <Link to={`/${creator?._id}`}>
                <span className="text-gray-600 text-sm">
                  {"@" + creator?.firstName + "_" + creator?.lastName}
                </span>
              </Link>
            </div>
            <p>{data.desc}</p>
            <div className="mt-4">
              {data.media && (
                <img
                  src={data?.media}
                  alt="post1"
                  className="rounded-xl object-contain object-center aspect-video w-auto"
                />
              )}
            </div>
            
            <PostButtons postData={data} onDetailReq={() => setIsOpenDetail(true)}/>

            <div className="mt-2 flex flex-col gap-2 text-sm">
              {data.likes?.length > 0 && (
                <Likes dataLikes={data.likes} detailToggler={() => {}} />
              )}
              {data.comments.length > 0 && (
                <div className="flex flex-col gap-1 ">
                  {data.comments.length > 2 && (
                    <button className="w-fit text-gray-500">
                      {`view all ${data.comments.length} comments`}
                    </button>
                  )}
                  {data.comments.slice(0, 2).map((comment, i) => (
                    <CommentHint data={comment} key={i} />
                  ))}
                </div>
              )}
              <form onSubmit={commentHandler}>
                <div className="relative">
                  <input
                    type="text"
                    value={comment}
                    onChange={(ev) => setComment(ev.target.value)}
                    name="comment"
                    id="comment"
                    placeholder="Add comment"
                    className=" py-1 w-full"
                  />
                  {comment && (
                    <button className="absolute right-0 text-gray-600">
                      Post
                    </button>
                  )}
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Post;
