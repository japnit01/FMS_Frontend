import React, { useEffect, useState, useContext } from 'react'
import eventContext from "../Context/event/eventContext"
import { useNavigate, useParams, useLocation } from "react-router-dom";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import Button from '@mui/material/Button';
import "../css/Voting.css";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import Results from "./Results";

import { Pagination, Navigation } from "swiper";

const host = 'http://localhost:5000'


function Solo() {

  let context = useContext(eventContext);
  let { FetchCompetitors, FinishVoting, CheckResult } = context;
  let [competitors, setCompetitors] = useState([]);
  let { festname, eventid } = useParams();
  let [cardStyle, setCardStyle] = useState({ maxWidth: 240, border: '2px solid black', filter: 'brightness(75%)' });
  let [selectedCandidates, setSelectedCandidates] = useState([]);
  let [disabled, setDisabled] = useState(false);
  const [resultdeclared, setresultdeclared] = useState(true);
  const navigate = useNavigate();
  let location = useLocation();

  const typeofuser = location.pathname[1];


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
      {resultdeclared === true ?
        <Results /> :
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
                </SwiperSlide>)) : <>
                <div style={{ width: '70%', marginTop: '2%', marginLeft: '2%' }}>
                  <Typography variant="h6" sx={{ color: 'white' }}>
                    No Participants registered in this event till now
                  </Typography>
                </div>
              </>}

            </Swiper>
          </div>
          {typeofuser === 'c' &&
            <div className="solobuttoncontainer">
              <Button className="solobutton" onClick={() => FinishVoting(festname, eventid)}>Finish</Button>
            </div>
          }
        </div>

      }
    </>
  )
}

export default Solo