import "./App.css";
import Navbar from "./Components/Navbar";
import Login from "./Components/Login";
import SignUp from "./Components/SignUp";
import MyFest from "./Components/MyFest";
import Home from "./Components/Home";
import Competition from "./Components/AddCompetition";
import AddFest from "./Components/AddFest";
import FestState from "./Context/fest/FestState";
import AuthState from "./Context/auth/AuthState"
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <>
      <AuthState>
      <FestState>
        <BrowserRouter>
          <Navbar />
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route exact path="/myfestivals" element={<MyFest />} />
            <Route exact path="/login" element={<Login />} />
            <Route exact path="/signup" element={<SignUp />} />
            <Route
              exact
              path="/api/competitions/6234851442854e82f4eb1c2b/getCompetitions"
              element={<Competition />}
            />
            <Route
              exact
              path="/api/competitions/6234851442854e82f4eb1c2b/getCompetitions"
              element={<Competition />}
            />
            <Route exact path="/api/fests/addfest" element={<AddFest />} />
          </Routes>
        </BrowserRouter>
        </FestState>
      </AuthState>
    </>
  );
}

export default App;
