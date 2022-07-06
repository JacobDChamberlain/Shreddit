import React from 'react';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import LogoutButton from './auth/LogoutButton';
import SearchBar from './SearchBar/SearchBar';
import { HiHome } from 'react-icons/hi'


const NavBar = () => {


  const currentUser = useSelector(state => state.session.user)

  return (
    <nav hidden={ currentUser ? false : true }>
      <div className='navlinks-container'>
          <NavLink className='home-button-nav' to='/' exact={true} activeClassName='active'>
            <HiHome className='icon' /> Home
          </NavLink>
          <SearchBar />
          <div>Welcome, <NavLink className='welcome-username' to={`/user/${currentUser?.username}/${currentUser?.id}`}>{currentUser?.username}</NavLink>!</div>
          <LogoutButton />
      </div>
    </nav>
  );
}

export default NavBar;
