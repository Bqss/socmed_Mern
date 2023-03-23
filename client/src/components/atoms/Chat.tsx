import React, { forwardRef } from "react";
import useMoment from "../../hooks/useMoment";
import { Message } from "../../types/payload";
import { ParentComponent } from "../../types/Props";

interface ChatProps {
  userId: string | undefined;
  data: Message;
}

const Chat = forwardRef(({  data, userId }: ChatProps, ref:any) => {
  const { relative } = useMoment(data.createdAt);

  const isSelf = data.senderId === userId;
  if (isSelf) return <SelfChat ref={ref} timestamp={relative}>{data.message}</SelfChat>;
  return <AnotherChat ref={ref} timestamp={relative}>{data.message}</AnotherChat>;
});

const SelfChat = forwardRef(({
  children,
  timestamp,
}: ParentComponent & { timestamp?: string }, ref: any) => {
  return (
    <div ref={ref} className="rounded-2xl flex text-white flex-col mr-auto rounded-bl-none py-2 px-5 bg-gradient-to-r from-yellow-500 to-orange-500">
      <span className=" font-medium ">{children}</span>
      <span className="ml-auto text-xs mt-1">{timestamp}</span>
    </div>
  );
});
const AnotherChat = forwardRef(({
  children,
  timestamp,
}: ParentComponent & { timestamp?: string },ref:any) => {
  return (
    <div ref={ref} className="rounded-2xl ml-auto bg rounded-br-none p-3 bg-gradient-to-r from-blue-400 to-blue-600">
      <span className="font-medium text-white">{children}</span>
      <span></span>
    </div>
  );
});

export default Chat;
