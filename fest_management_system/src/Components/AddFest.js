import React, { useContext, useState } from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import CustomTextField from "./CustomTextField";
import Button from "@mui/material/Button";
import universities from './universities'
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import Box from '@mui/material/Box';
import festContext from "../Context/fest/festContext"

function AddFest(props) {
	const context = useContext(festContext);
	const {CreateFest,UpdateFest} = context;
	const { openbname, formname, formdata} = props;

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

	const [org, setorg] = React.useState({label:'Select Organisation'});

	const handleChange = (e,value) => {
		if(value)
			setorg({label : value.label});
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
		UpdateFest(selfest._id,jsonData);
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

		let startdate = sdate.getFullYear() + "-" + (sdate.getMonth() < 9 ? "0" + (sdate.getMonth() + 1) : (sdate.getMonth() + 1)) + "-" + (sdate.getDate() < 9 ? "0" + (sdate.getDate() + 1) : (sdate.getDate() + 1));
		let enddate = edate.getFullYear() + "-" + (edate.getMonth() < 9 ? "0" + (edate.getMonth() + 1) : (edate.getMonth() + 1)) + "-" + (edate.getDate() < 9 ? "0" + (edate.getDate() + 1) : (edate.getDate() + 1));
		
		setFest({
			name: formdata.name,
			description: formdata.description,
			startdate: startdate,
			enddate: enddate,
			state: formdata.state,
			city: formdata.city,
		});

		setorg({label:formdata.organisation});
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
			<div>
				{openbname === "Add Fest" ? (
					<Button onClick={handleClickOpen} size="small">
						{openbname}
					</Button>
				) : (
					<Button onClick={handleClickOpenFill} size="small">
						{openbname}
					</Button>
				)}
				<Dialog open={open} onClose={handleClose}>
					<DialogTitle>{formname}</DialogTitle>
					<DialogContent>

						<CustomTextField
							label={"Title"}
							id={"name"}
							type={"text"}
							width={"100%"}
							changefunc={onChange}
							value={fest.name}
							name={"name"}
						></CustomTextField>
						
						<Autocomplete
							id="combo-box-demo"
							value={org}
							getOptionLabel={(option) => option.label}
							options={universities}
							onChange={(e,value) => {handleChange(e,value)}}
							sx={{ width: 300 }}
							renderOption={(props, option) => (
								<Box component="li" {...props} key={option.id}>
									{option.label}
								</Box>
							)}
							renderInput={(params) => <TextField {...params} label="Organsation" />}
						/>

						<CustomTextField
							label={"Description"}
							id={"description"}
							type={"text"}
							width={"100%"}
							changefunc={onChange}
							value={fest.description}
							name={"description"}
						></CustomTextField>

						<CustomTextField
							label={"Start Date"}
							date={true}
							id={"startdate"}
							type={"date"}
							width={"50%"}
							changefunc={onChange}
							value={fest.startdate}
							name={"startdate"}
						></CustomTextField>

						<CustomTextField
							label={"End Date"}
							date={true}
							id={"enddate"}
							type={"date"}
							width={"50%"}
							changefunc={onChange}
							value={fest.enddate}
							name={"enddate"}
						></CustomTextField>

						<CustomTextField
							label={"State"}
							id={"state"}
							type={"text"}
							changefunc={onChange}
							value={fest.state}
							name={"state"}
						></CustomTextField>

						<CustomTextField
							label={"City"}
							id={"city"}
							type={"text"}
							width={"50%"}
							changefunc={onChange}
							value={fest.city}
							name={"city"}
						></CustomTextField>
					</DialogContent>

					<DialogActions>
					<Button onClick={handleClose} size="small">
						Cancel
					</Button>
				{openbname === "Add Fest" ? (
					<Button onClick={handleCreateFest} size="small">
						Create
					</Button>
				) : (
					<Button onClick = {() => handleUpdateFest(formdata)} size="small">
						Update
					</Button>
				)}
					</DialogActions>

				</Dialog>
			</div>

		</>
	);
}

export default AddFest;
