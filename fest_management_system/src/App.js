import './App.css';
import Navbar from './Components/Navbar';
import Login from './Components/Login';
import SignUp from './Components/SignUp';
import MyFest from './Components/MyFest';
import Home from './Components/Home';
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";

function App() {
  return (
    <>
      <BrowserRouter>
    <Navbar/>
    <Routes>
      <Route exact path="/" element={<Home />}/>
      <Route exact path="/myfestivals" element={<MyFest />} />
      <Route exact path="/login" element={<Login />} />
      <Route exact path="/signup" element={<SignUp />} />
    </Routes>
  </BrowserRouter>
    </>
  );
}

export default App;
