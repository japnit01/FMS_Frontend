import {React,useState} from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import CustomButton from './CustomButton';
import CustomTextField from './CustomTextField';

function Form() {
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
            <CustomTextField label={"Title"} id={"title"} type={"text"} width={"100"} ></CustomTextField>
            <CustomTextField label={"Description"} id={"desc"} type={"text"}></CustomTextField>
            <CustomTextField label={"Start Date"} id={"stime"} type={"time"}></CustomTextField>
            <CustomTextField label={"Title"} id={"title"} type={"text"}></CustomTextField>
            <CustomTextField label={"Title"} id={"title"} type={"text"}></CustomTextField>
            
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

export default Form;
