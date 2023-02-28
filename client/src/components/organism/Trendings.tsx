import React from "react";
import { ParentComponent } from "../../types/Props";
import { Trending } from "../atoms";

const Trendings = () => {
  return (
    <div className="bg-white rounded-xl shadow-md  p-6 ">
      <h4 className="font-bold text-lg">Trends for you</h4>
      <div className="flex flex-col gap-4 mt-8">
        <Trending />
        <Trending />
        <Trending />
        <Trending />
        <Trending />
        <Trending />
        <Trending />
      </div>
    </div>
  );
};

export default Trendings;
