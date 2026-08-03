import React from "react";
import { useSelector } from "react-redux";
import Sidebar from "../Components/Sidebar";
import ChatContainer from "../Components/ChatContainer";
import NoChatSelected from "../Components/NoChatSelected";
import SidebarSkeleton from "../Components/Skeleton/Sidebarskeleton";
import MessageSkeleton from "../Components/Skeleton/MessageSkeleton";

function Home() {
  const { selectedUser, isLoadingChats } = useSelector((state) => state.chat);

  return (
    <div className="min-h-screen bg-black">
      <div className="flex items-center justify-center pt-20 px-4">
        <div className="bg-black/70 backdrop-blur-md border border-gray-800 rounded-xl shadow-2xl shadow-blue-900/20 w-full max-w-6xl h-[calc(100vh-8rem)]">
          <div className="flex h-full rounded-xl overflow-hidden">
            {isLoadingChats ? <SidebarSkeleton /> : <Sidebar />}
            {!selectedUser ? <NoChatSelected /> : <ChatContainer />}
            {isLoadingChats && <MessageSkeleton />}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
