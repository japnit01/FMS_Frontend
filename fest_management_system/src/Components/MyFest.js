import React, { useEffect, useState, useContext } from "react";
import AddFest from "./AddFest";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { CardActionArea } from '@mui/material';
import festContext from '../Context/fest/festContext'
import { useNavigate } from "react-router-dom";
import '../css/MyFest.css'
import Grid from '@mui/material/Grid';

function MyFest() {
  const context = useContext(festContext);
  const { FetchFests, DeleteFest, update, setupdate } = context;
  const navigate = useNavigate();
  const [fests, setFests] = useState([]);

  useEffect(() => {
    setupdate(true)
  }, []);

  useEffect(() => {
    if (localStorage.getItem("token")) {
      if (update) {
        FetchFests().then((userfests) => {
          const copyfests = JSON.parse(JSON.stringify(userfests));
          setFests(copyfests);
        });
        return () => (setupdate(false));
      }

    }
  }, [update, fests]);

  return (
    <>
      <div class="myfest">
        <Grid container rowSpacing={3} spacing={1} sx={{ position:'relative'}}>
          {fests.map((fest) => (
            <Grid item xs={4}>

              <Card id="festcard" key={fest._id} raised	 sx={{ maxWidth: 345 }} >
                <CardActionArea onClick={() => navigate(`/c/fest/${fest.name}-${fest._id}`)}>
                  <CardContent className="festcardcontent">
                    <Typography variant="h5">
                      {fest.name}
                    </Typography>
                    <Typography variant="body2">
                      Organised By:- {fest.organisation}
                    </Typography>
                    <Typography variant="body2" >
                      {fest.description}
                    </Typography>
                    <Typography variant="body2">
                      {fest.startdate}
                    </Typography>
                    <Typography variant="body2">
                      {fest.enddate}
                    </Typography>
                    <Typography variant="body2">
                      {fest.state}
                    </Typography>
                    <Typography variant="body2">
                      {fest.city}
                    </Typography>
                  </CardContent>
                </CardActionArea>

                <CardActions>
                  <Button onClick={() => DeleteFest(fest._id)} size="small">
                    Delete
                  </Button>
                  <AddFest
                    openbname={"Edit"}
                    formname={"Edit Fest"}
                    formdata={fest}
                  ></AddFest>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
        <AddFest openbname={"Add Fest"} formname={"New Fest !!!"}></AddFest>
      </div>
    </>
  );
}

export default MyFest;
