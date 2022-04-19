import { useState } from "react";
import eventContext from "./eventContext";
import { useNavigate } from 'react-router-dom'

const EventState = (props) => {
  const host = "http://localhost:5000";
  const [update, setupdate] = useState(true);

  const CreateEvent = async (jsonData, festname) => {
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

  const UpdateEvent = async (festname, eventid, jsonData) => {
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
    setupdate(true);
  };

  const DeleteEvent = async (festname, eventid) => {
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
    console.log(userduals);
    return userduals;
  };

  const NextMatch = async (festname, eventid,jsonData) => {
    const festid = festname.split("-")[1];
    // const navigate = useNavigate();

    const url = `${host}/api/events/duals/${festid}/${eventid}/nextMatch`;
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        token: localStorage.getItem("token"),
      },
      body: JSON.stringify(jsonData),
    });
    let match = await response.json();
    console.log(match);

    // let redirectUrl = `${host}/api/events/duals/${festid}/${eventid}/event-status`;
    // navigate(redirectUrl)
  };

  const NextRound = async (festname, eventid) => {
    const festid = festname.split("-")[1];
    const url = `${host}/api/events/duals/${festid}/${eventid}/nextRound`;
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        token: localStorage.getItem("token"),
      },
    });
    let userduals = await response.json();
    console.log(userduals);
    return userduals;
  };

  const FetchCompetitors = async(festname, eventid) => {
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

  return (
    <eventContext.Provider value={{ CreateEvent, FetchEvents, UpdateEvent, DeleteEvent, FetchDual, NextMatch, NextRound, FetchCompetitors, update, setupdate }}>
      {props.children}
    </eventContext.Provider>
  );
};

export default EventState;