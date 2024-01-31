import React, { useState } from "react";
import { login } from "../../store/session";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import "./LoginForm.css";

function LoginFormModal() {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);
  const { closeModal } = useModal();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = await dispatch(login(email, password));
    if (data) {
      // console.log(data)
      setErrors(data);
      // errors.map((error)=>{
      //   const split = error.split(':')
      //   return split[1]
      // })
    } else {
        closeModal()
    }
  };


  return (
    <>
    <div className="signup-outer-box">
		<div className="signup-box">
      <h1>Log In</h1>
      <form onSubmit={handleSubmit}>
        <ul className="login-modal-errors">
          {errors.map((error, index) => (

              <li key={index}>{error.split(':')[1]}</li>

          ))}
        </ul>
        <label>
          Email
          <input className='signup-input'
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </label>
        <label>
          Password
          <input className='signup-input'
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>
        <button className='user-button' type="submit">Log In</button>
      </form>
      </div>
      </div>
    </>
  );
}

export default LoginFormModal;
