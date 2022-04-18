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
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import Fab from '@mui/material/Fab'; 
const host = 'http://localhost:5000'

function Solo() {

  let context = useContext(eventContext);
  let { FetchCompetitors, update, setupdate } = context;
  let [competitors, setCompetitors] = useState([]);
  let { festname, eventid } = useParams();
  let [ cardStyle, setCardStyle ] = useState({ maxWidth: 240, border: '2px solid black', filter: 'brightness(75%)' });
  let [selectedCandidates, setSelectedCandidates] = useState([]);
  let [disabled, setDisabled] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("token")) {
      FetchCompetitors(festname, eventid).then((comps) => {
        const copycompetitors = JSON.parse(JSON.stringify(comps));
        setCompetitors(copycompetitors.compList);
      });
      return () => (setupdate(false));
    }
  }, []);

  const breakName = (name) => {

    let index = name.indexOf(" ");
    let firstName = "";
    let lastName = "";

    if (index === -1) {
      firstName = name;
    } else {
      firstName = name.slice(0, index);
      lastName = name.slice(index + 1, name.length);
    }

    return { firstName, lastName };
  }

  const handleSelected = (e) => {
    // console.log('currentTarget: ',e.currentTarget.className)
    if (e.currentTarget.id.charAt(e.currentTarget.id.length-1) === '1') {
      console.log('vote')
      console.log('selected: ',selectedCandidates)
      const index = selectedCandidates.indexOf(e.currentTarget.id.slice(0,-1));
      
      if(index === -1) {
        let temp = selectedCandidates;
        temp.push(e.currentTarget.id.slice(0,-1));
        setSelectedCandidates(temp);
      }

      console.log('selected: ',selectedCandidates)

      // setCardStyle({ maxWidth: 260, height: 'auto', border: '6px solid green', filter: 'brightness(110%)' });
    } else {
      console.log('clear')
      const index = selectedCandidates.indexOf(e.currentTarget.id.slice(0,-1));
      if (index > -1) {
        selectedCandidates.splice(index, 1);
      }

      console.log('selected: ',selectedCandidates)

      // setCardStyle({ maxWidth: 240, height: 'auto', border: '2px solid black', filter: 'brightness(80%)' });
    }
  }

  const handleVoting = async() => {

    if(localStorage.getItem("voting")) {
      setDisabled(true);
      return ;
    }

    const festid = festname.split("-")[1];
    let url = `${host}/api/events/solo/${festid}/${eventid}/voting`;
    let jsonData = {selectedCandidates}

    const response = await fetch(url, { 
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
        token: localStorage.getItem("token"),
      },
      body: JSON.stringify(jsonData)
    });

    let votedList = await response.json();

    if(votedList.success === false) {
      console.log('error voting for too many candidates');
      return ;
    }

    localStorage.setItem('voting',true);

    console.log(votedList);
    return votedList;
  };

  // let handleFinish = () => {
  //   const festid = festname.split("-")[1];
  //   let url = `${host}/api/events/solo/${festid}/${eventid}/finish`;

  //   const response = await fetch(url, { 
  //     method: 'GET',
  //     headers: {
  //       "Content-Type": "application/json",
  //       token: localStorage.getItem("token"),
  //     }
  //   });

  //   let winners = await response.json();

  //   if(winners.success === false) {
  //     console.log('error voting for too many candidates');
  //     return ;
  //   }

  //   console.log(winners);
  //   return winners; 
  // }

  return (
    <>
      <Container maxWidth="lg">
        <Grid container rowSpacing={3} spacing={1} sx={{ position: 'relative' }}>
          {competitors.map((competitor) => (
            <Grid key={competitor._id} item xs={4}>
              <Card>
                {/* {console.log(competitor._id)} */}
              {/* sx={cardStyle} */}
                <div>
                  <Avatar sx={{ bgcolor: deepOrange[500] }} aria-label="recipe">
                    SA
                  </Avatar>
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                      {competitor.name.toUpperCase()}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {competitor.college}
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <IconButton aria-label="vote" sx={{color: 'green'}} id={competitor._id + '1'} onClick={handleSelected}>
                      <CheckIcon />
                    </IconButton>
                    <IconButton aria-label="clear" sx={{color: 'red'}} id={competitor._id + '2'} onClick={handleSelected}>
                      <ClearIcon />
                    </IconButton>
                  </CardActions>
                </div>
              </Card>
            </Grid>
          ))}
        </Grid>
        <div>
          <Button variant="contained" onClick={handleVoting} disabled={disabled}>Vote</Button>
        </div>
        <div>
          <Button variant="contained" >Finish</Button>
        </div>
        {/* onClick={() => navigate(`${host}/c/fest/${festname}/${eventid}/finish`)} */}
      </Container>
    </>
  )
}

export default Solo