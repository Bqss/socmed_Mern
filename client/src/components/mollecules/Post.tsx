import { BsHeart } from "react-icons/bs";
import { GoComment } from "react-icons/go";
import { IoPaperPlaneOutline } from "react-icons/io5";
import CommentHint from "../atoms/CommentHint";
import { useQuery } from "react-query";
import { Post as post, User } from "../../types/payload";
import ProfilePicture from "../atoms/ProfilePicture";
import { getUserById } from "../../api/services/User";
import { Link, NavLink } from "react-router-dom";

interface PostProps {
  data: post;
}

const Post = ({ data }: PostProps) => {
  const { data: creator } = useQuery<User>(`user${data.creator}`, () =>
    getUserById(data.creator)
  );
  return (
    <div className="p-4 rounded-xl overflow-hidden bg-white ">
      <div className="flex gap-4">
        <ProfilePicture
          img={{ src: creator?.profilePicture, alt: creator?.userName }}
          size="lg"
          className="flex-shrink-0"
        />
        <div className="flex flex-col">
          <div className="flex gap-2 ">
            <Link to={`/${creator?._id}`}>
              <span className="font-bold ">{creator?.userName}</span>
            </Link>
            <Link to={`/${creator?._id}`}>
              <span className="text-gray-600">
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
                className="rounded-xl aspect-video w-auto"
              />
            )}
          </div>
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
              <button className="w-fit text-gray-500">
                view all 45 comments
              </button>
              <CommentHint />
              <CommentHint />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Post;
