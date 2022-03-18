import {React,useState} from 'react';
import AddFest from './Components/AddFest';
// import $ from 'jquery';

function MyFest() {

  let [fests,setFests] = useState([]);

  const handleFests = () => {

  }

  const fetchFests = ()=> {                          
    
    $.ajax({
      url: '/api/fests/fetchfests',
      method: 'GET',
      success: (response) => {
        console.log(response);
        setFests(response)
      }
    })
  }

  return (
    <>
      <AddFest />

      {fests.forEach(fest => {
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
      })}
    </>
  )
}

export default MyFest