// src/components/NotificationProvider.jsx
import React, { createContext, useContext, useState } from "react";
import Notification from "../components/notification";

const NotificationContext = createContext();

export const useNotification = () => {
	const context = useContext(NotificationContext);
	if (!context) {
		throw new Error("useNotification must be used within a NotificationProvider");
	}
	return context;
};

export default function NotificationProvider({ children }) {
	const [notifications, setNotifications] = useState([]);

	const addNotification = (notification) => {
		const id = Date.now() + Math.random();
		const newNotification = { id, ...notification };
		setNotifications(prev => [...prev, newNotification]);
		return id;
	};

	const removeNotification = (id) => {
		setNotifications(prev => prev.filter(notification => notification.id !== id));
	};

	const showSuccess = (message, description, duration = 5000) => {
		return addNotification({ type: "success", message, description, duration });
	};

	const showError = (message, description, duration = 7000) => {
		return addNotification({ type: "error", message, description, duration });
	};

	const showWarning = (message, description, duration = 6000) => {
		return addNotification({ type: "warning", message, description, duration });
	};

	const showInfo = (message, description, duration = 5000) => {
		return addNotification({ type: "info", message, description, duration });
	};

	const value = {
		addNotification,
		removeNotification,
		showSuccess,
		showError,
		showWarning,
		showInfo,
	};

	return (
		<NotificationContext.Provider value={value}>
			{children}
			{notifications.map(notification => (
				<Notification
					key={notification.id}
					{...notification}
					onClose={() => removeNotification(notification.id)}
				/>
			))}
		</NotificationContext.Provider>
	);
}
