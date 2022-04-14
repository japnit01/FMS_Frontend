import React, { useEffect, useState, useContext } from 'react'
import votingContext from "../Context/voting/votingContext"
import { useNavigate } from "react-router-dom";

function Voting() {

  const context = useContext(votingContext);
  const navigate = useNavigate();
  let [competitors, setCompetitors] = useState([]);
  const { FetchCompetitors , update, setupdate } = context;

  useEffect(() => {
    setupdate(true)
  }, []);

  useEffect(() => {
    if (localStorage.getItem("token")) {
        if (update) {
            FetchCompetitors().then((comps) => {
                const copycompetitors = JSON.parse(JSON.stringify(comps));
                setCompetitors(copycompetitors);

                console.log(copycompetitors);
            });
            return () => (setupdate(false));
        }

    }
  }, [update, competitors]);

  return (
    <>
      {competitors.map((competitor) => {
          <div>{competitor}</div>
      })}
    </>
  )
}

export default Voting