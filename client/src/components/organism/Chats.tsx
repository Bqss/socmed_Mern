import Button from "../../components/atoms/Button";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { useParams } from "react-router-dom";
import ChatApi from "../../api/services/Chat";
import { getUserById } from "../../api/services/User";
import ProfilePicture from "../atoms/ProfilePicture";
import { useSelector } from "react-redux";
import { getUserState } from "../../slices/UserSlice";
import { Chat } from "../atoms";
import { getSocket } from "../../slices/socketSlice";

const Chats = () => {
  const { chatId } = useParams();
  const [message, setMessage] = useState<string>("");
  const { crediental: user } = useSelector(getUserState);
  const chatScroll = useRef<HTMLDivElement>(null);
  const socket = useSelector(getSocket)
  useEffect(() => {
    socket?.on("chat-update",() => {
      queryClient.invalidateQueries(["chat",chatId])
    })
  },[socket]);

  const queryClient = useQueryClient();
  const { data: chat } = useQuery(
    ["chat", chatId],
    () => ChatApi.getChatById(chatId || ""),
    {
      enabled: Boolean(chatId),
      onSuccess(){
        setTimeout(() => { 
          chatScroll.current?.scrollIntoView({behavior: "smooth", block:"end"});
         }, 100)
      }
    }
  );
  const { data: receiver } = useQuery(
    ["user", chat?.contactId],
    () => getUserById(chat?.contactId || ""),
    {
      enabled: Boolean(chat?.contactId),
    }
  );
  

  const {
    data: sendedMsg,
    mutate: sendMsg,
    isLoading: isSending,
  } = useMutation(ChatApi.sendMessage);

  const sendMSGHandler = (ev: React.MouseEvent) => {
    ev.preventDefault();
    const newChat = { chatId: chatId || "", senderId : user._id, message, receiverId: chat?.contactId }
    sendMsg( newChat,
      {
        onSuccess(data) {
          socket?.emit("send-msg",newChat)
          setMessage("");
          
        },
      }
    );
  };


  
  return (
    <div className="flex flex-col bg-white h-sidebar rounded-xl w-full ">
      <div className="flex items-center gap-3 border-b-2 px-4 py-3   border-gray-200">
        <ProfilePicture size="lg" img={{ src: receiver?.profilePicture }} />
        <span className="font-medium text-lg">{receiver?.userName}</span>
      </div>
      <div className="px-4 flex-1 flex flex-col gap-3 pt-4 pb-8 overflow-y-auto" >
        {chat?.messages.map((msg,i ) => (
          <Chat ref={chatScroll}  data={msg} key={i} userId={user._id} />
        ))}
      </div>
      <div className="px-3 py-4 flex gap-3">
        <button className="bg-gray-200 w-10 h-10 rounded-md text-lg font-bold">
          +
        </button>
        <input
          type="text"
          name=""
          id=""
          value={message}
          onChange={(ev) => setMessage(ev.target.value)}
          className="flex-1 border-2 rounded-xl px-4  border-gray-200"
          placeholder="Type a message..."
        />
        <Button
          styleType="btn1"
          className="px-6 py-3 font-medium "
          onClick={sendMSGHandler}
          disableWhenLoading={true}
          loading={isSending}
        >
          Send
        </Button>
      </div>
    </div>
  );
};

export default Chats;
