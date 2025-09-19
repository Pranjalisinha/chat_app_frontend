// src/components/Notification.jsx
import React, { useEffect } from "react";

export default function Notification({ 
	type = "info", 
	message, 
	description, 
	onClose, 
	show = false,
	duration = 5000 
}) {
	useEffect(() => {
		if (show && duration > 0) {
			const timer = setTimeout(() => {
				onClose?.();
			}, duration);
			return () => clearTimeout(timer);
		}
	}, [show, duration, onClose]);

	if (!show) return null;

	const getIcon = () => {
		switch (type) {
			case "success":
				return (
					<svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
					</svg>
				);
			case "error":
				return (
					<svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
					</svg>
				);
			case "warning":
				return (
					<svg className="w-6 h-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.5 0L4.268 19.5c-.77.833.192 2.5 1.732 2.5z" />
					</svg>
				);
			default:
				return (
					<svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
					</svg>
				);
		}
	};

	const getStyles = () => {
		switch (type) {
			case "success":
				return "bg-green-50 border-green-200 dark:bg-green-900/20 dark:border-green-800";
			case "error":
				return "bg-red-50 border-red-200 dark:bg-red-900/20 dark:border-red-800";
			case "warning":
				return "bg-yellow-50 border-yellow-200 dark:bg-yellow-900/20 dark:border-yellow-800";
			default:
				return "bg-blue-50 border-blue-200 dark:bg-blue-900/20 dark:border-blue-800";
		}
	};

	return (
		<div className="fixed top-4 right-4 z-50 max-w-sm w-full">
			<div className={`${getStyles()} border rounded-lg shadow-lg p-4 animate-in slide-in-from-right duration-300`}>
				<div className="flex items-start">
					<div className="flex-shrink-0">
						{getIcon()}
					</div>
					<div className="ml-3 flex-1">
						<h3 className="text-sm font-medium text-gray-900 dark:text-gray-100">
							{message}
						</h3>
						{description && (
							<p className="mt-1 text-sm text-gray-600 dark:text-gray-300">
								{description}
							</p>
						)}
					</div>
					<div className="ml-4 flex-shrink-0">
						<button
							onClick={onClose}
							className="inline-flex text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 focus:outline-none"
						>
							<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
							</svg>
						</button>
					</div>
				</div>
			</div>
		</div>
	);
}
