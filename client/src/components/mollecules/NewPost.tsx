import { useState } from "react";
import profile from "../../assets/profileImg.jpg";
import { IoImageOutline, IoLocationOutline } from "react-icons/io5";
import { AiOutlineVideoCameraAdd } from "react-icons/ai";
import { RiCalendarCheckLine } from "react-icons/ri";
import { Button } from "../atoms";
import { isNotEmpty, useForm } from "@mantine/form";
import { HiOutlineXMark } from "react-icons/hi2";
import { useRef } from "react";
import PostApi from "../../api/services/Post";
import { TextInput } from "@mantine/core";
import { useMutation, useQueryClient } from "react-query";

const NewPost = ({ className }: { className?: string }) => {
  const imageInput = useRef<any>();
  const videoInput = useRef<any>();
  const queryClient = useQueryClient();

  const {mutate : uploadPost, isLoading} = useMutation(PostApi.createPost);


  const post = useForm({
    initialValues: {
      description: "",
    },
    validateInputOnChange: true,
    validate: {
      description: isNotEmpty("description can't be empty"),
    },
  });

  const [media, setMedia] = useState<any>();

  const handleMediaChange = (ev: React.ChangeEvent<any>) => {
    const media = ev.target.files[0];
    setMedia(media);
  };

  const sharePost = (values: any) => {
    uploadPost({ media, desc: values.description },{
      onSuccess : (data) => {
        console.log(data);
        queryClient.invalidateQueries("")
      }
    });
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
          <img src={profile} alt="" className="w-14 h-14 rounded-full" />
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
            onClick={() => imageInput.current?.click()}
          >
            <IoImageOutline className="w-6 h-6" />
            <span>Photo</span>
          </button>
          <button
            className="inline-flex gap-2 text-blue-500"
            onClick={() => videoInput.current?.click()}
          >
            <AiOutlineVideoCameraAdd className="w-6 h-6" />
            <span>Video</span>
          </button>

          <Button className="px-7 py-2 font-medium">Share</Button>
        </div>
      </form>
      {media && (
        <div className="relative mt-2">
          <button
            className="bg-gray-300 p-1 rounded-full grid place-content-center absolute right-0 top-0"
            onClick={() => setMedia(null)}
          >
            <HiOutlineXMark className="w-4 h-4" />
          </button>
          <img
            src={URL.createObjectURL(media)}
            className="w-full h-[70vh] object-contain"
            alt=""
          />
        </div>
      )}
    </div>
  );
};

export default NewPost;
