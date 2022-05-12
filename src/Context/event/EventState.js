import { useState } from "react";
import eventContext from "./eventContext";

const EventState = (props) => {
  const host = "http://localhost:5000";
  const [update, setupdate] = useState(true);
  const [event, setEvent] = useState({
    id: "",
    name: "",
    type: "",
    startdate: "",
    startTime: "",
    endTime: "",
    description: "",
    venue: "",
    fee: ""
  });

  const CreateEvent = async (jsonData, festname) => {
    const festid = festname.split("-")[1];

    const url = `${host}/api/events/${festid}/add-event`;
    await fetch(url, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
        'token': localStorage.getItem('token')
      },
      body: JSON.stringify(jsonData),
    });
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
    return allevents;
  };

  const UpdateEvent = async (festname, eventid, jsonData) => {
    const festid = festname.split("-")[1];
    const url = `${host}/api/events/${festid}/update-event/${eventid}`;
    await fetch(url, {
      method: "PUT",
      headers: {
        'Content-Type': 'application/json',
        'token': localStorage.getItem('token')
      },
      body: JSON.stringify(jsonData),
    });
    // const updatedfest = await response.json();
    setupdate(true);
  };

  const DeleteEvent = async (festname, eventid) => {
    const festid = festname.split("-")[1];
    const url = `${host}/api/events/${festid}/delete-event/${eventid}`;
    await fetch(url, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        token: localStorage.getItem("token"),
      },
    });

    setupdate(true);
  }

  const FetchDual = async (festname, eventid) => {
    const festid = festname.split("-")[1];
    const url = `${host}/api/events/duals/${festid}/${eventid}/event-status`;
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        token: localStorage.getItem("token"),
      },
    });
    let userduals = await response.json();
    return userduals;
  };

  const NextMatch = async (festname, eventid, jsonData) => {
    const festid = festname.split("-")[1];
    const url = `${host}/api/events/duals/${festid}/${eventid}/nextMatch`;
    await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        token: localStorage.getItem("token"),
      },
      body: JSON.stringify(jsonData),
    });
  };

  const NextRound = async (festname, eventid,jsonData) => {
    const festid = festname.split("-")[1];
    const url = `${host}/api/events/duals/${festid}/${eventid}/nextRound`;
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        token: localStorage.getItem("token"),
      },
      body: JSON.stringify(jsonData),
    });
    let userduals = await response.json();
    return userduals;
    
  };

  const FetchCompetitors = async (festname, eventid) => {
    const festid = festname.split("-")[1];
    const url = `${host}/api/events/solo/${festid}/${eventid}/event-status`;
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        token: localStorage.getItem("token"),
      },
    });
    const allcompetitors = await response.json();
    return allcompetitors;
  };

  const FinishDualsEvent = async (festname,eventid, jsonData) => {
    const festid = festname.split("-")[1];
    const url = `${host}/api/events/duals/${festid}/${eventid}/finish`;
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        token: localStorage.getItem("token"),
      },
      body: JSON.stringify(jsonData)
    });
    const currentRoundWinner = await response.json();
    console.log(currentRoundWinner)
    
  }

  const FinishEvent = async(festname,eventid) => {
    const festid = festname.split("-")[1];
    const url = `${host}/api/events/results/${festid}/${eventid}`;
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        token: localStorage.getItem("token"),
      },
    });
    const winners = await response.json();
    console.log(winners)
    return winners;
  }

  const FinishVoting = async(festname,eventid) => {
    const festid = festname.split("-")[1];    
    const url = `${host}/api/events/solovoting/${festid}/${eventid}/finish`;
    await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        token: localStorage.getItem("token"),
      },
    });
    window.location.reload();
  }

  const CheckResult = async(festname,eventid) => {
    const festid = festname.split("-")[1];
    const url = `${host}/api/events/results/${festid}/${eventid}/checkstatus`;
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        token: localStorage.getItem("token"),
      },
    });

    const validate = await response.json();
    console.log(validate);
    return validate.declared
  }

  return (
    <eventContext.Provider value={{ event,setEvent,CreateEvent, FetchEvents, UpdateEvent, FinishEvent, FinishDualsEvent,FinishVoting, CheckResult,DeleteEvent, FetchDual, NextMatch, NextRound, FetchCompetitors, update, setupdate }}>
      {props.children}
    </eventContext.Provider>
  );
};

export default EventState;