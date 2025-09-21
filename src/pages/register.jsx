// src/pages/Register.jsx
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";
import axios from "axios";
import LoadingPage from "../components/loadingPage";
import { useNotification } from "../context/NotificationProvider";
const BackendUrl = import.meta.env.VITE_BACKEND_URL || "http://localhost:5000";

export default function Register() {
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [passwordError, setPasswordError] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { showSuccess, showError, showWarning } = useNotification();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validation
    if (!form.username.trim()) {
      showError("Validation Error", "Username is required");
      return;
    }
    if (!form.email.trim()) {
      showError("Validation Error", "Email is required");
      return;
    }
    if (!form.password.trim()) {
      showError("Validation Error", "Password is required");
      return;
    }
    if (form.password.length < 6) {
      showWarning("Weak Password", "Password should be at least 6 characters long");
      return;
    }
    if (form.password !== form.confirmPassword) {
      showError("Password Mismatch", "Passwords do not match");
      return;
    }
    
    setLoading(true);
    
    try {
      // Simulate API call with delay
	  const response = await axios.post(`${BackendUrl}/api/users/register`, {
        username: form.username,
        email: form.email,
        password: form.password,
      });
	  
    //   await new Promise(resolve => setTimeout(resolve, 2000));
      // Simulate registration validation
	  console.log("Registration response:", response);
      if (response.statusCode === 400) {
        showError("Registration Failed", "Email already exists. Please use a different email.");
      } else {
        showSuccess("Registration Successful", "Account created! Redirecting to login...");
        setTimeout(() => {
          navigate("/login");
        }, 2000);
      }
	  setForm({ username: "", email: "", password: "", confirmPassword: "" });
    } catch (error) {
      console.error("Error during registration:", error);
      showError("Registration Error", "Something went wrong. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <LoadingPage message="Creating your account..." />;
  }

  return (
    <div className="min-h-screen grid grid-cols-1 lg:grid-cols-2 bg-gray-50 dark:bg-gray-900">
      {/* Left: hero */}
      <div className="hidden lg:flex items-center justify-center p-12 order-2 lg:order-1 bg-gradient-to-br from-pink-50 to-amber-50 dark:from-gray-900 dark:to-gray-950">
        <div className="max-w-md">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-white">
            Create your account
          </h1>
          <p className="mt-3 text-lg text-gray-600 dark:text-gray-300">
            Join Messaging AI to chat with friends and explore AI-powered
            conversations.
          </p>
          <div className="mt-8 grid grid-cols-3 gap-4">
            <div className="h-24 rounded-2xl bg-gradient-to-tr from-fuchsia-600 via-pink-500 to-amber-400 opacity-80" />
            <div className="h-24 rounded-2xl bg-gradient-to-tr from-indigo-600 via-violet-500 to-blue-400 opacity-80" />
            <div className="h-24 rounded-2xl bg-gradient-to-tr from-blue-600 via-sky-500 to-emerald-500 opacity-80" />
          </div>
        </div>
      </div>

      {/* Right: form */}
      <div className="flex items-center justify-center p-6 order-1 lg:order-2 bg-gradient-to-br from-indigo-100 to-purple-100 dark:from-gray-800 dark:to-gray-900">
        <div className="w-full max-w-md space-y-8 bg-white/80 backdrop-blur-sm dark:bg-gray-800/90 p-8 rounded-xl shadow-lg">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white text-center">
              Register
            </h2>
            <p className="mt-2 text-sm text-gray-600 dark:text-gray-400 text-center">
              Fill out the form to create your account.
            </p>
          </div>
          <div className="border-t border-gray-200 dark:border-gray-700" />
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-5">
              <div>
                <label
                  htmlFor="username"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                >
                  Username<div className="text-red-500 inline">*</div>
                </label>
                <input
                  id="username"
                  type="text"
                  value={form.username}
                  onChange={(e) =>
                    setForm({ ...form, username: e.target.value })
                  }
                  className="mt-1 block w-full px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm placeholder-gray-400 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 focus:border-indigo-500 dark:focus:border-indigo-400 text-gray-900 dark:text-white"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                >
                  Email<div className="text-red-500 inline">*</div>
                </label>
                <input
                  id="email"
                  type="email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className="mt-1 block w-full px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm placeholder-gray-400 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 focus:border-indigo-500 dark:focus:border-indigo-400 text-gray-900 dark:text-white"
                  required
                />
              </div>
              <div className="relative">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                >
                  Password<div className="text-red-500 inline">*</div>
                </label>
                <input
                  id="password"
                  type={passwordVisible ? "text" : "password"}
                  value={form.password}
                  onChange={(e) =>
                    setForm({ ...form, password: e.target.value })
                  }
                  className="mt-1 block w-full px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm placeholder-gray-400 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 focus:border-indigo-500 dark:focus:border-indigo-400 text-gray-900 dark:text-white"
                  required
                />
                <button
                  type="button"
                  onClick={() => setPasswordVisible(!passwordVisible)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center pr-3 cursor-pointer mt-6"
                >
                  {passwordVisible ? (
                    <EyeSlashIcon
                      className="h-5 w-5 text-gray-400"
                      aria-hidden="true"
                    />
                  ) : (
                    <EyeIcon
                      className="h-5 w-5 text-gray-400"
                      aria-hidden="true"
                    />
                  )}
                </button>
              </div>
              <div className="relative">
                <label
                  htmlFor="confirmPassword"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                >
                  Confirm Password<div className="text-red-500 inline">*</div>
                </label>
                <input
                  id="confirmPassword"
                  type={confirmPasswordVisible ? "text" : "password"}
                  value={form.confirmPassword}
                  onChange={(e) =>
                    setForm({ ...form, confirmPassword: e.target.value })
                  }
                  className="mt-1 block w-full px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm placeholder-gray-400 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 focus:border-indigo-500 dark:focus:border-indigo-400 text-gray-900 dark:text-white"
                  required
                />
                <button
                  type="button"
                  onClick={() =>
                    setConfirmPasswordVisible(!confirmPasswordVisible)
                  }
                  className="absolute inset-y-0 right-0 pr-3 flex items-center pr-3 cursor-pointer mt-6"
                >
                  {confirmPasswordVisible ? (
                    <EyeSlashIcon
                      className="h-5 w-5 text-gray-400"
                      aria-hidden="true"
                    />
                  ) : (
                    <EyeIcon
                      className="h-5 w-5 text-gray-400"
                      aria-hidden="true"
                    />
                  )}
                </button>
              </div>
              {passwordError && (
                <p className="text-sm text-red-500">{passwordError}</p>
              )}
            </div>

            <button
              type="submit"
              className="w-full flex justify-center py-2.5 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:focus:ring-offset-gray-800 transition-colors duration-200"
            >
              Create account
            </button>
          </form>
          <p className="text-sm text-gray-600 dark:text-gray-400 text-center">
            Already have an account?{" "}
            <Link
              to="/login"
              className="font-medium text-indigo-600 dark:text-indigo-400 hover:text-indigo-500 dark:hover:text-indigo-300"
            >
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
