import React, { useEffect, useState, useContext } from 'react'
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography"
import { CardActionArea } from '@mui/material';
import visitorContext from "../Context/visitor/visitorContext"
import { useNavigate, useLocation } from "react-router-dom";
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Select from 'react-select'
import Grid from '@mui/material/Grid';
import '../css/Scheduler.css'
import { Autocomplete, TextField } from '@mui/material';



function Scheduler() {
    const context1 = useContext(visitorContext);
    const { addtoschedule, fetchScheduledEvents, DeleteScheduledEvent, update, setupdate } = context1;
    const navigate = useNavigate();
    const [schedule, setschedule] = useState([]);
    const [options, setOptions] = useState({ label: '' });
    const [festname, setFestName] = useState("")
    const [currentEvents, setCurrentEvents] = useState([]);
    var mL = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    var mS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'];
    let location = useLocation();
    const typeofuser = location.pathname[1];

    useEffect(() => {
        setupdate(true)
    }, []);

    useEffect(() => {
        if (localStorage.getItem("token")) {
            if (update) {
                fetchScheduledEvents().then((scheduledevents) => {
                    setschedule(scheduledevents);

                    let filters = [];
                    // console.log(schedule)
                    schedule.map(({ fest, event }) => {
                        console.log(fest)
                        filters.push({value: fest.name, label: fest.name });
                    });
                    // console.log('filters: ',filters)
                    const filters1 = JSON.parse(JSON.stringify(filters))
                    setOptions(filters1);

                    let allevents = [];
                    schedule.map(({fest,event}) => {
                        // console.log({fest,event})
                        event.forEach((ev) => {
                            ev.fest_id = fest._id
                            ev.organisation = fest.organisation;
                            ev.startTime = new Date(ev.startTime);
                            ev.endTime = new Date(ev.endTime);
                            ev.startdate = new Date(ev.startdate);
                        })
                        console.log('event: ',event)
                        allevents = allevents.concat(event);
                    })
                
                    const allevents1 = JSON.parse(JSON.stringify(allevents))
                    // console.log(allevents1)
                    setCurrentEvents(allevents1)

                });
                return () => (setupdate(false));
            }

        }
    }, [update, schedule]);

    const [value, setValue] = useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const handleFestChange = (e) => {
        setFestName(e.value);
        // console.log(e.value)
    }


    useEffect(() => {
        schedule.map(({fest,event}) => {
            event.forEach((ev) => {
                ev.organisation = fest.organisation
            })

            // console.log('event: ',event)
            // console.log('fest: ',fest)

            if(fest.name === festname) {
                setCurrentEvents(event);
            }
        })
    },[festname])

    return (
        <>
            <div className="schedulecontainer">
                <div className="search">
                    <Select options={options} onChange={handleFestChange} />
                </div>   

                <div className="displayevents" style={{color: 'white'}}>

                    <Grid container rowSpacing={3} spacing={1} sx={{ position: 'relative' }}>
                    {currentEvents.map((event) => (
                    <Grid key={event._id} item xs={4}>
                        <Card id="eventcard" sx={{ maxWidth: 345 }} >
                        <CardActionArea className="eventcardcontent"> 
                            <CardContent>
                            <Typography gutterBottom variant="h5">
                                {event.name}
                            </Typography>
                            <Typography variant="body2">
                                {event.organisation}
                                {/* {console.log(event.organisation)} */}
                            </Typography>
                            <Typography variant="body2">
                                {event.type}
                            </Typography>
                            <Typography variant="body2">
                                {/* {`${event.startdate.getDate()} ${mS[event.startdate.getMonth() - 1]} ${(event.startdate.getFullYear()) % 100}, ${event.startTime.getHours()}:${event.startTime.getMinutes()} - ${event.startdate.getDate()} ${mS[event.startdate.getMonth() - 1]} ${(event.startdate.getFullYear()) % 100}, ${event.endTime.getHours()}:${event.endTime.getMinutes()}`} */}
                            </Typography>
                            <Typography variant="body2" sx={{color:'green'}} >
                                {(event.fee) ? event.fee : "FREE"}
                            </Typography>
                            </CardContent>
                            </CardActionArea>

                            <CardActions>
                                <Button onClick={() => DeleteScheduledEvent(event.fest_id, event._id)} size="small">
                                    Unregister
                                </Button>
                            </CardActions>

                        </Card>
                    </Grid>
    ))}
                </Grid>

                </div>

            {/* {typeofuser === 'c' &&
                <Button variant="contained" onClick={() => navigate(`/c/fest/${festname}/createevent`)}>Add Event</Button>
            } */}
           
            </div>

        </>
    )
}

export default Scheduler




