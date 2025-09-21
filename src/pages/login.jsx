// src/pages/Login.jsx
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import LoadingPage from "../components/loadingPage";
import axios from "axios";
import Cookies from "js-cookie";
import { useNotification } from "../context/NotificationProvider";
const BackendUrl = import.meta.env.VITE_BACKEND_URL || "http://localhost:5000";

export default function Login() {
	const [form, setForm] = useState({ email: "", password: "" });
	const [remember, setRemember] = useState(true);
	const [loading, setLoading] = useState(false);
	const navigate = useNavigate();
	const { showSuccess, showError } = useNotification()

	useEffect(() => {
		const token = Cookies.get("token");
		if (token) {
			navigate("/chat");
		}
	}, [navigate]);

	const handleSubmit = async (e) => {
		e.preventDefault();
		setLoading(true);
		
		try {
			// Simulate API call
			const loginData = await axios.post(`${BackendUrl}/api/users/login`, {
				email: form.email,
				password: form.password,
			});
			// await new Promise(resolve => setTimeout(resolve, 2000));
			console.log("Login response:", loginData);
			// Simulate login validation
			if (loginData.status === 200) {
				const { username, email, id } = loginData.data.data.user;
				// Store token in cookies
				if (remember) {
					Cookies.set('token', loginData.data.data.token, {expires: 30 })
					Cookies.set('username',username, {expires: 30 }	)
					Cookies.set('email',email, {expires: 30 }	)
					Cookies.set('userId',id, {expires: 30 }	)
				} else {
					Cookies.set('token', loginData.data.data.token);
					Cookies.set('username', username);
					Cookies.set('email',email);
					Cookies.set('userId',id);
				}
				showSuccess("Login Successful", "Welcome back! Redirecting to chat...");
				setTimeout(() => {
					setLoading(false);
					navigate("/chat");
				}, 1000);
			} else {
				showError("Login Failed", "Invalid email or password. Please try again.");
			}
			setForm({ email: "", password: "" });
		} catch (error) {
			showError("Login Error", "Something went wrong. Please try again later.");
		} finally {
			setLoading(false);
		}
	};

	if (loading) {
		return <LoadingPage message="Signing you in..." />;
	}

	return (
		<div className="min-h-screen grid grid-cols-1 lg:grid-cols-2 bg-gray-50 dark:bg-gray-900">
			{/* Left: hero */}
			<div className="hidden lg:flex items-center justify-center p-12 bg-gradient-to-br from-indigo-50 to-blue-50 dark:from-gray-900 dark:to-gray-950">
				<div className="max-w-md">
					<h1 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-white">Welcome back</h1>
					<p className="mt-3 text-lg text-gray-600 dark:text-gray-300">Sign in to continue your conversations and connect with your friends.</p>
					<div className="mt-8 grid grid-cols-3 gap-4">
						<div className="h-24 rounded-2xl bg-gradient-to-tr from-blue-600 via-sky-500 to-emerald-500 opacity-80" />
						<div className="h-24 rounded-2xl bg-gradient-to-tr from-fuchsia-600 via-pink-500 to-amber-400 opacity-80" />
						<div className="h-24 rounded-2xl bg-gradient-to-tr from-indigo-600 via-violet-500 to-blue-400 opacity-80" />
					</div>
				</div>
			</div>

			{/* Right: form */}
			<div className="flex items-center justify-center p-6 bg-gradient-to-br from-indigo-100 to-purple-100 dark:from-gray-800 dark:to-gray-900">
				<div className="w-full max-w-md space-y-8 bg-white/80 backdrop-blur-sm dark:bg-gray-800/90 p-8 rounded-xl shadow-lg">
					<div>
						<h2 className="text-3xl font-bold text-gray-900 dark:text-white text-center">Login</h2>
						<p className="mt-2 text-sm text-gray-600 dark:text-gray-400 text-center">Enter your credentials to access your account.</p>
					</div>
					<div className="border-t border-gray-200 dark:border-gray-700" />
					<form onSubmit={handleSubmit} className="space-y-6">
						<div className="space-y-5">
							<div>
								<label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Email</label>
								<input id="email" type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className="mt-1 block w-full px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm placeholder-gray-400 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 focus:border-indigo-500 dark:focus:border-indigo-400 text-gray-900 dark:text-white" required />
							</div>
							<div>
								<label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Password</label>
								<input id="password" type="password" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} className="mt-1 block w-full px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm placeholder-gray-400 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 focus:border-indigo-500 dark:focus:border-indigo-400 text-gray-900 dark:text-white" required />
							</div>
						</div>

						<div className="flex items-center justify-between">
							<label className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-200">
								<input type="checkbox" checked={remember} onChange={(e) => setRemember(e.target.checked)} className="h-4 w-4 rounded border-gray-300 dark:border-gray-600" />
								Remember me
							</label>
							<Link to="#" className="font-medium text-indigo-600 dark:text-indigo-400 hover:text-indigo-500 dark:hover:text-indigo-300">Forgot password?</Link>
						</div>

						<button type="submit" className="w-full flex justify-center py-2.5 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:focus:ring-offset-gray-800 transition-colors duration-200">Sign in</button>
					</form>
					<p className="text-sm text-gray-600 dark:text-gray-400 text-center">
						Don’t have an account? <Link to="/register" className="font-medium text-indigo-600 dark:text-indigo-400 hover:text-indigo-500 dark:hover:text-indigo-300">Register</Link>
					</p>
				</div>
			</div>
		</div>
	);
}

