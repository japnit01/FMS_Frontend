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
import CardMedia from '@mui/material/CardMedia';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import IconButton from '@mui/material/IconButton';

function MyFest() {

  var mL = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  var mS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'];

  const context = useContext(festContext);
  const { FetchFests, DeleteFest, fest, setFest, update, setupdate } = context;
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
          copyfests.map((fest) => {
            fest.startdate = new Date(fest.startdate);
            fest.enddate = new Date(fest.enddate);
          })
          setFests(copyfests);
        });
        return () => (setupdate(false));
      }

    }
  }, [update, fests]);

  const handleupdatefest = (fest) => {
    const copyfest = JSON.parse(JSON.stringify(fest));
    setFest({
      id: copyfest._id,
      name: copyfest.name,
      description: copyfest.description,
      startdate: copyfest.startdate,
      enddate: copyfest.enddate,
      state: copyfest.state,
      city: copyfest.city,
      organisation: copyfest.organisation,
    });

    navigate('/c/editfest')
  }
  return (
    <>
      <div className="myfest">
        <Grid container rowSpacing={3} spacing={1} sx={{ position: 'relative' }}>
          {fests.map((fest) => (
            <Grid key={fest._id} item xs={4}>

              <Card id="festcard" sx={{ maxWidth: 345 }} >
                <CardActionArea className="festcardcontent" onClick={() => navigate(`/c/fest/${fest.name}-${fest._id}`)}>
                  <CardMedia
                    className="festcardmedia"
                    component="img"
                    height="100%"
                    image="/festprofile/1.jpg"
                    alt="green iguana"
                  />

                  <CardContent>
                    <Typography variant="h5">
                      {fest.name}
                    </Typography>
                    <Typography variant="body2">
                      {fest.organisation}
                    </Typography>
                    <Typography variant="body2">
                      {`${fest.startdate.getDate()} ${mS[fest.startdate.getMonth() - 1]} ${(fest.startdate.getFullYear()) % 100} - ${fest.enddate.getDate()} ${mS[fest.enddate.getMonth() - 1]} ${(fest.enddate.getFullYear()) % 100}`}
                    </Typography>
                    <Typography variant="body2">
                      {`${fest.state},${fest.city}`}
                    </Typography>
                  </CardContent>

                </CardActionArea>

                <CardActions>
                  <IconButton aria-label="delete" onClick={() => DeleteFest(fest._id)}>
                    <DeleteOutlineIcon sx={{ color: '#BB86FC' }} />
                  </IconButton>
                  
                  <IconButton aria-label="edit" onClick={() => handleupdatefest(fest)} >
                    <EditOutlinedIcon sx={{ color: '#BB86FC' }} />
                  </IconButton>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
        <Button variant="contained" onClick={() => navigate('/c/createfest')}>Add Fest</Button>
      </div>
    </>
  );
}

export default MyFest;
