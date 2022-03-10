import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

function Home() {
  return (
    <>
      <div>Home</div>
      <div>
        <Link to="/myfestivals">My Festivals</Link>
      </div>
      <div>
        <Link to="/login">Login</Link>
      </div>
      <div>
        <Link to="/signup">Sign Up</Link>
      </div>
    </>
  );
}

export default Home;
