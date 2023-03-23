import React, { useEffect, useRef, useState } from "react";
import { Toaster } from "react-hot-toast";
import { useQuery, useQueryClient } from "react-query";
import { useDispatch } from "react-redux";
import { Outlet } from "react-router-dom";
import { useEffectOnce } from "react-use-effect-once";
import { io, Socket } from "socket.io-client";
import { getUserById } from "../api/services/User";
import Background from "../components/mollecules/Background";
import Conversations from "../components/organism/Conversations";
import useLocalStorage from "../hooks/userLocalStorage";
import { setSocket } from "../slices/socketSlice";
import { setUser } from "../slices/UserSlice";
import { ParentComponent } from "../types/Props";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";

const ChatLayout = ({ children }: ParentComponent) => {
  const dispatch = useDispatch();
  const userID = useLocalStorage("BM_usid");
  const [onlineUser, setOnlineUser] = useState<any[]>();
  const socket = useRef<Socket | null>(null);

  useQuery(["user", userID], () => getUserById(userID ?? ""), {
    enabled: Boolean(userID),
    onSuccess: (response) => {
      dispatch(setUser({ ...response }));
    },
  });


  useEffect(() => {
    if (userID) {
      socket.current = io("http://localhost:5000/");
      dispatch(setSocket(socket.current));
      socket.current?.on("get-users",(data : any) =>{
        setOnlineUser([...data])
      })
      socket.current.emit("user-online", userID);
      

      return () => {
        socket.current?.disconnect();
      }
    }
  }, [userID]);

  return (
    <>
      <Background />
      <Toaster
        position="top-center"
        toastOptions={{
          duration: 5000,
          success: {
            iconTheme: {
              primary: "green",
              secondary: "white",
            },
          },
          error: {
            iconTheme: {
              primary: "red",
              secondary: "white",
            },
          },
        }}
      />

      <div className=" max-w-[1525px] z-[1] relative  mx-auto ">
        <Navbar />
        <div className="flex mx-5 gap-4">
          <Sidebar className=" h-sidebar flex flex-col justify-between  flex-shrink-0">
            <Conversations onlineUser={onlineUser}/>
          </Sidebar>
          <Outlet />
        </div>
      </div>
    </>
  );
};

export default ChatLayout;
