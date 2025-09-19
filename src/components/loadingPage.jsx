// src/components/LoadingPage.jsx
import React from "react";

export default function LoadingPage({ message = "Loading..." }) {
	return (
		<div className="min-h-screen flex items-center justify-center bg-gray-200 dark:bg-gray-900">
			<div className="text-center">
				<div className="relative w-24 h-24 mx-auto flex items-center justify-center">
					<div className="w-16 h-16 border-4 border-white dark:border-gray-700 rounded-full animate-spin border-t-indigo-600"></div>
					{/* <div className="absolute inset-0 flex items-center justify-center">
						<div className="w-8 h-8 bg-indigo-600 rounded-full animate-pulse"></div>
					</div> */}
				</div>
				<p className="mt-4 text-lg font-medium text-gray-900 dark:text-gray-100">{message}</p>
				<p className="mt-2 text-sm text-gray-600 dark:text-gray-400">Please wait while we process your request...</p>
			</div>
		</div>
	);
}
