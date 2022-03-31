import React from "react";
import { Link} from "react-router-dom";

function Home() {

  return (
    <>
      <div>Home</div>
      <div>
        <Link to="/myfestivals">My Festivals</Link>
      </div>
      <div>
        <Link to="/fest/Engifest-6241584679182e2d27071c73">Get Competitions</Link>
      </div>
      <div>
        <Link to="/api/fests/addfest">Add Fest</Link>
      </div>
    </>
  );
}

export default Home;
