import {React,useEffect,useState} from 'react';
import { Link} from "react-router-dom";

function MyFest() {
  const host = "http://localhost:5000"
  let [fests,setFests] = useState({});

  // const handleFests = (fest) => {
  //   let temp = fests;
  //   temp.push(fest);
  //   setFests(temp);
  // }

  const fetchFests = async()=> {
    const url = `${host}/api/fests/fetchfest`;
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        'token': localStorage.getItem('token')
      }
    });
    const userfests = await response.json();
    console.log(userfests);

    setFests(userfests);
  }

  useEffect(() => {
    if(localStorage.getItem('token'))
        fetchFests();

    //eslint-disable-next-line
  })

  

  return (
    <>
      {fests}
      {/* {fests.forEach(fest => {
          <ul>
              <li>
                {fest.title}
              </li>
              <li>
                {fest.organisation}
              </li>
              <li>
                {fest.desc}
              </li>
              <li>
                {fest.sdate}
              </li>
              <li>
                {fest.edate}
              </li>
              <li>
                {fest.venue}
              </li>
              <li>
                {fest.fee}
              </li>
          </ul>
      })} */}
    </>
  )
}

export default MyFest;