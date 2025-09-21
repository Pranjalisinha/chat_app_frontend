// src/pages/Friends.jsx
import React, { useEffect, useMemo, useState } from "react";
import NavBar from "../components/navBar";
import ProfilePicture from "../components/ProfilePicture";
import axios from "axios";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
const BackendUrl = import.meta.env.VITE_BACKEND_URL || "http://localhost:5000";
const userId = Cookies.get("userId") || "defaultUser";


export default function Friends() {
	const navigate = useNavigate();
	const [query, setQuery] = useState("");
	const [friendsList, setFriendsList] = useState([]);
	useEffect(() => {
		// document.title = "Friends - ChatApp";
		const friends = async()=>{
			try{
				const response = await axios.get(`${BackendUrl}/api/users/friends`,{
					headers: { authorization: `Bearer ${Cookies.get("token")}` },
				}
				);
				console.log("Friends:", response.data);
				setFriendsList(response.data.data.friends);
			}catch(error){
				console.error("Error fetching friends:", error);
			}
		}
		friends();
	}, []);

	const friends = useMemo(() => {
		const q = query.trim().toLowerCase();
		if (!q) return friendsList;
		return friendsList.filter((f) => f.name.toLowerCase().includes(q));
	}, [query]);



	return (
		<div className="flex flex-col min-h-screen section-strong">
			<NavBar />
			<div className="flex-1 p-6">
				<div className="max-w-3xl mx-auto container-card p-6 section-surface">
					<div className="flex items-center justify-between mb-4">
						<h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100">Friends</h2>
						<button className="button-primary">Add friend</button>
					</div>

					<div className="mb-4">
						<label htmlFor="friend-search" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Search</label>
						<input
							id="friend-search"
							type="text"
							placeholder="Search friends..."
							value={query}
							onChange={(e) => setQuery(e.target.value)}
							className="mt-1 block w-full px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm placeholder-gray-400 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 focus:border-indigo-500 dark:focus:border-indigo-400 text-gray-900 dark:text-white"
						/>
					</div>

					<ul className="divide-y divide-gray-100 dark:divide-gray-800">
						{friends.length === 0 && (
							<li className="py-6 text-center text-sm text-gray-500 dark:text-gray-400">No friends found</li>
						)}
						{friends.map((f) => {
							if (f.id === userId) return <li className="py-6 text-center text-sm text-gray-500 dark:text-gray-400">No friends found</li>; // Skip current user
							return (
								<li key={f.id} className="py-4 flex items-center justify-between gap-4">
									<div className="flex items-center gap-3 min-w-0">
										<ProfilePicture 
											src={f.profilePicture || f.avatar} 
											alt={f.name}
											size="md"
										/>
										<div className="min-w-0">
										<p className="font-medium text-gray-800 dark:text-gray-100 truncate">{f.name}</p>
										<span className={f.status === "online" ? "badge-success" : "badge-muted"}>
											{f.status}
										</span>
									</div>
								</div>
								<div className="flex items-center gap-2">
									<button className="px-3 py-2 text-sm rounded-xl border border-gray-200 hover:bg-gray-50 dark:border-gray-700 dark:hover:bg-gray-800">Message</button>
									<button className="px-3 py-2 text-sm rounded-xl text-red-600 border border-red-200 hover:bg-red-50 dark:border-red-900/50 dark:hover:bg-red-950/40">Remove</button>
								</div>
							</li>
							);
						})}
					</ul>
				</div>
			</div>
		</div>
	);
}
