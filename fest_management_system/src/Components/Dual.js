import React, { useState, useContext, useEffect } from 'react'
import eventContext from '../Context/event/eventContext'
import { useParams } from "react-router-dom";
import { Card, CardContent, Grid, Button, Typography, TextField } from '@mui/material';

const Dual = () => {
  const context = useContext(eventContext);
  const { FetchDual, NextMatch, NextRound, update, setupdate } = context;
  const [currentRound, setCurrentRound] = useState([]);
  const [player1, setplayer1] = useState({id:'' ,name:'' ,score:0});
  const [player2, setplayer2] = useState({id:'' ,name:'' ,score:0});
  const [Round, setRound] = useState(-1);
  const [matchno,setmatchno] = useState(-1);
  let { festname, eventid } = useParams();

  useEffect(() => {
    if (localStorage.getItem("token")) {
      FetchDual(festname, eventid).then((festdual) => {
        const copydual = JSON.parse(JSON.stringify(festdual));
        setCurrentRound(copydual);
        setmatchno(0);
        setRound(copydual.roundNo + 1)
      });
      return () => (setupdate(false));
    }
  }, []);

  useEffect(()=>{
    if(matchno >= 0) {

      setplayer1({id:currentRound.duals[matchno][0]._id, name: currentRound.duals[matchno][0].name, score:0});
      setplayer2({id:currentRound.duals[matchno][1]._id, name: currentRound.duals[matchno][1].name, score:0});
    }
  },[matchno])

  const onChangeP1 = (e) => {
    setplayer1({ ...player1, [e.target.name]: e.target.value });
  };

  const onChangeP2 = (e) => {
    setplayer2({ ...player2, [e.target.name]: e.target.value });
  };

  const nextMatch = () => {
    let jsonData = {
      comp1: player1.id,
      comp2: player2.id,
      score1: player1.score,
      score2: player2.score,
      round: Round
    };
    NextMatch(festname, eventid, jsonData)
    console.log('jsonData',jsonData)
    setmatchno(matchno + 1);
  }

  const nextRound = async() =>{ 
    const newround = await NextRound(festname,eventid);
    setCurrentRound(newround);
    setmatchno(0);
    setRound(newround.roundNo + 1)
  }

  return (
    <>
      <Grid container spacing={0} sx={{ marginTop: '10%', mx: '20%' }}>
        {player1 &&
          <Grid item xs={4}>
            <Card sx={{ maxWidth: 275, height: '100%' }}>
              <CardContent>
                <Typography variant="h6" >
                  {player1.name}
                </Typography>
                <TextField onChange={onChangeP1} value={player1.score} name="score" label="Score" margin="dense" variant="filled" />
              </CardContent>
            </Card>
          </Grid>
        }

        {player2 &&
          <Grid>
            <Card sx={{ maxWidth: 275, height: '100%' }}>
              <CardContent>
                <Typography variant="h6" >
                  {player2.name}
                </Typography>
                <TextField onChange={onChangeP2} value={player2.score} name="score" label="Score" margin="dense" variant="filled" />
              </CardContent>
            </Card>
          </Grid>
        }
      </Grid>

      {currentRound.duals &&
        <Button size="small" onClick={() => matchno === (currentRound.duals.length - 1) ? nextRound(): nextMatch()}>{matchno === (currentRound.duals.length - 1) ? "Next Round": "Next Match"}</Button>
      }
    </>
  )
}

export default Dual;