import React, { useEffect, useState, useContext } from 'react'
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography"
import { CardActionArea } from '@mui/material';
import eventContext from '../Context/event/eventContext'
import visitorContext from '../Context/visitor/visitorContext'
import { useNavigate, useParams, useLocation } from "react-router-dom";
import '../css/Event.css'
import Grid from '@mui/material/Grid';
import SpeedDial from '@mui/material/SpeedDial';
import SpeedDialIcon from '@mui/material/SpeedDialIcon';
import SpeedDialAction from '@mui/material/SpeedDialAction';
import FestivalIcon from '@mui/icons-material/Festival';
import EventIcon from '@mui/icons-material/Event';
// import AddCoordinator from './AddCoordinator'


function Event() {
  var mL = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  var mS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'];

  const context = useContext(eventContext);
  const { FetchEvents, DeleteEvent, event, setEvent, update, setupdate } = context;

  const context1 = useContext(visitorContext);
  const { addtoschedule } = context1;

  const navigate = useNavigate();
  let location = useLocation();
  const typeofuser = location.pathname[1];
  let { festname } = useParams();
  const [events, setevents] = useState([]);

  const actions = [
    { icon: <FestivalIcon onClick={() => navigate('/c/createfest')} />, name: 'Add Fest' },
    // { icon: <AddCoordinator/>, name: 'Add Coordinator' },
    { icon: <EventIcon onClick={() => navigate(`/c/fest/${festname}/createevent`)} />, name: 'Add Event' },
  ];


  useEffect(() => {
    setupdate(true)
  }, []);

  useEffect(() => {
    if (localStorage.getItem("token")) {
      if (update) {
        FetchEvents(festname).then((festevents) => {
          const copyevents = JSON.parse(JSON.stringify(festevents));
          copyevents.map((event) => {
            event.startdate = new Date(event.startdate);
            event.startTime = new Date(event.startTime);
            event.endTime = new Date(event.endTime);
            // console.log(event.startdate.getMonth())
          })
          setevents(copyevents);
        });
        return () => (setupdate(false));
      }
    }
  }, [update, events]);

  const handleupdatefest = (event) => {
    const copyevent = JSON.parse(JSON.stringify(event));
    // console.log(event)
    setEvent({
      id: copyevent._id,
      name: copyevent.name,
      description: copyevent.description,
      startdate: copyevent.startdate,
      startTime: copyevent.startTime,
      endTime: copyevent.endTime,
      venue: copyevent.venue,
      type: copyevent.type,
      fee: copyevent.fee,
    });

    navigate(`/c/fest/${festname}/editevent`)
  }

  return (
    <>
      <div className="myevent">
        <Grid container rowSpacing={3} spacing={1} sx={{ position: 'relative' }}>
          {(events.length !== 0) ? events.map((event) => (
            <Grid key={event._id} item xs={4}>
              <Card id="eventcard" sx={{ maxWidth: 345 }} >
                <CardActionArea className="eventcardcontent" onClick={() => navigate(`${location.pathname}/${(event.type === 'Dual' ? 'duals' : 'solo')}/${event._id}`)}>
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
                      {`${event.startdate.getDate()} ${mS[event.startdate.getMonth() - 1]} ${(event.startdate.getFullYear()) % 100}, ${event.startTime.getHours()}:${(event.startTime.getMinutes() >= 10) ? event.startTime.getMinutes() : "0" + event.startTime.getMinutes()} - ${event.startdate.getDate()} ${mS[event.startdate.getMonth() - 1]} ${(event.startdate.getFullYear()) % 100}, ${event.endTime.getHours()}:${(event.endTime.getMinutes() >= 10) ? event.endTime.getMinutes() : "0" + event.endTime.getMinutes()}`}
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
                        <Button sx={{ color: '#BB86FC' }} onClick={() => handleupdatefest(event, festname)} size="small">
                          Edit
                        </Button>
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
          )) : <>
            <div style={{ width: '70%', marginTop: '4%', marginLeft: '6%' }}>
              <Typography variant="h6" sx={{ color: '#fafafa' }}>
                No Events scheduled at the moment
              </Typography>
            </div>
          </>}
        </Grid>

        {typeofuser === 'c' &&
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
        }
      </div>
    </>
  )
}

export default Event;