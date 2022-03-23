import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { Link } from "react-router-dom";
import LogoutButton from '../auth/LogoutButton';


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


  return (
    <>
      <button className="profile-menu" onClick={openMenu}>
        <i className="fas fa-bars"></i>
        <i className="fas fa-user-circle"></i>
      </button>
      {showMenu && (
        <ul className="dropdown-list">
          <li className="username-dropdown">Hello, {sessionUser?.username}</li>
          <Link className="user-listings" to={`/mylistings/${sessionUser?.id}`}>
            <li className="user-listings-text">My Listings</li>
          </Link>
          <LogoutButton />
        </ul>
      )}
    </>
  );
};

export default UserProfile;
