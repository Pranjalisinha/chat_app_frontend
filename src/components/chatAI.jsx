// src/components/ChatAI.jsx
import React, { useMemo, useState } from "react";

const initialConversations = [
	{ id: 1, name: "Alice", lastMsg: "Hey, how are you?" },
	{ id: 2, name: "Bob", lastMsg: "See you tomorrow!" },
	{ id: 3, name: "Charlie", lastMsg: "Let's catch up." },
];

export default function ChatAI() {
	const [conversations] = useState(initialConversations);
	const [selectedId, setSelectedId] = useState(1);
	const [messages, setMessages] = useState([
		{ from: "Alice", text: "Hey, how are you?" },
		{ from: "me", text: "I’m good! What about you?" },
	]);
	const [input, setInput] = useState("");
	const [sidebarOpen, setSidebarOpen] = useState(false);

	const selected = useMemo(
		() => conversations.find((c) => c.id === selectedId) ?? conversations[0],
		[conversations, selectedId]
	);

	const sendMessage = () => {
		if (!input.trim()) return;
		setMessages((prev) => [...prev, { from: "me", text: input.trim() }]);
		setInput("");
	};

	return (
		<div className="h-full grid grid-cols-1 md:grid-cols-12 gap-0 md:gap-6">
			{/* Sidebar */}
			<div className="md:col-span-4 lg:col-span-3">
				<div className="md:hidden mb-3 flex justify-between items-center">
					<h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100">Chats</h2>
					<button className="button-primary" onClick={() => setSidebarOpen((v) => !v)} aria-expanded={sidebarOpen}>
						{sidebarOpen ? "Close" : "Open"}
					</button>
				</div>
				<div className={`container-card p-4 md:block ${sidebarOpen ? "block" : "hidden"} md:!block`}>
					<div className="flex items-center gap-2 mb-3">
						<div className="h-8 w-8 rounded-lg bg-gradient-to-tr from-blue-600 via-sky-500 to-emerald-500" />
						<h3 className="font-semibold text-gray-800 dark:text-gray-100">Conversations</h3>
					</div>
					<ul className="space-y-2 max-h-64 md:max-h-[calc(100vh-18rem)] overflow-auto pr-1">
						{conversations.map((c) => (
							<li key={c.id}>
								<button
									onClick={() => {
										setSelectedId(c.id);
										setSidebarOpen(false);
									}}
									className={`w-full text-left px-3 py-3 rounded-xl transition-colors border ${
										selected.id === c.id ? "bg-blue-50 border-blue-200" : "bg-white/70 border-gray-200 hover:bg-gray-50 dark:bg-gray-900/60 dark:border-gray-700 dark:hover:bg-gray-800"}
									}`}
								>
									<p className="font-medium text-gray-800 dark:text-gray-100">{c.name}</p>
									<p className="text-sm text-gray-500 truncate dark:text-gray-400">{c.lastMsg}</p>
								</button>
							</li>
						))}
					</ul>
				</div>
			</div>

			{/* Chat window */}
			<div className="md:col-span-8 lg:col-span-9 container-card p-0 flex flex-col min-h-[60vh]">
				{/* Header */}
				<div className="flex items-center justify-between px-4 py-3 border-b border-white/50 dark:border-white/10">
					<div className="flex items-center gap-3">
						<div className="h-9 w-9 rounded-xl bg-gradient-to-tr from-indigo-600 via-violet-500 to-blue-400" />
						<div>
							<h4 className="font-semibold text-gray-800 dark:text-gray-100 leading-5">{selected.name}</h4>
							<p className="text-xs text-gray-500 dark:text-gray-400">Active now</p>
						</div>
					</div>
				</div>

				{/* Messages */}
				<div className="flex-1 overflow-y-auto px-4 py-4 space-y-3 bg-white/60 dark:bg-gray-900/40">
					{messages.map((m, i) => (
						<div key={i} className={`flex ${m.from === "me" ? "justify-end" : "justify-start"}`}>
							<div className={`max-w-[72%] px-4 py-2 rounded-2xl shadow-sm ${m.from === "me" ? "bg-blue-600 text-white rounded-br-md" : "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-100 rounded-bl-md"}`}>
								{m.text}
							</div>
						</div>
					))}
				</div>

				{/* Input */}
				<div className="border-t border-white/50 dark:border-white/10 p-3">
					<div className="flex items-end gap-2">
						<textarea
							id="message"
							rows={1}
							value={input}
							onChange={(e) => setInput(e.target.value)}
							placeholder="Type a message..."
							className="mt-1 block w-full px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm placeholder-gray-400 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 focus:border-indigo-500 dark:focus:border-indigo-400 text-gray-900 dark:text-white resize-none"
							onKeyDown={(e) => {
								if (e.key === "Enter" && !e.shiftKey) {
									e.preventDefault();
									sendMessage();
								}
							}}
						/>
						<button onClick={sendMessage} className="inline-flex items-center justify-center rounded-md bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 font-medium shadow-sm transition-colors">Send</button>
					</div>
				</div>
			</div>
		</div>
	);
}
