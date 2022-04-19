import React, { useContext, useState,useEffect } from "react";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import universities from './universities'
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import Box from '@mui/material/Box';
import festContext from "../Context/fest/festContext"
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import '../css/AddFest.css';
import { useNavigate,useParams } from "react-router-dom";
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';


function AddFest() {
	const context = useContext(festContext);
	const { CreateFest, UpdateFest,fest,setFest, update, setupdate } = context;
	let { festevent} = useParams();
	const navigate = useNavigate();

	const [org, setorg] = useState({ label: 'Select Organisation' });
	const [startDate, setstartDate] = useState();
	const [endDate, setendDate] = useState();

	const handleClickOpenFill = () => {
		const sdate = new Date(fest.startdate)
		const edate = new Date(fest.enddate)

		let startdate = sdate.getFullYear() + "-" + (sdate.getMonth() < 9 ? "0" + (sdate.getMonth()) : (sdate.getMonth())) + "-" + (sdate.getDate() < 9 ? "0" + sdate.getDate() : sdate.getDate());
		let enddate = edate.getFullYear() + "-" + (edate.getMonth() < 9 ? "0" + (edate.getMonth() ) : (edate.getMonth())) + "-" + (edate.getDate() < 9 ? "0" + edate.getDate() : edate.getDate());
		console.log(startdate,enddate)
		setorg({ label: fest.organisation });
		setstartDate(startdate);
		setendDate(enddate)
	};

	useEffect(() => {
		setupdate(true)
	  }, []);

	useEffect(() => {
		  if (update && festevent === "editfest") {
	
			handleClickOpenFill()
			return () => (setupdate(false));
		  }
	  }, [update]);
	

	const handleChange = (e, value) => {
		if (value)
			setorg({ label: value.label });
	};

	const onChange = (e) => {
		setFest({ ...fest, [e.target.name]: e.target.value });
	};

	const handleUpdateFest = async () => {
		let jsonData = {
			name: fest.name,
			description: fest.description,
			startdate: startDate,
			enddate: endDate,
			state: fest.state,
			city: fest.city,
			organisation: org.label,
		};
		UpdateFest(fest.id, jsonData);
		navigate('/c/myfests')
	};

	const handleCreateFest = async () => {
		let jsonData = {
			name: fest.name,
			description: fest.description,
			startdate: startDate,
			enddate: endDate,
			state: fest.state,
			city: fest.city,
			organisation: org.label,
		};
		CreateFest(jsonData);
		navigate('/c/myfests')
	};

	return (
		<>
			<div className="addfestcontainer">
				<Container>
					<TextField
						label="Title"
						className="addfestinput"
						type="text"
						sx={{ width: "100%" }}
						onChange={onChange}
						value={fest.name}
						name="name"
						margin="dense"
						variant="filled"
						autoComplete="off"
					></TextField>

					<Autocomplete
						value={org}
						className="addfestinput"
						getOptionLabel={(option) => option.label}
						options={universities}
						onChange={(e, value) => { handleChange(e, value) }}
						sx={{ width: '100%', paddingTop: '2%' }}

						renderOption={(props, option) => (
							<Box component="li" {...props} key={option.id}>
								{option.label}
							</Box>
						)}
						renderInput={(params) => <TextField {...params} variant="filled" label="Organsation" />}
					/>

					<TextField
						label="Description"
						id="description"
						type="text"
						sx={{ width: "100%", mb: "3%" }}
						onChange={onChange}
						value={fest.description}
						name="description"
						margin="dense"
						variant="filled"
						autoComplete="off"
					></TextField>


					<LocalizationProvider dateAdapter={AdapterDateFns}>
						<DesktopDatePicker
							label="Start Date"
							showTodayButton
							openTo="year"
							className="datefield"
							views={['year', 'month', 'day']}
							value={startDate}
							sx={{ width: "35%" }}
							name="startdate"
							onChange={(newValue) => {
								setstartDate(newValue);
							}}
							renderInput={(params) => <TextField {...params} />}
						/>

						<DesktopDatePicker
							label="End Date"
							showTodayButton
							openTo="year"
							className="datefield"
							views={['year', 'month', 'day']}
							value={endDate}
							sx={{ width: "35%" }}
							name="startdate"
							onChange={(newValue) => {
								setendDate(newValue);
							}}
							renderInput={(params) => <TextField {...params} />}
						/>
					</LocalizationProvider>

					<TextField
						label="State"
						id="state"
						type="text"
						sx={{ width: "40%" }}
						onChange={onChange}
						value={fest.state}
						name="state"
						margin="dense"
						variant="filled"
						autoComplete="off"
					></TextField>

					<TextField
						label="City"
						id="city"
						type="text"
						sx={{ width: "40%" }}
						onChange={onChange}
						value={fest.city}
						name="city"
						margin="dense"
						variant="filled"
						autoComplete="off"
					></TextField>
				</Container>

				<Button sx={{ color: '#BB86FC' }} onClick={()=>{navigate('/c/myfests')}} size="small">
					Cancel
				</Button>

				{festevent === "createfest" ? (
					<Button sx={{ color: '#BB86FC' }} onClick={handleCreateFest} size="small">
						Create
					</Button>
				) : (
					<Button sx={{ color: '#BB86FC' }} onClick={() => handleUpdateFest()} size="small">
						Update
					</Button>
				)}
			</div>
		</>
	);
}

export default AddFest;
