import React, { useEffect, useState, useContext } from 'react'
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { CardActionArea } from '@mui/material';
import { useNavigate, Link } from "react-router-dom";
import visitorContext from "../Context/visitor/visitorContext"
import Grid from '@mui/material/Grid';
import '../css/Scheduler.css'

function Visitor() {
    const context = useContext(visitorContext);
    const { fetchAllFests, update, setupdate } = context;
    const [fests, setFests] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        setupdate(true)
    }, []);

    useEffect(() => {
        if (localStorage.getItem("token")) {
            if (update) {
                fetchAllFests().then((allfests) => {
                    const copyallfests = JSON.parse(JSON.stringify(allfests));
                    setFests(copyallfests);
                });
                return () => (setupdate(false));
            }

        }
    }, [update, fests]);

    return (
        <>
            <div className="myfest">
                <Grid container rowSpacing={3} spacing={1} sx={{ position: 'relative',paddingTop:"4%",paddingBottom:"5%" }}>
                    {fests.map((fest) => (
                        <Grid key={fest._id} item xs={4}>
                        <Card id="festcard" sx={{ maxWidth: 345 }} >
                            <CardActionArea className="festcardcontent" onClick={() => navigate(`/u/fest/${fest.name}-${fest._id}`)}>
                                <CardContent>
                                    <Typography variant="h5">
                                        {fest.name}
                                    </Typography>
                                    <Typography variant="body2">
                                        {fest.organisation}
                                    </Typography>
                                    <Typography variant="body2">
                                        {fest.description}
                                    </Typography>
                                    <Typography variant="body2">
                                        {fest.startdate}
                                    </Typography>
                                    <Typography variant="body2">
                                        {fest.enddate}
                                    </Typography>
                                    <Typography variant="body2">
                                        {fest.state}
                                    </Typography>
                                    <Typography variant="body2">
                                        {fest.city}
                                    </Typography>
                                </CardContent>
                            </CardActionArea>
                        </Card>
                        </Grid>
                    ))}
                    </Grid>
                    </div>
                </>
                )
}

                export default Visitor