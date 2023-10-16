import React, { useState, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { login, logout } from "../../store/session";
import { useModal } from "../../context/Modal";
import OpenModalButton from "../OpenModalButton";
import LoginFormModal from "../LoginFormModal";
import { useHistory } from 'react-router-dom';
import SignupFormModal from "../SignupFormModal";

function ProfileButton({ user }) {
  const dispatch = useDispatch();
  const { closeModal } = useModal();
  const [showMenu, setShowMenu] = useState(false);
  const history = useHistory();
  const ulRef = useRef();


  const openMenu = () => {
    if (showMenu) return;
    setShowMenu(true);
  };

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = (e) => {
      if (!ulRef.current.contains(e.target)) {
        setShowMenu(false);
      }
    };

    document.addEventListener("click", closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  const handleLogout = (e) => {
    e.preventDefault();
    dispatch(logout());
  };

  const handleMyBusiness = (e) => {
    e.preventDefault();
    history.push('/mybusinesses')
  }
  const ulClassName = "profile-dropdown" + (showMenu ? "" : " hidden");
  const closeMenu = () => setShowMenu(false);

  const loginDemo = (e) => {
    e.preventDefault();

    dispatch(login('demo@aa.io', 'password')).then(closeModal()).then(history.push('/'))
  }

  return (
    <>
    <div className="menu-div">
      <button className='profile-btn' onClick={openMenu}>
      <i className="fa fa-solid fa-user"></i>
      </button>
      <ul className={ulClassName} ref={ulRef}>
        {user && (
          <>
            <li className="dropdown-ele">Hello {user.firstname}!</li>
            <li className="dropdown-ele">{user.email}</li>
            <li className="dropdown-ele">
            <button className='dropdown-btns' onClick={handleMyBusiness}>{user.firstname}'s Businesses</button>
            </li>
            <li className="dropdown-ele">
              <button className='dropdown-btns' onClick={handleLogout}>Log Out</button>
            </li>
          </>
        ) }
      </ul>
      </div>
    </>
  );
}

export default ProfileButton;
