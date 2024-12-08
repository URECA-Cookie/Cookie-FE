import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import mixpanel from "mixpanel-browser";

if ("serviceWorker" in navigator) {
  navigator.serviceWorker
    .register("/firebase-messaging-sw.js")
    .then((registration) => {
      console.log("Service Worker 등록 성공:", registration);
    })
    .catch((error) => {
      console.error("Service Worker 등록 실패:", error);
    });
}

mixpanel.init("YOUR_PROJECT_TOKEN", {
  debug: true, // 디버그 활성화
});

createRoot(document.getElementById("root")).render(
  // <StrictMode>
  <App />
  // </StrictMode>
);
