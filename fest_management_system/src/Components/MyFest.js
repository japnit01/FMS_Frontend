import {React,useEffect,useState} from 'react';

function MyFest() {
  const host = "http://localhost:5000"
  let [fests,setFests] = useState([]);

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
    // console.log(userfests);
    const copyfests = JSON.parse(JSON.stringify(userfests));
    console.log(fests)
    setFests(copyfests)
      console.log(fests)
  }

  useEffect(() => {
    if(localStorage.getItem('token'))
        fetchFests();

    //eslint-disable-next-line
  },[fests])

  

  return (
    <>
      {/* {fests} */}
      {fests.forEach(fest => {
          <ul>
              <li>
                {fest.name}
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

export default MyFest;