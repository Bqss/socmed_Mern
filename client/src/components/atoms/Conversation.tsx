import React from "react";
import { useQuery } from "react-query";
import { Link, NavLink } from "react-router-dom";
import { getUserById } from "../../api/services/User";
import { Chat } from "../../types/payload";
import ProfilePicture from "./ProfilePicture";

interface ConversationProps {
  data: Partial<Chat>;
  onlineUser? : any[]
}

const Conversation = ({ data, onlineUser }: ConversationProps) => {
  const { data: user } = useQuery(["user", data.contactId], () =>
    getUserById(data.contactId||"")
  );
  return (
    <NavLink to={`/chat/${data._id}`} className={({isActive} )=> isActive?  "rounded-xl bg-gray-200":"rounded-xl hover:bg-gray-200"}>
      <div className="flex space-x-4 p-2  items-center  ">
        <ProfilePicture img={{ src: user?.profilePicture }} size="lg" />
        <div className="flex flex-col ">
          <span className="font-bold  ">{user?.userName}</span>
          <span className="">{onlineUser?.find(user => user.id == data.contactId) ? "online":"offline"}</span>
        </div>
      </div>
    </NavLink>
  );
};

export default Conversation;
