import React from 'react'
import TextField from "@mui/material/TextField";
import InputAdornment from '@mui/material/InputAdornment';

function CustomTextField(props) {
    const {label,id,type,width,date} = props;
  return (
      <>
      <TextField
              margin="dense"
              id={id}
              label={label}
              type={type}
              sx={{width:{width}}}
              variant="filled"
              InputProps = {{startAdornment: date && (<InputAdornment position="start"></InputAdornment>)}}
              
      />

      </>
  )
}

export default CustomTextField