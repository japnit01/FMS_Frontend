import React, {useState, useContext, useEffect} from 'react'
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import duelContext from '../Context/duel/duelContext'
import { useNavigate } from "react-router-dom";
import { styled } from '@mui/material/styles';

const Duels = () => {

    const [currentRound, setCurrentRound] = useState([]);
    const context = useContext(duelContext);
    const { FetchDuel, update, setupdate } = context;
    const navigate = useNavigate();

    useEffect(() => {
        if (localStorage.getItem("token")) {
          if (update) {
            FetchDuel().then((festduel) => {
              const copyduel = JSON.parse(JSON.stringify(festduel));
              setCurrentRound(copyduel);
            });
            return () => (setupdate(false));
          }
    
        }
      }, [update, currentRound]);

    const Item = styled(Paper)(({ theme }) => ({
      backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
      ...theme.typography.body2,
      padding: theme.spacing(1),
      textAlign: 'center',
      color: theme.palette.text.secondary,
    }));

  return (
    <>
       <Box sx={{ flexGrow: 1 }}>
          {currentRound.duels.map(duel=> {
            <Grid container spacing={4}>
            <Grid item xs={5}>
              <Item>{duel[0]}</Item>
            </Grid>
            <Grid item xs={2}>
              <Item>{"vs"}</Item>
            </Grid>
            <Grid item xs={5}>
              <Item>{duel[1]}</Item>
            </Grid>
          </Grid>
          })}
      </Box>
    </>
  )
}

export default Duels