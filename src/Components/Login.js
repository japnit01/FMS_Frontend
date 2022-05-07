import { React, useState,useContext } from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import CustomTextField from "./CustomTextField";
import authContext from "../Context/auth/authContext"
import Button from "@mui/material/Button";

function Login() {
   const context = useContext(authContext);
  const {loginuser} = context;

  const [open, setOpen] = useState(false);
  const [user, setUser] = useState({email:"",password:""});

  const onChange = (e) => {
    setUser({...user,[e.target.name]:e.target.value});
  }

  const handleLogin = async()=> {
    let jsonData = {
      email:user.email,
      password:user.password
    }
    loginuser(jsonData)
    setOpen(false);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
    <Button onClick={handleClickOpen}>Login</Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>LOGIN</DialogTitle>
        <DialogContent>
          <CustomTextField
            label={"Email"}
            id={"email"}
            type={"email"}
            width={"100%"}
            changefunc={onChange}
            value={user.email}
            name={"email"}
          ></CustomTextField>
          <CustomTextField
            label={"Create Password"}
            id={"password"}
            type={"password"}
            width={"100%"}
            changefunc={onChange}
            value={user.password}
            name={"password"}
          ></CustomTextField>
        </DialogContent>
        <DialogActions>
          <Button sx={{ color: '#BB86FC' }} onClick={handleClose}>Cancel</Button>
          <Button sx={{ color: '#BB86FC' }} onClick={()=>handleLogin()}>Login</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default Login;
