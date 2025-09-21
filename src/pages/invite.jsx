// src/pages/Invite.jsx
import React, { useEffect, useMemo, useState } from "react";
import NavBar from "../components/navBar";
import ProfilePicture from "../components/ProfilePicture";
import axios from "axios";
import Cookies from "js-cookie";
const BackendUrl = import.meta.env.VITE_BACKEND_URL || "http://localhost:5000";
const userId = Cookies.get("userId") || "defaultUser";

// const peopleData = [
// 	{ id: 1, name: "David", invited: false },
// 	{ id: 2, name: "Eva", invited: true },
// 	{ id: 3, name: "Frank", invited: false },
// ];

export default function Invite() {
	const [query, setQuery] = useState("");
	const [invitedPeople, setInvitedPeople] = useState([]);
	useEffect(() => {
		// document.title = "Invite - ChatApp";
		const invitedPeople = async()=>{
			// Fetch invited people from backend if needed
			const response = await axios.get(`${BackendUrl}/api/users/invites`,{
				headers: { authorization: `Bearer ${Cookies.get("token")}` },
			}
			);
			console.log("Invited People:", response.data);
			setInvitedPeople(response.data.data.users);
		}
		invitedPeople();
	}, []);
	const people = useMemo(() => {
		const q = query.trim().toLowerCase();
		if (!q) return invitedPeople;
		return invitedPeople.filter((p) => p.name.toLowerCase().includes(q));
	}, [query]);

	return (
		<div className="flex flex-col min-h-screen section-strong">
			<NavBar />
			<div className="flex-1 p-6">
				<div className="max-w-3xl mx-auto container-card p-6 section-surface">
					<div className="flex items-center justify-between mb-4">
						<h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100">Invite People</h2>
						<button className="px-3 py-2 text-sm rounded-xl border border-gray-200 hover:bg-gray-50 dark:border-gray-700 dark:hover:bg-gray-800">Import contacts</button>
					</div>

					<div className="mb-4">
						<label htmlFor="invite-search" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Search</label>
						<input
							id="invite-search"
							type="text"
							placeholder="Search people..."
							value={query}
							onChange={(e) => setQuery(e.target.value)}
							className="mt-1 block w-full px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm placeholder-gray-400 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 focus:border-indigo-500 dark:focus:border-indigo-400 text-gray-900 dark:text-white"
						/>
					</div>

					<ul className="divide-y divide-gray-100 dark:divide-gray-800">
						{people.map((p) => (
							<li key={p.id} className="py-4 flex items-center justify-between gap-4">
								<div className="flex items-center gap-3 min-w-0">
								<ProfilePicture 
										src={p.profilePicture || p.avatar} 
										alt={p.username || p.name}
										size="md"
										fallbackClassName="bg-gradient-to-tr from-fuchsia-600 via-pink-500 to-amber-400"
									/>
									<p className="font-medium text-gray-800 dark:text-gray-100 truncate">{p.username || p.name}</p>
								</div>
								<button disabled={p.friendsRequests.includes(userId)} className={`px-3 py-2 text-sm rounded-xl ${p.friendsRequests.includes(userId) ? "badge-muted cursor-not-allowed" : "button-primary"}`}>{p.friendsRequests.includes(userId) ? "Invited" : "Invite"}</button>
							</li>
						))}
						{people.length === 0 && (
							<li className="py-6 text-center text-sm text-gray-500 dark:text-gray-400">No people found</li>
						)}
					</ul>
				</div>
			</div>
		</div>
	);
}
