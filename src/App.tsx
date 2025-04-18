import "./App.css";
import { Route, Routes } from 'react-router-dom';
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";
import Layout from "./components/Layout";
import RequiredAuth from "./components/RequiredAuth";
import Logout from "./components/loguot/Logout";
import Settings from "./pages/Settings";
import Followers from "./pages/Followers";
import Following from "./pages/Following";
import SavedPost from "./pages/SavedPost";
import MyPosts from "./pages/MyPosts";
import PersistLogin from "./components/PersistLogin";
import ViewUserProfile from "./pages/ViewUserProfile";
import VerifyEmail from "./pages/VerifyEmail";
import ResetPassword from "./pages/ResetPassword";
import SetNewPassword from "./pages/SetNewPassword";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import NotFound from "./pages/NotFound";

function App() {

  return (
    <>
      <div className="bg-gray-100 min-h-screen">
          <ToastContainer/>
          <Routes>
            <Route path="/" element={<Layout />}>
              {/* Public routes */}
              <Route path="/login" element={<SignIn />} />
              <Route path="/register" element={<SignUp />} />
              <Route path="/verify-email" element={<VerifyEmail />} />
              <Route path="/reset-password-verify" element={<ResetPassword />} />
              <Route path="/set-new-password" element={<SetNewPassword />} />
              
              {/* Protected routes */}
              <Route element={<PersistLogin/>}>
                <Route element={<RequiredAuth/>}>
                  <Route path="/" element={<Home />} />
                  <Route path="/followers" element={<Followers />} />
                  <Route path="/following" element={<Following />} />
                  <Route path="/my-post" element={<MyPosts />} />
                  <Route path="/saved-post" element={<SavedPost />} />
                  <Route path="/profile/id/:userId" element={<Profile />} />
                  <Route path="/profile/:username/:userId" element={<ViewUserProfile />} />
                  <Route path="/settings" element={<Settings />} />
                  <Route path="/logout" element={<Logout />} />
                </Route>
              </Route>
              <Route path="*" element={<NotFound />} />
            </Route>
          </Routes>
      </div>
    </>
  );
}

export default App;
