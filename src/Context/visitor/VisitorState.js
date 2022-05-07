import {useState} from "react";
import visitorContext from './visitorContext';

const VisitorState = (props) =>{
    const host = "http://localhost:5000";
    const [update,setupdate] = useState(true);

    const fetchAllFests = async () => {
        const url = `${host}/api/fests/fetchallfest`;
        const response = await fetch(url, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            token: localStorage.getItem("token"),
          },
        });
        const allfests = await response.json();
        return allfests;
      };
    
    const fetchScheduledEvents = async () => {
        const url = `${host}/api/schedule/getSchedule`;
        const response = await fetch(url, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            token: localStorage.getItem("token"),
          },
        });
        const {contentjson,registeredEvents} = await response.json();
       
        // console.log('contentjson in context: ',contentjson)
        // console.log('registeredEvents: ',registeredEvents)
        return {contentjson,registeredEvents}
      };

    const addtoschedule = async (festname,eventid,register) =>{
      const festid = festname.split("-")[1];
      let url;
    
      if(!register)
      {
        url = `${host}/api/schedule/addToSchedule/${festid}/${eventid}`;
      }
      else
      { 
        url = `${host}/api/schedule/register-event/${festid}/${eventid}`;
      }

      const response = await fetch(url, {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
          'token': localStorage.getItem('token')
        },
      });
      const newfest = await response.json();
      console.log(newfest);
    
      setupdate(true);
    }

    const DeleteScheduledEvent = async (festid, eventid) => {
      console.log(festid,eventid)
      const url = `${host}/api/schedule/deleteFromSchedule/${festid}/${eventid}`;
      const response = await fetch(url, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          token: localStorage.getItem("token"),
        },
      });
      const deletedfest = await response.json();
      console.log(deletedfest);
      setupdate(true);
    }

    return (
        <visitorContext.Provider value={{fetchAllFests,fetchScheduledEvents,addtoschedule,DeleteScheduledEvent,update,setupdate }}>
          {props.children}
        </visitorContext.Provider>
      );
}

export default VisitorState;