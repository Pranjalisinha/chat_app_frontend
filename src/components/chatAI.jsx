// src/components/ChatAI.jsx
import React, { useEffect, useState, useRef } from "react";
import Cookies from "js-cookie";
import { listUsers } from "../api/users";
import { getPrivateMessages, sendPrivateMessage } from "../api/messages";
import { connectSocket, getSocket } from "../api/socket";
import data from "@emoji-mart/data";
import Picker from "@emoji-mart/react";
import { PaperAirplaneIcon } from "@heroicons/react/24/solid";
import { SparklesIcon } from "@heroicons/react/24/outline";
import { rewriteMessage } from "../utils/rewrite";
import { rewriteWithAI } from "../api/ai";

export default function ChatAI() {
  const myUserId = Cookies.get("userId") || "";
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [showEmoji, setShowEmoji] = useState(false);
  const inputRef = useRef(null);
  const listRef = useRef(null);

  useEffect(() => {
    // Connect socket and set up listeners
    connectSocket();
    const socket = getSocket();
    const onMessageReceived = (payload) => {
      try {
        const fromId = payload?.sender?._id || payload?.sender;
        const toUsers = payload?.chat?.users?.map(u => u._id || u) || [];
        if (!selectedUser) return;
        const selectedId = selectedUser._id || selectedUser.id;
        const isForMe = toUsers.includes(myUserId);
        const isFromSelected = fromId === selectedId;
        if (isForMe && isFromSelected) {
          const text = payload?.decryptedContent || payload?.content || "";
          setMessages(prev => [...prev, { id: payload._id || Date.now().toString(), fromMe: false, text }]);
        }
      } catch {}
    };
    socket.on("message received", onMessageReceived);
    return () => {
      socket.off("message received", onMessageReceived);
    };
  }, [selectedUser, myUserId]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const all = await listUsers();
        const filtered = all.filter(u => (u._id || u.id) !== myUserId);
        setUsers(filtered);
        if (filtered.length > 0) setSelectedUser(filtered[0]);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };
    fetchUsers();
  }, [myUserId]);

  useEffect(() => {
    const loadMessages = async () => {
      if (!selectedUser) return;
      try {
        const msgs = await getPrivateMessages(selectedUser._id || selectedUser.id);
        const normalized = msgs.map(m => ({
          id: m._id,
          fromMe: (m.sender?._id || m.sender) === myUserId,
          text: m.decryptedContent || "",
          createdAt: m.createdAt,
        }));
        // Oldest first so newest appears at the bottom
        const sorted = [...normalized].sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
        setMessages(sorted);
      } catch (error) {
        console.error("Error loading messages:", error);
      }
    };
    loadMessages();
  }, [selectedUser, myUserId]);

  // Always stick view to bottom when opening a chat and when new messages arrive
  const scrollToBottom = () => {
    const el = listRef.current;
    if (!el) return;
    el.scrollTop = el.scrollHeight;
  };

  useEffect(() => {
    scrollToBottom();
  }, [selectedUser, messages.length]);

  const insertAtCursor = (emoji) => {
    const textarea = inputRef.current;
    if (!textarea) {
      setInput(prev => prev + emoji);
      return;
    }
    const start = textarea.selectionStart || 0;
    const end = textarea.selectionEnd || 0;
    const newValue = input.slice(0, start) + emoji + input.slice(end);
    setInput(newValue);
    // Set caret after inserted emoji
    requestAnimationFrame(() => {
      textarea.focus();
      const caret = start + emoji.length;
      textarea.setSelectionRange(caret, caret);
    });
  };

  const sendMessage = async () => {
    if (!input.trim() || !selectedUser) return;
    try {
      const content = input.trim();
      const sent = await sendPrivateMessage({ recipientId: selectedUser._id || selectedUser.id, content });
      setMessages(prev => [
        ...prev,
        { id: sent._id, fromMe: true, text: content, createdAt: sent.createdAt },
      ]);
      setInput("");
      setShowEmoji(false);
      // Emit via socket for real-time delivery
      const socket = getSocket();
      socket.emit("new message", {
        _id: sent._id,
        sender: { _id: myUserId },
        content,
        chat: { users: [{ _id: myUserId }, { _id: selectedUser._id || selectedUser.id }] },
      });
    } catch (error) {
      console.error("Failed sending message:", error);
    }
  };

  const [aiLoading, setAiLoading] = useState(false);
  const [aiMenuOpen, setAiMenuOpen] = useState(false);
  const applyAIRewrite = async (style) => {
    const current = (input || "").trim();
    if (!current) return;
    try {
      setAiLoading(true);
      const rewritten = await rewriteWithAI(current, style);
      setInput(rewritten);
    } catch (e) {
      // Fallback to local heuristic if AI fails
      setInput(prev => rewriteMessage(prev, style));
      console.error("AI rewrite failed, used local fallback:", e);
    } finally {
      setAiLoading(false);
      setAiMenuOpen(false);
    }
  };

  return (
    <div className="h-full grid grid-cols-1 md:grid-cols-12 gap-0 md:gap-6 overflow-hidden bg-white dark:bg-gray-900">
      {/* Sidebar */}
      <div className="md:col-span-4 lg:col-span-3">
        <div className="md:hidden mb-3 flex justify-between items-center">
          <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100">Users</h2>
          <button
            className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg dark:bg-indigo-500 dark:hover:bg-indigo-600"
            onClick={() => setSidebarOpen((v) => !v)}
            aria-expanded={sidebarOpen}
          >
            {sidebarOpen ? "Close" : "Open"}
          </button>
        </div>
        <div className={`bg-white dark:bg-gray-800 shadow-lg rounded-lg p-4 md:block ${sidebarOpen ? "block" : "hidden"} md:!block`}>
          <div className="flex items-center gap-2 mb-3">
            <div className="h-8 w-8 rounded-lg bg-gradient-to-tr from-blue-600 via-sky-500 to-emerald-500" />
            <h3 className="font-semibold text-gray-800 dark:text-gray-100">All users</h3>
          </div>
          <ul className="space-y-2 max-h-64 md:max-h-[calc(100vh-18rem)] overflow-auto pr-1">
            {users.map((u) => (
              <li key={u._id || u.id}>
                <button
                  onClick={() => { setSelectedUser(u); setSidebarOpen(false); }}
                  className={`w-full text-left px-3 py-3 rounded-xl transition-colors border ${
                    (selectedUser?._id || selectedUser?.id) === (u._id || u.id)
                      ? "bg-blue-50 border-blue-200"
                      : "bg-white/70 border-gray-200 hover:bg-gray-50 dark:bg-gray-900/60 dark:border-gray-700 dark:hover:bg-gray-800"
                  }`}
                >
                  <p className="font-medium text-gray-800 dark:text-gray-100">{u.username || u.name}</p>
                  <p className="text-sm text-gray-500 truncate dark:text-gray-400">{u.email}</p>
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Chat window */}
      <div className="md:col-span-8 lg:col-span-9 bg-white dark:bg-gray-800 rounded-lg shadow-lg flex flex-col h-full overflow-hidden relative">
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center gap-3">
            <div className="h-9 w-9 rounded-xl bg-gradient-to-tr from-indigo-600 via-violet-500 to-blue-400" />
            <div>
              <h4 className="font-semibold text-gray-800 dark:text-gray-100 leading-5">
                {selectedUser?.username || selectedUser?.name || "Select a user"}
              </h4>
              <p className="text-xs text-gray-500 dark:text-gray-400">Direct message</p>
            </div>
          </div>
        </div>

        {/* Messages (newest pinned at bottom; scroll up for older) */}
        <div ref={listRef} className="flex-1 overflow-y-auto px-4 py-4 space-y-3 bg-gray-50 dark:bg-gray-900">
          {messages.map((m) => (
            <div key={m.id} className={`flex ${m.fromMe ? "justify-end" : "justify-start"}`}>
              <div
                className={`max-w-[72%] px-4 py-2 rounded-2xl shadow-sm ${
                  m.fromMe
                    ? "bg-blue-600 text-white rounded-br-md"
                    : "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-100 rounded-bl-md"
                }`}
              >
                {m.text}
              </div>
            </div>
          ))}
        </div>

        {/* Input - cleaner grouped UI */}
        <div className="sticky bottom-0 left-0 right-0 border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
          <div className="max-w-full px-4 py-3">
            <div className="relative">
              {showEmoji && (
                <div className="absolute bottom-16 left-2 z-10">
                  <Picker 
                    data={data} 
                    onEmojiSelect={(e) => insertAtCursor(e.native)} 
                    theme="light" 
                    navPosition="bottom" 
                    previewPosition="none" 
                    searchPosition="none"
                  />
                </div>
              )}

              <div className="flex items-center gap-2 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 px-2 py-2">
                <button
                  onClick={() => setShowEmoji(v => !v)}
                  className="flex-shrink-0 inline-flex h-9 w-9 items-center justify-center rounded-lg border border-gray-200 bg-white text-gray-700 hover:bg-gray-50 dark:border-white/10 dark:bg-gray-700 dark:text-gray-100"
                  aria-label="Toggle emoji picker"
                >
                  😊
                </button>

                <textarea
                  ref={inputRef}
                  id="message"
                  rows={1}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Type a message..."
                  className="flex-1 max-h-32 px-3 py-2 bg-transparent dark:bg-transparent border-0 focus:ring-0 focus:outline-none placeholder-gray-400 dark:placeholder-gray-400 text-gray-900 dark:text-white resize-none"
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && !e.shiftKey) {
                      e.preventDefault();
                      sendMessage();
                    }
                  }}
                />

                <div className="relative flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setAiMenuOpen(v => !v)}
                    disabled={aiLoading}
                    className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-gray-200 bg-white text-gray-700 hover:bg-gray-50 disabled:opacity-60 disabled:cursor-not-allowed dark:border-white/10 dark:bg-gray-700 dark:text-gray-100"
                    aria-haspopup="menu"
                    aria-expanded={aiMenuOpen}
                    aria-label="AI rewrite menu"
                  >
                    {aiLoading ? (
                      <span className="text-xs">...</span>
                    ) : (
                      <SparklesIcon className="h-5 w-5" />
                    )}
                  </button>
                  <button
                    onClick={sendMessage}
                    className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white shadow-sm transition-colors"
                    aria-label="Send message"
                  >
                    <PaperAirplaneIcon className="h-5 w-5 rotate-310" />
                  </button>

                  {aiMenuOpen && !aiLoading && (
                    <div className="absolute bottom-12 right-0 z-20 w-40 rounded-lg border border-gray-200 bg-white p-1 shadow-lg dark:border-white/10 dark:bg-gray-800">
                      <button
                        className="w-full text-left px-3 py-2 text-sm rounded-md hover:bg-gray-50 dark:hover:bg-gray-700"
                        onClick={() => applyAIRewrite("restructure")}
                      >
                        Restructure
                      </button>
                      <button
                        className="w-full text-left px-3 py-2 text-sm rounded-md hover:bg-gray-50 dark:hover:bg-gray-700"
                        onClick={() => applyAIRewrite("funny")}
                      >
                        Funny
                      </button>
                      <button
                        className="w-full text-left px-3 py-2 text-sm rounded-md hover:bg-gray-50 dark:hover:bg-gray-700"
                        onClick={() => applyAIRewrite("sarcastic")}
                      >
                        Sarcastic
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
