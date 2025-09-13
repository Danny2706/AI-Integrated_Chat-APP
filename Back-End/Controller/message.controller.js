const User = require("../model/usermodel");
const Message = require("../model/messagemodel");
const cloudinary = require("cloudinary").v2;
const { config } = require("dotenv");
const catchAsyncError = require("../middleware/catchAsyncError");
const { getReceiversSocketId, getIo } = require("../lib/socket");
const axios = require("axios");

config();

exports.getAllusers = catchAsyncError(async (req, res) => {
  const user = req.user;
  const filteredUser = await User.find({ _id: { $ne: user } }).select(
    "-password"
  );
  res.status(200).json({ success: true, users: filteredUser });
});

exports.getMessage = catchAsyncError(async (req, res) => {
  const reciverId = req.params.id;
  const myId = req.user._id;

  const reciver = await User.findById(reciverId);
  if (!reciver)
    return res
      .status(400)
      .json({ success: false, message: "Invalid ReceiverId." });

  const messages = await Message.find({
    $or: [
      { senderId: myId, reciverId },
      { senderId: reciverId, reciverId: myId },
    ],
  }).sort({ createdAt: 1 });

  res.status(200).json({ success: true, messages });
});

exports.sendMessage = catchAsyncError(async (req, res, next) => {
  try {
    const { text } = req.body;
    const media = req?.files?.media;
    const { id: reciverId } = req.params;
    const senderId = req.user._id;

    const reciver = await User.findById(reciverId);
    if (!reciver) {
      return res.status(400).json({
        success: false,
        message: "Invalid ReceiverId.",
      });
    }

    if (!text && !media) {
      return res.status(400).json({
        success: false,
        message: "Message cannot be empty.",
      });
    }

    let aiGeneratedCode = "";
    if (text && text.startsWith("@AI")) {
      const prompt = text.replace("@AI", "").trim();
      try {
        const response = await axios.post(
          "http://localhost:11434/v1/completions",
          {
            model: "gemma:2b",
            prompt: prompt,
            max_tokens: 500,
          }
        );

        console.log("Raw Ollama Response:", response.data);

        // ✅ Correct extraction
        aiGeneratedCode = response.data?.choices?.[0]?.text || "";

        console.log("AI Generated Code:", aiGeneratedCode);
      } catch (err) {
        console.error("AI generation error:", err.message);
        return res.status(500).json({
          success: false,
          message: "AI service unavailable.",
        });
      }
    }

    let mediaUrl = "";
    if (media) {
      try {
        const uploadResponse = await cloudinary.uploader.upload(
          media.tempFilePath,
          {
            resource_type: "auto",
            folder: "Chat_App_MEDIA",
            transformation: [
              { width: 1080, height: 1080, crop: "limit" },
              { quality: "auto" },
              { fetch_format: "auto" },
            ],
          }
        );
        mediaUrl = uploadResponse?.secure_url;
      } catch (error) {
        console.log("upload error", error.message);
        return res.status(500).json({
          success: false,
          message: "Internal Server Error.",
        });
      }
    }

    const newMessage = new Message({
      senderId,
      reciverId,
      text: aiGeneratedCode || text,
      media: mediaUrl,
      type: text.startsWith("@AI") ? "ui" : media ? "media" : "text",
      code: aiGeneratedCode || "",
    });

    const reciverSocketId = getReceiversSocketId(reciverId);
    if (reciverSocketId) {
      getIo().to(reciverSocketId).emit("newMessage", newMessage);
    }

    await newMessage.save();
    res.status(200).json(newMessage);
  } catch (error) {
    console.log("Failed to send Message!", error.message);
    res.status(500).json({ message: "Internal Server Error." });
  }
});