import React,{ useEffect, useState, useContext} from 'react'
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography"
import { CardActionArea } from '@mui/material';
import visitorContext from "../Context/visitor/visitorContext"
import { useNavigate } from "react-router-dom";

function Scheduler() {
    const context = useContext(visitorContext);
    const { fetchScheduledEvents, DeleteScheduledEvent, update, setupdate } = context;
    const navigate = useNavigate();
    const [events, setevents] = useState([]);

    useEffect(() => {
        setupdate(true)
    }, []);

    useEffect(() => {
        if (localStorage.getItem("token")) {
            if (update) {
                fetchScheduledEvents().then((scheduledevents) => {
                    const copyevents = JSON.parse(JSON.stringify(scheduledevents));
                    setevents(copyevents);
                    console.log(copyevents);
                });
                return () => (setupdate(false));
            }

        }
    }, [update, events]);

    return (
        <>
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
                        <Button onClick={()=>{DeleteScheduledEvent(event._id)}} size="small">
                            Unregister
                        </Button>
                    </CardActions>
                </Card>
            ))}
        </>
    )
}

export default Scheduler