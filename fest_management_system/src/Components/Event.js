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
import { useNavigate, useParams} from "react-router-dom";

function Event() {
  const context = useContext(eventContext);
  const { FetchEvents, DeleteEvent, update, setupdate } = context;

  const context1 = useContext(visitorContext);
  const {addtoschedule} = context1;
 
  const navigate = useNavigate();
  let { festname, typeofuser } = useParams();
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
      {typeofuser == 'c' &&
        <AddEvent openbname={"Add Event"} formname={"New Event !!!"}></AddEvent>
      }
      {events.map((event) => (
        <Card key={event._id} sx={{ maxWidth: 345 }} >
          <CardActionArea>
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                {event.name}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {event.description}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {event.type}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {event.startdate}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {event.startTime}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {event.endTime}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {event.venue}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {event.fee}
              </Typography>
            </CardContent>
          </CardActionArea>

          <CardActions>
            {typeofuser == 'c' &&
              (
                <>
                  <Button onClick={() => DeleteEvent(festname, event._id)} size="small">
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

            {typeofuser == 'u' &&
              (
                <>
                  <Button onClick={()=>addtoschedule(festname,event._id,false)} size="small">
                    Schedule
                  </Button>
                  <Button onClick={()=>addtoschedule(festname,event._id,true)} size="small">
                    Register
                  </Button>
                </>
              )}
          </CardActions>
        </Card>
      ))}

    </>
  )
}

export default Event;