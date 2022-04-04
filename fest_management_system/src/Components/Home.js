import React from "react";
import { Link } from "react-router-dom";
import "../css/Home.css";
import Container from '@mui/material/Container';
import Typography from "@mui/material/Typography";
import Button from '@mui/material/Button';

function Home() {

  return (
    <>
      <div className="application">
        <Container disableGutters maxWidth={false} sx={{ minHeight: '100vh' }}>
          <section className="createfest">
            <div className="backgroundcontainer">
              <div className="createfesttext">
                <Typography variant="h1" align="center" >
                  Streamline your Fest 
                </Typography>
                <Typography variant="h5" align="center" sx={{ marginTop: '1%' }}>
                  Making your event more extraordinary
                </Typography>
                <Button variant="contained" className="createfestbutton"> Start creating your fest </Button>
              </div>
            </div>
          </section>
        </Container>
        <div>
          <Link to="/c/myfests">Coordinator</Link>
        </div>
        <div>
          <Link to="/u/fests">Visitor</Link>
        </div>
        <div>
          <Link to="/u/schedule">Schedule</Link>
        </div>
      </div>

    </>
  );
}

export default Home;
