// src/components/NavBar.jsx
import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useTheme } from '../context/themeProvider';

export default function NavBar() {
	const location = useLocation();
	const [open, setOpen] = useState(false);
	const { isDark, toggleTheme } = useTheme();
	const isActive = (path) => location.pathname === path;

	return (
		<header className="sticky top-0 z-40">
			<nav className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
				<div className="mt-3 mb-4 rounded-2xl border border-white/40 bg-white/70 backdrop-blur supports-[backdrop-filter]:bg-white/60 shadow-lg shadow-black/5 dark:bg-gray-900/70 dark:supports-[backdrop-filter]:bg-gray-900/60 dark:border-white/10">
					<div className="flex items-center justify-between px-4 py-3">
						<div className="flex items-center gap-3">
							<div className="h-9 w-9 rounded-xl bg-gradient-to-tr from-blue-600 via-sky-500 to-emerald-500" />
							<h1 className="text-base sm:text-lg font-semibold text-gray-800 dark:text-gray-100">Messaging AI</h1>
						</div>

						<div className="flex items-center gap-2">
							<button 
								onClick={toggleTheme} 
								className="inline-flex h-9 w-9 items-center justify-center rounded-xl border border-gray-200 bg-white text-gray-700 shadow hover:bg-gray-50 dark:border-white/10 dark:bg-gray-800 dark:text-gray-100" 
								aria-label="Toggle theme"
							>
								{isDark ? (
									<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
										<path d="M21.64 13a1 1 0 00-1.05-.14 8 8 0 01-10.45-10.45 1 1 0 00-.14-1.05A1 1 0 008 1a10 10 0 1015 15 1 1 0 00-.36-3z"/>
									</svg>
								) : (
									<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
										<path d="M6.76 4.84l-1.8-1.79L3.17 4.84l1.79 1.79 1.8-1.79zM1 13h3v-2H1v2zm10 10h2v-3h-2v3zm7.03-3.17l1.79 1.79 1.79-1.79-1.79-1.79-1.79 1.79zM20 11v2h3v-2h-3zM17.24 4.84l1.8 1.79 1.79-1.79-1.79-1.79-1.8 1.79zM4.22 18.36l-1.79 1.79 1.79 1.79 1.79-1.79-1.79-1.79zM11 1h2v3h-2V1z"/>
									</svg>
								)}
							</button>

							<button
								className="sm:hidden inline-flex h-9 w-9 items-center justify-center rounded-xl border border-gray-200 bg-white text-gray-700 shadow hover:bg-gray-50 dark:border-white/10 dark:bg-gray-800 dark:text-gray-100"
								onClick={() => setOpen((v) => !v)}
								aria-label="Toggle menu"
							>
								<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
									{open ? (
										<path fillRule="evenodd" d="M6.225 4.811a1 1 0 011.414 0L12 9.172l4.361-4.361a1 1 0 111.414 1.414L13.414 10.586l4.361 4.361a1 1 0 01-1.414 1.414L12 12l-4.361 4.361a1 1 0 01-1.414-1.414l4.361-4.361-4.361-4.361a1 1 0 010-1.414z" clipRule="evenodd" />
									) : (
										<path fillRule="evenodd" d="M3.75 5.25a.75.75 0 01.75-.75h15a.75.75 0 010 1.5h-15a.75.75 0 01-.75-.75zm0 6a.75.75 0 01.75-.75h15a.75.75 0 010 1.5h-15a.75.75 0 01-.75-.75zm0 6a.75.75 0 01.75-.75h15a.75.75 0 010 1.5h-15a.75.75 0 01-.75-.75z" clipRule="evenodd" />
									)}
								</svg>
							</button>
						</div>

						<div className="hidden sm:flex items-center gap-2">
							<NavLink to="/chat" active={isActive("/chat")}>
								Chat
							</NavLink>
                            {/* Friends removed */}
                            {/* Invite removed */}
							<NavLink to="/profile" active={isActive("/profile")}>
								Profile
							</NavLink>
						</div>
					</div>

					{/* Mobile menu */}
					{open && (
						<div className="sm:hidden border-t border-white/50 dark:border-white/10">
							<div className="px-4 py-3 grid gap-2">
								<NavLink to="/chat" active={isActive("/chat")} onClick={() => setOpen(false)}>
									Chat
								</NavLink>
                                {/* Friends removed */}
                                {/* Invite removed */}
								<NavLink to="/profile" active={isActive("/profile")} onClick={() => setOpen(false)}>
									Profile
								</NavLink>
							</div>
						</div>
					)}
				</div>
			</nav>
		</header>
	);
}

function NavLink({ to, children, active, onClick }) {
	return (
		<Link
			to={to}
			onClick={onClick}
			className={`px-3 py-2 rounded-xl text-sm font-medium transition-colors ${
				active
					? "bg-blue-600 text-white shadow-sm"
					: "text-gray-700 hover:bg-gray-100 dark:text-gray-100 dark:hover:bg-gray-800"
			}`}
		>
			{children}
		</Link>
	);
}
