import "./App.css";
import MainContainer from "./components/main-container";
import NavigationBar from "./components/nav-bar";

function App() {
  return (
    <div className="">
      <NavigationBar />
      <div className="flex min-h-screen mx-auto bg-lightGrayBlue">
        <MainContainer />
      </div>
    </div>
  );
}

export default App;
