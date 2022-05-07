import {useState} from "react";
import festContext from "./festContext";

const FestState = (props) => {
  const host = "https://fest-manage-api.herokuapp.com";

  const [update,setupdate] = useState(true);
  const [fest, setFest] = useState({
    id:"",
		name: "",
		description: "",
		startdate: "",
		enddate: "",
		state: "",
		city: "",
		organisation: "",
	});

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
    <festContext.Provider value={{ CreateFest, FetchFests, UpdateFest, DeleteFest,update,setupdate,fest,setFest }}>
      {props.children}
    </festContext.Provider>
  );
};

export default FestState;