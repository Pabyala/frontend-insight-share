import "./App.css";
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";
import Layout from "./components/Layout";
import Welcome from "./components/Welcome";
import RequiredAuth from "./components/RequiredAuth";
import Welcomeuser from "./components/Welcomeuser";
import Logout from "./components/loguot/Logout";
import Settings from "./pages/Settings";
import Followers from "./pages/Followers";
import Following from "./pages/Following";
import UploadProfileImg from "./components/user/profile/UploadProfileImg";
import SavedPost from "./pages/SavedPost";
import MyPosts from "./pages/MyPosts";
import PersistLogin from "./components/PersistLogin";
import ViewUserProfile from "./pages/ViewUserProfile";
import VerifyEmail from "./pages/VerifyEmail";

function App() {
  return (
    <div className="bg-gray-100 min-h-screen">
        {/* <div className="flex-grow"> */}
        <Routes>
          <Route path="/" element={<Layout />}>
            {/* Public routes */}
            <Route path="/login" element={<SignIn />} />
            <Route path="/register" element={<SignUp />} />
            <Route path="/verify-email" element={<VerifyEmail />} />
            
            {/* Protected routes */}
            <Route element={<PersistLogin/>}>
              <Route element={<RequiredAuth/>}>
                <Route path="/" element={<Home />} />
                <Route path="/followers" element={<Followers />} />
                <Route path="/following" element={<Following />} />
                <Route path="/my-post" element={<MyPosts />} />
                <Route path="/saved-post" element={<SavedPost />} />
                <Route path="/profile/id/:userId" element={<Profile />} />
                {/* <Route path="/profile/view" element={<ViewUserProfile />} /> */}
                <Route path="/profile/:username/:userId" element={<ViewUserProfile />} />
                <Route path="/settings" element={<Settings />} />

                {/* for demo */}
                <Route path="/upload-img" element={<UploadProfileImg />} />
                <Route path="/welcome" element={<Welcome />} />
                <Route path="/userlist" element={<Welcomeuser />} />
                <Route path="/logout" element={<Logout />} />
              </Route>
            </Route>
          </Route>
        </Routes>
      {/* </div> */}
    </div>
  );
}

export default App;
