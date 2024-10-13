import "./App.css";
import MainContainer from "./components/main-container";
import NavigationBar from "./components/nav-bar";
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import Profile from "./pages/Profile";

function App() {
  return (
    <div className="bg-gray-100 min-h-screen">
        {/* <div className="flex-grow"> */}
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/profile" element={<Profile />} />
        </Routes>
      {/* </div> */}
    </div>
  );
}

export default App;
