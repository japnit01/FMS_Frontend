import {React, useState} from 'react'
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import CustomButton from './CustomButton';
import CustomTextField from './CustomTextField';

function SignUp() {

  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [college, setCollege] = useState("");
  const [age, setAge] = useState(0);
  const [password, setPassword] = useState("");
  const [retypepass, setRetypePass] = useState("");

  let handleNameChange = (e)=> {
    setName(e.target.name);
  }

  let handleEmailChange = (e)=> {
    setEmail(e.target.email);
  }

  let handleCollegeChange = (e)=> {
    setCollege(e.target.college);
  }

  let handleAgeChange = (e)=> {
    setAge(e.target.age);
  }

  let handlePasswordChange = (e)=> {
    setPassword(e.target.password);
  }

  let handleRetypePassChange = (e)=> {
    setRetypePass(e.target.retypepass);
  }

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const createAccountAndClose = ()=> {
    let jsonData = {
      name,
      email,
      college,
      age,
      password,
      retypepass
    }

    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: jsonData
    };

    setOpen(false);

    fetch('http://localhost:5000/api/auth/signup', requestOptions)
        .then(response => response.json());
  };

  return (
    <>
      <CustomButton name={"Signup"} clickfunc={handleClickOpen}></CustomButton>
      <Dialog open={open} onClose={handleClose}>
          <DialogTitle>SIGNUP</DialogTitle>
          <DialogContent>
            <CustomTextField label={"Name"} id={"name"} type={"text"} width={"100%"} onChange={handleNameChange} ></CustomTextField>
            <CustomTextField label={"Email"} id={"email"} type={"email"} width={"100%"} onChange={handleEmailChange}></CustomTextField>
            <CustomTextField label={"College"} id={"college"} type={"text"} width={"100%"} onChange={handleCollegeChange}></CustomTextField>
            <CustomTextField label={"Age"} id={"age"} type={"number"} width={"50%"} onChange={handleAgeChange}></CustomTextField>
            <CustomTextField label={"Create Password"} id={"password"} type={"password"} width={"100%"} onChange={handlePasswordChange}></CustomTextField>
            <CustomTextField label={"Confirm Password"} id={"confirm-pass"} type={"password"} width={"100%"} onChange={handleRetypePassChange}></CustomTextField>
          </DialogContent>
          <DialogActions>
            <CustomButton name={"Cancel"} clickfunc={handleClose}></CustomButton>
            <CustomButton name={"Create Account"} clickfunc={createAccountAndClose}></CustomButton>
          </DialogActions>
      </Dialog>
    </>
  )
}

export default SignUp