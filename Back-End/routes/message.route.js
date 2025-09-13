const express = require("express")
const protectRouter = require("../middleware/auth.middleware")
const { getMessage, sendMessage, getAllusers } = require("../Controller/message.controller")

const router = express.Router()

router
    .get("/users", protectRouter, getAllusers)
    .get("/:id", protectRouter, getMessage)
    .post("/send/:id", protectRouter, sendMessage)
       
module.exports = router;