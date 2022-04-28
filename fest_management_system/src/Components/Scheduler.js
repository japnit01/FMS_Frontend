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
    const [options, setOptions] = useState({ value: '', label: '' });
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
                        console.log('fest: ',fest)
                        console.log('event: ',event)
                        filters.push({value: fest.name, label: fest.name });
                    });
                    // console.log('schedule in useefect: ',schedule)
                    filters = JSON.parse(JSON.stringify(filters))
                    // console.log('filters: ',filters)
                    setOptions(filters);

                    let allevents = [];
                    // console.log('schedule: ',schedule)
                    schedule.map(({fest,event}) => {
                        // allevents.push({fest,event})
                        event.forEach((ev) => {
                            ev.organization = fest.organization
                        })

                        console.log('event: ',event)

                        allevents = allevents.concat(event);
                        // console.log(allevents)
                    })

                    let allevents1 = JSON.parse(JSON.stringify(allevents))
                    console.log(allevents)
                    setCurrentEvents(allevents1) 

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

    // useEffect(() => {
        
    // },[])

    useEffect(() => {
        schedule.map(({fest,event}) => {

            if(fest.name === festname) {
                event.forEach((ev) => 
                    ev.organisation = fest.organisation
                )
                console.log(fest.organisation)
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

                <div className="displayevents" style={{ color: 'white' }}>
                {/* <Grid container rowSpacing={3} spacing={1} sx={{ backgroundColor: 'white', position: 'relative' }}>
                {currentEvents.map((currentevent) => {
                        console.log(currentevent);
                        <Typography sx={{color: 'white'}}>
                            {JSON.stringify(currentevent)}
                        </Typography> */}
{/*                         
                       
                })}
            </Grid> */}
            {/* {console.log('currentEvents: ',currentEvents)} */}
                    {/* {console.log(currentEvents)} */}
                    {JSON.stringify(currentEvents)}

                </div>

            {/* {typeofuser === 'c' &&
                <Button variant="contained" onClick={() => navigate(`/c/fest/${festname}/createevent`)}>Add Event</Button>
            } */}
           
            </div>

        </>
    )
}

export default Scheduler