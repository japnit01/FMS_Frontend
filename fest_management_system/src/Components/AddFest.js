import React, { useContext, useState } from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "@mui/material/Button";
import universities from './universities'
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import Box from '@mui/material/Box';
import festContext from "../Context/fest/festContext"
import InputAdornment from '@mui/material/InputAdornment';
import '../css/AddFest.css';

function AddFest(props) {
	const context = useContext(festContext);
	const { CreateFest, UpdateFest } = context;
	const { openbname, formname, formdata } = props;

	const [open, setOpen] = useState(false);
	const [fest, setFest] = useState({
		name: "",
		description: "",
		startdate: "",
		enddate: "",
		state: "",
		city: "",
		organisation: "",
	});

	const [org, setorg] = React.useState({ label: 'Select Organisation' });

	const handleChange = (e, value) => {
		if (value)
			setorg({ label: value.label });
	};

	const onChange = (e) => {
		setFest({ ...fest, [e.target.name]: e.target.value });
	};

	const handleUpdateFest = async (selfest) => {

		let jsonData = {
			name: fest.name,
			description: fest.description,
			startdate: fest.startdate,
			enddate: fest.enddate,
			state: fest.state,
			city: fest.city,
			organisation: org.label,
		};
		UpdateFest(selfest._id, jsonData);
		setOpen(false);
	};

	const handleCreateFest = async () => {
		let jsonData = {
			name: fest.name,
			description: fest.description,
			startdate: fest.startdate,
			enddate: fest.enddate,
			state: fest.state,
			city: fest.city,
			organisation: org.label,
		};
		CreateFest(jsonData);
		setOpen(false);
	};

	const handleClickOpenFill = () => {
		const sdate = new Date(formdata.startdate)
		const edate = new Date(formdata.enddate)

		let startdate = sdate.getFullYear() + "-" + (sdate.getMonth() < 9 ? "0" + (sdate.getMonth() + 1) : (sdate.getMonth() + 1)) + "-" + (sdate.getDate() < 9 ? "0" + sdate.getDate() : sdate.getDate());
		let enddate = edate.getFullYear() + "-" + (edate.getMonth() < 9 ? "0" + (edate.getMonth() + 1) : (edate.getMonth() + 1)) + "-" + (edate.getDate() < 9 ? "0" + edate.getDate() : edate.getDate());

		setFest({
			name: formdata.name,
			description: formdata.description,
			startdate: startdate,
			enddate: enddate,
			state: formdata.state,
			city: formdata.city,
		});

		setorg({ label: formdata.organisation });
		setOpen(true);
	};


	const handleClickOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	};

	return (
		<>
			{openbname === "Add Fest" ? (
				<Button sx={{ color: '#BB86FC' }} onClick={handleClickOpen} size="small">
					{openbname}
				</Button>
			) : (
				<Button sx={{ color: '#BB86FC' }} id="editbtn" onClick={handleClickOpenFill} size="small">
					{openbname}
				</Button>
			)}
			<Dialog open={open} onClose={handleClose}>
				<DialogTitle className="containertitle">{formname}</DialogTitle>
				<DialogContent className="containercontent">

					<TextField
						label="Title"
						id="name"
						type="text"
						sx={{ width: "100%" }}
						onChange={onChange}
						value={fest.name}
						name="name"
						margin="dense"
						variant="filled"
					></TextField>

					<Autocomplete
						id="combo-box-demo"
						value={org}
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
						sx={{ width: "100%" }}
						onChange={onChange}
						value={fest.description}
						name="description"
						margin="dense"
						variant="filled"
					></TextField>

					<TextField
						label="Start Date"
						id="startdate"
						type="date"
						sx={{ width: "50%" }}
						onChange={onChange}
						value={fest.startdate}
						name="startdate"
						margin="dense"
						variant="filled"
						InputProps={{ startAdornment: (<InputAdornment position="start"></InputAdornment>) }}
					></TextField>

					<TextField
						label="End Date"
						id={"enddate"}
						type={"date"}
						sx={{ width: "50%" }}
						onChange={onChange}
						value={fest.enddate}
						name="enddate"
						margin="dense"
						variant="filled"
						InputProps={{ startAdornment: (<InputAdornment position="start"></InputAdornment>) }}
					></TextField>

					<TextField
						label="State"
						id="state"
						type="text"
						sx={{ width: "50%" }}
						onChange={onChange}
						value={fest.state}
						name="state"
						margin="dense"
						variant="filled"
					></TextField>

					<TextField
						label="City"
						id="city"
						type="text"
						sx={{ width: "50%" }}
						onChange={onChange}
						value={fest.city}
						name="city"
						margin="dense"
						variant="filled"
					></TextField>
				</DialogContent>

				<DialogActions className="containerbutton">
					<Button sx={{ color: '#BB86FC' }} onClick={handleClose} size="small">
						Cancel
					</Button>
					{openbname === "Add Fest" ? (
						<Button sx={{ color: '#BB86FC' }} onClick={handleCreateFest} size="small">
							Create
						</Button>
					) : (
						<Button sx={{ color: '#BB86FC' }} onClick={() => handleUpdateFest(formdata)} size="small">
							Update
						</Button>
					)}
				</DialogActions>

			</Dialog>


		</>
	);
}

export default AddFest;
