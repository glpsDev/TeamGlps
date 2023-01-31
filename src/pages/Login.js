import React from 'react';
import { useState, useEffect, useHistory, useRef ,useContext} from "react";
import Logo from '../assets/img/Jana-Small-Finance-logo4.jpg';
import "../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faLock } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import { fetchUrl } from '../Config';

function Login(props) {

	const Url=fetchUrl
	const login = "/login"
	const [inputs, setInputs] = useState({});
	const [error, seterror] = useState();
	// const [data, setData] = useState();
	const userref = useRef();
	const passref = useRef();
	const Navigate = useNavigate()
	const [loading, setLoading] = useState(false);

	const [open, setOpen] = React.useState(false);

	const handleClose = () => {
		setTimeout(() => {
			setOpen(false);
		  }, 1000);
	};


	const handleToggle = () => {
		setOpen(!open);
	}

	const handleChange = (event) => {
		const name = event.target.name;
		const value = event.target.value;
		setInputs(values => ({ ...values, [name]: value }))
		
	}

	const handleSubmit = (event) => {

		event.preventDefault();
		if (userref.current.value == "") {
			alert("Please Enter User Name")
			Navigate("/");
			return;
		}

		if (passref.current.value == "") {
			alert("Please Enter Password")
			Navigate("/");
			return;
		}

		handleToggle()

		
		const requestOptions = {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({
				"userID": inputs.username,
				"password": inputs.password
			})
		};

		 fetch(Url+login, requestOptions)
			.then(response => response.json())
			.then((response) => {
				handleClose()				
				if (response.errorMessage == 'Error') {
					alert(response.message)
					Navigate("/");
				} else {
					Navigate("/index", { state: response });
					if (response.message) {
					
					  }
					handleClose()
					
				}						
			})
	}
	return (
		<>
			<div className="hero-img  login-page">
				<div className="login-content">
					<div className='row h-100'>
						<div className="col-6 d-flex justify-content-center align-items-center h-100">
							<div className="card rounded  p-4 shadow-lg">
								<div className="text-center mb-4">
									<img className="" src={Logo} />
								</div>
								<form action="login" className="form" onSubmit={handleSubmit}>
									{/* <div className='loginerror'>{error}{data}</div> */}
									<div className="input-div one mt-3">
										<div className="i">
											<FontAwesomeIcon icon={faUser} />
										</div>
										<div className="div">
											<input type="text" className="form-control" id="username" name="username"
												autoComplete="off" maxLength="50" minlenght="1" placeholder="User Name" ref={userref} value={inputs.username || ""}
												onChange={handleChange} />
										</div>
									</div>
									<div className="input-div pass mb-4">
										<div className="i">
											<FontAwesomeIcon icon={faLock} />
										</div>
										<div className="div">
											<input type="password" className="form-control" id="password"
												name="password" autoComplete="off" maxLength="30" minlenght="8" placeholder="Password" ref={passref} value={inputs.password || ""}
												onChange={handleChange} />
										</div>
									</div>
									<input type="submit" value="Login" className="btn text-center my-2" id="loginSubmit" >
									</input>
									<Backdrop
										sx={{ color: 'deeppink', zIndex: (theme) => theme.zIndex.drawer + 1 }}
										open={open}
										onClick={handleClose}>
										<CircularProgress color="inherit" />
									</Backdrop>
								</form>

							</div>
						</div>
						<div className="col-6 d-flex justify-content-center align-items-center h-100">
						</div>
					</div>
				</div>
			</div>
		</>
	);
}

export default Login;