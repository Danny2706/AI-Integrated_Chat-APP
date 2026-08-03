import React from "react";
import { Camera, Loader2, Mail, User, Calendar, Shield } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { updateProfile } from "../store/slices/authSlice";

function Profilepage() {
  const { authUser, isUpdatingProfile } = useSelector((state) => state.auth);
  const [selectedImage, setSelectedImage] = useState(null);
  const [formData, setformData] = useState({
    fullname: authUser?.fullname,
    email: authUser?.email,
    profilePic: authUser?.profilePic?.url,
  });

  const dispatch = useDispatch();

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onload = () => {
      const base64Image = reader.result;
      setSelectedImage(base64Image);
      setformData({ ...formData, profilePic: file });
    };
  };

  const handleUpdateProfile = () => {
    const data = new FormData();
    data.append("fullname", formData.fullname);
    data.append("email", formData.email);
    data.append("profilePic", formData.profilePic);
    dispatch(updateProfile(data));
  };

  // Format date function
  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <>
      <div className="min-h-screen pt-20 bg-black">
        <div className="max-w-2xl mx-auto p-4 py-8">
          <div className="bg-black/70 backdrop-blur-md border border-gray-800 rounded-2xl shadow-2xl shadow-blue-900/20 p-8 space-y-8">
            <div className="text-center">
              <h1 className="text-2xl font-semibold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                Profile
              </h1>
              <p className="mt-2 text-gray-400">Your Profile Information</p>
            </div>

            {/* PROFILE PIC UPLOAD */}
            <div className="flex flex-col items-center gap-4">
              <div className="relative">
                <img
                  src={
                    selectedImage ||
                    formData.profilePic ||
                    "../assets/danny.png"
                  }
                  alt="../assets/danny.png"
                  className="w-32 h-32 rounded-full object-cover object-top border-4 border-gray-800"
                />
                <label
                  htmlFor="profile-upload"
                  className={`absolute bottom-0 right-0 bg-gradient-to-r from-blue-600 to-purple-600 hover:scale-105 p-2 rounded-full cursor-pointer transition-all
                  duration-200 shadow-lg ${
                    isUpdatingProfile ? "animate-pulse pointer-events-none" : ""
                  }`}
                >
                  <Camera className="w-5 h-5 text-white" />
                  <input
                    type="file"
                    id="profile-upload"
                    className="hidden"
                    accept="image/*"
                    onChange={handleImageUpload}
                    disabled={isUpdatingProfile}
                  />
                </label>
              </div>

              <p className="text-sm text-gray-500">
                {isUpdatingProfile
                  ? "Uploading..."
                  : "Click the camera icon to upload your photo"}
              </p>

              {/* UserInfo */}
              <div className="w-full space-y-6">
                <div className="space-y-1.5">
                  <div className="text-sm text-gray-400 flex items-center gap-2">
                    <User className="w-4 h-4" />
                    Full Name
                  </div>
                  <input
                    type="text"
                    value={formData.fullname}
                    onChange={(e) =>
                      setformData({ ...formData, fullname: e.target.value })
                    }
                    className="px-4 py-2.5 bg-gray-900/50 border border-gray-800 rounded-xl text-white
                    w-full focus:outline-none focus:ring-2 focus:ring-blue-600 placeholder-gray-500
                    transition-all duration-300 hover:bg-gray-900/70 focus:bg-gray-900/70"
                    placeholder="Enter your full name"
                  />
                </div>

                <div className="space-y-1.5">
                  <div className="text-sm text-gray-400 flex items-center gap-2">
                    <Mail className="w-4 h-4" />
                    Email Address
                  </div>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) =>
                      setformData({ ...formData, email: e.target.value })
                    }
                    className="px-4 py-2.5 bg-gray-900/50 border border-gray-800 rounded-xl text-white
                    w-full focus:outline-none focus:ring-2 focus:ring-blue-600 placeholder-gray-500
                    transition-all duration-300 hover:bg-gray-900/70 focus:bg-gray-900/70"
                    placeholder="Enter your email"
                  />
                </div>
              </div>

              <button
                onClick={handleUpdateProfile}
                disabled={isUpdatingProfile}
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white font-medium py-3 rounded-xl
                transition-all duration-300 flex justify-center items-center gap-2 shadow-lg hover:shadow-blue-700/30 transform hover:-translate-y-0.5
                disabled:opacity-50 disabled:hover:transform-none"
              >
                {isUpdatingProfile ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Updating...
                  </>
                ) : (
                  "Update Profile"
                )}
              </button>

              {/* ACCOUNT INFO */}
              <div className="mt-6 bg-gray-900/50 border border-gray-800 rounded-2xl p-6 w-full">
                <h2 className="text-lg font-medium text-white mb-4 flex items-center gap-2">
                  <Shield className="w-5 h-5 text-blue-400" />
                  Account Information
                </h2>
                <div className="space-y-3 text-sm">
                  <div className="flex items-center justify-between py-2 border-b border-gray-800">
                    <span className="text-gray-400 flex items-center gap-2">
                      <Calendar className="w-4 h-4" />
                      Member Since
                    </span>
                    <span className="text-gray-300">
                      {formatDate(authUser?.createdAt)}
                    </span>
                  </div>
                  <div className="flex items-center justify-between py-2">
                    <span className="text-gray-400">Account Status</span>
                    <span className="text-green-400 font-medium flex items-center gap-1">
                      <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                      Active
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Profilepage;
