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

function Solo() {

  let context = useContext(eventContext);
  let { FetchCompetitors, update, setupdate } = context;
  let [competitors, setCompetitors] = useState([]);
  let { festname, eventid } = useParams();
  let { cardStyle, setCardStyle } = useState({ maxWidth: 240, border: '2px solid black', filter: 'brightness(75%)' });

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
    if (e.target.id === "vote") {
      setCardStyle({ maxWidth: 260, height: 'auto', border: '6px solid green', filter: 'brightness(110%)' });
    } else {
      setCardStyle({ maxWidth: 240, height: 'auto', border: '2px solid black', filter: 'brightness(80%)' });
    }
  }

  return (
    <>
      <Grid container rowSpacing={3} spacing={1} sx={{ position: 'relative' }}>
        {competitors.map((competitor) => (
          <Grid key={competitor._id} item xs={4}>
            <Card sx={cardStyle}>
              <CardActionArea>
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    {competitor.name.toUpperCase()}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {competitor.college}
                  </Typography>
                </CardContent>
                <CardActions>
                  <IconButton aria-label="vote" id='vote' onClick={handleSelected}>
                    <CheckIcon />
                  </IconButton>
                  <IconButton aria-label="clear" id='clear' onClick={handleSelected}>
                    <ClearIcon />
                  </IconButton>
                </CardActions>
              </CardActionArea>
            </Card>
          </Grid>
        ))}
      </Grid>
    </>
  )
}

export default Solo