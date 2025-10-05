// src/pages/Message.jsx
import React, { useEffect } from "react";
import ChatAI from "../components/ChatAI"
import NavBar from "../components/navBar";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

export default function Message() {
	const navigate = useNavigate();
	
	useEffect(() => {
		const token = Cookies.get("token");
		if (!token) {
			navigate("/login");
		}
	}, [navigate]);

	return (
		<div className="flex flex-col h-screen overflow-hidden section-strong">
			<NavBar />
			<div className="flex-1 p-4 overflow-hidden">
				<div className="max-w-3xl mx-auto container-card rounded-xl p-6 h-full overflow-hidden section-surface">
					<ChatAI />
				</div>
			</div>
		</div>
	);
}
