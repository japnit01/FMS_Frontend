import { React, useState } from 'react'
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import CustomButton from './CustomButton';
import CustomTextField from './CustomTextField';
import TextField from "@mui/material/TextField";

const AddEvent = () => {

  const [open, setOpen] = useState(false);
  let [competition, setCompetition] = useState({ comp_type: "", comp_name: "", startTime: "", endTime: "", description: "", date: "", venue: "", fee: "" });
  let host = 'http://localhost:5000'

  const onChange = (e) => {
    setCompetition({ ...competition, [e.target.name]: e.target.value });
    console.log(competition)
  }

  const handleCreateCompetition = async () => {
    let jsonData = { comp_type: competition.comp_type, comp_name: competition.comp_name, startTime: competition.startTime, endTime: competition.endTime, description: competition.description, date: competition.date, venue: competition.venue, fee: competition.fee };
    console.log(jsonData);

  //   const url = `${host}/api/competitions/623b104455073b062a330835/add-competition`
  //   setOpen(false);

  //   const response = await fetch(url, {
  //     method: 'POST',
  //     headers: {
  //       'Content-Type': 'application/json',
  //       'token': localStorage.getItem('token')
  //     },
  //     body: JSON.stringify(jsonData)
  //   });
  //   const newuser = await response.json();
  //   console.log(newuser)
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
        <CustomButton name={"Create Event"} clickfunc={handleClickOpen}></CustomButton>
        <Dialog open={open} onClose={handleClose}>
          <DialogTitle>New Event !!!</DialogTitle>
          <DialogContent>
            <CustomTextField label={"Type"} id={"type"} type={"text"} width={"100%"} changefunc={onChange} value={competition.comp_type} name={"comp_type"}></CustomTextField>
            <CustomTextField label={"Title"} id={"title"} type={"text"} width={"100%"} changefunc={onChange} value={competition.comp_name} name={"comp_name"}></CustomTextField>
           
            <CustomTextField
							label={"Start Date"}
							date={true}
							id={"startdate"}
							type={"time"}
							width={"50%"}
							changefunc={onChange}
							// value={fest.startdate}
							name={"startdate"}
						></CustomTextField>
            <CustomTextField label={"Start Time"} id={"stime"} type={"time"} width={"100%"} changefunc={onChange} value={competition.stime} name={"startTime"}></CustomTextField>
            <CustomTextField label={"End Time"} id={"etime"} type={"time"} width={"100%"} changefunc={onChange} value={competition.etime} name={"endTime"}></CustomTextField>
            <CustomTextField label={"Description"} id={"desc"} type={"text"} width={"100%"} changefunc={onChange} value={competition.desc} name={"description"}></CustomTextField>
            <CustomTextField id={"date"} type={"date"} width={"100%"} changefunc={onChange} value={competition.date} name={"date"}></CustomTextField>
            <CustomTextField label={"Venue"} id={"venue"} type={"text"} width={"100%"} changefunc={onChange} value={competition.venue} name={"venue"}></CustomTextField>
            <CustomTextField label={"Fee"} id={"fee"} type={"number"} width={"100%"} changefunc={onChange} value={competition.fee} name={"fee"}></CustomTextField>
          </DialogContent>
          <DialogActions>
            <CustomButton name={"Cancel"} clickfunc={handleClose}></CustomButton>
            <CustomButton name={"Create"} clickfunc={handleCreateCompetition}></CustomButton>
          </DialogActions>
        </Dialog>
      </div>
    </>
  )
}

export default AddEvent