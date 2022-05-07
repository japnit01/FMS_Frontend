import React, { useEffect, useState, useContext } from 'react'
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
// import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography"
import { CardActionArea } from '@mui/material';
import visitorContext from "../Context/visitor/visitorContext"
import { useNavigate, useLocation } from "react-router-dom";
// import Tabs from '@mui/material/Tabs';
// import Tab from '@mui/material/Tab';
import Select from 'react-select'
import Grid from '@mui/material/Grid';
import AutoDeleteIcon from '@mui/icons-material/AutoDelete';
import '../css/Scheduler.css'
// import { Autocomplete, TextField } from '@mui/material';

const festNameNotSelected = (events,setCurrentEvents) => { 
    let allevents = [];
    events.map(({fest,event}) => {
        // console.log({fest,event})
        event.forEach((ev) => {
            ev.fest_id = fest._id
            ev.organisation = fest.organisation;
            ev.startTime = new Date(ev.startTime);
            ev.endTime = new Date(ev.endTime);
            ev.startdate = new Date(ev.startdate);
        })
        // console.log('event: ',event)
        allevents = allevents.concat(event);
    })

    const allevents1 = JSON.parse(JSON.stringify(allevents))
    sortEvents(allevents1);
    // console.log(allevents1)
    setCurrentEvents(allevents1)
}

const festNameSelected = (events,setCurrentEvents,festname) => { 
    events.map(({fest,event}) => {
        event.forEach((ev) => {
            ev.fest_id = fest._id
            ev.organisation = fest.organisation;
            ev.startTime = new Date(ev.startTime);
            ev.endTime = new Date(ev.endTime);
            ev.startdate = new Date(ev.startdate);
        })

        if(fest.name === festname) {
            sortEvents(event);
            console.log('sorted event: ',event)
            setCurrentEvents(event);
            return [];
        }
    })
}

const sortEvents = (events) => { 
    events.sort((a,b) => {
        let A = JSON.stringify(a.startdate.getYear()) + JSON.stringify((a.startdate.getMonth() >= 10) ? a.startdate.getMonth() : "0" + a.startdate.getMonth()) + JSON.stringify((a.startdate.getDay() >= 10) ? a.startdate.getDay() : "0" + a.startdate.getDay()) + JSON.stringify((a.startTime.getHours() >= 10) ? a.startTime.getHours() : "0" + a.startTime.getHours()) + JSON.stringify((a.startTime.getMinutes() >= 10) ? a.startTime.getMinutes() : "0" + a.startTime.getMinutes()) + JSON.stringify((a.endTime.getHours() >= 10) ? a.endTime.getHours() : "0" + a.endTime.getHours()) + JSON.stringify((a.endTime.getMinutes() >= 10) ? a.endTime.getMinutes() : "0" + a.endTime.getMinutes()) 
        let B = JSON.stringify(b.startdate.getYear()) + JSON.stringify((b.startdate.getMonth() >= 10) ? b.startdate.getMonth() : "0" + b.startdate.getMonth()) + JSON.stringify((b.startdate.getDay() >= 10) ? b.startdate.getDay() : "0" + b.startdate.getDay()) + JSON.stringify((b.startTime.getHours() >= 10) ? b.startTime.getHours() : "0" + b.startTime.getHours()) + JSON.stringify((b.startTime.getMinutes() >= 10) ? b.startTime.getMinutes() : "0" + b.startTime.getMinutes()) + JSON.stringify((b.endTime.getHours() >= 10) ? b.endTime.getHours() : "0" + b.endTime.getHours()) + JSON.stringify((b.endTime.getMinutes() >= 10) ? b.endTime.getMinutes() : "0" + b.endTime.getMinutes()) 
        console.log('inside sorting part')
        return ('' + A).localeCompare(B);
    })
}

function Scheduler() {
    const context1 = useContext(visitorContext);
    const { addtoschedule, fetchScheduledEvents, DeleteScheduledEvent, update, setupdate } = context1;
    const navigate = useNavigate();
    const [schedule, setschedule] = useState([]);
    const [registeredEvents,setRegisteredEvents] = useState([]);
    const [options, setOptions] = useState({ label: '' });
    const [festname, setFestName] = useState("")
    const [currentEvents, setCurrentEvents] = useState([]);
    const [checkValue, setCheckValue] = useState(false)
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
                fetchScheduledEvents().then(({contentjson,registeredEvents}) => {
                    console.log('contentjson in scheduler frontend: ',contentjson)
                    sortEvents(contentjson);
                    sortEvents(registeredEvents);
                    setschedule(contentjson);
                    setRegisteredEvents(registeredEvents);

                    let filters = [];
                    console.log(schedule)
                    schedule.map(({ fest, event }) => {
                        // console.log(fest)
                        filters.push({value: fest.name, label: fest.name });
                    });

                    const filters1 = JSON.parse(JSON.stringify(filters))
                    setOptions(filters1);

                    festNameNotSelected(schedule,setCurrentEvents);

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

    const changeCheckValue = () => { 
        setCheckValue(!checkValue);
    }

    useEffect(() => {
        if(checkValue === true) { 
            console.log(registeredEvents)
            if(festname === "") { 
                festNameNotSelected(registeredEvents,setCurrentEvents)
            } else { 
                festNameSelected(registeredEvents,setCurrentEvents,festname)
            }
        } else { 
            if(festname === "") { 
                // setCurrentEvents(schedule)
                festNameNotSelected(schedule,setCurrentEvents)
            } else { 
                festNameSelected(schedule,setCurrentEvents,festname)
            }
        }
    },[checkValue])


    useEffect(() => {
        // schedule.map(({fest,event}) => {
        //     event.forEach((ev) => {
        //         ev.fest_id = fest._id
        //         ev.organisation = fest.organisation;
        //         ev.startTime = new Date(ev.startTime);
        //         ev.endTime = new Date(ev.endTime);
        //         ev.startdate = new Date(ev.startdate);
        //     })

        //     // console.log('event: ',event)
        //     // console.log('fest: ',fest)

        //     if(fest.name === festname) {
        //         setCurrentEvents(event);
        //     }
        // })
        if(checkValue === true) { 
            festNameSelected(registeredEvents,setCurrentEvents,festname);
        } else { 
            festNameSelected(schedule,setCurrentEvents,festname);
        }
    },[festname])

    return (
        <>
            <div className="schedulecontainer">
                <Grid container spacing={2} >
                    <Grid item xs={6}>
                     <Select options={options} sx={{mt: '10%'}} onChange={handleFestChange} />
                    </Grid>
                    <Grid item xs={6}>
                    <label style={{color: 'white'}}>
                        <input type="checkbox" checked={checkValue} onChange={changeCheckValue}  />
                        Registered Events
                        
                    </label>
                    </Grid>
                </Grid>
                {/* <div className="search">
                    <Select options={options} onChange={handleFestChange} />
                </div>    */}

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
                                <AutoDeleteIcon onClick={() => DeleteScheduledEvent(event.fest_id, event._id)} sx={{'&:hover': {cursor: 'pointer'}, mx: 'auto', fontSize: '200%'}} />
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




