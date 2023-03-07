import React from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";
import { followUser, getUserById, unfollowUser } from "../../api/services/User";
import { getUserState } from "../../slices/UserSlice";
import { Button } from "./../atoms";

interface FollowingProps {
  id: string;
}

const Following = ({ id }: FollowingProps) => {
  const { value: user } = useSelector(getUserState);
  const queryClient = useQueryClient();
  const isFollowed = user.following?.includes(id);
  const { data, isLoading } = useQuery(`user${id}`, () => getUserById(id));
  const { mutateAsync: tryFollow, isLoading: onFollowing,  } = useMutation(
    ({ id }: { id: string }) =>
      isFollowed ? unfollowUser({ id }) : followUser({ id }),
    {
      async onSuccess(data) {
        await queryClient.invalidateQueries("userData");
        toast.success(data.message);
      },
    }
  );

  if (isLoading) {
    return <div>loading...</div>;
  }

  return (
    <div className="flex justify-between items-center">
      <div className="flex gap-3">
        {!data?.profilePicture ? (
          <div className="w-12 h-12 bg-gray-200 rounded-full"></div>
        ) : (
          <img
            src={data?.profilePicture}
            alt=""
            className="w-12  h-12 rounded-full"
          />
        )}
        <div className="flex flex-col justify-center text-sm -space-y-1">
          <span className="font-medium">{data?.userName}</span>
          <span className="text text-gray-500">
            {"@" + data?.firstName + "_" + data?.lastName}
          </span>
        </div>
      </div>
      <Button
        className="px-6 py-2 text-white font-medium text-sm "
        onClick={() => tryFollow({ id })}
      >
        {!isFollowed ? "follow" : "unfollow"}
      </Button>
    </div>
  );
};

export default Following;
