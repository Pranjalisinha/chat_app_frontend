import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Login from "./pages/login";
import Register from "./pages/register";
import Message from "./pages/message";
import Profile from "./pages/profile";
// Friends page removed
import NotificationProvider from "./context/NotificationProvider";
import { ThemeProvider } from "./context/ThemeContext";
import Cookies from "js-cookie";

function RequireAuth({ children }) {
  const token = Cookies.get("token");
  if (!token) {
    return <Navigate to="/login" replace />;
  }
  return children;
}

function App() {
  return (
    <ThemeProvider>
      <div className="min-h-screen bg-light-bg-primary dark:bg-dark-bg-primary transition-colors duration-200">
        <NotificationProvider>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Navigate to="/login" />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route
                path="/chat"
                element={
                  <RequireAuth>
                    <Message />
                  </RequireAuth>
                }
              />
              <Route
                path="/profile"
                element={
                  <RequireAuth>
                    <Profile />
                  </RequireAuth>
                }
              />
            </Routes>
          </BrowserRouter>
        </NotificationProvider>
      </div>
    </ThemeProvider>
  );
}

export default App;
