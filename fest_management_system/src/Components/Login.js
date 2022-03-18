import {React,useState} from 'react'
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import CustomButton from './CustomButton';
import CustomTextField from './CustomTextField';

function Login() {
  const [open, setOpen] = useState(false);
  const [user, setUser] = useState({email:"",password:""});
  let host = 'http://localhost:5000'

  const onChange = (e) => {
    setUser({...user,[e.target.name]:e.target.value});
  }

  const handleLogin = async()=> {
    let jsonData = {
      email:user.email,
      password:user.password
    }

    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: jsonData
    };

    let url = `${host}/api/auth/login`;

    setOpen(false);

    let response = await fetch(url,requestOptions);
    let newuser = await response.json();
    console.log(newuser);
  
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
          <CustomTextField label={"Email"} id={"email"} type={"email"} width={"100%"} changefunc={onChange} value={user.email} name={"email"}></CustomTextField>
          <CustomTextField label={"Password"} id={"password"} type={"password"} width={"100%"} changefunc ={onChange} value={user.password} name={"password"}></CustomTextField>
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