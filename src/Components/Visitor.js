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
import CardMedia from '@mui/material/CardMedia';


function Visitor() {
    const context = useContext(visitorContext);
    const { fetchAllFests, update, setupdate } = context;
    const [fests, setFests] = useState([]);
    const navigate = useNavigate();

    var mL = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    var mS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'];

    useEffect(() => {
        setupdate(true)
    }, []);

    useEffect(() => {
        if (localStorage.getItem("token")) {
            if (update) {
                fetchAllFests().then((allfests) => {
                    const copyallfests = JSON.parse(JSON.stringify(allfests));
                    copyallfests.map((fest) => {
                        fest.startdate = new Date(fest.startdate);
                        fest.enddate = new Date(fest.enddate);
                    })
                    setFests(copyallfests);
                });
                return () => (setupdate(false));
            }

        }
    }, [update, fests]);

    return (
        <>
            <div className="myfest">
                <Grid container rowSpacing={3} spacing={1} sx={{ position: 'relative', paddingTop: "4%", paddingBottom: "5%" }}>
                    {fests.map((fest) => (
                        <Grid key={fest._id} item xs={4}>
                            <Card id="festcard" sx={{ maxWidth: 345 }} >
                                <CardMedia
                                    className="festcardmedia"
                                    component="img"
                                    height="100%"
                                    image="/festprofile/1.jpg"
                                    alt="green iguana"
                                />
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
                                            {`${fest.startdate.getDate()} ${mS[fest.startdate.getMonth() - 1]} ${(fest.startdate.getFullYear()) % 100} - ${fest.enddate.getDate()} ${mS[fest.enddate.getMonth() - 1]} ${(fest.enddate.getFullYear()) % 100}`}
                                        </Typography>
                                        <Typography variant="body2">
                                            {`${fest.state},${fest.city}`}
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