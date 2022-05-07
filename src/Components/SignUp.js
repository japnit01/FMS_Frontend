import {React, useState,useContext} from 'react'
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import CustomTextField from './CustomTextField';
import {useNavigate } from "react-router-dom";
import authContext from '../Context/auth/authContext';
import Button from "@mui/material/Button";
import "../css/SignUp.css"


function SignUp() {
  const context = useContext(authContext);
  const {signupuser} = context;

  const [open, setOpen] = useState(false);
  const [user,setuser] = useState({name:"",email:"",age:"",password:""});

  const onChange = (e) =>{
    setuser({...user,[e.target.name]:e.target.value})
    console.log(user)
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const createAccountAndClose = ()=> {
    let jsonData = {name:user.name,email:user.email,age:user.age,password:user.password};
     signupuser(jsonData);

    setOpen(false);
  };

  return (
    <>
          <Button sx={{fontWeight:600, color:'#BB86FC'}} onClick={handleClickOpen}>Sign Up</Button>
      <Dialog open={open} onClose={handleClose}>
          <DialogTitle sx={{fontWeight:600,fontSize:"4vh"}}>SIGN UP</DialogTitle>
          <DialogContent className="signupdialog">
            <CustomTextField label={"Name"} id={"name"} type={"text"} width={"100%"} changefunc={onChange} value={user.name} name={"name"}></CustomTextField>
            <CustomTextField label={"Email"} id={"email"} type={"email"} width={"100%"} changefunc={onChange} value={user.email} name={"email"}></CustomTextField>
            <CustomTextField label={"College"} id={"college"} type={"text"} width={"100%"}></CustomTextField>
            <CustomTextField label={"Age"} id={"age"} type={"number"} width={"50%"} changefunc={onChange} value={user.age} name={"age"}></CustomTextField>
            <CustomTextField label={"Create Password"} id={"password"} type={"password"} width={"100%"} changefunc ={onChange} value={user.password} name={"password"}></CustomTextField>
            <CustomTextField label={"Confirm Password"} id={"confirm-pass"} type={"password"} width={"100%"}></CustomTextField>
          </DialogContent>
          <DialogActions>
            <Button sx={{ color: '#BB86FC' }} onClick={handleClose}>Cancel</Button>
            <Button sx={{ color: '#BB86FC' }} onClick={()=>createAccountAndClose()}>Create Account</Button>
          </DialogActions>
      </Dialog>
    </>
  )
}

export default SignUp