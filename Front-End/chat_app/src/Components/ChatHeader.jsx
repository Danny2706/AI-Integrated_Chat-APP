import React from "react";
import { X } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { setSelectedUser } from "../store/slices/chatSlice";

function ChatHeader() {
  const { selectedUser } = useSelector((state) => state.chat);
  const { onlineUsers } = useSelector((state) => state.auth);

  const dispatch = useDispatch();

  return (
    <>
      <div className="p-4 border-b border-gray-800 bg-black/50 backdrop-blur-sm">
        <div className="flex items-center justify-between">
          {/* USER INFO */}

          <div className="flex items-center gap-3">
            {/* Profile Picture */}

            <div className="relative w-10 h-10">
              <img
                src={selectedUser?.profilePic?.url || "../assets/danny.png"}
                alt="../assets/danny.png"
                className="w-full h-full object-cover rounded-full border-2 border-gray-700"
              />
              {onlineUsers.includes(selectedUser._id) && (
                <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-black rounded-full"></span>
              )}
            </div>
            {/* NAME AND STATUS */}
            <div>
              <h3 className="font-medium text-base text-white">
                {selectedUser?.fullname}
              </h3>
              <p
                className={`text-sm ${
                  onlineUsers.includes(selectedUser._id)
                    ? "text-green-400"
                    : "text-gray-400"
                }`}
              >
                {onlineUsers.includes(selectedUser._id) ? "Online" : "Offline"}
              </p>
            </div>
          </div>
          {/* Close Button */}

          <button
            onClick={() => dispatch(setSelectedUser(null))}
            className="text-gray-400 hover:text-white transition-colors p-1 rounded-lg hover:bg-gray-800"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>
    </>
  );
}

export default ChatHeader;
