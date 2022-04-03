import React,{ useEffect, useState, useContext} from 'react'
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { CardActionArea } from '@mui/material';
import { useNavigate } from "react-router-dom";
import visitorContext from "../Context/visitor/visitorContext"

function Visitor() {
    const context = useContext(visitorContext);
    const {fetchAllFests,update, setupdate } = context;
    const [fests, setFests] = useState([]);
    const navigate = useNavigate();

    useEffect(()=>{
        setupdate(true)
      },[]);

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
            <Button onClick={()=>navigate('/u/schedule')} size="small"> Schedule </Button>
            {fests.map((fest) => (
                <Card key={fest._id} sx={{ maxWidth: 345 }} >
                    <CardActionArea  onClick={() => navigate(`/u/fest/${fest.name}-${fest._id}`)}>
                        <CardContent>
                            <Typography gutterBottom variant="h5" component="div">
                                {fest.name}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                Organised By:- {fest.organisation}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                {fest.description}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                {fest.startdate}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                {fest.enddate}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                {fest.state}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                {fest.city}
                            </Typography>
                        </CardContent>
                    </CardActionArea>
                </Card>
            ))}

        </>
    )
}

export default Visitor