import {React,useState} from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import CustomButton from './CustomButton';
import CustomTextField from './CustomTextField';

function FestForm() {
  const [open, setOpen] = useState(false);

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
            <CustomTextField label={"Title"} id={"title"} type={"text"} width={"100%"} ></CustomTextField>
            <CustomTextField label={"Description"} id={"desc"} type={"text"} width={"100%"}></CustomTextField>
            <CustomTextField label={"Start Date"} date={true} id={"stime"} type={"time"} width={"50%"}></CustomTextField>
            <CustomTextField label={"End Date"} date={true} id={"etime"} type={"time"} width={"50%"}></CustomTextField>
            <CustomTextField label={"Venue"} id={"venue"} type={"text"} width={"100%"}></CustomTextField>
            <CustomTextField label={"City"} id={"city"} type={"text"} width={"50%"}></CustomTextField>
            <CustomTextField label={"State"} id={"state"} type={"text"} width={"50%"} ></CustomTextField>
          </DialogContent>
          <DialogActions>
          <CustomButton name={"Cancel"} clickfunc={handleClose}></CustomButton>
          <CustomButton name={"Create"} clickfunc={handleClose}></CustomButton>
          </DialogActions>
        </Dialog>
      </div>
    </>
  );
}

export default FestForm;