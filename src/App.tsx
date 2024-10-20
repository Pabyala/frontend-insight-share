import "./App.css";
import MainContainer from "./components/timeline/MainContainer";
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

function App() {
  return (
    <div className="bg-gray-100 min-h-screen">
        {/* <div className="flex-grow"> */}
        <Routes>
          <Route path="/" element={<Layout />}>
            {/* Public routes */}
            <Route path="/login" element={<SignIn />} />
            <Route path="/register" element={<SignUp />} />
            

            {/* Protected routes */}
            <Route element={<RequiredAuth/>}>
              <Route path="/" element={<Home />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/welcome" element={<Welcome />} />
              <Route path="/userlist" element={<Welcomeuser />} />
              <Route path="/logout" element={<Logout />} />
            </Route>
          </Route>
        </Routes>
      {/* </div> */}
    </div>
  );
}

export default App;
