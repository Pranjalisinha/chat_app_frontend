# Chat Application Frontend

A modern, responsive chat application frontend built with **React**, **Vite**, **Tailwind CSS**, and **Socket.io**. Features include real-time messaging, AI-powered chat enhancements, user authentication, dark/light theme toggle, emoji support, and more.

---

## Features

- 🔒 User authentication (register/login)
- 💬 Real-time chat with Socket.io
- 🤖 AI-powered message rewriting (funny, sarcastic, restructure)
- 🌗 Light/Dark theme toggle (with persistence)
- 😀 Emoji picker support
- 👥 User list and private messaging
- 📱 Responsive design for mobile and desktop

---

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v16 or newer recommended)
- [npm](https://www.npmjs.com/)

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/your-username/chat_app_frontend.git
   cd chat_app_frontend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Set up environment variables:**

   Create a `.env` file in the project root and add your backend URL:
   ```
   VITE_BACKEND_URL=http://localhost:5000
   ```

4. **Start the development server:**
   ```bash
   npm run dev
   ```

   The app will be available at [http://localhost:5173](http://localhost:5173) (or as shown in your terminal).

---

## Project Structure

```
src/
  api/           # API and socket.io client logic
  components/    # Reusable UI components (NavBar, ChatAI, etc.)
  context/       # React context providers (Theme, Notification)
  pages/         # Page components (Login, Register, Invite, etc.)
  App.jsx        # Main app component
  main.jsx       # Entry point
public/
  index.html     # HTML template
tailwind.config.js
vite.config.js
```

---

## Customization

- **Theme:**  
  Uses Tailwind's `darkMode: 'class'`. Toggle theme using the sun/moon icon in the navbar. Theme preference is saved in `localStorage`.

- **API URL:**  
  Change the backend API URL in the `.env` file.

---

## Scripts

- `npm run dev` – Start development server
- `npm run build` – Build for production
- `npm run preview` – Preview production build
- `npm run lint` – Lint the code

---

## Dependencies

- [React](https://react.dev/)
- [Vite](https://vitejs.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Socket.io-client](https://socket.io/)
- [js-cookie](https://github.com/js-cookie/js-cookie)
- [@emoji-mart/react](https://github.com/missive/emoji-mart)
- [@heroicons/react](https://github.com/tailwindlabs/heroicons)
- [Axios](https://axios-http.com/)

---

## License

This project is licensed under the MIT License.

---

## Acknowledgements

- [Tailwind CSS Docs](https://tailwindcss.com/docs)
- [Vite Docs](https://vitejs.dev/guide/)
- [Socket.io Docs](https://socket.io/docs/)
- [Emoji Mart](https://github.com/missive/emoji-mart)
