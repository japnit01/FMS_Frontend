import React, { useState, useContext, useEffect } from 'react'
import eventContext from '../Context/event/eventContext'
import { useParams } from "react-router-dom";

export default function Results() {

    const context = useContext(eventContext);
    const { FinishEvent, update, setupdate} = context;
    let { festname, eventid, eventtype} = useParams();

    useEffect(() => {
        if (localStorage.getItem("token")) {
          setupdate(true)
          FinishEvent(festname, eventid, "duals").then((results) => {

          });
          return () => (setupdate(true));
        }
      }, []);


  return (
    <>

    </>
  )
}
