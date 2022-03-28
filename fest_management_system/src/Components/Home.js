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
        <Link to="/api/competitions/6234851442854e82f4eb1c2b/getCompetitions">Get Competitions</Link>
      </div>
      <div>
        <Link to="/api/fests/addfest">Add Fest</Link>
      </div>
    </>
  );
}

export default Home;
