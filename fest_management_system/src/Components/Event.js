import React, { useEffect, useState, useContext } from 'react'
import AddEvent from './AddEvent';
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography"
import { CardActionArea } from '@mui/material';
import eventContext from '../Context/event/eventContext'
import visitorContext from '../Context/visitor/visitorContext'
import { useNavigate, useParams,useLocation } from "react-router-dom";
import '../css/Event.css'
import Grid from '@mui/material/Grid';
import CardMedia from '@mui/material/CardMedia';


function Event() {
  const context = useContext(eventContext);
  const { FetchEvents, DeleteEvent, update, setupdate } = context;

  const context1 = useContext(visitorContext);
  const { addtoschedule } = context1;

  const navigate = useNavigate();
  let location = useLocation();
  const typeofuser = location.pathname[1];
  let { festname} = useParams();
  const [events, setevents] = useState([]);


  useEffect(() => {
    setupdate(true)
  }, []);

  useEffect(() => {
    if (localStorage.getItem("token")) {
      if (update) {
        FetchEvents(festname).then((festevents) => {
          const copyevents = JSON.parse(JSON.stringify(festevents));
          setevents(copyevents);
        });
        return () => (setupdate(false));
      }
    }
  }, [update, events]);


  return (
    <>
      <div className="myevent">
        <Grid container rowSpacing={3} spacing={1} sx={{ position: 'relative' }}>
        {events.map((event) => (
          <Grid key={event._id} item xs={4}>
            <Card id="eventcard" sx={{ maxWidth: 345 }} >
              <CardActionArea className="eventcardcontent" onClick={() => navigate(`${location.pathname}/${event._id}`)}> 
                <CardContent>
                  <Typography gutterBottom variant="h5">
                    {event.name}
                  </Typography>
                  <Typography variant="body2">
                    {event.description}
                  </Typography>
                  <Typography variant="body2">
                    {event.type}
                  </Typography>
                  <Typography variant="body2">
                    {event.startdate}
                  </Typography>
                  <Typography variant="body2">
                    {event.startTime}
                  </Typography>
                  <Typography variant="body2">
                    {event.endTime}
                  </Typography>
                  <Typography variant="body2">
                    {event.venue}
                  </Typography>
                  <Typography variant="body2" >
                    {event.fee}
                  </Typography>
                </CardContent>
              </CardActionArea>

              <CardActions>
                {typeofuser === 'c' &&
                  (
                    <>
                      <Button sx={{ color: '#BB86FC' }} onClick={() => DeleteEvent(festname, event._id)} size="small">
                        Delete
                      </Button>
                      <AddEvent
                        openbname={"Edit"}
                        formname={"Edit Event"}
                        formdata={event}
                      >
                      </AddEvent>
                    </>
                  )}

                {typeofuser === 'u' &&
                  (
                    <>
                      <Button onClick={() => addtoschedule(festname, event._id, false)} size="small">
                        Schedule
                      </Button>
                      <Button onClick={() => addtoschedule(festname, event._id, true)} size="small">
                        Register
                      </Button>
                    </>
                  )}
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>

      {typeofuser === 'c' &&
          <AddEvent openbname={"Add Event"} formname={"New Event !!!"}></AddEvent>
        }
    </div>
    </>
  )
}

export default Event;