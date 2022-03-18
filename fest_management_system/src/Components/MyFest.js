import {React,useState} from 'react';
// import AddFest from './Components/AddFest';
import { Link} from "react-router-dom";

function MyFest() {

  let [fests,setFests] = useState([]);

  const handleFests = (fest) => {
    let temp = fests;
    temp.push(fest);
    setFests(temp);
  }

  const fetchFests = async()=> {                          
  
    let url = '/api/fests/fetchfests'
  //   $.ajax({
  //     url: '/api/fests/fetchfests',
  //     method: 'GET',
  //     success: (response) => {
  //       console.log(response);
  //       setFests(response)
  //     }
  //   })

    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      },
      // body: JSON.stringify(jsonData)
    });
    const newfest = await response.json();
    setFests(newfest);
  }

  return (
    <>
      {/* <AddFest handleFests={handleFests}/> */}

      {fests.forEach(fest => {
        <Link to="/api/competitions/6234851442854e82f4eb1c2b/getCompetitions">
          <ul>
              <li>
              {/* :"",desc:"",sdate:"",edate:"",venue:"",fee:"" */}
                {fest.title}
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
       </Link>
      })}
    </>
  )
}

export default MyFest;