import './App.css';
import MainContainer from './components/main-container';
import NavigationBar from './components/nav-bar';

function App() {
  return (
    <>
      <div className='bg-gray-800'>
        <NavigationBar />
        <MainContainer />
      </div>
    </>
  );
}

export default App;
