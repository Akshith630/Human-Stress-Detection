import { createRoot } from "react-dom/client";
import { registerSW } from "virtual:pwa-register";
import App from "./App.tsx";
import "./index.css";

registerSW({
  onOfflineReady() {
    console.info("Stress Detection Companion is ready to run offline.");
  },
});

createRoot(document.getElementById("root")!).render(<App />);
