import axios from "axios";
import { useQuery } from "react-query";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import { ParentComponent } from "../../types/Props";
import { Following } from "../atoms";

interface FollowingsProps extends ParentComponent {
  openModal: () => void;
}

const Followings = ({ className, openModal }: FollowingsProps) => {
  const { followers = [] } = useSelector(
    (state: RootState) => state.user.value
  );
  return (
    <div className={["mt-8 flex flex-col", className].join(" ")}>
      <span className="font-bold">Who is following you</span>
      {!(followers.length > 0) ? (
        <div className="min-h-[10rem] flex justify-center items-center px-5 bg-white mt-5 rounded-xl shadow-md shadow-black/10">
          <span>no one following you</span>
        </div>
      ) : (
        <>
          <div className="flex flex-col gap-4 mt-4">
            {followers?.map((follo: any, i: number) => (
              <Following id={follo} key={i} />
            ))}
          </div>
          <button className="text-orange font-bold mt-6" onClick={openModal}>
            Show more
          </button>
        </>
      )}
    </div>
  );
};

export default Followings;
