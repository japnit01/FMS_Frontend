import React, { useState, useContext, useEffect } from 'react'
import Grid from '@mui/material/Grid';
import eventContext from '../Context/event/eventContext'
import { useParams } from "react-router-dom";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';


const Dual = () => {
  const context = useContext(eventContext);
  const { FetchDual, update, setupdate } = context;
  const [currentRound, setCurrentRound] = useState([]);
  let { festname, eventid } = useParams();

  useEffect(() => {
    if (localStorage.getItem("token")) {
      FetchDual(festname, eventid).then((festdual) => {
        const copydual = JSON.parse(JSON.stringify(festdual));
        setCurrentRound(copydual);
      });
      return () => (setupdate(false));
    }
  }, []);

  useEffect(() => {
    console.log(currentRound)
  })

  return (
    <>
      {currentRound.duals && currentRound.duals.map((dual,index) => (
        <>
          <Grid key={index} container spacing={0} sx={{ marginTop: '10%', mx: '20%' }}>
            <Grid item xs={4}>
              <Card sx={{ maxWidth: 275, height: '100%' }}>
                <CardContent>
                  <Typography variant="h6" >
                    {dual[0].name}
                  </Typography>
                  <TextField id="filled-basic" label="Score" margin="dense" variant="filled" />
                </CardContent>
              </Card>
            </Grid>

            <Grid>
              <Card sx={{ maxWidth: 275, height: '100%' }}>
                <CardContent>
                  <Typography variant="h6" >
                    {dual[1].name}
                  </Typography>
                  <TextField id="filled-basic" label="Score" margin="dense" variant="filled" />

                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </>
      ))}

      {/* <Button size="small"> Next Match </Button> */}
    </>
  )
}

export default Dual;