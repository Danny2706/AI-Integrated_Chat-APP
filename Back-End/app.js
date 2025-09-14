const express = require('express')
const authroutes = require('./routes/auth')
const messageroutes = require('./routes/message.route')
const dotenv = require("dotenv")
const cookieParser = require('cookie-parser')
const cors = require("cors");
const fileupload = require("express-fileupload");
const connectDB = require('./lib/db');

app = express()
app.use(
  cors({
    origin: "http://localhost:5173","https://ai-integrated-hub.onrender.com",
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
  })
);
dotenv.config()
app.use(express.json())
app.use(cookieParser())
app.use(express.urlencoded({ extended: true }));
app.use(
  fileupload({
    useTempFiles: true,
    tempFileDir: "./temp/",
  })
);


connectDB()

app.use("/api/auth", authroutes)
app.use("/api/message", messageroutes)

module.exports = app
