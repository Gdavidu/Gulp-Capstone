import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { signUp } from "../../store/session";
import "./SignupForm.css";

function SignupFormModal() {
	const dispatch = useDispatch();
	const [firstname, setFirstname] = useState("");
	const [lastname, setLastname] = useState("");
	const [email, setEmail] = useState("");
	const [username, setUsername] = useState("");
	const [zipcode, setZipcode] = useState('');
	const [image, setImage] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [errors, setErrors] = useState([]);
	const [errorObject, setErrorObject] = useState({})
	const { closeModal } = useModal();
	// const [submitted, setSubmitted] = useState(false);





	const handleSubmit = async (e) => {
		e.preventDefault();
		// setErrorObject({})

		const errorObj = {};
		if (firstname.length >= 50) errorObj['firstname'] = "First name must be must be 50 characters or less";
		if (lastname.length >= 50) errorObj['lastname'] = "Last name must be must be 50 characters or less";
		if (!email.length) errorObj["email"] = "Email cannot be blank";
		if (email > 50) errorObj["email"] = "Email must be less than 50 characters";
		if (!email.includes('@') ) errorObj["email"] = "Invalid email (must contain an '@' and '.')";
		if (!email.includes('.') ) errorObj["email"] = "Invalid email (must contain an '@' and '.')";
		if (username.length < 5) errorObj["username"] = "Username must be 5 or more characters";
		if (username.length > 50) errorObj["username"] = "Username must be 50 characters or less";
		if (username.includes('@')) errorObj["username"] = "Username cannot be an email";
		if (!zipcode.length) errorObj['zipcode'] = 'Zipcode required'
		if (isNaN(zipcode)) errorObj['zipcode'] = 'Zipcode must be a number'
		if (!(zipcode.length === 5)) errorObj['zipcode'] = 'Zipcode must be 5 digits'
		if (password.length < 6) errorObj['password'] = "Password must be at least 6 characters long";
		if (password !== confirmPassword) errorObj['password'] = 'Passwords must match';

		if(Object.values(errorObj).length > 0){
			setErrorObject(errorObj)
			// setSubmitted(false)
			// const button = document.getElementById('signupbtn')
			// button.disabled = true
			return
		}
		if (Object.values(errorObj).length ==0) {
			// console.log('DATA IN HANDLE SUBMIT (MODAL)', firstname,lastname, zipcode, username, email, password)
			const data = await dispatch(signUp(firstname, lastname, email, username, zipcode, password));
			if (data) {
				setErrors(data);
			} else {
				closeModal();
			}
		}

	};

	return (
		<>
		<div className="signup-outer-box">
		<div className="signup-box">
			<h1>Sign Up</h1>
			<form onSubmit={handleSubmit}>
				<ul>
					{errors.map((error, idx) => (
						<li key={idx}>{error}</li>
					))}
				</ul>
				<label>
					First Name
					<input className='signup-input'
						type="text"
						value={firstname}
						onChange={(e) => setFirstname(e.target.value)}
						required
					/>
				</label>
				{errorObject.firstname && <p className='errors'>{errorObject.firstname}</p>}
				<label>
					Last Name
					<input className='signup-input'
						type="text"
						value={lastname}
						onChange={(e) => setLastname(e.target.value)}
						required
					/>
				</label>
				{errorObject.lastname && <p className='errors'>{errorObject.lastname}</p>}
				<label>
					Email
					<input className='signup-input'
						type="text"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
						required
					/>
				</label>
				{errorObject.email && <p className='errors'>{errorObject.email}</p>}
				<label>
					Username
					<input className='signup-input'
						type="text"
						value={username}
						onChange={(e) => setUsername(e.target.value)}
						required
					/>
				</label>
				{errorObject.username && <p className='errors'>{errorObject.username}</p>}
				<label>
					Zipcode
					<input className='signup-input'
						type="text"
						value={zipcode}
						onChange={(e) => setZipcode(e.target.value)}
						required
					/>
				</label>
				{errorObject.zipcode && <p className='errors'>{errorObject.zipcode}</p>}
				{/* <label>
					Profile Picture (optional)
					<input
						type="text"
						value={image}
						onChange={(e) => setImage(e.target.value)}
						required
					/>
				</label> */}
				<label>
					Password
					<input className='signup-input'
						type="password"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
						required
					/>
				</label>
				{errorObject.password && <p className='errors'>{errorObject.password}</p>}
				<label>
					Confirm Password
					<input className='signup-input'
						type="password"
						value={confirmPassword}
						onChange={(e) => setConfirmPassword(e.target.value)}
						required
					/>
				</label>
				<button className='user-button' type="submit">Sign Up</button>
			</form>
			</div>
			</div>
		</>
	);
}

export default SignupFormModal;
