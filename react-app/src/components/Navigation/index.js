import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css';
import { useModal } from "../../context/Modal";
import { login, logout } from "../../store/session";
import OpenModalButton from "../OpenModalButton";
import LoginFormModal from "../LoginFormModal";
import { useHistory } from 'react-router-dom';
import SignupFormModal from "../SignupFormModal";
import SearchBar from './SearchBar';

function Navigation({ isLoaded }) {
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
		<>
			<ul className='nav-bar'>
				<div className='nav-container'>
					<li className="logo-li">
						<NavLink id='noDeco' exact to="/"><span id="logo">Gulp </span><div className='alignlogo'><i className="fa-brands fa-yelp fa-2xl"></i></div></NavLink>
						{/* <div id='siteFooter'>
            <a className='links' href="https://github.com/Gdavidu/Gulp-Capstone">My Github</a>
            <a  className='links' href="www.linkedin.com/in/david-gu-79ab311b5">My Linkedin</a>
        </div> */}
					</li>
					<li className='search-bar'>
						<SearchBar id='searchbar' />
					</li>
					<div className='left-nav'>
						{sessionUser ? (
							<li>
								<button className='button-nav' onClick={createBusiness}>Create a Business</button>
							</li>) : null
						}
						{isLoaded && sessionUser ? (
							<li>
								<ProfileButton id='profile-btn' user={sessionUser} />
							</li>
						) :
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
			{/* {window.onload??
			<footer class="footer">
				<div class="about-wrapper">
					<div class="foot-links">
						<div class="foot-text">
							Developer Links
						</div>
						<ul class="menu">
							<li class="menu__item"><a class="menu__link" target="_blank" href="https://github.com/Gdavidu"><i
								class="fa fa-brands fa-github fa-xl"></i>
								<div class="links-text">Github</div>
							</a></li>
							<li class="menu__item"><a class="menu__link" target="_blank"
								href="https://linkedin.com/in/david-gu-79ab311b5"><i class="fa fa-brands fa-linkedin fa-xl"></i>
								<div id="linkedin-text" class="links-text">Linkedin</div>
							</a></li>
							<li class="menu__item"><a class="menu__link" target="_blank"
								href="https://docs.google.com/document/d/1s5hz7BysUVVQjtCYFqws1WLpM0qSGWMIgOzcqxPqBkM/edit?usp=sharing"><i
									class="fa-solid fa-file fa-lg"></i>
								<div id='resume' class="links-text">Resume</div>
							</a></li>
						</ul>
					</div>
					<div class="foot-links">
						<div class="foot-text">
							Contact Me
						</div>
						<ul class="menu">
							<li class="menu__item">
								<div class="contact-link"><i class="fa fa-solid fa-phone fa-rotate-90 fa-lg"></i>
									<div class="phone-links-text">(408)-477-5696</div>
								</div>
							</li>
							<li class="menu__item">
								<div class="contact-link"><i class="fa fa-solid fa-envelope fa-lg"></i>
									<div id='emailtxt' class="links-text">david_gu@yahoo.com</div>
								</div>
							</li>

						</ul>
					</div>
					<div class="foot-links">
						<div class="foot-tech">
							Tech Stack
						</div>
						<div class="teck-stak">
							Backend: Python, Flask, Django
						</div>
						<div class="teck-stak">
							Database: PostgreSQL
						</div>
						<div class="teck-stak">
							Frontend: Javascript, React-Redux
						</div>
					</div>
				</div>
				<p>&copy;2023 David Gu | All Rights Reserved</p>

			</footer>}
			 */}
		</>
	);
}

export default Navigation;
