import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import mixpanel from "mixpanel-browser";
const mixpaneltoken = import.meta.env.REACT_APP_MIXPANEL_TOKEN;

mixpanel.init(mixpaneltoken, {
  debug: true, // 디버그 옵션 활성화
});

createRoot(document.getElementById("root")).render(
  // <StrictMode>
  <App />
  // </StrictMode>
);
