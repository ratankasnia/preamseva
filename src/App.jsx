import { useState } from "react";
import { Route, Routes, useNavigate, BrowserRouter } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import Sidebar from "./components/Sidebar/Sidebar";
import Footer from "./components/Footer/Footer";
import Login from "./pages/Auth/Login";
import Register from "./pages/Auth/Register";
import CareSheet from "./pages/CareSheet";
import CareVideo from "./pages/CareVideo";
import FeedBackForm from "./pages/FeedBackForm";
import Privacy from "./pages/Privacy";
import Acknowledgement from "./pages/Acknowledgement";
import Disclaimer from "./pages/Disclaimer";
import CareCategory from "./pages/CareCategory";
import ArticlePage from "./pages/ArticlePage";
import OurTeam from "./pages/OurTeam";
import CareVideoCategory from "./pages/CareVideoCategory";
import CareReceiver from "./pages/Profile/CareReceiver";
import CareGiver from "./pages/Profile/CareGiver";
import CarePlans from "./pages/CarePlans";
import Questions from "./pages/Question/Questions";
import { isLogedInUser } from "./utility/utility";
import Settings from "./pages/Settings/Setting";
import ResetPassword from "./pages/Settings/ResetPassword";
import { Navigate } from "react-router-dom";
import Forgot from "./pages/Auth/Forgot";
import CareBookCategory from "../src/pages/Bookmarks/CareBookCategory";
import CareBookMarkCategory from "../src/pages/CareBookMarkCategory";
import CareBookVideos from "../src/pages/Bookmarks/CareBookVideos";
import CareBookVideoCategory from "../src/pages/Bookmarks/CareBookVideoCategory";

function App() {
  const [count, setCount] = useState(0);
  const isUserLoggedIn = isLogedInUser();
  const navigate = useNavigate();
  const handleNavigation = (path) => {
    if (isUserLoggedIn) {
      navigate(path);
    } else {
      navigate("/auth/login");
    }
  };

  return (
    <>
      <Sidebar />
      <div className="pb-20 pt-[100px]">
        <Routes>
          <Route index element={<Home />} />
          <Route path="/disclaimer" element={<Disclaimer />} />
          <Route path="/acknowledgment" element={<Acknowledgement />} />
          <Route path="/Privacy" element={<Privacy />} />
          <Route path="/our-team" element={<OurTeam />} />
          <Route path="/auth">
            <Route path="login" element={<Login />} />
            <Route path="register" element={<Register />} />
            <Route path="forgot" element={<Forgot />} />
          </Route>
          {isUserLoggedIn ? (
            <>
              <Route path="/profile">
                <Route path="receiver" element={<CareReceiver />} />
                <Route path="giver" element={<CareGiver />} />
              </Route>
              <Route path="sheets">
                <Route index element={<CareSheet />} />
                <Route path=":Category" element={<CareCategory />} />
                <Route
                  path=":Category/:ArticlePage"
                  element={<ArticlePage />}
                />
              </Route>
              <Route path="/videos">
                <Route index element={<CareVideo />} />
                <Route path=":category" element={<CareVideoCategory />} />
              </Route>
              <Route path="/plans">
                <Route index element={<CarePlans />} />
              </Route>
              <Route path="/bookmark">
                <Route path="sheets" element={<CareBookCategory />} />
                <Route
                  path="sheet/:category"
                  element={<CareBookMarkCategory />}
                />
                <Route path="videos" element={<CareBookVideos />} />
                <Route
                  path="video/:category"
                  element={<CareBookVideoCategory />}
                />
              </Route>
              <Route path="/feedback" element={<FeedBackForm />} />
              <Route path="/settings">
                <Route index element={<Settings />} />
                <Route path="reset-password" element={<ResetPassword />} />
              </Route>
              <Route path="/questions" element={<Questions />} />
            </>
          ) : (
            <>
              <Route path="/sheets" element={<Navigate to="/auth/login" />} />
              <Route path="/videos" element={<Navigate to="/auth/login" />} />
              <Route path="/plans" element={<Navigate to="/auth/login" />} />
            </>
          )}
        </Routes>
      </div>
      <Footer />
    </>
  );
}

export default App;
