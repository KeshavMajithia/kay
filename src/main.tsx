import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

window.storage = {
  get: async (key: string, _isPublic: boolean) => {
    const value = localStorage.getItem(key);
    return value ? { value } : null;
  },
  set: async (key: string, value: string, _isPublic: boolean) => {
    localStorage.setItem(key, value);
  },
};

createRoot(document.getElementById("root")!).render(<App />);
