import React, { useEffect, useState, useContext } from "react";
import { CardActionArea,Typography,Button,CardContent,CardActions,Card,CardMedia,Grid,IconButton } from '@mui/material';
import festContext from '../Context/fest/festContext'
import { useNavigate } from "react-router-dom";
import '../css/MyFest.css'
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import SpeedDial from '@mui/material/SpeedDial';
import SpeedDialIcon from '@mui/material/SpeedDialIcon';
import SpeedDialAction from '@mui/material/SpeedDialAction';
import FestivalIcon from '@mui/icons-material/Festival';

function MyFest() {

  var mL = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  var mS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'];

  const context = useContext(festContext);
  const { FetchFests, DeleteFest, fest, setFest, update, setupdate } = context;
  const navigate = useNavigate();
  const [fests, setFests] = useState([]);
  const [isReadMore, setIsReadMore] = useState(false);

  const actions = [
    { icon: <FestivalIcon onClick={() => navigate('/c/createfest')}/>, name: 'Add Fest' },
    // { icon: <AddCoordinator/>, name: 'Add Coordinator' },
  ];

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

  const toggleReadMore = () => {
    setIsReadMore(!isReadMore)
  }


  return (
    <>
      <div className="myfest">
        <Grid container rowSpacing={3} spacing={1} sx={{ position: 'relative',pt:"4%"}}>
          {(fests.length !== 0) ? fests.map((fest) => (
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
                      {fest.description}
                      {/* {(isReadMore === true) ? fest.description : fest.description.slice(0,15)}
                      <span className="readmoreorhide">
                        <Button variant="text" size="small" onClick={toggleReadMore}>{(isReadMore === true) ? "Read less" : "Read more"}</Button>
                      </span> */}
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
          )): <>
          <div style={{width: '70%', marginTop: '4%', marginLeft: '6%'}}>
          <Typography variant="h6" sx={{color: '#fafafa'}}>
                No Fests around the corner right now
            </Typography>
          </div>
            </>}
        </Grid>

        <SpeedDial
        ariaLabel="SpeedDial basic example"
        sx={{ position: 'fixed', bottom: 16, right: 18 }}
        icon={<SpeedDialIcon />}
      >
        {actions.map((action) => (
          <SpeedDialAction
            key={action.name}
            icon={action.icon}
            tooltipTitle={action.name}
          />
        ))}
      </SpeedDial>
      </div>
    </>
  );
}

export default MyFest;
