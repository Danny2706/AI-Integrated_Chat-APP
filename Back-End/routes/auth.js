const express = require("express")
const { signup, login, logout, user, updateProfile, } = require("../Controller/authcontroller")
const protectRouter = require("../middleware/auth.middleware")

const router = express.Router()

router
    .post("/signup", signup)
    .post("/login", login)
    .post("/logout", protectRouter,logout)
    .put("/update_profile", protectRouter, updateProfile)
    .get("/me",protectRouter, user)
module.exports = router