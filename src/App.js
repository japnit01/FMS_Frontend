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
import AddFest from "./Components/AddFest";
import AddEvent from "./Components/AddEvent";
import Results from "./Components/Results";
import Finish from "./Components/Finish";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider, createTheme } from '@mui/material/styles';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

function App() {

  return (
    <>
    <ThemeProvider theme={darkTheme}>
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
                      <Route path=":festevent" element={<AddFest />} />
                      <Route path="fest">
                        <Route path=":festname" element={<Event />} />
                        <Route path=":festname/:eventoperation" element={<AddEvent />} />
                        <Route path=":festname/duals">
                          <Route path=":eventid" element={<Dual />} />
                          <Route path=":eventid/result" element={<Results />} />
                        </Route>
                        <Route path=":festname/solo">
                          <Route path=":eventid" element={<Solo />} />
                          <Route path=":eventid/result" element={<Results />} />
                        </Route>
                      </Route>
                    </Route>

                    <Route path="u">
                      <Route index path="fests" element={<Visitor />} />
                      <Route path="schedule" element={<Scheduler />} />
                      <Route path="fest/:festname" element={<Event />} >
                        <Route path="/duals/:eventid/result" element={<Results />} />
                        <Route path="/solo/:eventid/result" element={<Results />} />
                      </Route>
                    </Route>

                  </Routes>
              </BrowserRouter>
            </VisitorState>
          </EventState>
        </FestState>
      </AuthState>
      </ThemeProvider>
    </>
  );
}

export default App;
