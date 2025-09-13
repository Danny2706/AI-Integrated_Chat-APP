const app = require("./app")
const { v2: cloudinary } = require("cloudinary")
const { config } = require("dotenv")
const http = require("http")
const {initSocket} = require("./lib/socket")

config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const server = http.createServer(app);
initSocket(server);

server.listen(process.env.PORT, () => {
    console.log(`Server runs on port ${process.env.PORT} in ${process.env.NODE_env} mode.`)
})