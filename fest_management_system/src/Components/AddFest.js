import {React,useState} from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import CustomButton from './CustomButton';
import CustomTextField from './CustomTextField';

function AddFest(props) {
  const [open, setOpen] = useState(false);
  let [fest,setFest] = useState({title:"",desc:"",sdate:"",edate:"",venue:"",fee:""});
  let host = 'http://localhost:5000'

  const onChange = (e) => {
    setFest({...fest,[e.target.name]:e.target.value});
    console.log(fest)
  }

  const handleCreateFest = async()=> {
    let jsonData = {title:fest.title,desc:fest.desc,sdate:fest.sdate,edate:fest.edate,venue:fest.venue,fee:fest.fee};
    console.log(jsonData);
    setOpen(false);

    // props.handleFests();

    const url = `${host}/api/fests/addfest`
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(jsonData)
    });
    const newfest = await response.json();
    console.log(newfest)
  }

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <div>
        <CustomButton name={"Create New Fest"} clickfunc={handleClickOpen}></CustomButton>
        <Dialog open={open} onClose={handleClose}>
          <DialogTitle>New Fest !!!</DialogTitle>
          <DialogContent>
            <CustomTextField label={"Title"} id={"title"} type={"text"} width={"100%"} changefunc={onChange} value={fest.title} name={"title"} ></CustomTextField>
            <CustomTextField label={"Description"} id={"desc"} type={"text"} width={"100%"} changefunc={onChange} value={fest.desc} name={"desc"}></CustomTextField>
            <CustomTextField label={"Start Date"} date={true} id={"stime"} type={"time"} width={"50%"} changefunc={onChange} value={fest.sdate} name={"sdate"}></CustomTextField>
            <CustomTextField label={"End Date"} date={true} id={"etime"} type={"time"} width={"50%"} changefunc={onChange} value={fest.edate} name={"edate"}></CustomTextField>
            <CustomTextField label={"Venue"} id={"venue"} type={"text"} width={"100%"} changefunc={onChange} value={fest.venue} name={"venue"}></CustomTextField>
            <CustomTextField label={"Fee"} id={"fee"} type={"number"} changefunc={onChange} value={fest.fee} name={"fee"}></CustomTextField>
          </DialogContent>
          <DialogActions>
          <CustomButton name={"Cancel"} clickfunc={handleClose}></CustomButton>
          <CustomButton name={"Create"} clickfunc={handleCreateFest}></CustomButton>
          </DialogActions>
        </Dialog>
      </div>
    </>
  );
}

export default AddFest;