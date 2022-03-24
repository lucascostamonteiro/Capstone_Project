import React from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logout } from '../../store/session';

const LogoutButton = () => {
  const history = useHistory();
  const dispatch = useDispatch()
  const onLogout = async () => {
    // e.preventDefault();
    await dispatch(logout());
    history.push('/');
  };

  return (
    <>
      <li
        className='logout-button'
        onClick={onLogout}>Logout</li>
    </>
  )
};

export default LogoutButton;
