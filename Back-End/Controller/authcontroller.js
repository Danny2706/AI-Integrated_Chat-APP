const generateWebtoken = require("../lib/util");
const User = require("../model/usermodel")
const bcrypt = require("bcryptjs")
const cloudinary = require("cloudinary")
const catchAsyncError = require("../middleware/catchAsyncError")

exports.signup = catchAsyncError(async (req, res, next) => {
    const { email, fullname, password } = req.body
    
    try {

        if (!email || !fullname || !password) {
            return res.status(400).json({message: "All Credintial must be filled!"})
        }

        if (password.length < 6) {
            return res.status(400).json({message: "password must be above 6 characters!"})
        }

        const emaiRegex = /^\S+@\S+\.\S+$/;

        if (!emaiRegex.test(email)) {
            return res.status(400).json({messsage:"Invalid Email!"})
        }

        const user = await User.findOne({ email })
        if (user) {
            return res.status(400).json({message: "Email already exist!"})
        }
        const salt = await bcrypt.genSalt(10)
        const hashedpassword = await bcrypt.hash(password, salt)
        
        const newUser = new User({
            email,
            fullname,
            password: hashedpassword,
        })

        if (newUser) {
            generateWebtoken(newUser._id, res)
            await newUser.save();

            res.status(200).json({
                _id: newUser._id,
                email: newUser.email,
                fullname: newUser.fullname,
                profilepic: newUser.profilepic
            })
        } else {
            return res.status(400).json({message: "invalid credintial!"})
        }

    } catch (error) {
        console.log("signupcontroller Error!", error)
        res.status(500).json({message: "internal server error!"})
    }
});

exports.login = catchAsyncError(async (req, res,next) => {
    const { email, password } = req.body
    
    try {
        
        const user = await User.findOne({ email })
    
        if (!user) {
            res.status(400).json({ message: "Invalid Credential!" })
        }

        const ispassword = await bcrypt.compare(password, user.password)

        if (!ispassword) {
            res.status(400).json({ message: "Incorrect Password!" })
        }

        generateWebtoken(user._id, res)
    
        res.status(200).json({
            _id: user._id,
            fullname: user.fullname,
            email: user.email,
            password: user.password
        })
        
    } catch (error) { 
        console.log("Credential Error",error.message)
        res.status(500).json({message: "server error"})
    }
});

exports.logout = catchAsyncError(async (req, res,next) => {
    try {
        res.cookie("jwt", "", { maxAge: 0 }); 
        res.status(200).json({message: "Loggedout Successfully!"})
    }
    catch (error) {
        console.log("Controller Error!", error.message)
     res.status(500).json({message:"Internal server error!"})   
    }
    
});

exports.user = catchAsyncError(async (req, res, next) => {
    const user = req.user
    res.status(200).json({
        success: true,
        user
    })
})

exports.updateProfile = catchAsyncError(async (req, res, next) => {
  const { fullname, email } = req.body;

  // Validate fullname and email
  if (fullname?.trim().length === 0 || email?.trim().length === 0) {
    return res.status(400).json({
      success: false,
      message: "Fullname and Email fields shouldn't be empty.",
    });
  }

  const profilePic = req?.files?.profilePic;
  let cloudinaryResponse = {};

  // Handle profile picture upload if provided
  if (profilePic) {
    try {
      // Delete old profile pic if exists
      const oldProfilepicPublicId = req.user?.profilePic?.public_id;
      if (oldProfilepicPublicId && oldProfilepicPublicId.length > 0 ) {
        await cloudinary.uploader.destroy(oldProfilepicPublicId);
      }

      // Upload new profile picture
      cloudinaryResponse = await cloudinary.uploader.upload(
        profilePic.tempFilePath,
        {
          folder: "Chat-App Users Profile Picture",
          transformation: [
            { width: 300, height: 300, crop: "limit" },
            { quality: "auto" },
            { fetch_format: "auto" },
          ],
        }
      );
    } catch (error) {
      console.log("upload error", error.message);
      return res.status(500).json({
        success: false,
        message: "Internal Server Error.",
      });
    }
  }

  // Prepare update data
  let data = { fullname, email };
  if (
    profilePic &&
    cloudinaryResponse?.public_id &&
    cloudinaryResponse?.secure_url
  ) {
    data.profilePic = {
      public_id: cloudinaryResponse.public_id,
      url: cloudinaryResponse.secure_url,
    };
  }

  // Update user
  let user = await User.findByIdAndUpdate(req.user._id, data, {
    new: true,
    runValidators: true,
  });

  generateWebtoken(user._id, res);

  res.status(200).json({
    success: true,
    message: "Profile updated successfully.",
    user,
  });
});
