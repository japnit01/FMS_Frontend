import React from 'react'
import TextField from "@mui/material/TextField";
import InputAdornment from '@mui/material/InputAdornment';

function CustomTextField(props) {
    const {label,id,type,width,InputProps} = props;
  return (
      <>
      <TextField
              margin="dense"
              id={id}
              label={label}
              type={type}
              sx={{width:{width}}}
              variant="filled"
              InputProps={(props.date === true) ? {
                startAdornment: <InputAdornment position="start"></InputAdornment>,
              } : ""}
              
      />
       {/* {(width >= 500) ? true : false} */}

      </>
  )
}

export default CustomTextField