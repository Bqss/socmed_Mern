import axios from "axios";
import React from "react";
import { useQuery } from "react-query";
import { ParentComponent } from "../../types/Props";
import { Following } from "../atoms";

interface FollowingsProps extends ParentComponent{
  openModal : () => void;
}

const Followings = ({className, openModal}:FollowingsProps) => {
  const { data: following, isFetching } = useQuery(
    "following",
    async () => {
      const result = await axios.get("https://randomuser.me/api/?results=4");
      return result.data.results;
    },
    { refetchOnWindowFocus: false, initialData: [] }
  );
  return (
    <div className={["mt-8 flex flex-col",className].join(" ")}>
      <span className="font-bold">Who is following you</span>
      <div className="flex flex-col gap-4 mt-4">
        {isFetching ? (
          <div>Loading....</div>
        ) : (
          following?.map((follo: any, i: number) => (
            <Following data={follo} key={i} />
          ))
        )}
      </div>
      <button
        className="text-orange font-bold mt-6"
        onClick={openModal}
      >
        Show more
      </button>
    </div>
  );
};

export default Followings;
