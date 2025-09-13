import React from "react"
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Loader } from "lucide-react"
import { useDispatch, useSelector } from "react-redux"
import { useEffect } from "react"
import { getUser, setOnlineUsers } from "./store/slices/authSlice"
import { connectSocket, disconnectSocket } from "./lib/socket"
import { BrowserRouter as Router,Routes,Route, Navigate } from "react-router-dom";
import Navbar from "./Components/Navbar";
import Home from "./pages/Home";
import Signup from "./pages/Signup"
import Login from "./pages/Login"
import Profilepage from "./pages/Profilepage";

function App() {

  const { authUser, isCheckingAuth } = useSelector((state) => state.auth);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUser());
  }, [getUser]);

  useEffect(() => {
    if (authUser) {
      const socket = connectSocket(authUser._id)
      if (!socket) return;

      socket.on("getOnlineUsers", (users) => {
        dispatch(setOnlineUsers(users))
      })

      return () => disconnectSocket();
    }
  }, [authUser]);

  if (isCheckingAuth && !authUser) {
    return (
      <div className="flex item-center justify-center h-screen">
        <Loader className="size-10 animate-spin"/>
      </div>
    )
  }
  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route
            path="/"
            element={authUser ? <Home /> : <Navigate to={"/login"} />}
          />
          <Route
            path="/signup"
            element={!authUser ? <Signup /> : <Navigate to={"/"} />}
          />
          <Route
            path="/login"
            element={!authUser ? <Login /> : <Navigate to={"/"} />}
          />
          <Route
            path="/profile"
            element={authUser ? <Profilepage /> : <Navigate to={"/login"} />}
          />
        </Routes>
        <ToastContainer/>
      </Router>
    </>
  );
}

export default App
