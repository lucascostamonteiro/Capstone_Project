import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from "react-router-dom";
import * as sessionActions from '../../store/session';
import LogoutButton from '../auth/LogoutButton';
// import MyListings from "../MyListings";

function UserProfile() {
  const dispatch = useDispatch();
  const sessionUser = useSelector(state => state.session.user);
  const [showMenu, setShowMenu] = useState(false);

  const openMenu = () => {
    if (showMenu) return;
    setShowMenu(true);
  };

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = () => {
      setShowMenu(false);
    };

    document.addEventListener('click', closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  const logout = (e) => {
    e.preventDefault();
    dispatch(sessionActions.logout());
  };

  return (
    <>
      <button className="profile-menu" onClick={openMenu}>
        <i className="fas fa-bars"></i>
        <i className="fas fa-user-circle"></i>
      </button>
      {showMenu && (
        <div className="dropdown-list">
          <p className="username-dropdown">Hello, {sessionUser?.username}</p>
          <div>
            <NavLink className="user-listings" to={`/mylistings/${sessionUser?.id}`}>
              <p className="user-listings-text">
                My Listings
              </p>
            </NavLink>
          </div>
          <span><LogoutButton /></span>
        </div>
      )}
    </>
  );
};

export default UserProfile;
