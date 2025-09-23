// src/pages/Profile.jsx
import React from "react";
import NavBar from "../components/navBar";
import Cookies from "js-cookie";

export default function Profile() {
  const user = {
    username: Cookies.get("username") || "",
    email: Cookies.get("email") || "",
    bio: "",
  };

	return (
		<div className="flex flex-col min-h-screen section-strong">
			<NavBar />
			<div className="flex-1 p-6">
				<div className="max-w-3xl mx-auto">
					<div className="container-card p-0 overflow-hidden section-surface">
						<div className="h-24 bg-gradient-to-tr from-blue-600 via-sky-500 to-emerald-500" />
						<div className="p-6">
							<div className="flex items-end gap-4 -mt-12">
								<div className="h-20 w-20 rounded-2xl ring-4 ring-white/70 bg-white overflow-hidden grid place-items-center">
									<div className="h-16 w-16 rounded-xl bg-gradient-to-tr from-indigo-600 via-violet-500 to-blue-400" />
								</div>
								<div>
									<h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100">{user.username}</h2>
									<p className="text-sm text-gray-600 dark:text-gray-300">{user.email}</p>
								</div>
							</div>

							<p className="mt-4 text-gray-700 dark:text-gray-200">{user.bio}</p>

							<div className="mt-6 flex flex-wrap gap-2">
								<button className="button-primary">Edit Profile</button>
								<button className="px-4 py-2 rounded-xl border border-gray-200 hover:bg-gray-50 dark:border-gray-700 dark:hover:bg-gray-800">Settings</button>
							</div>
						</div>
					</div>

					{/* <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-4">
						<div className="container-card p-4 text-center section-surface">
							<p className="text-2xl font-semibold text-gray-800 dark:text-gray-100">128</p>
							<p className="text-sm text-gray-500 dark:text-gray-400">Messages</p>
						</div>
						<div className="container-card p-4 text-center section-surface">
							<p className="text-2xl font-semibold text-gray-800 dark:text-gray-100">24</p>
							<p className="text-sm text-gray-500 dark:text-gray-400">Friends</p>
						</div>
						<div className="container-card p-4 text-center section-surface">
							<p className="text-2xl font-semibold text-gray-800 dark:text-gray-100">5</p>
							<p className="text-sm text-gray-500 dark:text-gray-400">Groups</p>
						</div>
					</div> */}
				</div>
			</div>
		</div>
	);
}
