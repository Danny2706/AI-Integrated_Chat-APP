import React, { useState } from "react";
import {
  LogOut,
  MessageSquare,
  Settings,
  User,
  Menu,
  X,
  Cpu,
  Brain,
  Sparkles,
} from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { logout } from "../store/slices/authSlice";

function Navbar() {
  const { authUser } = useSelector((state) => state.auth);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <header
      className="fixed top-0 w-full z-50 bg-black/90 backdrop-blur-xl border-b border-gray-800
    shadow-2xl shadow-blue-900/20"
    >
      <div className="max-w-7xl mx-auto px-4 h-16">
        <div className="flex items-center justify-between h-full">
          {/* LOGO */}
          <div className="flex items-center gap-8">
            <Link
              to={"/"}
              className="flex items-center gap-2.5 group transition-all duration-300"
            >
              <div className="w-9 h-9 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                <MessageSquare className="w-5 h-5 text-white" />
              </div>
              <h1 className="text-lg font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                TeckTalk
              </h1>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden text-gray-400 hover:text-white transition-colors"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>

          {/* Right Section */}
          <div className="hidden lg:flex items-center gap-3">
            {authUser && (
              <>
                <Link
                  to={"/profile"}
                  className="inline-flex items-center gap-2 px-4 py-2
              rounded-xl text-sm font-medium text-gray-300
              hover:bg-gray-800 hover:text-white transition-all duration-300 group"
                >
                  <User className="w-4 h-4 group-hover:scale-110 transition-transform" />
                  <span>Profile</span>
                </Link>

                <button
                  onClick={handleLogout}
                  className="inline-flex items-center gap-2 px-4 py-2
              rounded-xl text-sm font-medium text-red-400
              hover:bg-red-900/40 hover:text-white transition-all duration-300 group"
                >
                  <LogOut className="w-4 h-4 group-hover:scale-110 transition-transform" />
                  <span>Logout</span>
                </button>
              </>
            )}
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="lg:hidden mt-4 pb-4 border-t border-gray-800 pt-4">
            <div className="flex flex-col space-y-3">
              {authUser && (
                <>
                  <Link
                    to={"/profile"}
                    className="inline-flex items-center gap-2 px-4 py-2
                    rounded-xl text-sm font-medium text-gray-300
                    hover:bg-gray-800 hover:text-white transition-all duration-300"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <User className="w-4 h-4" />
                    <span>Profile</span>
                  </Link>

                  <button
                    onClick={() => {
                      handleLogout();
                      setIsMenuOpen(false);
                    }}
                    className="inline-flex items-center gap-2 px-4 py-2
                    rounded-xl text-sm font-medium text-red-400
                    hover:bg-red-900/40 hover:text-white transition-all duration-300"
                  >
                    <LogOut className="w-4 h-4" />
                    <span>Logout</span>
                  </button>
                </>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Animated decorative elements */}
      <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-blue-700 via-purple-700 to-cyan-700 opacity-80">
        <div className="h-full w-20 bg-white/30 animate-marquee"></div>
      </div>
    </header>
  );
}

export default Navbar;
