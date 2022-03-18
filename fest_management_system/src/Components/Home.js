import React from "react";
import { Link} from "react-router-dom";
import CustomTextField from './CustomTextField';
import CustomButton from './CustomButton';

function Home() {

  return (
    <>
      <div>Home</div>
      <div>
        <Link to="/myfestivals">My Festivals</Link>
      </div>
      <div>
        <Link to="/api/auth/login">Login</Link>
      </div>
      <div>
        <Link to="/api/auth/signup">Sign Up</Link>
      </div>
      <div>
        <Link to="/form">Form</Link>
      </div>
      <div>
        <Link to="/api/competitions/6234851442854e82f4eb1c2b/getCompetitions">Get Competitions</Link>
      </div>
    </>
  );
}

export default Home;
