const jwt = require("jsonwebtoken")
const User = require("../model/usermodel")
const catchAsyncError = require("../middleware/catchAsyncError")

 const protectRouter = catchAsyncError(async (req, res, next) => {
    try {
        const token = req.cookies.jwt
        if (!token) {
          return  res.status(401).json({ message: "token not found: Unauthorized." })
        }

        const decode = jwt.verify(token, process.env.JWT_SECRET)

        if (!decode) {
           return res.status(401).json({ message: "Invalid token: Unauthorized." })
        }

        const user = await User.findById(decode.userId).select("-password")

        if (!user) {
            return res.status(404).json({ message: "user not found!" })
        }

        req.user = user
    
        next()

    } catch (error) {
        console.log("middleware error", error.message)
        res.status(500).json({ message: "Server Error!" })
    
    }
})
module.exports = protectRouter

