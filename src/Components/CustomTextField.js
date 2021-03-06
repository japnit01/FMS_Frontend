import React from 'react'
import TextField from "@mui/material/TextField";
import InputAdornment from '@mui/material/InputAdornment';

function CustomTextField(props) {
    const {label,id,type,width,date,changefunc,value,name,mr,ml} = props;
  return (
      <>
      <TextField
              margin="dense"
              id={id}
              label={label}
              type={type}
              sx={{width:{width}, mr:{mr}, ml:{ml}}}
              variant="filled"
              value={value}
              name={name}
              onChange={changefunc}
              InputProps = {{startAdornment: date && (<InputAdornment position="start"></InputAdornment>)}}
              
      />

      </>
  )
}

export default CustomTextField