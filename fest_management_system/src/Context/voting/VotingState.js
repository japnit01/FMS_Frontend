import { useState } from "react";
import votingContext from "./votingContext";

const VotingState = (props) => {
  const host = "http://localhost:5000";
  const [update, setupdate] = useState(true);

  const FetchCompetitors = async () => {

    const url = `${host}/api/voting`;
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
    <votingContext.Provider value={{ FetchCompetitors, update, setupdate }}>
      {props.children}
    </votingContext.Provider>
  );
};

export default VotingState;