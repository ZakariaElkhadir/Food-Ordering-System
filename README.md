# 🍔 Food Ordering System

A modern, real-time food ordering application built with React, TypeScript, and Vite. This system provides a seamless experience for customers to browse products and for kitchen staff to manage orders via a live dashboard.

## ✨ Features

- **Real-time Order Dashboard**: Instantly updates with new orders using WebSocket integration.
- **Modern User Interface**: Sleek, responsive design with glassmorphism effects and smooth animations using Framer Motion.
- **Order Management**: Kitchen staff can view, accept, complete, and remove orders efficiently.
- **Dynamic Product Browsing**: categorized product views for easy navigation.
- **State Management**: Robust global state handling with Zustand.

## 🛠️ Tech Stack

- **Frontend Library**: [React](https://react.dev/)
- **Build Tool**: [Vite](https://vitejs.dev/)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: SCSS, CSS Modules
- **State Management**: [Zustand](https://zustand-demo.pmnd.rs/)
- **Animations**: [Framer Motion](https://www.framer.com/motion/)
- **Routing**: [React Router](https://reactrouter.com/)
- **Real-time Communication**: Native WebSocket API

## 🚀 Getting Started

Follow these steps to set up the project locally.

### Prerequisites

- Node.js (v18 or higher recommended)
- npm or yarn

### Installation

1.  **Clone the repository**

    ```bash
    git clone https://github.com/ZakariaElkhadir/Food-Ordering-System.git
    cd Food-Ordering-System
    ```

2.  **Install dependencies**

    ```bash
    npm install
    ```

3.  **Set up Environment Variables**
    Create a `.env` file in the root directory if needed.

    ```env
    VITE_WS_URL=wss://your-websocket-server-url
    ```

    _Note: The project defaults to a public test server if not specified._

4.  **Run the Development Server**
    ```bash
    npm run dev
    ```
    The application will be available at `http://localhost:5173`.

## 📂 Project Structure

```
src/
├── assets/         # Static assets (images, icons)
├── Body/           # Main content components
├── Cards/          # Data cards and stores (Zustand)
├── Dashboard/      # Admin/Kitchen Dashboard component
├── Header/         # Navigation and branding
├── HeroSection/    # Landing page hero area
├── hooks/          # Custom React hooks (useWebSocket)
├── Products/       # Product listing and management
└── Layout.tsx      # Main application layout wrapper
```

## 🔌 WebSocket Integration

The application uses a custom `useWebSocket` hook and `websocketService` to maintain a persistent connection with the backend. This ensures that the Kitchen Dashboard is always in sync with incoming customer orders without requiring manual refreshes.

## 📜 Scripts

- `npm run dev`: Start the development server.
- `npm run build`: Build the project for production.
- `npm run lint`: Run ESLint to check for code quality issues.
- `npm run preview`: Preview the production build locally.

---

Built with ❤️ by Zakaria Elkhadir
