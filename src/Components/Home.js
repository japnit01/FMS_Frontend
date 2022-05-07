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
        </div>
        
        <div className="bg1 fullscreen2">
            <section className="createfest">
              <div className="backgroundcontainer">
              <div className="createfesttext2">
              <Typography variant="h2" sx={{fontWeight:650}} align="left" >
                  Streamline your Fest 
                </Typography>
                <Typography variant="h5" align="left" sx={{ marginTop: '1%' }}>
                  Making your event more extraordinary
                </Typography>
                <Button variant="contained" className="createfestbutton" onClick={()=>navigate('/u/fests')}> Explore Fests</Button>
              </div>
              </div>
            </section>
        </div>
      </div>

    </>
  );
}

export default Home;
