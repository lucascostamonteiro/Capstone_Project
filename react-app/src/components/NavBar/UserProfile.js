import React, { useState, useEffect } from "react";
import { useSelector } from 'react-redux';
import { Link } from "react-router-dom";
import LogoutButton from '../auth/LogoutButton';


function UserProfile() {
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


  return (
    <>
      <button className="profile-menu" onClick={openMenu}>
        <i className="fas fa-bars"></i>
        <i className="fas fa-user-circle"></i>
      </button>
      {showMenu && (
        <ul className="dropdown-list">
          <li className="username-dropdown">Hello, <span className="username-span">{sessionUser?.username}</span></li>
          <Link className="user-listings" to={`/mylistings/${sessionUser?.id}`}>
            <li className="user-listings-text">My Listings</li>
          </Link>
          <Link className="user-bookings" to={`/mybookings/${sessionUser?.id}`}>
            <li className="user-bookings-text">My Bookings</li>
          </Link>
          <LogoutButton />
        </ul>
      )}
    </>
  );
};

export default UserProfile;
