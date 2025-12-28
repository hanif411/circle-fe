# ⭕ Circle - Frontend (Social Media Platform)

[![Deployment Status](https://img.shields.io/badge/Vercel-Deployed-success)](https://circle-fe.vercel.app/)
[![Backend Repo](https://img.shields.io/badge/Backend-Source_Code-orange)](https://github.com/hanif411/be-circle)

> **Real-time Social Media Experience.** A platform for sharing thoughts, media, and connecting with people in real-time.

---

## 🌟 Executive Summary

Circle is a social media platform designed for fast, dynamic interactions. The app's primary focus is on providing a seamless user experience for sharing content (threads) and interacting instantly.

- **Interaction:** Update Content realtime using web socket.
- **Experience:** UI modern responsif and intuitive for content exploration.

---

## 🛠️ Technical Deep Dive (English)

This frontend is built with a focus on state management and real-time data synchronization:

- **Framework:** React.js (TypeScript) / Vite.
- **Styling:** Tailwind CSS & Shadcn UI for a sleek, dark-themed interface.
- **Real-time Integration:** Utilizing WebSockets (Socket.io-client) to handle live updates.
- **State Management:** Efficient data fetching and caching to ensure a smooth scrolling experience.

---

## 🚀 Key Features & User Workflow

1. **Dynamic Threading:** Create, like, and reply to threads seamlessly.
2. **Follow System:** Curated feed based on the users you follow.
3. **Media Sharing:** Support for image uploads in threads.
4. **Real-time Notifications:** Get updated instantly when interactions happen.
5. **Profile Customization:** Manage your social identity and view your activity history.

---

## 💻 Tech Stack

- **Framework:** React.js / Vite (TypeScript)
- **Styling:** Tailwind CSS
- **Real-time:** Socket.io-client

---

## ⚙️ Installation & Setup

1. **Clone the repository:**
   ```bash
   git clone [https://github.com/hanif411/circle-fe.git](https://github.com/hanif411/circle-fe.git)
   cd circle-fe
   ```
2. **Install dependencies:**

   ```bash
   npm install
    ```

3. **Configure Environment Variables:**

    Create a .env file based on your database and Redis credentials.

    ```bash
    DATABASE_URL=  Your database postgres
    JWT_SECRETKEY= Your jwt secret key
    ```


4. **Run the App**

    ```bash
    npm run dev
    ```
