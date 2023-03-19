import React, { useRef, useState } from "react";
import { Modal } from "@mantine/core";
import { ModalComponent } from "../../types/Props";
import {} from "react-icons/ai";
import { HiXMark } from "react-icons/hi2";
import { Button } from "../atoms";
import { BiImageAdd } from "react-icons/bi";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { getUserById, updateUserProfile } from "../../api/services/User";
import { useParams } from "react-router-dom";

const EditProfileModal = ({ className, isOpen, onClose }: ModalComponent) => {
  const queryClient = useQueryClient();
  const { userId } = useParams();
  const user = useQuery(["user", userId], () => getUserById(userId || ""), {
    enabled: Boolean(userId),
  });
  const editProfile = useMutation(updateUserProfile, {
    onSuccess() {
      queryClient.invalidateQueries(["user", userId]);
      queryClient.invalidateQueries(["userData"]);
    },
  });
  const [profilePicture, setProfilePicture] = useState<File | null>();
  const [coverPicture, setCoverPicture] = useState<File | null>();
  const [name, setName] = useState("");
  const [about, setAbout] = useState(user.data?.about);
  const [livesIn, setLivesIn] = useState(user.data?.livesIn);
  const [website, setWebsite] = useState("");
  const profileInput = useRef<HTMLInputElement>(null);
  const coverInput = useRef<HTMLInputElement>(null);

  return (
    <Modal
      opened={isOpen}
      onClose={onClose}
      size="lg"
      centered
      radius={"md"}
      padding={0}
      closeOnClickOutside={false}
      withCloseButton={false}
    >
      <div className="bg-white   rounded-xl max-h-[70vh] overflow-y-auto ">
        <div className="flex sticky top-0 z-20 justify-between p-3 bg-black/5">
          <div className="flex gap-4 items-center">
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-200 rounded-full "
            >
              <HiXMark className="w-5 h-5" />
            </button>
            <span className="font-bold text-lg ">Edit Profile</span>
          </div>
          <Button
            className="px-6 py-1 font-medium "
            onClick={(ev) => {
              ev.preventDefault();
              userId &&
                editProfile.mutate({
                  id: userId,
                  body: {
                    profilePicture,
                    coverPicture,
                    name,
                    about,
                    livesIn,
                    website,
                  },
                });
            }}
          >
            Save
          </Button>
        </div>
        <div className="">
          <div className="relative h-[30vh] bg-gray-100">
            <input
              type="file"
              accept=".jpg"
              name=""
              className="hidden"
              ref={coverInput}
              onChange={(ev: React.ChangeEvent<HTMLInputElement>) =>
                setCoverPicture(ev.target?.files?.item(0))
              }
            />
            <img
              src={
                (coverPicture ? URL.createObjectURL(coverPicture) : null) ||
                user.data?.profilePicture
              }
              alt=""
              className="bg-transparent w-full h-full object-cover"
            />
            <div className="flex absolute inset-0 items-center justify-center">
              <button
                className="absolute p-2 rounded-full bg-black/10 hover:bg-black/30"
                onClick={() => coverInput.current?.click()}
              >
                <BiImageAdd className="w-5 h-5" />
              </button>
            </div>
          </div>
          <div className="mx-6 pb-6">
            <div className="relative w-fit  -translate-y-1/2  bg-gray-200 rounded-full">
              <input
                type="file"
                accept=".jpg"
                name=""
                className="hidden"
                ref={profileInput}
                onChange={(ev: React.ChangeEvent<HTMLInputElement>) =>
                  setProfilePicture(ev.target?.files?.item(0))
                }
              />
              <img
                src={
                  (profilePicture
                    ? URL.createObjectURL(profilePicture)
                    : null) || user.data?.coverPicture
                }
                alt=""
                className="w-24 h-24 rounded-full object-cover "
              />
              <div className="flex absolute inset-0 items-center justify-center">
                <button
                  className="absolute p-2 rounded-full bg-black/10 hover:bg-black/30"
                  onClick={() => profileInput.current?.click()}
                >
                  <BiImageAdd className="w-5 h-5" />
                </button>
              </div>
            </div>
            <div className="flex flex-col gap-3">
              <div>
                <label
                  htmlFor="name"
                  className="block w-fit mb-1 text-gray-600"
                >
                  Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={name}
                  onChange={(ev) => setName(ev.target.value)}
                  id="name"
                  className="bg-transparent w-full border border-gray-400 px-4 py-2 rounded-lg "
                />
              </div>
              <div>
                <label htmlFor="bio" className="block w-fit mb-1 text-gray-600">
                  Bio
                </label>
                <textarea
                  name="bio"
                  rows={4}
                  onChange={(ev) => setAbout(ev.target.value)}
                  value={about}
                  id="bio"
                  className="bg-transparent w-full border border-gray-400 px-4 py-2 rounded-lg "
                ></textarea>
              </div>
              <div>
                <label
                  htmlFor="Location"
                  className="block w-fit mb-1 text-gray-600"
                >
                  Location
                </label>
                <input
                  type="text"
                  name="Location"
                  value={livesIn}
                  onChange={(ev) => setLivesIn(ev.target.value)}
                  id="Location"
                  className="bg-transparent w-full border border-gray-400 px-4 py-2 rounded-lg "
                />
              </div>
              <div>
                <label
                  htmlFor="Location"
                  className="block w-fit mb-1 text-gray-600"
                >
                  Website
                </label>
                <input
                  type="url"
                  name="Location"
                  id="Location"
                  value={website}
                  onChange={(ev) => setWebsite(ev.target.value)}
                  className="bg-transparent w-full border border-gray-400 px-4 py-2 rounded-lg "
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default EditProfileModal;
