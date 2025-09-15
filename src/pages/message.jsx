// src/pages/Message.jsx
import React from "react";
import ChatAI from "../components/ChatAI";
import NavBar from "../components/navBar";

export default function Message() {
	return (
		<div className="flex flex-col h-screen section-strong">
			<NavBar />
			<div className="flex-1 p-4">
				<div className="max-w-3xl mx-auto container-card rounded-xl p-6 h-full section-surface">
					<ChatAI />
				</div>
			</div>
		</div>
	);
}
