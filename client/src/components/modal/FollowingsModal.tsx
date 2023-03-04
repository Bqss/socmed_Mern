import { Modal } from "@mantine/core";
import axios from "axios";
import React from "react";
import { useQuery } from "react-query";
import { ModalComponent } from "../../types/Props";
import { Following } from "../atoms";

const FollowingsModal = ({ isOpen, onClose, className }: ModalComponent) => {
  const { data: following, isFetching } = useQuery(
    "following",
    async () => {
      const result = await axios.get("https://randomuser.me/api/?results=4");
      return result.data.results;
    },
    { refetchOnWindowFocus: false, initialData: [] }
  );

  return (
    <Modal
      opened ={isOpen}
      onClose = {onClose}
      radius="md"
      className={className}
    >
      <div className="">
        <div className="mt-8 flex flex-col sticky top-10 ">
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
          <button className="text-orange font-bold mt-6">Show more</button>
        </div>
      </div>
    </Modal>
  );
};

export default FollowingsModal;
