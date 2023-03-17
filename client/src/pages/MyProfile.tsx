import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { MainContent } from "../layout";
import { BiArrowBack } from "react-icons/bi";
import { Button } from "../components/atoms";
import { BsCalendar2Date } from "react-icons/bs";
import { Tabs } from "@mantine/core";
import { Link, useParams } from "react-router-dom";
import EditProfileModal from "../components/modal/EditProfileModal";
import { followUser, getUserById, unfollowUser } from "../api/services/User";
import useMoment from "../hooks/useMoment";
import ProfilePicture from "../components/atoms/ProfilePicture";
import { isFollowed, isSelf } from "../utils";
import { useSelector } from "react-redux";
import { getUserState } from "../slices/UserSlice";
import { toast } from "react-hot-toast";

const MyProfile = () => {
  const { userId } = useParams();
  const { data: userData } = useQuery(`user${userId}`, () => {
    if (userId) return getUserById(userId);
  });
  const { mutateAsync: follow, isLoading: isOtwFollow } =
    useMutation(followUser);
  const { mutateAsync: unfollow, isLoading: isOtwUnfollow } =
    useMutation(unfollowUser);
  const user = useSelector(getUserState);
  const queryClient = useQueryClient();
  const [isEditProfile, setIsEditProfile] = useState(false);
  const { month, year } = useMoment(userData?.createdAt);
  const slf = isSelf({ currentId: userId, userId: user.value._id });
  const followed = userData && userId && isFollowed({ userData, userId: user.value._id });

  const closeModal = () => {
    setIsEditProfile(false);
  };

  const followHandler = async() => {
    
    try {
      userId && await (!followed ? follow({ id: userId }): unfollow({id: userId}));
      queryClient.invalidateQueries(`user${userId}`);
      toast.success("success "+(followed ? "unfollow" : "follow"));
    } catch (err) {
      
    }
  };

  const [activeTab, setActiveTab] = useState<string | null>("tweets");

  return (
    <>
      {slf && <EditProfileModal isOpen={isEditProfile} onClose={closeModal} />}
      <MainContent className="mx-5 -mt-14">
        <div className=" h-[50vh]">
          <div className="bg-white p-4 flex items-center gap-2">
            <Link to="/" className="p-2 rounded-full hover:bg-gray-200">
              <BiArrowBack className="w-4 h-4" />
            </Link>
            <span className="font-bold">
              {userData?.firstName + "_" + userData?.lastName}
            </span>
          </div>
          <div className="h-[30vh] bg-gray-200"></div>
          <div className="px-16 ">
            <div className="flex relative justify-between items-end -mt-12 ">
              <ProfilePicture img={{ src: userData?.coverPicture }} size="xl" />
              {slf ? (
                <Button
                  onClick={() => setIsEditProfile(true)}
                  className="px-5 py-2 font-medium"
                >
                  Edit Profile
                </Button>
              ) : (
                <Button
                  className="px-5 py-2 font-medium"
                  onClick={followHandler}
                >
                  {followed ? "unfollow" : "follow  "}
                </Button>
              )}
            </div>
            <div className="mt-4 flex flex-col gap-1">
              <span className="text-2xl font-bold">
                {userData?.firstName + "_" + userData?.lastName}
              </span>
              <span className="text-gray-500 ">
                {"@" + userData?.firstName + "_" + userData?.lastName}
              </span>
              <div className="flex items-center gap-3">
                <BsCalendar2Date />
                <span>
                  Joined {month} {year}
                </span>
              </div>
              <div className="flex gap-5 mt-3">
                <span className="text-gray-500">
                  <span className="text-black font-bold">
                    {userData?.following.length}{" "}
                  </span>
                  Following
                </span>
                <span className="text-gray-500">
                  <span className="text-black font-bold">
                    {userData?.followers.length}{" "}
                  </span>
                  Followers
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
