import React from "react";
import { useQuery } from "react-query";
import { useSelector } from "react-redux";
import ChatApi from "../../api/services/Chat";
import { getUserState } from "../../slices/UserSlice";
import Conversation from "../atoms/Conversation";



const Conversations = ({onlineUser=[]}:{onlineUser: any[]| undefined}) => {
  const {crediental: user} = useSelector(getUserState);
  const {data: chats} = useQuery(["user",user._id,"chats"],() => ChatApi.getUserChat(user._id||""),{
    enabled: Boolean(user._id)
  });

  return (
    <div className="p-5 bg-white rounded-3xl  h-full">
      <span className="text-lg   font-bold">Chats</span>
      <div className="flex flex-col gap-3 mt-4 divide-x-2 divide-x-gray-300">
        {chats?.map((e,i) => <Conversation onlineUser={onlineUser} key={i} data={e}/>)}
      </div>
    </div>
  );
};

export default Conversations;
