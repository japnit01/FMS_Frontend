import festContext from "./festContext";

const FestState = (props) => {
  const host = "http://localhost:5000";

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
  }

  return (
    <festContext.Provider value={{ CreateFest, FetchFests, UpdateFest, DeleteFest }}>
      {props.children}
    </festContext.Provider>
  );
};

export default FestState;