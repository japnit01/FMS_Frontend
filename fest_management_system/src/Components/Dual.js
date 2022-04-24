import React, { useState, useContext, useEffect } from 'react'
import eventContext from '../Context/event/eventContext'
import { useParams } from "react-router-dom";
import { Card, CardContent, Grid, Button, Typography, TextField } from '@mui/material';
import "../css/Dual.css"

const Dual = () => {
  const context = useContext(eventContext);
  const { FetchDual, NextMatch, NextRound, FinishEvent, update, setupdate } = context;
  const [currentRound, setCurrentRound] = useState([]);
  const [player1, setplayer1] = useState({id:'' ,name:'' ,score:0});
  const [player2, setplayer2] = useState({id:'' ,name:'' ,score:0});
  const [Round, setRound] = useState(-1);
  const [matchno,setmatchno] = useState(-1);
  const [totalrounds, settotalrounds] = useState(-1);
  let { festname, eventid } = useParams();

  useEffect(() => {
    if (localStorage.getItem("token")) {
      setupdate(true)
      FetchDual(festname, eventid).then((festdual) => {
        const copydual = JSON.parse(JSON.stringify(festdual));
        console.log(copydual.duals.length);
        totalRounds(copydual.participants);
        setCurrentRound(copydual);
        setmatchno(0);
        setRound(copydual.roundNo)
      });
      return () => (setupdate(true));
    }
  }, []);

  useEffect(()=>{
    if(update && matchno >= 0) {
      console.log("mene kaam kiya")
      setplayer1({id:currentRound.duals[matchno][0]._id, name: currentRound.duals[matchno][0].name, score:0});
      setplayer2({id:currentRound.duals[matchno][1]._id, name: currentRound.duals[matchno][1].name, score:0});
      console.log(totalrounds,currentRound.roundNo)
      setupdate(false)
    }
  },[matchno,update])

  const totalRounds = (participants) =>{
    settotalrounds(Math.floor(Math.log(participants)/Math.log(2)) + 1);
    // console.log({totalrounds: totalrounds})
  }
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
    setmatchno(matchno + 1);
  }

  const nextRound = async() =>{ 
    setupdate(false);
    let jsonData = {
      comp1: player1.id,
      comp2: player2.id,
      score1: player1.score,
      score2: player2.score,
      round: Round
    };
    const newround = await NextRound(festname,eventid,jsonData);
    setCurrentRound(newround);
    console.log("nextRound")
    setmatchno(0);
    setupdate(true)
    setRound(newround.roundNo)
  }

  const Finish = async() => {
    // alert("Khatam ho gaya bye bye");
    let jsonData = {
      comp1: player1.id,
      comp2: player2.id,
      score1: player1.score,
      score2: player2.score,
      round: Round
    };
    const newround = await FinishEvent(festname,eventid,jsonData);
    // setCurrentRound(newround);
    // const defaultind = 0;
    // console.log("nextRound")
    // setmatchno(matchno - matchno);
    // setRound(newround.roundNo)
    let winners = newround.winners;
    console.log(winners)
  }

  return (
    <>
    <div className="dualcontainer">
      <Typography variant="h3" sx={{color: 'white',pt:"10%", textAlign:'center', fontWeight:'bold'}}>Round {Round}</Typography>
      <Grid container spacing={0} sx={{pt:"4%" }}>
        {player1 && 
          <Grid item xs={6}>
            <Card sx={{ maxWidth: 275, height: '100%', mx:'auto' }}>
              <CardContent>
                <Typography variant="h6" sx={{textAlign:'center'}} >
                  {player1.name}
                </Typography>
                <TextField onChange={onChangeP1} value={player1.score} name="score" label="Score" margin="dense" sx={{px:'auto'}} variant="filled" />
              </CardContent>
            </Card>
          </Grid>
        }

        {player2 &&
          <Grid item xs={6}>
            <Card sx={{ maxWidth: 275, height: '100%',mx:'auto' }}>
              <CardContent>
                <Typography variant="h6"sx={{textAlign:'center'}}>
                  {player2.name}
                </Typography>
                <TextField onChange={onChangeP2} value={player2.score} name="score" label="Score" margin="dense" variant="filled" sx={{px:'auto'}}/>
              </CardContent>
            </Card>
          </Grid>
        }
      </Grid>
      <div className="dualbuttoncontainer">
      {currentRound.duals &&
        <Button size="small" sx={{mx:'auto'}} onClick={() => matchno === (currentRound.duals.length - 1) ? (totalrounds === currentRound.roundNo ? Finish() :nextRound()): nextMatch()}>{matchno === (currentRound.duals.length - 1) ? (totalrounds === currentRound.roundNo ? "Finish" :"Next Round"): "Next Match"}</Button>
      }
      </div>
      </div>
    </>
  )
}

export default Dual;