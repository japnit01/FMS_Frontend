import React, { useState, useContext, useEffect } from 'react'
import { Typography, TextField, InputLabel, MenuItem, Select, FormControl, Button,Container} from "@mui/material";
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import { TimePicker} from '@mui/x-date-pickers/TimePicker';
import eventContext from '../Context/event/eventContext';
import { useParams, useNavigate} from "react-router-dom";
import '../css/AddEvent.css';
import { LocalizationProvider} from '@mui/x-date-pickers/LocalizationProvider';
import { DesktopDatePicker} from '@mui/x-date-pickers/DesktopDatePicker';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';


const AddEvent = () => {
  const context = useContext(eventContext);
  const { CreateEvent, UpdateEvent, event, setEvent, update, setupdate } = context;
  let { festname, eventoperation } = useParams();
  const navigate = useNavigate();

  const [startTime, setstartTime] = useState(null);
  const [endTime, setendTime] = useState(null);
  const [startDate, setstartDate] = useState(null);
  const [showVoting, setShowVoting] = useState(false);

  const onChange = (e) => {
    setEvent({ ...event, [e.target.name]: e.target.value });

    if(e.target.value === "Solo") {
      setShowVoting(true);
    } else {
      setShowVoting(false);
    }
  }

  const handleUpdateEvent = async () => {
    console.log(startDate)
    let jsonData = {
      type: event.type,
      name: event.name,
      startTime: startTime,
      endTime: endTime,
      description: event.description,
      startdate: startDate,
      venue: event.venue,
      fee: event.fee
    };

    if(event.type === "Solo" && document.getElementById('votecheckbox').checked === true) {
      jsonData.type = "Solovoting";
    }

    UpdateEvent(festname, event.id, jsonData);
    navigate(`/c/fest/${festname}`)
  };

  const handleCreateEvent = async () => {
    let jsonData = {
      type: event.type,
      name: event.name,
      startTime: startTime,
      endTime: endTime,
      description: event.description,
      startdate: startDate,
      venue: event.venue,
      fee: event.fee
    };

    if(event.type === "Solo" && document.getElementById('votecheckbox').checked === true) {
      jsonData.type = "Solovoting";
    }



    CreateEvent(jsonData, festname);
    navigate(`/c/fest/${festname}`)
  }

  const handleClickOpenFill = () => {
    const sdate = new Date(event.startdate)
    let startdate = sdate.getFullYear() + "-" + (sdate.getMonth() < 9 ? "0" + (sdate.getMonth() + 1) : (sdate.getMonth() + 1)) + "-" + (sdate.getDate() < 9 ? "0" + (sdate.getDate()) : (sdate.getDate()));

    setstartDate(startdate)
    setstartTime(event.startTime)
    setendTime(event.endTime)
  };

  useEffect(() => {
    setupdate(true)
  }, []);

  useEffect(() => {
    if (update && eventoperation === "editevent") {
      handleClickOpenFill()
      return () => (setupdate(false));
    }
    else if (update && eventoperation === "createevent") {
      setEvent({
        id: "",
        name: "",
        type: "",
        startdate: "",
        startTime: "",
        endTime: "",
        description: "",
        venue: "",
        fee: ""
      });

      setstartDate(null);
      setstartTime(null);
      setendTime(null);
      return () => (setupdate(false));
    }
  }, [update]);

  return (
    <>
      <div className="addeventcontainer">
        <div className="subcontainer">
          <Container maxWidth="sm" sx={{ ml: 3, pt: "7%" }}>
            <Typography variant="h4" sx={{ color: "white", pb: "4%" }}>Create New Event</Typography>

            <TextField
              label="Title"
              id="title"
              type="text"
              className="addeventinput"
              sx={{ width: "100%" }}
              onChange={onChange}
              value={event.name}
              name="name"
              margin="dense"
              variant="filled"
              autoComplete="off"
            ></TextField>

            <div className="typecontainer">
              <FormControl variant="filled" sx={{ width: "47%", mt: "1%" }}>
                <InputLabel id="demo-simple-select-filled-label">Type</InputLabel>
                <Select
                  labelId="demo-simple-select-filled-label"
                  className="addeventinput"
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

              {(showVoting === true) ? <FormControlLabel sx={{ ml: '5%', color: "white",mt:'1.5%' }} id="votecheckbox" control={<Checkbox />} label="Voting" /> : null}
            </div>

            <div className="datecontainer">
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DesktopDatePicker
                label="Start Date"
                openTo="year"
                className="datefield"
                views={['year', 'month', 'day']}
                value={startDate}
                name="startdate"
                onChange={(newValue) => {
                  setstartDate(newValue);
                }}
                renderInput={(params) => <TextField {...params} sx={{ width: "32%" }} />}
              />

              <TimePicker
                label="Start Time"
                name="startTime"
                value={startTime}
                className="datefield"
                onChange={(newValue) => {
                  setstartTime(newValue);
                }}
                
                renderInput={(params) => <TextField {...params} sx={{ width: "32%" }} />}
              />

              <TimePicker
                label="End Time"
                name="endTime"
                className="datefield"
                onChange={(newValue) => {
                  setendTime(newValue);
                }}
                value={endTime}
                renderInput={(params) => <TextField {...params} sx={{ width: "32%" }}  />}
              />
            </LocalizationProvider>
            </div>

            <TextField
              label="Description"
              id="desc"
              type="text"
              className="addeventinput"
              sx={{ width: "100%" }}
              onChange={onChange}
              value={event.description}
              name="description"
              margin="dense"
              variant="filled"
              autoComplete="off"
            >
            </TextField>

            <div className="placecontainer">
              <TextField
                label="Venue"
                id="venue"
                type="text"
                className="addeventinput"
                sx={{ width: "70%" }}
                onChange={onChange}
                value={event.venue}
                name="venue"
                margin="dense"
                variant="filled"
                autoComplete="off"
              >
              </TextField>

              <TextField
                label="Fee"
                id="fee"
                type="number"
                className="addeventinput"
                sx={{ width: "26%" }}
                onChange={onChange}
                value={event.fee}
                name="fee"
                margin="dense"
                variant="filled"
                autoComplete="off"
              >
              </TextField>
            </div>

            <div className="buttoncontainer">
              <Button className="cancelbtn" name="Cancel" onClick={() => { navigate(`/c/fest/${festname}`) }}>Cancel</Button>

              {eventoperation === "createevent" ? (
                <Button className="submitbtn" onClick={handleCreateEvent} size="small">
                  Create
                </Button>
              ) : (
                <Button className="submitbtn" onClick={() => handleUpdateEvent()} size="small">
                  Update
                </Button>
              )}
            </div>
          </Container>
        </div>
      </div>
    </>
  )
}

export default AddEvent