import {React,useState} from 'react'
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import CustomButton from './CustomButton';
import CustomTextField from './CustomTextField';

function Login() {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <CustomButton name={"Login"} clickfunc={handleClickOpen}></CustomButton>
      <Dialog open={open} onClose={handleClose}>
          <DialogTitle>LOGIN</DialogTitle>
          <DialogContent>
            <CustomTextField label={"Email"} id={"email"} type={"email"} width={"100%"}></CustomTextField>
            <CustomTextField label={"Password"} id={"password"} type={"password"} width={"100%"}></CustomTextField>
          </DialogContent>
          <DialogActions>
            <CustomButton name={"Cancel"} clickfunc={handleClose}></CustomButton>
            <CustomButton name={"Login"} clickfunc={handleClose}></CustomButton>
          </DialogActions>
      </Dialog>
    </>
  )
}

export default Login