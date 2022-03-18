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
        <Link to="/login">Login</Link>
      </div>
      <div>
        <Link to="/signup">Sign Up</Link>
      </div>
      
      {/* <div>
        <Link to="/add-competition">Add Competition</Link>
      </div> */}
    </>
  );
}

export default Home;
