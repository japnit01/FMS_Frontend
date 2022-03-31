import {useState} from "react";
import eventContext from "./eventContext";

const EventState = (props) => {
  const host = "http://localhost:5000";
  // let [fests, setFests] = useState([]);
  const [update,setupdate] = useState(true);

  const CreateFest = async (jsonData) => {
    const url = `${host}/api/fests/addfest`;
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

  const FetchFests = async () => {
    const url = `${host}/api/fests/fetchfest`;
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        token: localStorage.getItem("token"),
      },
    });
    const userfests = await response.json();
    return userfests;
  };

  const UpdateFest = async (festid, jsonData) => {

    const url = `${host}/api/fests/updatefest/${festid}`;
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

  const DeleteFest = async (festid) => {

    const url = `${host}/api/fests/deletefest/${festid}`;
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
    <eventContext.Provider value={{ CreateFest, FetchFests, UpdateFest, DeleteFest,update,setupdate }}>
      {props.children}
    </eventContext.Provider>
  );
};

export default EventState;