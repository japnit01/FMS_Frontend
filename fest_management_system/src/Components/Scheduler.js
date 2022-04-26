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
                    // console.log('scheduledevents: ', scheduledevents)
                    // const { event, fest } = JSON.parse(JSON.stringify(scheduledevents[0]));
                    setschedule(scheduledevents);

                    let filters = [];
                    schedule.map(({ fest, event }) => {
                        filters.push({value: fest.name, label: fest.name });
                    });
                    // console.log(filters)
                    setOptions(filters);

                    // console.log('events: ',event);
                    // console.log('schedule: ', schedule)
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
        console.log(e.value)
    }

    useEffect(() => {
        let allevents = [];
    schedule.map(({fest,event}) => {
        // allevents.push({fest,event})
        event.forEach((ev) => {
            ev.organization = fest.organization
        })

        allevents = allevents.concat(event);
    })
    console.log(allevents)
    setCurrentEvents(allevents)
    },[])

    useEffect(() => {
        schedule.map(({fest,event}) => {
            event.forEach((ev) => {
                ev.organization = fest.organization
            })

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

                <div className="displayevents">
                <Grid container rowSpacing={3} spacing={1} sx={{ backgroundColor: 'white', position: 'relative' }}>
                {currentEvents.map((currentevent) => {
                        console.log(currentevent);
                        <Typography sx={{color: 'white'}}>
                            {JSON.stringify(currentevent)}
                        </Typography>
                        
                        // <Card sx={{ minWidth: 275, backgroundColor: 'white' }}>
                        //     <CardContent>
                        //         <Typography sx={{ fontSize: 14 }} color="text.primary" gutterBottom>
                        //             {/* {currentevent.name} */} hello
                        //         </Typography>
                        //     </CardContent>
                        //     {/* <CardActions>
                        //         <Button size="small">Learn More</Button>
                        //     </CardActions> */}
                        // </Card>
                    //     <Grid key={currentevent._id} item xs={4}>
                    //     <Card id="eventcard" sx={{ maxWidth: 345 }} >
                    //         <CardActionArea className="eventcardcontent">
                    //             <CardContent>
                    //                 <Typography gutterBottom variant="h5">
                    //                     {currentevent.name}
                    //                 </Typography>
                    //                 <Typography variant="body2">
                    //                     {fest.organisation}
                    //                 </Typography>
                    //                 {/* <Typography variant="body2">
                    //                     {`${event.startdate.getDate()} ${mS[event.startdate.getMonth() - 1]} ${(event.startdate.getFullYear()) % 100}, ${event.startTime.getHours()}:${event.startTime.getMinutes()} - ${event.startdate.getDate()} ${mS[event.startdate.getMonth() - 1]} ${(event.startdate.getFullYear()) % 100}, ${event.endTime.getHours()}:${event.endTime.getMinutes()}`}
                    //                 </Typography> */}
                    //                 <Typography variant="body2" sx={{color: 'green'}} >
                    //                     {(currentevent.fee) ? currentevent.fee : "FREE"}
                    //                 </Typography>
                    //             </CardContent>
                    //         </CardActionArea>

                    //         <CardActions>
                    //             {typeofuser === 'c' &&
                    //                 (
                    //                     <>
                    //                         <Button sx={{ color: '#BB86FC' }} onClick={() => DeleteScheduledEvent(festname, currentevent._id)} size="small">
                    //                             Delete
                    //                         </Button>
                    //                     </>
                    //                 )}

                    //             {typeofuser === 'u' &&
                    //                 (
                    //                     <>
                    //                         <Button onClick={() => addtoschedule(festname, currentevent._id, false)} size="small">
                    //                             Schedule
                    //                         </Button>
                    //                         <Button onClick={() => addtoschedule(festname, currentevent._id, true)} size="small">
                    //                             Unregister
                    //                         </Button>
                    //                     </>
                    //                 )}
                    //         </CardActions>
                    //     </Card>
                    // </Grid>
                })}
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