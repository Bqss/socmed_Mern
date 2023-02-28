import {useEffect} from "react";
import Button from "../components/atoms/Button";
import { useState } from "react";
import Post from "../components/mollecules/Post";
import ProfileHint from "../components/mollecules/ProfileHint";
import { Sidebar, MainContent } from "../layout";
import MainLayout from "../layout/MainLayout";
import { NewPost } from "../components/mollecules";
import NewPostModal from "../components/modal/ProfileModal";
import FollowingsModal from "../components/modal/FollowingsModal";
import Followings from "../components/organism/Followings";
import Trendings from "../components/organism/Trendings";

const Home = () => {
  

  const [isOpenNewPostModal, setIsOpenNewPostModal] = useState(false);
  const [isOpenFollowingModal, setIsOpenFollowingModal] = useState(false);


  const closeModal = () => {
    setIsOpenNewPostModal(false);
  };

  return (
    <MainLayout>
      <NewPostModal isOpen={isOpenNewPostModal} onClose={closeModal} />
      <FollowingsModal
        isOpen={isOpenFollowingModal}
        onClose={() => setIsOpenFollowingModal(false)}
      />
      <Sidebar>
        <ProfileHint />
        <Followings openModal={()=>setIsOpenFollowingModal(true)}/>
      </Sidebar>
      <MainContent>
        <div className="mx-6">
          <NewPost />
          <div className="flex flex-col mt-6 gap-4">
            <Post />
            <Post />
            <Post />
            <Post />
            <Post />
            <Post />
            <Post />
            <Post />
          </div>
        </div>
      </MainContent>
      <Sidebar>
        <div className="sticky top-10">
          <Trendings/>
          <Button
            className="w-full py-3 mt-4 font-medium"
            onClick={() => setIsOpenNewPostModal(true)}
          >
            Share
          </Button>
        </div>
      </Sidebar>
    </MainLayout>
  );
};

export default Home;
