import {React,useState} from 'react'
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import CustomButton from './CustomButton';
import CustomTextField from './CustomTextField';

function Login() {
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  let handleEmailChange = (e)=> {
    setEmail(e.target.email);
  }
  
  let handlePasswordChange = (e)=> {
      setPassword(e.target.password);
  }

  const handleLogin = ()=> {
    let jsonData = {
      email,
      password
    }

    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: jsonData
    };

    setOpen(false);

    fetch('http://localhost:5000/api/auth/login', requestOptions)
        .then(response => response.json());
  };

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
            <CustomTextField label={"Email"} id={"email"} type={"email"} width={"100%"} onChange={handleEmailChange}></CustomTextField>
            <CustomTextField label={"Password"} id={"password"} type={"password"} width={"100%"} onChange={handlePasswordChange}></CustomTextField>
          </DialogContent>
          <DialogActions>
            <CustomButton name={"Cancel"} clickfunc={handleClose}></CustomButton>
            <CustomButton name={"Login"} clickfunc={handleLogin}></CustomButton>
          </DialogActions>
      </Dialog>
    </>
  )
}

export default Login