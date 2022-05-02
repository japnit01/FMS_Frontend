import React from 'react'
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle'
import {IconButton} from '@mui/material';
import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1';
// import TagsInput from './TagsInput'

// import ChipInput from 'material-ui-chip-input'


function AddCoordinator() {
    const [open, setOpen] = React.useState(false);
    
    const handleChange = (chips) =>{
      console.log(chips)
    }
    
    const handleClickOpen = () => {
      setOpen(true);
    };
  
    const handleClose = () => {
      setOpen(false);
    };

  return (
      <>
    <IconButton onClick={handleClickOpen}> <PersonAddAlt1Icon /> </IconButton>
    <Dialog open={open} onClose={handleClose} >
    <DialogTitle>Add Coordinators</DialogTitle>
    <DialogContent>
    {/* <ChipInput
  defaultValue={['foo', 'bar']}
  onChange={(chips) => handleChange(chips)}
/> */}

    </DialogContent>
    <DialogActions>/
      <Button onClick={handleClose}>Cancel</Button>
      <Button onClick={handleClose}>Add</Button>
    </DialogActions>
  </Dialog>
  </>
  )
}

export default AddCoordinator