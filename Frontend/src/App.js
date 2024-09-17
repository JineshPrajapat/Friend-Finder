import logo from './logo.svg';
import './App.css';
import Home from './Pages/Home';
import SignupForm from "./Component/Auth/SignupForm";
import LoginForm from "./Component/Auth/LoginForm";
import { useSelector } from 'react-redux';
import LandingPage from './Pages/Landing';
import ScrollToTop from './hooks/ScrollToTop';

function App() {
  const token = useSelector((state)=>state.user.token);
  return (
    <div className="App">

      {!token ? (
        <LandingPage/>
      ) : (
        <>
          <Home />
        </>
      )}
      <ScrollToTop/>
    </div>
  );
}

export default App;
