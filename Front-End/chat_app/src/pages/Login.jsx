import React, { useState } from "react";
import {
  Eye,
  EyeOff,
  Loader2,
  MessageSquare,
  Key,
  Brain,
  Network,
  Sparkles,
} from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import AuthImagePattern from "../Components/AuthImagePattern";
import { login } from "../store/slices/authSlice";

function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({ email: "", password: "" });

  const dispatch = useDispatch();
  const { isLoggingIn } = useSelector((state) => state.auth);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(login(formData));
  };

  return (
    <div className="min-h-screen grid grid-cols-1 lg:grid-cols-2 bg-black overflow-hidden relative">
      {/* Form Section */}
      <div className="flex flex-col justify-center items-center px-6 py-12 z-10">
        <div className="w-full max-w-md bg-black/70 backdrop-blur-md border border-gray-800 rounded-3xl p-8 shadow-2xl shadow-blue-900/20">
          {/* LOGO & HEADING */}
          <div className="flex flex-col items-center text-center mb-10">
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-3 rounded-xl shadow-lg transform hover:scale-105 transition-transform duration-300">
              <MessageSquare className="text-white w-6 h-6" />
            </div>
            <h1 className="text-3xl font-bold mt-6 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Welcome Back
            </h1>
            <p className="text-gray-400 text-sm mt-3">
              Sign in to your AI collaboration account
            </p>
            <div className="flex mt-2 space-x-2">
              <Key className="w-4 h-4 text-blue-500" />
              <Brain className="w-4 h-4 text-purple-500" />
              <Network className="w-4 h-4 text-cyan-500" />
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">
                Email
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-blue-500">
                  📧
                </span>
                <input
                  type="email"
                  placeholder="you@gmail.com"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  className="w-full bg-gray-900/50 border border-gray-800 rounded-xl py-3 pl-10 pr-3 focus:outline-none focus:ring-2 focus:ring-blue-600 text-white placeholder-gray-500 transition-all duration-300 hover:bg-gray-900/70 focus:bg-gray-900/70"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">
                Password
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-blue-500">
                  🔒
                </span>
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="********"
                  value={formData.password}
                  onChange={(e) =>
                    setFormData({ ...formData, password: e.target.value })
                  }
                  className="w-full bg-gray-900/50 border border-gray-800 rounded-xl py-3 pl-10 pr-3 focus:outline-none focus:ring-2 focus:ring-blue-600 text-white placeholder-gray-500 transition-all duration-300 hover:bg-gray-900/70 focus:bg-gray-900/70"
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

            {/* Submit */}
            <button
              type="submit"
              disabled={isLoggingIn}
              className="w-full bg-gradient-to-r from-blue-700 to-purple-700 hover:from-blue-600 hover:to-purple-600 text-white font-medium py-3 rounded-xl flex justify-center items-center gap-2 shadow-lg hover:shadow-blue-700/30 transition-all duration-300"
            >
              {isLoggingIn ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" /> Signing In...
                </>
              ) : (
                <>
                  <Sparkles className="w-5 h-5" /> Sign In
                </>
              )}
            </button>
          </form>

          <div className="mt-6 text-center text-sm text-gray-500">
            Don&apos;t have an account?{" "}
            <Link
              to="/signup"
              className="text-blue-500 hover:text-blue-400 font-medium"
            >
              Create account
            </Link>
          </div>
        </div>
      </div>

      {/* Image Pattern Section */}
      <div className="hidden lg:flex items-center justify-center p-12 relative z-10">
        <AuthImagePattern icon={Key} />
      </div>
    </div>
  );
}

export default Login;
