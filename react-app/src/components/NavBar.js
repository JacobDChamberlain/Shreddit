import React from 'react';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import LogoutButton from './auth/LogoutButton';
import SearchBar from './SearchBar/SearchBar';
import { HiHome } from 'react-icons/hi'
import brokenLinkAvatar from '../images/shreddit_avatar.png';

const addDefaultProfilePic = (e) => {
  e.target.src = brokenLinkAvatar;
}

// Strange thing I've noticed:

// While on a User page, navigating to your own User page (from 'Welcome, {username}!') doesn't work.
// URL updates properly in the browser window,
// but proper page content is not loaded.

const NavBar = () => {

  const currentUser = useSelector(state => state.session.user)

  return (
    <nav hidden={ currentUser ? false : true }>
      <div className='navlinks-container'>
          <NavLink className='home-button-nav' to='/' exact={true} activeClassName='active'>
            <HiHome className='icon' /> Home
          </NavLink>
          <SearchBar />
          <div className='welcome-user-div'>
            <NavLink className='welcome-username' to={`/user/${currentUser?.username}/${currentUser?.id}`}>
            {currentUser?.profile_pic ?
            <img className='comm-suggestion-pic' src={currentUser?.profile_pic} onError={addDefaultProfilePic} alt="profile picture"></img> :
            <img className='comm-suggestion-pic' src={brokenLinkAvatar} alt="profile picture"></img>}
            {currentUser?.username}
            </NavLink>!
          </div>
          <LogoutButton />
      </div>
    </nav>
  );
}

export default NavBar;
