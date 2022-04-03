import React from "react";
import { Link} from "react-router-dom";

function Home() {

  return (
    <>
      <div>Home</div>
      <div>
        <Link to="/c/myfests">Coordinator</Link>
      </div>
      <div>
        <Link to="/u/fests">Visitor</Link>
      </div>
      <div>
        <Link to="/u/schedule">Schedule</Link>
      </div>
    </>
  );
}

export default Home;
