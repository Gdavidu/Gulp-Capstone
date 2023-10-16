import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css';
import { useHistory } from 'react-router-dom';

function Navigation({ isLoaded }){
	const sessionUser = useSelector(state => state.session.user);
	const history = useHistory();
	const createBusiness = (e) => {
		e.preventDefault();
		history.push('/businesses/new')
	  }
	return (

		<ul className='nav-bar'>
			<div className='nav-container'>
			<li className="logo-li">
				<NavLink id='noDeco' exact to="/"><span id="logo">Gulp </span><i className="fa-brands fa-yelp fa-2xl"></i></NavLink>
			</li>
			<div className='left-nav'>
				{sessionUser ? (
			<li>
			<button onClick={createBusiness}>Create a Business</button>
			</li>): null
				}
			{isLoaded && (
				<li>
					<ProfileButton user={sessionUser} />
				</li>
			)}
			</div>
			</div>
		</ul>

	);
}

export default Navigation;
