import { useState } from "react";
import { IoImageOutline } from "react-icons/io5";
import toast from "react-hot-toast";
import { ClipLoader } from "react-spinners";
import { Button } from "../atoms";
import { useForm } from "@mantine/form";
import { HiOutlineXMark } from "react-icons/hi2";
import { useRef } from "react";
import PostApi from "../../api/services/Post";
import { TextInput } from "@mantine/core";
import { useMutation, useQueryClient } from "react-query";
import { AiOutlineVideoCameraAdd } from "react-icons/ai";
import ProfilePicture from "../atoms/ProfilePicture";
import { useSelector } from "react-redux";
import { getUserState } from "../../slices/UserSlice";

const NewPost = ({ className }: { className?: string }) => {
  const imageInput = useRef<any>();
  const {crediental : user} = useSelector(getUserState);
  const videoInput = useRef<any>();
  const [media, setMedia] = useState<any>();
  const queryClient = useQueryClient();
  const { mutate: uploadPost, isLoading: isUploading } = useMutation(
    PostApi.createPost
  );

  const post = useForm({
    initialValues: {
      description: "",
    },
  });

  const handleMediaChange = (ev: React.ChangeEvent<any>) => {
    const media = ev.target.files[0];
    setMedia(media);
  };

  const sharePost = (values: any) => {
    uploadPost(
      { media, desc: values.description },
      {
        onSuccess: (data) => {
          setMedia(null);
          post.reset();
          toast.success(data.message);
          queryClient.invalidateQueries("posts");
        },
      }
    );
  };

  return (
    <div
      className={[
        "bg-white p-6 rounded-xl flex flex-col justify-center shadow-sm",
        className,
      ].join(" ")}
    >
      <form onSubmit={post.onSubmit(sharePost)}>
        <div className="flex gap-4 items-center">
          <ProfilePicture img={{ src: user.profilePicture }} size="lg" />
          <TextInput
            name="description"
            placeholder="What's happening ?"
            id="description"
            classNames={{
              input:
                "bg-gray-100 w-full px-5 py-3 placeholder-black rounded-lg flex-1",
              root: " w-full ",
            }}
            {...post.getInputProps("description")}
          ></TextInput>
        </div>
        <div className="flex ml-auto justify-end items-center gap-6 mt-4">
          <input
            type="file"
            className="w-0 h-0"
            name=""
            accept="image/png, image/jpg"
            onChange={handleMediaChange}
            ref={imageInput}
          />
          <input
            type="file"
            className="w-0 h-0"
            name=""
            accept="video/mp4, video/3gp"
            onChange={handleMediaChange}
            ref={videoInput}
          />
          <button
            className="inline-flex gap-2 text-green-500"
            onClick={(ev) => {
              ev.preventDefault();
              imageInput.current?.click();
            }}
          >
            <IoImageOutline className="w-6 h-6" />
            <span>Photo</span>
          </button>
          <button
            className="inline-flex gap-2 text-blue-500"
            onClick={(ev) => {
              ev.preventDefault();
              videoInput.current?.click();
            }}
          >
            <AiOutlineVideoCameraAdd className="w-6 h-6" />
            <span>Video</span>
          </button>

          <Button
            className="px-7 py-2 font-medium"
            disableWhenLoading = {true}
            loading = {isUploading}
            LoadingIcon = {<ClipLoader size={18} color={ "fff"} />}
          >
            Share
          </Button>
        </div>
      </form>
      {media && (
        <div className="relative mt-2">
          <button
            className="bg-gray-300 p-1 rounded-full grid place-content-center absolute right-0 top-2"
            onClick={() => setMedia(null)}
          >
            <HiOutlineXMark className="w-4 h-4" />
          </button>
          <img
            src={URL.createObjectURL(media)}
            className="w-full  aspect-video object-contain"
            alt=""
          />
        </div>
      )}
    </div>
  );
};

export default NewPost;
