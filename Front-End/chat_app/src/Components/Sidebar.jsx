import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Sidebarskeleton from "./Skeleton/Sidebarskeleton";
import { getUsers, setSelectedUser } from "../store/slices/chatSlice";
import { User, Wifi } from "lucide-react";

function Sidebar() {
  const [showOnlineOnly, setShowOnlineOnly] = useState(false);
  const { users, selectedUser, IsUsersLoading } = useSelector(
    (state) => state.chat
  );

  const { onlineUsers } = useSelector((state) => state.auth);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUsers());
  }, [dispatch]);
  const filteredUsers = showOnlineOnly
    ? users.filter((user) => onlineUsers.includes(user._id))
    : users;

  if (IsUsersLoading) return <Sidebarskeleton />;

  return (
    <>
      <aside
        className="h-full w-20 lg:w-72 border-r border-gray-800 flex
      flex-col transition-all duration-200 bg-black/50 backdrop-blur-sm"
      >
        {/* Header */}

        <div className="border-b border-gray-800 w-full p-5">
          <div className="flex items-center gap-2">
            <User className="w-6 h-6 text-blue-400" />
            <span className="font-medium hidden lg:block text-white">
              Contacts
            </span>
          </div>

          {/* FILTERING */}
          <div className="mt-3 hidden lg:flex items-center gap-2">
            <label
              className="cursor-pointer flex items-center gap-2
            text-sm text-gray-400 hover:text-white transition-colors"
            >
              <input
                type="checkbox"
                checked={showOnlineOnly}
                onChange={(e) => setShowOnlineOnly(e.target.checked)}
                className="w-4 h-4 border-gray-600 text-blue-600 focus:ring-blue-500 bg-gray-800 rounded"
              />
              Show Online Only
            </label>
            <span className="text-xs text-blue-400 flex items-center gap-1">
              <Wifi className="w-3 h-3" /> ({onlineUsers?.length - 1})
            </span>
          </div>
        </div>

        {/* USER LIST */}
        <div className="overflow-y-auto w-full py-3">
          {filteredUsers?.length > 0 &&
            filteredUsers.map((user) => {
              const isSelected = selectedUser?._id === user._id;
              const isOnline = onlineUsers.includes(user._id);

              return (
                <button
                  key={user._id}
                  onClick={() => dispatch(setSelectedUser(user))}
                  className={`w-full p-3 flex items-center gap-3 transition-colors ${
                    isSelected
                      ? "bg-blue-900/30 border-r-2 border-blue-500"
                      : "hover:bg-gray-800/50"
                  }`}
                >
                  {/* IMG */}
                  <div className="relative mx-auto lg:mx-0">
                    <img
                      src={user?.profilePic?.url || "../assets/danny.png"}
                      alt="../assets/danny.png"
                      className="w-12 h-12 object-cover rounded-full border-2 border-gray-700"
                    />

                    {isOnline && (
                      <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full ring-2 ring-black" />
                    )}
                  </div>

                  {/* USER INFO */}
                  <div className="hidden lg:block text-left min-w-0">
                    <div
                      className={`font-medium truncate ${
                        isSelected ? "text-white" : "text-gray-300"
                      }`}
                    >
                      {user.fullname}
                    </div>
                    <div
                      className={`text-sm ${
                        isOnline ? "text-green-400" : "text-gray-500"
                      }`}
                    >
                      {isOnline ? "Online" : "Offline"}
                    </div>
                  </div>
                </button>
              );
            })}
          {filteredUsers.length === 0 && (
            <div className="text-center text-gray-500 py-4">
              No Online Users
            </div>
          )}
        </div>
      </aside>
    </>
  );
}

export default Sidebar;
