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
    return userfests
  }

  useEffect(() => {
    console.log("here")
    if(localStorage.getItem('token'))
    {
          let mounted = true;
          fetchFests()
            .then(userfests => {
            if(mounted) {
              const copyfests = JSON.parse(JSON.stringify(userfests));
              console.log(copyfests)
              setFests(copyfests);
            }
          })
        return () => mounted = false;
    }
  },[])

  return (
    <>
      {fests.map((fest) => {
        return(
          <ul key={fest._id}>
          <li>
            {fest.name}
          </li>
          <li>
            {fest.organisation}
          </li>
          {/* <li>
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
          </li> */}
      </ul>
        )
      })}
    </>
  )
}

export default MyFest;