import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import AppScreen from "./routes/AppScreen";
import GlobalStyle from "./styles/global";
import AddMovie from "../src/pages/admin/AdminMovie";
import AdminLogin from "../src/pages/admin/AdminLogin";
import ScrollToTop from "./components/common/ScrollToTop";
import LoginModal from "./components/common/LoginModal";

function App() {
  return (
    <>
      <GlobalStyle />
      <BrowserRouter>
        <ScrollToTop />
        <LoginModal />
        <Routes>
          <Route path="/admin" element={<AdminLogin />} />
          <Route path="/admin/movie" element={<AddMovie />} />
          <Route path="/" element={<AppScreen />} />
          <Route path="*" element={<AppScreen />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
