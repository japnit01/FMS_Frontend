import {useState} from "react";
import eventContext from "./eventContext";

const EventState = (props) => {
  const host = "http://localhost:5000";
  const [update,setupdate] = useState(true);

  const CreateEvent = async (jsonData,festname) => {
    const festid = festname.split("-")[1];

    const url = `${host}/api/events/${festid}/add-event`;
    const response = await fetch(url, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
        'token': localStorage.getItem('token')
      },
      body: JSON.stringify(jsonData),
    });
    const newfest = await response.json();
    console.log(newfest);
    setupdate(true);
  };

  const FetchEvents = async (festname) => {
    const festid = festname.split("-")[1];

    const url = `${host}/api/events/${festid}/fetchevents`;
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        token: localStorage.getItem("token"),
      },
    });
    const allevents = await response.json();
    console.log(allevents)
    return allevents;
  };

  const UpdateEvent = async (festname,eventid,jsonData) => {
    const festid = festname.split("-")[1];
    const url = `${host}/api/events/${festid}/update-event/${eventid}`;
    const response = await fetch(url, {
      method: "PUT",
      headers: {
        'Content-Type': 'application/json',
        'token': localStorage.getItem('token')
      },
      body: JSON.stringify(jsonData),
    });
    const updatedfest = await response.json();
    console.log(updatedfest);
    setupdate(true);
  };

  const DeleteEvent = async (festname,eventid) => {
    const festid = festname.split("-")[1];
    const url = `${host}/api/events/${festid}/delete-event/${eventid}`;
    
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
    <eventContext.Provider value={{ CreateEvent, FetchEvents, UpdateEvent, DeleteEvent,update,setupdate }}>
      {props.children}
    </eventContext.Provider>
  );
};

export default EventState;