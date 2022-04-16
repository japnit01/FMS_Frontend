import React, { useState, useContext } from 'react'
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import TextField from "@mui/material/TextField";
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import TimePicker from '@mui/lab/TimePicker';
import InputAdornment from '@mui/material/InputAdornment';
import eventContext from '../Context/event/eventContext';
import Button from "@mui/material/Button";
import { useParams } from "react-router-dom";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

const AddEvent = (props) => {
  const context = useContext(eventContext);
  const { CreateEvent, UpdateEvent } = context;
  const { openbname, formname, formdata } = props;
  let { festname } = useParams();

  const [open, setOpen] = useState(false);
  const [startTime, setstartTime] = useState();
  const [endTime, setendTime] = useState();
  const [event, setevent] = useState({
    name: "",
    type: "",
    startdate: "",
    startTime: "",
    endTime: "",
    description: "",
    venue: "",
    fee: ""
  });

  const onChange = (e) => {
    setevent({ ...event, [e.target.name]: e.target.value });
    console.log(event)
  }

  const handleUpdateEvent = async (selevent) => {

    let jsonData = {
      type: event.type,
      name: event.name,
      startTime: startTime,
      endTime: endTime,
      description: event.description,
      startdate: event.startdate,
      venue: event.venue,
      fee: event.fee
    };

    UpdateEvent(festname, selevent._id, jsonData);
    setOpen(false);
  };


  const handleCreateEvent = async () => {
    let jsonData = {
      type: event.type,
      name: event.name,
      startTime: startTime,
      endTime: endTime,
      description: event.description,
      startdate: event.startdate,
      venue: event.venue,
      fee: event.fee
    };

    CreateEvent(jsonData, festname);
    setOpen(false);
  }

  const handlestartTime = (newValue) => {
    setstartTime(newValue);
  };

  const handleendTime = (newValue) => {
    setendTime(newValue);
  };

  const handleClickOpenFill = () => {
    const sdate = new Date(formdata.startdate)
    let startdate = sdate.getFullYear() + "-" + (sdate.getMonth() < 9 ? "0" + (sdate.getMonth() + 1) : (sdate.getMonth() + 1)) + "-" + (sdate.getDate() < 9 ? "0" + (sdate.getDate()) : (sdate.getDate()));

    setevent({
      name: formdata.name,
      description: formdata.description,
      startdate: startdate,
      startTime: formdata.starttime,
      endTime: formdata.endtime,
      venue: formdata.venue,
      type: formdata.type,
      fee: formdata.fee,
    });

    setstartTime(formdata.startTime)
    setendTime(formdata.endTime)

    setOpen(true);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      {openbname === "Add Event" ? (
        <Button sx={{ color: '#BB86FC' }} onClick={handleClickOpen} size="small">
          {openbname}
        </Button>
      ) : (
        <Button sx={{ color: '#BB86FC' }} onClick={handleClickOpenFill} size="small">
          {openbname}
        </Button>
      )}
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>New Event !!!</DialogTitle>
        <DialogContent>
          <TextField
            label="Title"
            id="title"
            type="text"
            sx={{ width: "100%" }}
            onChange={onChange}
            value={event.name}
            name="name"
            margin="dense"
            variant="filled">
          </TextField>

          <FormControl variant="filled" sx={{ m: 1, minWidth: 120 }}>
					<InputLabel id="demo-simple-select-filled-label">Type</InputLabel>
					<Select
						labelId="demo-simple-select-filled-label"
            name="type"
						value={event.type}
						onChange={onChange}
					>
						<MenuItem value="">
							<em>None</em>
						</MenuItem>
						<MenuItem value="Dual">Dual</MenuItem>
						<MenuItem value="Solo">Solo</MenuItem>
						<MenuItem value="Concert">Concert</MenuItem>
					</Select>
          </FormControl>

          <TextField
            label="Start Date"
            id="startdate"
            type="date"
            sx={{ width: "100%" }}
            onChange={onChange}
            value={event.startdate}
            name="startdate"
            margin="dense"
            InputProps={{ startAdornment: (<InputAdornment position="start"></InputAdornment>) }}
          ></TextField>

          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <TimePicker
              label="Start Time"
              name="startTime"
              value={startTime}
              onChange={handlestartTime}
              renderInput={(params) => <TextField {...params} />}
            />

            <TimePicker
              label="End Time"
              name="endTime"
              onChange={handleendTime}
              value={endTime}
              renderInput={(params) => <TextField {...params} />}
            />
          </LocalizationProvider>

          <TextField
            label="Description"
            id="desc"
            type="text"
            sx={{ width: "100%" }}
            onChange={onChange}
            value={event.description}
            name="description"
            margin="dense"
          >
          </TextField>

          <TextField
            label="Venue"
            id="venue"
            type="text"
            sx={{ width: "100%" }}
            onChange={onChange}
            value={event.venue}
            name="venue"
            margin="dense"
          >
          </TextField>

          <TextField
            label="Fee"
            id="fee"
            type="number"
            sx={{ width: "100%" }}
            onChange={onChange}
            value={event.fee}
            name="fee"
            margin="dense"
          >
          </TextField>

        </DialogContent>

        <DialogActions>
          <Button name="Cancel" onClick={handleClose}></Button>
          <Button onClick={handleClose} size="small">
            Cancel
          </Button>
          {openbname === "Add Event" ? (
            <Button onClick={handleCreateEvent} size="small">
              Create
            </Button>
          ) : (
            <Button onClick={() => handleUpdateEvent(formdata)} size="small">
              Update
            </Button>
          )}
        </DialogActions>
      </Dialog>
    </>
  )
}

export default AddEvent