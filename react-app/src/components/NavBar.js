import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useHistory } from 'react-router-dom';
import { login } from '../store/session';
import LogoutButton from './auth/LogoutButton';


const NavBar = () => {

  const dispatch = useDispatch()
  const history = useHistory()

  const currentUser = useSelector(state => state.session.user)

  const handleDemo = async (e) => {
    e.preventDefault()

    const demoUser = {
      email: 'demo@aa.io',
      password: 'password'
    }

    await dispatch(login(demoUser.email, demoUser.password))
    history.push('/')
  }

  return (
    <nav>
      <div className='navlinks-container'>
          {currentUser && <NavLink to='/' exact={true} activeClassName='active'>
            Home
          </NavLink>}
          {!currentUser &&  <NavLink to='/login' exact={true} activeClassName='active'>
            Login
          </NavLink>}
          {!currentUser &&  <button className='demo-button' type='button' onClick={handleDemo}>Demo</button>}
          {!currentUser && <NavLink to='/sign-up' exact={true} activeClassName='active'>
            Sign Up
          </NavLink>}
          {currentUser && <NavLink to='/sh' exact={true} activeClassName='active'>
            Communities
          </NavLink>}
          {currentUser && <LogoutButton />}
      </div>
    </nav>
  );
}

export default NavBar;
