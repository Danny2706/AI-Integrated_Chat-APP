import React, { useEffect, useRef, useState } from "react";
import { Paperclip, Send, X, Bot } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { sendMessage } from "../store/slices/chatSlice";
import { getSocket } from "../lib/socket";

function MessageInput() {
  const [text, setText] = useState("");
  const [mediaPreview, setMediaPreview] = useState(null);
  const [media, setMedia] = useState(null);
  const [mediaType, setMediaType] = useState("");
  const [showAI, setShowAI] = useState(false);
  const fileInputRef = useRef(null);

  const dispatch = useDispatch();
  const { selectedUser } = useSelector((state) => state.chat);

  // Handle file input changes
  const handleMediaChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setMedia(file);
    const type = file.type;
    if (type.startsWith("image/")) {
      setMediaType("image");
      const reader = new FileReader();
      reader.onload = () => setMediaPreview(reader.result);
      reader.readAsDataURL(file);
    } else if (type.startsWith("video/")) {
      setMediaType("video");
      setMediaPreview(URL.createObjectURL(file));
    } else {
      toast.error("Please select an image or video file.");
      removeMedia();
    }
  };

  // Remove media
  const removeMedia = () => {
    setMedia(null);
    setMediaPreview(null);
    setMediaType("");
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  // Send message
  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!text.trim() && !media) return;

    const formData = new FormData();
    formData.append("text", text.trim());
    if (media) formData.append("media", media);

    dispatch(sendMessage(formData));

    // Reset
    setText("");
    removeMedia();
  };

  // Socket listener for incoming messages
  useEffect(() => {
    if (!selectedUser?._id) return;
    const socket = getSocket();
    if (!socket) return;

    const handleNewMessage = (msg) => {
      if (
        msg.senderId === selectedUser._id ||
        msg.reciverId === selectedUser._id
      ) {
        dispatch({ type: "chat/pushNewMessage", payload: msg });
      }
    };

    socket.on("newMessage", handleNewMessage);
    return () => socket.off("newMessage", handleNewMessage);
  }, [selectedUser?._id, dispatch]);

  return (
    <div className="p-4 w-full bg-black/30 backdrop-blur-sm border-t border-gray-800 relative">
      {mediaPreview && (
        <div className="mb-3 flex items-center gap-2">
          <div className="relative">
            {mediaType === "image" ? (
              <img
                src={mediaPreview}
                alt="preview"
                className="w-20 h-20 object-cover rounded-lg border border-gray-700"
              />
            ) : (
              <video
                src={mediaPreview}
                controls
                className="w-32 h-20 object-cover rounded-lg border border-gray-700"
              />
            )}
            <button
              onClick={removeMedia}
              type="button"
              className="absolute -top-2 -right-2 w-6 h-6 bg-red-600 text-white rounded-full flex items-center justify-center hover:bg-red-700 transition-colors"
            >
              <X className="w-3 h-3" />
            </button>
          </div>
        </div>
      )}

      {/* AI Iframe Modal */}
      {showAI && (
        <div className="absolute bottom-20 right-4 w-[400px] h-[500px] bg-gray-900 rounded-xl shadow-lg border border-gray-700 overflow-hidden z-50">
          <div className="flex justify-between items-center bg-gray-800 p-2">
            <span className="text-sm text-white">AI Assistant</span>
            <button
              onClick={() => setShowAI(false)}
              className="text-red-500 hover:text-red-400"
            >
              <X size={18} />
            </button>
          </div>
          <iframe
            src="http://localhost:8501/"
            title="AI Assistant"
            className="w-full h-full"
          ></iframe>
        </div>
      )}

      <form onSubmit={handleSendMessage} className="flex items-center gap-2">
        <div className="flex-1 flex gap-2">
          <input
            type="text"
            placeholder="Type a message..."
            className="w-full px-4 py-3 rounded-xl bg-gray-900/50 border border-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-600 text-white placeholder-gray-500 transition-all duration-300 hover:bg-gray-900/70 focus:bg-gray-900/70"
            value={text}
            onChange={(e) => setText(e.target.value)}
          />

          <input
            type="file"
            accept="image/*,video/*"
            ref={fileInputRef}
            className="hidden"
            onChange={handleMediaChange}
          />

          {/* Media Upload Button */}
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className={`flex items-center justify-center w-12 h-12
              rounded-xl border border-gray-700 hover:border-blue-500 transition-colors
              ${
                mediaPreview ? "text-blue-500" : "text-gray-400"
              } hover:text-blue-400
              bg-gray-900/50 hover:bg-gray-900/70`}
          >
            <Paperclip size={20} />
          </button>

          {/* AI Assistant Button */}
          <button
            type="button"
            onClick={() => setShowAI(!showAI)}
            className="flex items-center justify-center w-12 h-12 rounded-xl border border-gray-700 text-gray-400 hover:text-green-400 hover:border-green-500 bg-gray-900/50 hover:bg-gray-900/70 transition-colors"
          >
            <Bot size={20} />
          </button>
        </div>

        {/* Send Button */}
        <button
          type="submit"
          disabled={!text.trim() && !media}
          className="w-12 h-12 flex items-center justify-center rounded-xl bg-gradient-to-r from-blue-600 to-purple-600
            text-white hover:from-blue-500 hover:to-purple-500 transition-all duration-300 disabled:opacity-50
            shadow-lg hover:shadow-blue-700/30 transform hover:-translate-y-0.5"
        >
          <Send size={20} />
        </button>
      </form>
    </div>
  );
}

export default MessageInput;
