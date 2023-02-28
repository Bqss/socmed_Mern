import React, { useRef, useState } from "react";
import { Modal } from "@mantine/core";
import { ModalComponent } from "../../types/Props";
import {} from "react-icons/ai";
import { HiXMark } from "react-icons/hi2";
import { Button } from "../atoms";
import { BiImageAdd } from "react-icons/bi";



const EditProfileModal = ({ className, isOpen, onClose }: ModalComponent) => {
  
  const [profile, setProfile] = useState<File|null>(null);
  const [cover, setCover] = useState<File|null>(null);
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
        <div className="flex sticky top-0 justify-between p-3 bg-black/5">
          <div className="flex gap-4 items-center">
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-200 rounded-full "
            >
              <HiXMark className="w-5 h-5" />
            </button>
            <span className="font-bold text-lg ">Edit Profile</span>
          </div>
          <Button className="px-6 py-1 font-medium ">Save</Button>
        </div>
        <div className="">
          <div className="h-[30vh] bg-gray-100">
            <img src="" alt="" className="bg-transparent" />
          </div>
          <div className="mx-6 pb-6">
            <div className="relative w-min -translate-y-1/2">
              <input type="file" accept=".jpg" name="" className="hidden" ref={profileInput} />
              <img
                src=""
                alt=""
                className="w-24 h-24 rounded-full bg-gray-200"
              />
              <div className="flex absolute inset-0 items-center justify-center">
                <button className="absolute p-2 rounded-full bg-black/10 hover:bg-black/30" onClick={()=> profileInput.current?.click()}>
                  <BiImageAdd className="w-5 h-5" />
                </button>
              </div>
            </div>
            <div className="flex flex-col gap-3">
              <div>
                <label htmlFor="name" className="block w-fit mb-1 text-gray-600">Name</label>
                <input type="text" name="name" id="name" className="bg-transparent w-full border border-gray-400 px-4 py-2 rounded-lg " />
              </div>
              <div>
                <label htmlFor="bio" className="block w-fit mb-1 text-gray-600">Bio</label>
                <textarea  name="bio" rows={4} id="bio" className="bg-transparent w-full border border-gray-400 px-4 py-2 rounded-lg "></textarea>
              </div>
              <div>
                <label htmlFor="Location" className="block w-fit mb-1 text-gray-600">Location</label>
                <input type="text" name="Location" id="Location" className="bg-transparent w-full border border-gray-400 px-4 py-2 rounded-lg " />
              </div>
              <div>
                <label htmlFor="Location" className="block w-fit mb-1 text-gray-600">Website</label>
                <input type="url" name="Location" id="Location" className="bg-transparent w-full border border-gray-400 px-4 py-2 rounded-lg " />
              </div>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default EditProfileModal;
