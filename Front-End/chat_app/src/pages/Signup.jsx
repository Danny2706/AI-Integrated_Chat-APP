import React, { useState } from "react";
import {
  Eye,
  EyeOff,
  Loader2,
  Lock,
  Mail,
  MessageSquare,
  User,
  Cpu,
  Brain,
  Network,
  Sparkles,
} from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import AuthImagePattern from "../Components/AuthImagePattern";
import { Link } from "react-router-dom";
import { signup } from "../store/slices/authslice";

function Signup() {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormDta] = useState({
    fullname: "",
    email: "",
    password: "",
  });

  const dispatch = useDispatch();

  const { isSigningup } = useSelector((state) => state.auth);
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(signup(formData));
  };

  return (
    <div className="min-h-screen grid grid-cols-1 lg:grid-cols-2 bg-black overflow-hidden relative">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-900/30 rounded-full blur-3xl animate-pulse-slow"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-900/30 rounded-full blur-3xl animate-pulse-slow animation-delay-2000"></div>
        <div className="absolute top-1/2 left-1/4 w-60 h-60 bg-cyan-900/30 rounded-full blur-3xl animate-pulse-slow animation-delay-4000"></div>

        {/* Grid pattern overlay */}
        <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>
      </div>

      {/* Form Section */}
      <div className="flex flex-col justify-center items-center px-6 py-12 z-10">
        <div className="w-full max-w-md bg-black/70 backdrop-blur-md border border-gray-800 rounded-3xl p-8 shadow-2xl shadow-blue-900/20">
          {/* LOGO & HEADING */}
          <div className="flex flex-col items-center text-center mb-10">
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-3 rounded-xl shadow-lg transform hover:scale-105 transition-transform duration-300">
              <MessageSquare className="text-white w-6 h-6" />
            </div>
            <h1 className="text-3xl font-bold mt-6 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Create Account
            </h1>
            <p className="text-gray-400 text-sm mt-3">
              Join our AI-powered collaboration platform
            </p>
            <div className="flex mt-2 space-x-2">
              <Cpu className="w-4 h-4 text-blue-500" />
              <Brain className="w-4 h-4 text-purple-500" />
              <Network className="w-4 h-4 text-cyan-500" />
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">
                Full Name
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-blue-500">
                  <User className="w-5 h-5" />
                </span>
                <input
                  type="text"
                  className="w-full bg-gray-900/50 border border-gray-800 rounded-xl
                            py-3 pl-10 pr-3 focus:outline-none focus:ring-2 focus:ring-blue-600 
                            text-white placeholder-gray-500 transition-all duration-300
                            hover:bg-gray-900/70 focus:bg-gray-900/70"
                  placeholder="Daniel Kumilachew"
                  value={formData.fullname}
                  onChange={(e) => {
                    setFormDta({ ...formData, fullname: e.target.value });
                  }}
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">
                Email
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-blue-500">
                  <Mail className="w-5 h-5" />
                </span>
                <input
                  type="email"
                  className="w-full bg-gray-900/50 border border-gray-800 rounded-xl
                            py-3 pl-10 pr-3 focus:outline-none focus:ring-2 focus:ring-blue-600 
                            text-white placeholder-gray-500 transition-all duration-300
                            hover:bg-gray-900/70 focus:bg-gray-900/70"
                  placeholder="you@gmail.com"
                  value={formData.email}
                  onChange={(e) => {
                    setFormDta({ ...formData, email: e.target.value });
                  }}
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">
                Password
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-blue-500">
                  <Lock className="w-5 h-5" />
                </span>
                <input
                  type={showPassword ? "text" : "password"}
                  className="w-full bg-gray-900/50 border border-gray-800 rounded-xl
                            py-3 pl-10 pr-3 focus:outline-none focus:ring-2 focus:ring-blue-600 
                            text-white placeholder-gray-500 transition-all duration-300
                            hover:bg-gray-900/70 focus:bg-gray-900/70"
                  placeholder="********"
                  value={formData.password}
                  onChange={(e) => {
                    setFormDta({ ...formData, password: e.target.value });
                  }}
                />
                <button
                  type="button"
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-blue-500 hover:text-blue-400 transition-colors"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={isSigningup}
              className="w-full bg-gradient-to-r from-blue-700 to-purple-700 hover:from-blue-600 hover:to-purple-600 text-white
                        font-medium py-3 rounded-xl transition-all duration-300 flex justify-center
                        items-center gap-2 shadow-lg hover:shadow-blue-700/30 transform hover:-translate-y-0.5"
            >
              {isSigningup ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" /> Creating
                  Account...
                </>
              ) : (
                <>
                  <Sparkles className="w-5 h-5" /> Get Started
                </>
              )}
            </button>
          </form>

          {/* FOOTER */}
          <div className="mt-6 text-center">
            <p className="text-sm text-gray-500">
              Already have an account? <br />
              <Link
                to="/login"
                className="text-blue-500 hover:text-blue-400 transition-colors font-medium"
              >
                Sign in instead
              </Link>
            </p>
          </div>
        </div>
      </div>

      {/* Image Pattern Section */}
      <div className="hidden lg:flex items-center justify-center p-12 relative z-10">
        <div className="max-w-md text-center bg-black/70 backdrop-blur-md border border-gray-800 rounded-3xl p-10 shadow-2xl shadow-purple-900/20">
          {/* Animated Grid Pattern */}
          <div className="grid grid-cols-3 gap-4 mb-10 relative">
            {[...Array(9)].map((_, i) => {
              const colors = [
                "bg-blue-900/40",
                "bg-purple-900/40",
                "bg-cyan-900/40",
                "bg-blue-800/40",
                "bg-purple-800/40",
                "bg-cyan-800/40",
                "bg-blue-700/40",
                "bg-purple-700/40",
                "bg-cyan-700/40",
              ];

              const animationDelays = [
                "animate-pulse",
                "animate-pulse animation-delay-1000",
                "animate-pulse animation-delay-2000",
                "animate-pulse animation-delay-3000",
                "animate-pulse animation-delay-4000",
                "animate-pulse animation-delay-5000",
                "animate-pulse animation-delay-6000",
                "animate-pulse animation-delay-7000",
                "animate-pulse animation-delay-8000",
              ];

              return (
                <div
                  key={i}
                  className={`aspect-square rounded-2xl ${colors[i]} ${animationDelays[i]} 
                  transform hover:scale-105 transition-transform duration-300 border border-gray-800`}
                />
              );
            })}

            {/* Floating AI icon in the center */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="bg-gradient-to-br from-blue-700 to-purple-700 p-4 rounded-2xl shadow-lg animate-float">
                <Brain className="w-8 h-8 text-white" />
              </div>
            </div>
          </div>

          <h2 className="text-3xl font-bold text-white mb-4">
            Join Our AI Community!
          </h2>
          <p className="text-gray-400">
            Register to access our generative AI tools and collaborate with tech
            professionals worldwide.
          </p>

          <div className="mt-8 flex justify-center space-x-6">
            <div className="flex items-center text-sm text-blue-500">
              <Cpu className="w-4 h-4 mr-1" /> AI-Powered
            </div>
            <div className="flex items-center text-sm text-purple-500">
              <Network className="w-4 h-4 mr-1" /> Collaborative
            </div>
            <div className="flex items-center text-sm text-cyan-500">
              <Sparkles className="w-4 h-4 mr-1" /> Innovative
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Signup;
