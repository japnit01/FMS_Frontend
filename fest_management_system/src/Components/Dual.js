import React, { useState, useContext, useEffect } from 'react'
import eventContext from '../Context/event/eventContext'
import { useParams } from "react-router-dom";
import {Card, CardContent, Grid, Button, Typography, TextField} from '@mui/material';

const Dual = () => {
  const context = useContext(eventContext);
  const { FetchDual, update, setupdate } = context;
  const [currentRound, setCurrentRound] = useState([]);
  const [player1, setplayer1] = useState([]);
  const [player2, setplayer2] = useState([]);
  let { festname, eventid } = useParams();

  useEffect(() => {
    if (localStorage.getItem("token")) {
      FetchDual(festname, eventid).then((festdual) => {
        const copydual = JSON.parse(JSON.stringify(festdual));
        setCurrentRound(copydual);
        copydual.duals[0][0].score = 0;
        copydual.duals[0][1].score = 0;
        setplayer1(copydual.duals[0][0])
        setplayer2(copydual.duals[0][1])
      });
      return () => (setupdate(false));
    }
  }, []);

  const onChangeP1 = (e) => {
		setplayer1({ ...player1, [e.target.name]: e.target.value });
    console.log(player1);
	};

  const onChangeP2 = (e) => {
		setplayer2({ ...player2, [e.target.name]: e.target.value });
    console.log(player2);
	};
  
  const nextMatch = () =>{

  }

  useEffect(() =>{ 
    console.log(player1,player2);
  })

  return (
    <>
          (<Grid container spacing={0} sx={{ marginTop: '10%', mx: '20%' }}>
          {player1.length != 0 &&
            <Grid item xs={4}>
              <Card sx={{ maxWidth: 275, height: '100%' }}>
                <CardContent>
                  <Typography variant="h6" >
                    {player1.name}
                  </Typography>
                  <TextField id="filled-basic" onChange={onChangeP1} value={player1.score} name="score" label="Score" margin="dense" variant="filled" />
                </CardContent>
              </Card>
            </Grid>
            }

            {player2.length !=0 && 
            <Grid>
              <Card sx={{ maxWidth: 275, height: '100%' }}>
                <CardContent>
                  <Typography variant="h6" >
                    {player2.name}
                  </Typography>
                  <TextField id="filled-basic" onChange={onChangeP2} value={player2.score} name="score" label="Score" margin="dense" variant="filled" />
                </CardContent>
              </Card>
            </Grid>
          }
          </Grid> 
          
        <Button size="small"> Next Match </Button>
    </>
  )
}

export default Dual;