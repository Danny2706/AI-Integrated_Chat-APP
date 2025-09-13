import React from "react";
import { MessageSquare, Cpu, Brain, Sparkles } from "lucide-react";

function NoChatSelected() {
  return (
    <>
      <div className="w-full flex flex-1 flex-col items-center justify-center p-16 bg-black/50 backdrop-blur-sm">
        <div className="max-w-md text-center space-y-6">
          {/* ICON */}
          <div className="flex justify-center gap-4 mb-4">
            <div className="relative">
              <div
                className="w-16 h-16 rounded-2xl bg-gradient-to-r from-blue-600 to-purple-600 flex
              items-center justify-center animate-float shadow-lg"
              >
                <MessageSquare className="w-8 h-8 text-white" />
              </div>
            </div>
          </div>
          <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            Welcome to AI CollabHub!
          </h2>
          <p className="text-gray-400">
            Select a conversation from the sidebar to start chatting
          </p>

          {/* Tech Icons */}
          <div className="flex justify-center space-x-4 pt-4">
            <div className="flex items-center text-sm text-blue-500">
              <Cpu className="w-4 h-4 mr-1" /> AI-Powered
            </div>
            <div className="flex items-center text-sm text-purple-500">
              <Brain className="w-4 h-4 mr-1" /> Intelligent
            </div>
            <div className="flex items-center text-sm text-cyan-500">
              <Sparkles className="w-4 h-4 mr-1" /> Secure
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default NoChatSelected;
