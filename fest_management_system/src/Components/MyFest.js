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

function MyFest() {
  const context = useContext(festContext);
  const { FetchFests, DeleteFest, update, setupdate } = context;
  const navigate = useNavigate();
  const [fests, setFests] = useState([]);

  useEffect(()=>{
    setupdate(true)
  },[]);

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
      <AddFest openbname={"Add Fest"} formname={"New Fest !!!"}></AddFest>
      {fests.map((fest) => (
        <Card key={fest._id} sx={{ maxWidth: 345 }} >
          <CardActionArea  onClick={() => navigate(`/fest/${fest.name}-${fest._id}`)}> 
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                {fest.name}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Organised By:- {fest.organisation}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {fest.description}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {fest.startdate}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {fest.enddate}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {fest.state}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {fest.city}
              </Typography>
            </CardContent>
          </CardActionArea>
          {/* </ButtonBase> */}
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
      ))}

    </>
  );
}

export default MyFest;
