import { Modal } from "@mantine/core";

import { Link } from "react-router-dom";

import { Post, User } from "../../types/payload";
import { ModalComponent, ParentComponent } from "../../types/Props";

import { Comment } from "../atoms";
import ProfilePicture from "../atoms/ProfilePicture";
import Likes from "../organism/Likes";
import NewComment from "./NewComment";
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
            <img
              src={data.media.url}
              alt=""
              className="ml-auto  h-[90vmin] object-contain "
            />
          </div>
        )}
        <div
          className={
            "w-full max-w-md bg-white " + (!data.media ? "h-[90vmin] " : "")
          }
        >
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
              <PostButtons postData={data} onDetailReq={() => {}} />
              <div className="mt-2 flex flex-col gap-2 text-sm">
                {data.likes.length > 0 && (
                  <Likes dataLikes={data.likes} detailToggler={() => {}} />
                )}
                <NewComment postData={data} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default PostDetail;
