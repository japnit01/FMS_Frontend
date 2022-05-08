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
import "../css/Voting.css";
import CardHeader from '@mui/material/CardHeader';
import Collapse from '@mui/material/Collapse';
import { red } from '@mui/material/colors';
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Pagination, Navigation } from "swiper";

const host = 'https://fest-manage-api.herokuapp.com'


function Solo() {

  let context = useContext(eventContext);
  let { FetchCompetitors, FinishVoting,CheckResult, update, setupdate } = context;
  let [competitors, setCompetitors] = useState([]);
  let { festname, eventid } = useParams();
  let [cardStyle, setCardStyle] = useState({ maxWidth: 240, border: '2px solid black', filter: 'brightness(75%)' });
  let [selectedCandidates, setSelectedCandidates] = useState([]);
  let [disabled, setDisabled] = useState(false);
  const [resultdeclared, setresultdeclared] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("token")) {
      CheckResult(festname, eventid).then((declared) => {
        console.log(declared)
        setresultdeclared(declared)
        if (declared === false) {
          FetchCompetitors(festname, eventid).then((comps) => {
            const copycompetitors = JSON.parse(JSON.stringify(comps));
            setCompetitors(copycompetitors.compList);
            console.log(copycompetitors)
          });
        } else {
          navigate(`/c/fest/${festname}/solo/${eventid}/result`);
        }
      });
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
    if (e.currentTarget.id.charAt(e.currentTarget.id.length - 1) === '1') {
      console.log('vote')
      console.log('selected: ', selectedCandidates)
      const index = selectedCandidates.indexOf(e.currentTarget.id.slice(0, -1));

      if (index === -1) {
        let temp = selectedCandidates;
        temp.push(e.currentTarget.id.slice(0, -1));
        setSelectedCandidates(temp);
      }

      console.log('selected: ', selectedCandidates)
    } else {
      console.log('clear')
      const index = selectedCandidates.indexOf(e.currentTarget.id.slice(0, -1));
      if (index > -1) {
        selectedCandidates.splice(index, 1);
      }

      console.log('selected: ', selectedCandidates)

    }
  }

  const handleVoting = async (compid) => {

    if (localStorage.getItem("voting")) {
      setDisabled(true);
      return;
    }

    const festid = festname.split("-")[1];
    let url = `${host}/api/events/solo/${festid}/${eventid}/voting`;
    let jsonData = { selectedCandidates: [compid] }

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
        token: localStorage.getItem("token"),
      },
      body: JSON.stringify(jsonData)
    });

    let votedList = await response.json();

    if (votedList.success === false) {
      console.log('error voting for too many candidates');
      return;
    }

    localStorage.setItem('voting', true);

    console.log(votedList);
    return votedList;
  };

  return (
    <>
      <div className="maincontainer">
        <div className="carouselcontainer">
          <Swiper
            slidesPerView={3}
            spaceBetween={3}
            slidesPerGroup={3}
            loop={true}
            loopFillGroupWithBlank={true}
            pagination={{
              clickable: true,
            }}
            navigation={true}
            modules={[Pagination, Navigation]}
            className="mySwiper"
          >
            {(competitors.length !== 0) ? competitors.map((competitor, index) => (
              <SwiperSlide key={competitor._id}>
                <Card className="card">
                  <CardActionArea onClick={() => handleVoting(competitor._id)}>
                    <CardMedia
                      className="image"
                      component="img"
                      image={index % 2 === 0 ? "/profile/img1.jpg" : "/profile/img2.jpg"}
                    />

                    <CardContent className="card-content">
                      <div className="name-profession">{competitor.name.toUpperCase()}</div>
                      <div className="profession">{competitor.college}</div>
                    </CardContent>
                  </CardActionArea>
                </Card>
              </SwiperSlide>
            )) : <>
              <div style={{ width: '70%', marginTop: '4%', marginLeft: '6%' }}>
                <Typography variant="h6" sx={{ color: '#fafafa' }}>
                  No Participants registered in this event till now
                </Typography>
              </div>
            </>}
          </Swiper>
        </div>
        <Button sx={{ color: 'white' }} onClick={() => FinishVoting(festname, eventid)}>Finish</Button>
      </div>
    </>
  )
}

export default Solo