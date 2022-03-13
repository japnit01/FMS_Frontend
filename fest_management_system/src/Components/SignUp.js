import {React, useState} from 'react'
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import CustomButton from './CustomButton';
import CustomTextField from './CustomTextField';

function SignUp() {

  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <CustomButton name={"Signup"} clickfunc={handleClickOpen}></CustomButton>
      <Dialog open={open} onClose={handleClose}>
          <DialogTitle>SIGNUP</DialogTitle>
          <DialogContent>
            <CustomTextField label={"Name"} id={"name"} type={"text"} width={"100%"} ></CustomTextField>
            <CustomTextField label={"Email"} id={"email"} type={"email"} width={"100%"}></CustomTextField>
            <CustomTextField label={"College"} id={"college"} type={"text"} width={"100%"}></CustomTextField>
            <CustomTextField label={"Age"} id={"age"} type={"number"} width={"50%"}></CustomTextField>
            <CustomTextField label={"Create Password"} id={"password"} type={"password"} width={"100%"}></CustomTextField>
            <CustomTextField label={"Confirm Password"} id={"confirm-pass"} type={"password"} width={"100%"}></CustomTextField>
          </DialogContent>
          <DialogActions>
            <CustomButton name={"Cancel"} clickfunc={handleClose}></CustomButton>
            <CustomButton name={"Create Account"} clickfunc={handleClose}></CustomButton>
          </DialogActions>
      </Dialog>
    </>
  )
}

export default SignUp