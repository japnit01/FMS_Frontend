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
import Dual from "./Components/Dual";
import Solo from "./Components/Solo";
import Finish from "./Components/Finish";
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
                  <Route path="/" />
                  <Route index element={<Home />} />
                  <Route path="login" element={<Login />} />
                  <Route path="signup" element={<SignUp />} />
                  <Route path="c">
                    <Route index path="myfests" element={<MyFest />} />
                    <Route path="fest">
                      <Route path=":festname" element={<Event />} />
                      <Route path=":festname/duals/:eventid" element={<Dual />} />
                      <Route path=":festname/solo/:eventid" element={<Solo />} />
                      {/* <Route path=":festname/:eventid/finish">{<Finish />}</Route> */}
                    </Route>


                  </Route>
                  <Route path="u">
                    <Route index path="fests" element={<Visitor />} />
                    <Route path="schedule" element={<Scheduler />} />
                    <Route path="fest/:festname" element={<Event />} />
                  </Route>


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
