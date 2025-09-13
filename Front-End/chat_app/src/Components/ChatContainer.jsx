import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getMessages, pushNewMessage } from "../store/slices/chatSlice";
import MessageInput from "./MessageInput";
import MessageSkeleton from "./Skeleton/MessageSkeleton";
import ChatHeader from "./ChatHeader";
import { getSocket } from "../lib/socket";
import DOMPurify from "dompurify";

// highlight.js
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";

function ChatContainer() {
  const { messages, IsMessagesLoading, selectedUser } = useSelector(
    (state) => state.chat
  );
  const { authUser } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const messageEndRef = useRef(null);

  useEffect(() => {
    if (selectedUser?._id) {
      dispatch(getMessages(selectedUser._id));
    }
  }, [selectedUser?._id, dispatch]);

  useEffect(() => {
    if (messageEndRef.current) {
      messageEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  useEffect(() => {
    if (!selectedUser?._id) return;
    const socket = getSocket();
    if (!socket) return;

    const handleNewMessage = (newMessage) => {
      if (
        newMessage.senderId === selectedUser._id ||
        newMessage.reciverId === selectedUser._id
      ) {
        dispatch(pushNewMessage(newMessage));
      }
    };

    socket.on("newMessage", handleNewMessage);
    return () => socket.off("newMessage", handleNewMessage);
  }, [selectedUser?._id, dispatch]);

  const formatMessageTime = (data) =>
    new Date(data).toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    });

  if (IsMessagesLoading) {
    return (
      <div className="flex-1 flex flex-col overflow-auto bg-black">
        <ChatHeader />
        <MessageSkeleton />
        <MessageInput />
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col overflow-hidden bg-black/50 backdrop-blur-sm">
      <ChatHeader />

      <div className="flex-1 overflow-y-auto p-4 space-y-6">
        {messages.length > 0 &&
          messages.map((message, index) => {
            const isSender = message.senderId === authUser._id;

            return (
              <div
                key={message._id}
                className={`flex items-end ${
                  isSender ? "justify-end" : "justify-start"
                }`}
                ref={index === messages.length - 1 ? messageEndRef : null}
              >
                {/* Avatar */}
                <div
                  className={`w-10 h-10 rounded-full overflow-hidden border-2 border-gray-800 shrink-0 ${
                    isSender ? "order-2 ml-3" : "order-3 mr-3"
                  }`}
                >
                  <img
                    src={
                      isSender
                        ? authUser?.profilePic?.url || "../assets/danny.png"
                        : selectedUser?.profilePic?.url || "../assets/danny.png"
                    }
                    alt="profile"
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Bubble */}
                <div
                  className={`max-w-xs sm:max-w-sm md:max-w-md px-4 py-2 rounded-xl text-sm ${
                    isSender
                      ? "bg-gradient-to-r from-blue-700/40 to-purple-700/40 text-white border border-blue-700/30 order-1"
                      : "bg-gray-800/50 text-white border border-gray-700 order-2"
                  }`}
                >
                  {/* Media */}
                  {message.type === "media" && message.media && (
                    <>
                      {/\.(mp4|webm|mov)$/i.test(message.media) ? (
                        <video
                          src={message.media}
                          controls
                          className="w-full rounded-md mb-2"
                        />
                      ) : (
                        <img
                          src={message.media}
                          alt="attachment"
                          className="w-full rounded-md mb-2"
                        />
                      )}
                    </>
                  )}

                  {/* Text */}
                  {message.type === "text" && message.text && (
                    <p>{message.text}</p>
                  )}

                  {/* UI Preview */}
                  {message.type === "ui" && message.code && (
                    <div className="space-y-2">
                      {/* Raw code block with VS Code colors */}
                      <div className="rounded overflow-x-auto max-h-60">
                        <SyntaxHighlighter
                          language="html"
                          style={vscDarkPlus}
                          customStyle={{
                            margin: 0,
                            borderRadius: "0.5rem",
                            fontSize: "0.75rem",
                          }}
                        >
                          {message.code}
                        </SyntaxHighlighter>
                      </div>

                      {/* Live preview inside iframe */}
                      <iframe
                        title="preview"
                        sandbox="allow-scripts"
                        className="w-full h-64 border rounded"
                        srcDoc={`<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8" />
    <script src="https://cdn.tailwindcss.com"></script>
  </head>
  <body class="p-4 bg-black text-white">
    <div>
      ${DOMPurify.sanitize(
        message.code
          .replace(/```html|```/g, "")
          .replace(/Explanation:.*$/gis, "")
      )}
    </div>
  </body>
</html>`}
                      />
                    </div>
                  )}

                  {/* Time */}
                  <span
                    className={`block text-[10px] mt-1 text-right ${
                      isSender ? "text-blue-300/70" : "text-gray-400"
                    }`}
                  >
                    {formatMessageTime(message.createdAt)}
                  </span>
                </div>
              </div>
            );
          })}
      </div>

      <MessageInput />
    </div>
  );
}

export default ChatContainer;
