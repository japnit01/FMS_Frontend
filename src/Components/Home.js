import React from "react";
import { Link,useNavigate } from "react-router-dom";
import "../css/Home.css";
import Container from '@mui/material/Container';
import Typography from "@mui/material/Typography";
import Button from '@mui/material/Button';

function Home() {
  const navigate = useNavigate();

  return (
    <>
      <div className="application">
        <div className="bg fullscreen1">
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
                <Button variant="contained" className="createfestbutton" onClick={()=>navigate('/c/myfests')}> Start creating your fest </Button>
              </div>
            </div>
          </section>
        </Container>
        </div>
        
        <div className="bg fullscreen2">
          <Container disableGutters maxWidth={false} sx={{minHeight: '100vh'}}>
            <section className="createfest">
              <div className="backgroundcontainer">
                <div className="createfesttext2">
                  <Typography variant="h4" align="center" sx={{ marginTop: '1%', fontWeight: 'bold' }}>
                    Catch Up with your Favourite Fests now!
                  </Typography>
                  <Button variant="contained" className="createfestbutton2" onClick={()=>navigate('/u/myfests')}> View your fests </Button>
                </div>
              </div>
            </section>
          </Container>
        </div>
        
        {/* <div>
          <Link to="/u/fests">Visitor</Link>
        </div>
        <div>
          <Link to="/u/schedule">Schedule</Link>
        </div> */}

      </div>

    </>
  );
}

export default Home;
