
import { useQuery } from "react-query";
import { useSelector } from "react-redux";
import { getUserById, getUserCrediental, getUserFollower } from "../../api/services/User";
import { getUserState } from "../../slices/UserSlice";

import { ParentComponent } from "../../types/Props";
import { Following } from "../atoms";

interface FollowingsProps extends ParentComponent {
  openModal: () => void;
}

const Followings = ({ className, openModal }: FollowingsProps) => {
  const {crediental: user} = useSelector(getUserState);
  const {data : userData, isLoading} = useQuery(["user",user._id],() => getUserById(user._id||""));

  

  return (
    <div className={["mt-8 flex flex-col", className].join(" ")}>
      <span className="font-bold">Who is following you</span>
      {isLoading ? (
        <div>loading...</div>
      ): (
        !(userData?.followers?.length??0  > 0) ? (
          <div className="min-h-[10rem] flex justify-center items-center px-5 bg-white mt-5 rounded-xl shadow-md shadow-black/10">
            <span>no one following you</span>
          </div>
        ) : (
          <>
            <div className="flex flex-col gap-4 mt-4">
              {userData?.followers?.map((follo: any, i: number) => (
                <Following id={follo} key={i} />
              ))}
            </div>
            <button className="text-orange text-sm font-bold mt-6" onClick={openModal}>
              Show more
            </button>
          </>
        )
      )}
    </div>
  );
};

export default Followings;
