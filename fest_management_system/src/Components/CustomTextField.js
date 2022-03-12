import React from 'react'
import TextField from "@mui/material/TextField";

function CustomTextField(props) {
    const {label,id,type,width} = props;
  return (
      <>
      <TextField
              margin="dense"
              id={id}
              label={label}
              type={type}
              variant="filled"
      />

      </>
  )
}

export default CustomTextField