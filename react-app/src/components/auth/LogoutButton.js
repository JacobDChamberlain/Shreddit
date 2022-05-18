import React from 'react';
import { useDispatch } from 'react-redux';
import { logout } from '../../store/session';
import { FiLogOut } from 'react-icons/fi';

const LogoutButton = () => {
  const dispatch = useDispatch()
  const onLogout = async (e) => {
    await dispatch(logout());
  };

  return <FiLogOut className='icon' onClick={onLogout}>Logout</FiLogOut>;
};

export default LogoutButton;
