const mongoose = require("mongoose")

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },

    fullname: {
      type: String,
      required: true,
    },

    password: {
      type: String,
      required: true,
      minlength: 6,
    },
    profilePic: {
      public_id: String,
      url: String,
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema)

module.exports = User