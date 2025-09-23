import { io } from "socket.io-client";
import Cookies from "js-cookie";

const baseURL = import.meta.env.VITE_BACKEND_URL || "http://localhost:5000";

let socket;

export function getSocket() {
  if (!socket) {
    socket = io(baseURL, {
      transports: ["websocket"],
      autoConnect: false,
    });
  }
  return socket;
}

export function connectSocket() {
  const s = getSocket();
  if (!s.connected) {
    s.connect();
    const userId = Cookies.get("userId");
    if (userId) {
      s.emit("setup", userId);
    }
  }
  return s;
}

export function disconnectSocket() {
  const s = getSocket();
  if (s && s.connected) s.disconnect();
}


