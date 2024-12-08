import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import mixpanel from "mixpanel-browser";
const mixpaneltoken = import.meta.env.REACT_APP_MIXPANEL_TOKEN;

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

mixpanel.init(mixpaneltoken, {
  debug: true, // 디버그 옵션 활성화
});

createRoot(document.getElementById("root")).render(
  // <StrictMode>
  <App />
  // </StrictMode>
);
