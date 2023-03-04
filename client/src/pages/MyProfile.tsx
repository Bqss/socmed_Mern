import axios from "axios";
import React, { useState } from "react";
import { useQuery } from "react-query";
import { Following, Trending } from "../components/atoms";
import FollowingsModal from "../components/modal/FollowingsModal";
import Followings from "../components/organism/Followings";
import Trendings from "../components/organism/Trendings";
import { MainContent, Sidebar } from "../layout";
import profile from "../assets/profileImg.jpg";
import { BiArrowBack } from "react-icons/bi";
import MainLayout from "../layout/AuthedLayout";
import { Button } from "../components/atoms";
import { BsCalendar2Date } from "react-icons/bs";
import { Tabs } from "@mantine/core";
import { Link } from "react-router-dom";
import EditProfileModal from "../components/modal/EditProfileModal";

const MyProfile = () => {
  const { data: following, isFetching } = useQuery(
    "following",
    async () => {
      const result = await axios.get("https://randomuser.me/api/?results=4");
      return result.data.results;
    },
    { refetchOnWindowFocus: false, initialData: [] }
  );
  const [isEditProfile, setIsEditProfile] = useState(false);

  const closeModal = () => {
    setIsEditProfile(false);
  };

  const [activeTab, setActiveTab] = useState<string | null>("tweets");

  return (
    <>
      <EditProfileModal isOpen={isEditProfile} onClose={closeModal}/>
      <MainContent className="mx-5 -mt-14">
        <div className=" h-[50vh]">
          <div className="bg-white p-4 flex items-center gap-2">
            <Link to="/" className="p-2 rounded-full hover:bg-gray-200">
              <BiArrowBack className="w-4 h-4" />
            </Link>
            <span className="font-bold">Basofi_Riswanto</span>
          </div>
          <div className="h-[30vh] bg-gray-200"></div>
          <div className="px-16 ">
            <div className="flex relative justify-between items-end -mt-12 ">
              <img src={profile} alt="" className="w-24 h-24 rounded-full" />
              <Button
                onClick={() => setIsEditProfile(true)}
                className="px-5 py-2 font-medium"
              >
                Edit Profile
              </Button>
            </div>
            <div className="mt-4 flex flex-col gap-1">
              <span className="text-2xl font-bold">Basofi Riswanto</span>
              <span className="text-gray-500 ">@BasofiRiswanto</span>
              <div className="flex items-center gap-3">
                <BsCalendar2Date />
                <span>Joined December 2022</span>
              </div>
              <div className="flex gap-5 mt-3">
                <span className="text-gray-500">
                  <span className="text-black font-bold">2 </span>Following
                </span>
                <span className="text-gray-500">
                  <span className="text-black font-bold">0 </span>Followers
                </span>
              </div>
            </div>
          </div>
          <Tabs
            defaultValue="gallery"
            color={"orange"}
            className="mt-8"
            value={activeTab}
            onTabChange={setActiveTab}
          >
            <Tabs.List grow position="apart">
              <Tabs.Tab value="tweets">Tweets</Tabs.Tab>
              <Tabs.Tab value="tweets & replies">Tweets & replies</Tabs.Tab>
              <Tabs.Tab value="media">Media</Tabs.Tab>
              <Tabs.Tab value="likes">Likes</Tabs.Tab>
            </Tabs.List>

            <Tabs.Panel value="tweets" pt="xs" p={"md"}>
              Tweets tab content
            </Tabs.Panel>

            <Tabs.Panel value="tweets & replies" pt="xs">
              Tweets & replies tab content
            </Tabs.Panel>

            <Tabs.Panel value="media" pt="xs">
              Media tab content
            </Tabs.Panel>

            <Tabs.Panel value="likes" pt="xs">
              Likes tab content
            </Tabs.Panel>
          </Tabs>
        </div>
      </MainContent>
    </>
  );
};

export default MyProfile;
