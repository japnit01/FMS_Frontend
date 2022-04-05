import "./App.css";
import Navbar from "./Components/Navbar";
import Login from "./Components/Login";
import SignUp from "./Components/SignUp";
import MyFest from "./Components/MyFest";
import Home from "./Components/Home";
import Event from "./Components/Event";
import Scheduler from "./Components/Scheduler";
import FestState from "./Context/fest/FestState";
import AuthState from "./Context/auth/AuthState"
import EventState from "./Context/event/EventState"
import Visitor from './Components/Visitor'; 
import VisitorState from "./Context/visitor/VisitorState";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  
  return (
    <>
      <AuthState>
        <FestState>
          <EventState>
            <VisitorState>
            <BrowserRouter>
              <Navbar />
              <Routes>
                <Route path="*" element={<Home />} /> // page-not-found route
                <Route index path="/home" element={<Home />} />
                <Route exact path="/c/myfests" element={<MyFest />} />
                <Route exact path="/login" element={<Login />} />
                <Route exact path="/signup" element={<SignUp />} />
                <Route path="/:typeofuser/fest/:festname" element={<Event />} />
                <Route exact path="/u/fests" element={<Visitor />}/>
                <Route exact path="/u/schedule" element={<Scheduler/>}/>
              </Routes>
            </BrowserRouter>
            </VisitorState>
          </EventState>
        </FestState>
      </AuthState>
    </>
  );
}

export default App;
