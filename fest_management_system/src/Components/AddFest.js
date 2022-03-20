import {React,useEffect,useState} from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import CustomButton from './CustomButton';
import CustomTextField from './CustomTextField';
// import Select from 'react-select';

function AddFest(props) {
  const [open, setOpen] = useState(false);
  let [fest,setFest] = useState({title:"",desc:"",sdate:"",edate:"",venue:"",fee:"",organisation:""});
  // let [selectedOption,setSelectedOption] = useState("");
  let [organisations,setOrganisations] = useState([]);
  let host = 'http://localhost:5000'

  const onChange = (e) => {
    setFest({...fest,[e.target.name]:e.target.value});
    console.log(fest)
  }

  useEffect(()=> {
    handleOrganisations();
  },[]);
  
  const handleCreateFest = async()=> {
    let jsonData = {title:fest.title,desc:fest.desc,sdate:fest.sdate,edate:fest.edate,venue:fest.venue,fee:fest.fee,organisation:fest.organisation};
    console.log(jsonData);
    setOpen(false);

    // props.handleFests();

    const url = `${host}/api/fests/addfest`
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(jsonData)
    });
    const newfest = await response.json();
    console.log(newfest)
  }

  const handleClickOpen = () => {
    // handleOrganisations();
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleOrganisations = async(e) => {

    let response = await fetch('http://universities.hipolabs.com/search?country=india',{
      method: 'GET',
      // query: {
      //   country: india,
      // }
    });
    let orgList = await response.json();
    // console.log(orgList);
    orgList = (orgList.map(org => org.name));
    // console.log(orgList);
    orgList.sort();
    setOrganisations(orgList);
  }


  return (
    <>
      <div>
        <CustomButton name={"Create New Fest"} clickfunc={handleClickOpen}></CustomButton>
        <Dialog open={open} onClose={handleClose}>
          <DialogTitle>New Fest !!!</DialogTitle>
          <DialogContent>
            <CustomTextField label={"Title"} id={"title"} type={"text"} width={"100%"} changefunc={onChange} value={fest.title} name={"title"} ></CustomTextField>
            <select onChange={onChange}>
              <option value="Choose Organisation" >Choose Organisation</option>
              {organisations.map(organisation => {
                <option key={organisation} value={organisation}>{organisation}</option>
                {console.log(organisation)}
              })}
            </select>
            {/* <CustomTextField label={"Organisation"} id={"organisation"} type={"text"} width={"100%"} changefunc={onChange} value={fest.organisation} name={"organisation"} ></CustomTextField> */}
            <CustomTextField label={"Description"} id={"desc"} type={"text"} width={"100%"} changefunc={onChange} value={fest.desc} name={"desc"}></CustomTextField>
            <CustomTextField label={"Start Date"} date={true} id={"stime"} type={"time"} width={"50%"} changefunc={onChange} value={fest.sdate} name={"sdate"}></CustomTextField>
            <CustomTextField label={"End Date"} date={true} id={"etime"} type={"time"} width={"50%"} changefunc={onChange} value={fest.edate} name={"edate"}></CustomTextField>
            <CustomTextField label={"Venue"} id={"venue"} type={"text"} width={"100%"} changefunc={onChange} value={fest.venue} name={"venue"}></CustomTextField>
            <CustomTextField label={"Fee"} id={"fee"} type={"number"} changefunc={onChange} value={fest.fee} name={"fee"}></CustomTextField>
          </DialogContent>
          <DialogActions>
          <CustomButton name={"Cancel"} clickfunc={handleClose}></CustomButton>
          <CustomButton name={"Create"} clickfunc={handleCreateFest}></CustomButton>
          </DialogActions>
        </Dialog>
      </div>
    </>
  );
}

export default AddFest;