import logo from './logo.svg';
import './App.css';
import Home from './Pages/Home';
import SignupForm from "./Component/Auth/SignupForm";
import LoginForm from "./Component/Auth/LoginForm";
import { useSelector } from 'react-redux';
import LandingPage from './Pages/Landing';

function App() {
  const token = useSelector((state)=>state.user.token);
  console.log("token", token);

  return (
    <div className="App">

      {!token ? (
        <LandingPage/>
      ) : (
        <>
          <Home />
        </>
      )}
    </div>
  );
}

export default App;
