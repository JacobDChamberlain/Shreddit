import React from 'react';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import LogoutButton from './auth/LogoutButton';
import SearchBar from './SearchBar/SearchBar';
import { HiHome } from 'react-icons/hi'

// Strange thing I've noticed:

// While on a Community page, navigating to another Community page (from search result) doesn't work.
// While on a User page, navigating to your own User page (from 'Welcome, {username}!') doesn't work.
// Both of these will update the URL properly in the browser window,
// but neither will load the proper page content.

// Looking into this; forgive me for my bountiful rookie mistakes.

const NavBar = () => {

  const currentUser = useSelector(state => state.session.user)

  return (
    <nav hidden={ currentUser ? false : true }>
      <div className='navlinks-container'>
          <NavLink className='home-button-nav' to='/' exact={true} activeClassName='active'>
            <HiHome className='icon' /> Home
          </NavLink>
          <SearchBar />
          <div className='welcome-user-div'>Welcome, <NavLink className='welcome-username' to={`/user/${currentUser?.username}/${currentUser?.id}`}>{currentUser?.username}</NavLink>!</div>
          <LogoutButton />
      </div>
    </nav>
  );
}

export default NavBar;
