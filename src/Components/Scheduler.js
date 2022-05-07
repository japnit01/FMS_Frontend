import React, { useEffect, useState, useContext } from 'react'
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography"
import { CardActionArea } from '@mui/material';
import visitorContext from "../Context/visitor/visitorContext"
import { useNavigate, useLocation } from "react-router-dom";
import Grid from '@mui/material/Grid';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import '../css/Scheduler.css'
import { Box, Autocomplete } from '@mui/material';
import TextField from '@mui/material/TextField';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import IconButton from '@mui/material/IconButton';
import CardHeader from '@mui/material/CardHeader';
import Button from '@mui/material/Button';
 

const festNameNotSelected = (events, setCurrentEvents) => {
    let allevents = [];
    events.map(({ fest, event }) => {
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
    // console.log(allevents1)
    sortEvents(allevents1)
    setCurrentEvents(allevents1)
}

const festNameSelected = (events, setCurrentEvents, festname) => {
    events.map(({ fest, event }) => {
        event.forEach((ev) => {
            ev.fest_id = fest._id
            ev.organisation = fest.organisation;
            ev.startTime = new Date(ev.startTime);
            ev.endTime = new Date(ev.endTime);
            ev.startdate = new Date(ev.startdate);
        })

        // console.log('event: ',event)
        // console.log('fest: ',fest)

        if (fest.name === festname) {
            sortEvents(event)
            setCurrentEvents(event);
        }
    })
}

const sortEvents = (events) => {
    events.sort((a, b) => {

        a = new Date(a.startdate)
        b = new Date(b.startdate)

        const st1 = new Date(a.startTime)
        const st2 = new Date(b.startTime)

        const et1 = new Date(a.endTime)
        const et2 = new Date(b.endTime)

        let A = JSON.stringify(a.getFullYear()) + JSON.stringify((a.getMonth() >= 10) ? a.getMonth() : "0" + a.getMonth()) + JSON.stringify((a.getDay() >= 10) ? a.getDay() : "0" + a.getDay()) + JSON.stringify((st1.getHours() >= 10) ? st1.getHours() : "0" + st1.getHours()) + JSON.stringify((st1.getMinutes() >= 10) ? st1.getMinutes() : "0" + st1.getMinutes()) + JSON.stringify((et1.getHours() >= 10) ? et1.getHours() : "0" + et1.getHours()) + JSON.stringify((et1.getMinutes() >= 10) ? et1.getMinutes() : "0" + et1.getMinutes())
        let B = JSON.stringify(b.getFullYear()) + JSON.stringify((b.getMonth() >= 10) ? b.getMonth() : "0" + b.getMonth()) + JSON.stringify((b.getDay() >= 10) ? b.getDay() : "0" + b.getDay()) + JSON.stringify((st2.getHours() >= 10) ? st2.getHours() : "0" + st2.getHours()) + JSON.stringify((st2.getMinutes() >= 10) ? st2.getMinutes() : "0" + st2.getMinutes()) + JSON.stringify((et2.getHours() >= 10) ? et2.getHours() : "0" + et2.getHours()) + JSON.stringify((et2.getMinutes() >= 10) ? et2.getMinutes() : "0" + et2.getMinutes())
        console.log('inside sorting part')
        return ('' + A).localeCompare(B);
    })
}

function Scheduler() {
    const context1 = useContext(visitorContext);
    const { addtoschedule, fetchScheduledEvents, DeleteScheduledEvent, update, setupdate } = context1;
    const navigate = useNavigate();
    const [schedule, setschedule] = useState([]);
    const [registeredEvents, setRegisteredEvents] = useState([]);
    const [options, setOptions] = useState([]);
    const [festname, setFestName] = useState({ label: 'Select Organisation' })
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
                fetchScheduledEvents().then(({ contentjson, registeredEvents }) => {
                    console.log('contentjson in scheduler frontend: ', contentjson)
                    setschedule(contentjson);
                    setRegisteredEvents(registeredEvents);

                    let filters = [];
                    // console.log(schedule)
                    schedule.map(({ fest, event }, index) => {
                        console.log(index)
                        filters.push({ id: index, value: fest.name, label: fest.name });
                    });

                    const filters1 = JSON.parse(JSON.stringify(filters))
                    console.log(filters)
                    setOptions(filters1);

                    festNameNotSelected(schedule, setCurrentEvents);

                });
                return () => (setupdate(false));
            }

        }
    }, [update, schedule]);

    const handleFestChange = (e, value) => {
        if (value)
            setFestName({ label: value.label });
    }

    const changeCheckValue = () => {
        setCheckValue(!checkValue);
    }

    useEffect(() => {
        if (checkValue === true) {
            // console.log(registeredEvents)
            if (festname.label === "") {
                festNameNotSelected(registeredEvents, setCurrentEvents)
            } else {
                festNameSelected(registeredEvents, setCurrentEvents, festname.label)
            }
        } else {
            if (festname.label === "") {
                // setCurrentEvents(schedule)
                festNameNotSelected(schedule, setCurrentEvents)
            } else {
                festNameSelected(schedule, setCurrentEvents, festname.label)
            }
        }
    }, [checkValue])


    useEffect(() => {
        if (checkValue === true) {
            festNameSelected(registeredEvents, setCurrentEvents, festname.label);
        } else {
            festNameSelected(schedule, setCurrentEvents, festname.label);
        }
    }, [festname])

    return (
        <>
            <div className="schedulecontainer">
                <div className="options">
                    <Autocomplete
                        value={festname}
                        getOptionLabel={(option) => option.label}
                        options={options}
                        onChange={(e, value) => { handleFestChange(e, value) }}
                        sx={{ width: '30%' }}
                        renderOption={(props, option) => (
                            <Box component="li" {...props} key={option.id}>
                                {option.label}
                            </Box>
                        )}
                        renderInput={(params) => <TextField {...params} variant="filled" label="Organsation" />}
                    />

                    <FormControlLabel
                        sx={{ color: 'white', paddingLeft: "5%", verticalAlign: 'middle' }}
                        control={
                            <Checkbox checked={checkValue} onChange={changeCheckValue} />
                        }
                        label="Registered Events"
                    />
                </div>

                <div className="displayevents" style={{ color: 'white' }}>

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
                                            </Typography>
                                            <Typography variant="body2">
                                                {event.type}
                                            </Typography>
                                            <Typography variant="body2">
                                                {/* {`${event.startdate.getDate()} ${mS[event.startdate.getMonth() - 1]} ${(event.startdate.getFullYear()) % 100}, ${event.startTime.getHours()}:${event.startTime.getMinutes()} - ${event.startdate.getDate()} ${mS[event.startdate.getMonth() - 1]} ${(event.startdate.getFullYear()) % 100}, ${event.endTime.getHours()}:${event.endTime.getMinutes()}`} */}
                                            </Typography>
                                            <Typography variant="body2" sx={{ color: 'green' }} >
                                                {(event.fee) ? event.fee : "FREE"}
                                            </Typography>
                                        </CardContent>
                                    </CardActionArea>

                                    <CardActions>
                                        <Button sx={{color: '#BB86FC' }}>  <DeleteOutlineIcon sx={{ color: '#BB86FC',pr:"2% "}} /> Delete</Button>
                                    </CardActions>

                                </Card>
                            </Grid>
                        ))}
                    </Grid>

                </div>
            </div>

        </>
    )
}

export default Scheduler




