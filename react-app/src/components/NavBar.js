import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useHistory } from 'react-router-dom';
import { login } from '../store/session';
import LogoutButton from './auth/LogoutButton';
import SearchBar from './SearchBar/SearchBar';
import { HiHome } from 'react-icons/hi'


const NavBar = () => {

  const dispatch = useDispatch()
  const history = useHistory()

  const currentUser = useSelector(state => state.session.user)

  return (
    <nav hidden={currentUser ? false : true}>
      <div className='navlinks-container'>
          {currentUser && <NavLink className='home-button-nav' to='/' exact={true} activeClassName='active'>
            <HiHome className='icon' /> Home
          </NavLink>}
          {/* {!currentUser &&  <NavLink to='/login' exact={true} activeClassName='active'>
            Login
          </NavLink>} */}
          {currentUser && <SearchBar />}
          {/* {!currentUser && <NavLink to='/sign-up' exact={true} activeClassName='active'>
            Sign Up
          </NavLink>} */}
          {currentUser && <LogoutButton />}
      </div>
    </nav>
  );
}

export default NavBar;
