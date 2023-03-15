import { Modal } from "@mantine/core";
import { useState } from "react";
import { AiOutlineHeart } from "react-icons/ai";
import { GoComment } from "react-icons/go";
import { IoPaperPlaneOutline } from "react-icons/io5";
import { useQueryClient } from "react-query";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getUserState } from "../../slices/UserSlice";
import { Post, User } from "../../types/payload";
import { ModalComponent, ParentComponent } from "../../types/Props";
import { isLiked } from "../../utils";
import { Comment } from "../atoms";
import ProfilePicture from "../atoms/ProfilePicture";
import Likes from "../organism/Likes";
import PostButtons from "./PostBButtons";

interface PostDetailProps extends ModalComponent, ParentComponent {
  data: Post;
  creator: User | undefined;
}

const PostDetail = ({
  data,
  creator,
  className,
  isOpen,
  onClose,
}: PostDetailProps) => {

  const [comment, setComment] = useState<string>("");
  const commentHandler = () => {}


  return (
    <Modal
      opened={isOpen}
      onClose={onClose}
      className={className + "relative"}
      withCloseButton={false}
      transition="fade"
      transitionDuration={500}
      size={"auto"}
      classNames={{
        modal: "w-full bg-transparent",
        body: "w-full",
        inner: "p-0",
      }}
      radius={"md"}
      centered
    >
      <button className="text-white absolute right-5 top-0" onClick={onClose}>
        X
      </button>
      <div className=" flex justify-center items-stretch">
        {data.media && (
          <div className=" flex   ">
            <img src={data.media} alt="" className="ml-auto  h-[90vmin] object-contain " />
          </div>
        )}
        <div className={"w-full max-w-md bg-white "}>
          <div className="flex flex-col h-full justify-between">
            <div>
              <div className="flex gap-3 items-center border-b border-gray-200 p-2">
                <ProfilePicture
                  size="lg"
                  img={{ src: creator?.profilePicture }}
                />
                <Link to={`/${creator?._id}`} className="hover:underline">
                  <span className="font-bold ">{creator?.userName}</span>
                </Link>
              </div>
              <div className="p-2 mt-2 flex flex-col gap-5 overflow-y-auto">
                {data.comments.map((comment, i) => (
                  <Comment data={comment} key={i} />
                ))}
              </div>
            </div>
            <div className="p-4">
              <PostButtons postData={data} onDetailReq={() => {}}/>
              <div className="mt-2 flex flex-col gap-2 text-sm">
                {data.likes.length > 0 && (
                  <Likes dataLikes={data.likes} detailToggler={() => {}}/>
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
      </div>
    </Modal>
  );
};

export default PostDetail;
