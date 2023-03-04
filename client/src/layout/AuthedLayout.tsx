import { Button } from "../components/atoms";
import { useState } from "react";
import { Toaster } from "react-hot-toast";
import { useDispatch } from "react-redux";
import { Outlet } from "react-router-dom";
import FollowingsModal from "../components/modal/FollowingsModal";
import NewPostModal from "../components/modal/ProfileModal";
import Followings from "../components/organism/Followings";
import Trendings from "../components/organism/Trendings";

import { ParentComponent } from "../types/Props";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import Background from "../components/mollecules/Background";
import { useQuery } from "react-query";
import { getUserCrediental } from "../api/User";
import { AxiosResponse } from "axios";
import { setUser } from "../slices/UserSlice";
import { ProfileHint } from "../components/mollecules";

interface LayoutProps extends ParentComponent {
  withNavbar?: boolean;
  withSidebar?: boolean;
}

const AuthedLayout = ({
  withNavbar = true,
  withSidebar = true,
  children,
}: LayoutProps) => {
  const dispatch = useDispatch();
  const {
    data: userData,
    isLoading,
    isFetching,
  } = useQuery("userData", getUserCrediental, {
    onSuccess(data: AxiosResponse) {
      console.log(data);
      dispatch(setUser({ user: data }));
    },
  });
  const [isOpenNewPostModal, setIsOpenNewPostModal] = useState(false);
  const [isOpenFollowingModal, setIsOpenFollowingModal] = useState(false);

  const closeModal = () => {
    setIsOpenNewPostModal(false);
  };

  return (
    <>
      <Background />
      <Toaster
        position="top-center"
        toastOptions={{
          duration: 5000,
          success: {
            iconTheme: {
              primary: "green",
              secondary: "white",
            },
          },
          error: {
            iconTheme: {
              primary: "red",
              secondary: "white",
            },
          },
        }}
      />

      <div className=" max-w-[1620px] z-[1] relative  mx-auto ">
        {withNavbar && <Navbar />}
        <div className="flex mx-5 ">
          <NewPostModal isOpen={isOpenNewPostModal} onClose={closeModal} />
          <FollowingsModal
            isOpen={isOpenFollowingModal}
            onClose={() => setIsOpenFollowingModal(false)}
          />
          {withSidebar && (
            <Sidebar className=" h-sidebar flex flex-col justify-between">
              <Followings openModal={() => setIsOpenFollowingModal(true)} />
              <ProfileHint />
            </Sidebar>
          )}
          {children || <Outlet />}
          {withSidebar && (
            <Sidebar>
              <div className="sticky top-10">
                <Trendings />
                <Button
                  className="w-full py-3 mt-4 font-medium"
                  onClick={() => setIsOpenNewPostModal(true)}
                >
                  Share
                </Button>
              </div>
            </Sidebar>
          )}
        </div>
      </div>
    </>
  );
};

export default AuthedLayout;
