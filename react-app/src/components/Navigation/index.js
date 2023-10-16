import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector,useDispatch } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css';
import { useModal } from "../../context/Modal";
import { login, logout } from "../../store/session";
import OpenModalButton from "../OpenModalButton";
import LoginFormModal from "../LoginFormModal";
import { useHistory } from 'react-router-dom';
import SignupFormModal from "../SignupFormModal";

function Navigation({ isLoaded }){
	const dispatch = useDispatch();
	const { closeModal } = useModal();
	const sessionUser = useSelector(state => state.session.user);
	const history = useHistory();
	const loginDemo = (e) => {
		e.preventDefault();

		dispatch(login('demo@aa.io', 'password')).then(closeModal()).then(history.push('/'))
	  }
	const createBusiness = (e) => {
		e.preventDefault();
		history.push('/businesses/new')
	  }
	return (

		<ul className='nav-bar'>
			<div className='nav-container'>
			<li className="logo-li">
				<NavLink id='noDeco' exact to="/"><span id="logo">Gulp </span><div className='alignlogo'><i className="fa-brands fa-yelp fa-2xl"></i></div></NavLink>
			</li>
			<div className='left-nav'>
				{sessionUser ? (
			<li>
			<button className='button-nav' onClick={createBusiness}>Create a Business</button>
			</li>): null
				}
			{isLoaded && sessionUser? (
				<li>
					<ProfileButton id='profile-btn' user={sessionUser} />
				</li>
			):
			<>
			
            <OpenModalButton
              buttonText="Log In"
			  buttonClass='button-nav'
              modalComponent={<LoginFormModal />}
            />

            <OpenModalButton
              buttonText="Sign Up"
			  buttonClass='button-nav'
              modalComponent={<SignupFormModal />}
			  />

            <button className='button-nav' id="demo-login" onClick={loginDemo} >Demo User</button>
          </>
			}
			</div>
			</div>
		</ul>

	);
}

export default Navigation;
