import "./App.css";
import MainContainer from "./components/main-container";
import NavigationBar from "./components/nav-bar";
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from "./pages/Login";
import Register from "./pages/Register";

function App() {
  return (
    <div className="">
      {/* <NavigationBar />
      <div className="flex min-h-screen mx-auto bg-gray-100">
        <MainContainer />
      </div> */}
      <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
      </Routes>
    </div>
  );
}

export default App;
