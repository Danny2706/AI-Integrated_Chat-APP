const express = require("express");
const authroutes = require("./routes/auth");
const messageroutes = require("./routes/message.route");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const fileupload = require("express-fileupload");
const connectDB = require("./lib/db");
const path = require("path");

dotenv.config();

const app = express();

// ✅ CORS setup
const allowedOrigins = [
  "http://localhost:5173",
  "https://ai-integrated-chat-app.vercel.app"
];

app.use(
  cors({
    origin: allowedOrigins,
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
  })
);

app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(
  fileupload({
    useTempFiles: true,
    tempFileDir: "./temp/",
  })
);

// ✅ Database
connectDB();

// ✅ API routes
app.use("/api/auth", authroutes);
app.use("/api/message", messageroutes);

// ✅ Serve frontend in production
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../Front-End/dist")));

  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../Front-End", "dist", "index.html"));
  });
}

module.exports = app;

