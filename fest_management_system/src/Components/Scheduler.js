import React, { useEffect, useState, useContext } from 'react'
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography"
import { CardActionArea } from '@mui/material';
import visitorContext from "../Context/visitor/visitorContext"
import { useNavigate } from "react-router-dom";
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Select from 'react-select'
import '../css/Scheduler.css'
import { Autocomplete, TextField } from '@mui/material';

function Scheduler() {
    const context = useContext(visitorContext);
    const { fetchScheduledEvents, DeleteScheduledEvent, update, setupdate } = context;
    const navigate = useNavigate();
    const [schedule, setschedule] = useState([]);
    const [options, setOptions] = useState({label: '' });

    useEffect(() => {
        setupdate(true)
    }, []);

    useEffect(() => {
        if (localStorage.getItem("token")) {
            if (update) {
                fetchScheduledEvents().then((scheduledevents) => {
                    const {copyfests,copyevents} = JSON.parse(JSON.stringify(scheduledevents));
                    setschedule(copyevents);
        
                    // let filters = [];
                    // schedule.map(({ fest, searchedevents }) => {
                    //     filters.push({label: fest.name });
                    // });
                    // console.log(filters)
                    // setOptions(filters);

                    console.log(copyevents);
                });
                return () => (setupdate(false));
            }

        }
    }, [update, schedule]);

    useEffect(()=>{
        // console.log(options)
    })
    const [value, setValue] = useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <>
            <div className="schedulecontainer">
            <div className="search">
                {schedule.map((record,index)=>
                    // <Typography sx={{color:'white'}}>{record.fest[0].name}</Typography>,
                    record.events.map((event,index) =>{
                        <Typography sx={{color:'white'}}>{event.name}</Typography>
                    })
                )}
            </div>

                    {/* <Autocomplete
                        disablePortal
                        id="combo-box-demo"
                        options={options}
                        sx={{ width: 300 }}
                        renderInput={(params) => <TextField {...params} label="Fest" />}
                    /> */}
                


            </div>
        </>
    )
}

export default Scheduler