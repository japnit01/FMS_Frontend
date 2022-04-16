import React, { useEffect, useState, useContext } from 'react'
import eventContext from "../Context/event/eventContext"
import { useNavigate, useParams } from "react-router-dom";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import CheckIcon from '@mui/icons-material/Check';
import ClearIcon from '@mui/icons-material/Clear';
import IconButton from '@mui/material/IconButton';
import CardActions from '@mui/material/CardActions';
import Avatar from '@mui/material/Avatar';
import { deepOrange } from '@mui/material/colors';
 
function Solo() {

  let context = useContext(eventContext);
  let { FetchCompetitors, update, setupdate } = context;
  let [competitors, setCompetitors] = useState([]);
  let {festname, eventid} = useParams();
  let {cardStyle, setCardStyle} = useState({maxWidth: 240, border: '2px solid black', filter: 'brightness(75%)'});

  useEffect(() => {
    setupdate(true)
  }, []);

  useEffect(() => {
    if (localStorage.getItem("token")) {
        if (update) {
            FetchCompetitors(festname,eventid).then((comps) => {
                const copycompetitors = JSON.parse(JSON.stringify(comps));
                setCompetitors(copycompetitors.compList);

                // console.log(copycompetitors);
            });
            return () => (setupdate(false));
        }

    }
  }, [update, competitors]);

  const breakName = (name) => {

    let index = name.indexOf(" ");
    let firstName = "";
    let lastName = "";

    if(index === -1) {
      firstName = name;
    } else {
      firstName = name.slice(0,index);
      lastName = name.slice(index+1,name.length);
    }

    return {firstName,lastName};
  }

  const handleSelected = (e) => {
    if(e.target.id === "vote") {
      setCardStyle({maxWidth: 260, height: 'auto', border: '6px solid green', filter: 'brightness(110%)'});
    } else { 
      setCardStyle({maxWidth: 240, height: 'auto', border: '2px solid black', filter: 'brightness(80%)'});
    }
  }

  return (
    <>
      {console.log('competitors on frontend',competitors)}
      {competitors.map((competitor) => {
        <div>{competitor.name}</div>
        // console.log('competitor: ',competitor)
        // console.log('competitor name : ',competitor.name)
        let {firstName, lastName} =  breakName(competitor.name);

        <Card sx={ cardStyle }>
          <CardActionArea>
            {/* <CardMedia
              component="img"
              height="140"
              image={"https://ui-avatars.com/api/?name=" + firstName + (lastName !== "") ? "+" + lastName : ""}
              alt="green iguana"
            /> */}
            {/* <Avatar sx={{ bgcolor: deepOrange[500] }} variant="square">
              {firstName[0]}{(lastName !== "") ? lastName[0] : ""}
            </Avatar> */}
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                {competitor.name.toUpperCase()}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {competitor.college}
              </Typography>
            </CardContent>
            <CardActions disableSpacing>
                <IconButton aria-label="vote" id='vote' onClick={handleSelected}>
                  <CheckIcon />
                </IconButton>
                <IconButton aria-label="clear" id='clear' onClick={handleSelected}>
                  <ClearIcon />
                </IconButton>
            </CardActions>
          </CardActionArea>
        </Card>
      })}
    </>
  )
}

export default Solo