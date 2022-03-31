import "./App.css";
import Navbar from "./Components/Navbar";
import Login from "./Components/Login";
import SignUp from "./Components/SignUp";
import MyFest from "./Components/MyFest";
import Home from "./Components/Home";
import Event from "./Components/Event";
import FestState from "./Context/fest/FestState";
import AuthState from "./Context/auth/AuthState"
import EventState from "./Context/event/EventState"
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <>
      <AuthState>
        <FestState>
          <EventState>
            <BrowserRouter>
              <Navbar />
              <Routes>
                <Route exact path="/" element={<Home />} />
                <Route exact path="/myfestivals" element={<MyFest />} />
                <Route exact path="/login" element={<Login />} />
                <Route exact path="/signup" element={<SignUp />} />
                <Route path="/fest/:festname" element={<Event />} />
              </Routes>
            </BrowserRouter>
          </EventState>
        </FestState>
      </AuthState>
    </>
  );
}

export default App;
