import React, { useState, useContext, useEffect } from 'react'
import { TextField, InputLabel, MenuItem, Select, FormControl, Button, InputAdornment, Container } from "@mui/material";
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import TimePicker from '@mui/lab/TimePicker';
import eventContext from '../Context/event/eventContext';
import { useParams, useNavigate } from "react-router-dom";
import '../css/AddEvent.css';
import { LocalizationProvider} from '@mui/x-date-pickers/LocalizationProvider';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';

const AddEvent = () => {
  const context = useContext(eventContext);
  const { CreateEvent, UpdateEvent, event, setevent, update, setupdate } = context;
  let { festname, eventoperation } = useParams();
  const navigate = useNavigate();

  const [startTime, setstartTime] = useState();
  const [endTime, setendTime] = useState();
  const [startDate, setstartDate] = useState();

  const onChange = (e) => {
    setevent({ ...event, [e.target.name]: e.target.value });
  }

  const handleUpdateEvent = async (selevent) => {
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

    UpdateEvent(festname, selevent._id, jsonData);
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

    CreateEvent(jsonData, festname);
    navigate(`/c/fest/${festname}`)
  }

  const handlestartTime = (newValue) => {
    setstartTime(newValue);
  };

  const handleendTime = (newValue) => {
    setendTime(newValue);
  };

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
  }, [update]);

  return (
    <>
      <div className="addeventcontainer">
        <Container>
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

          {/* <TextField
            label="Start Date"
            id="startdate"
            type="date"
            sx={{ width: "35%" }}
            onChange={onChange}
            value={event.startdate}
            name="startdate"
            margin="dense"
            variant="filled"
            InputProps={{ startAdornment: (<InputAdornment position="start"></InputAdornment>) }}
          ></TextField> */}

          <LocalizationProvider dateAdapter={AdapterDateFns}>
            {/* <DesktopDatePicker
              label="Responsive"
              showTodayButton
              openTo="year"
              className="datefield"
              views={['year', 'month', 'day']}
              value={startDate}
              sx={{ width: "35%" }}
              name="startdate"
              onChange={(newValue) => {
                setstartDate(newValue);
              }}
              renderInput={(params) => <TextField {...params} />}
            /> */}

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
            variant="filled"
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
            variant="filled"
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
            variant="filled"
          >
          </TextField>
        </Container>
        <Button name="Cancel" onClick={() => { navigate(`/c/fest/${festname}`) }}>Cancel</Button>

        {eventoperation === "createevent" ? (
          <Button onClick={handleCreateEvent} size="small">
            Create
          </Button>
        ) : (
          <Button onClick={() => handleUpdateEvent()} size="small">
            Update
          </Button>
        )}
      </div>
    </>
  )
}

export default AddEvent