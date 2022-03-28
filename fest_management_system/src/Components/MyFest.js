import  React,{useEffect, useState,useContext} from "react";
import AddFest from "./AddFest";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

import festContext from '../Context/fest/festContext'

function MyFest() {
  const context = useContext(festContext);
	const {FetchFests,DeleteFest} = context;

  let [fests, setFests] = useState([]);

  // const handledeletefest = async (festid) => {
       
  // };

  useEffect(() => {
    if (localStorage.getItem("token")) {
      let mounted = true;
      FetchFests().then((userfests) => {
        if (mounted) {
          const copyfests = JSON.parse(JSON.stringify(userfests));
          console.log(copyfests);
          setFests(copyfests);
        }
      });
      return () => (mounted = false);
    }
  }, []);

  return (
    <>

        <AddFest openbname={"Add Fest"} formname={"New Fest !!!"}></AddFest>
        {fests.map((fest) => (
          <Card key={fest._id} sx={{ maxWidth: 345 }}>
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                {fest.name}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Organised By:- {fest.organisation}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {fest.description}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {fest.startdate}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {fest.enddate}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {fest.state}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {fest.city}
              </Typography>
            </CardContent>
            <CardActions>
              <Button onClick={() => DeleteFest(fest._id)} size="small">
                Delete
              </Button>
              <AddFest
                openbname={"Edit"}
                formname={"Edit Fest"}
                formdata={fest}
              ></AddFest>
            </CardActions>
          </Card>
        ))}

    </>
  );
}

export default MyFest;
