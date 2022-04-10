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


function Scheduler() {
    const context = useContext(visitorContext);
    const { fetchScheduledEvents, DeleteScheduledEvent, update, setupdate } = context;
    const navigate = useNavigate();
    const [schedule, setschedule] = useState([]);

    useEffect(() => {
        setupdate(true)
    }, []);

    useEffect(() => {
        if (localStorage.getItem("token")) {
            if (update) {
                fetchScheduledEvents().then((scheduledevents) => {
                    const copyevents = JSON.parse(JSON.stringify(scheduledevents));
                    setschedule(copyevents);
                    console.log(copyevents);
                });
                return () => (setupdate(false));
            }

        }
    }, [update, schedule]);

    const [value, setValue] = useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <>       
            {schedule.map((fest,searchedevents)=>(
                <div>{fest}</div>
            ))}
        </>
    ) 
}

export default Scheduler