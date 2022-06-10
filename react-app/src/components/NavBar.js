import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useHistory } from 'react-router-dom';
import { login } from '../store/session';
import LogoutButton from './auth/LogoutButton';
import { HiHome } from 'react-icons/hi'


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
          {currentUser && <NavLink className='home-button-nav' to='/' exact={true} activeClassName='active'>
            <HiHome className='icon' /> Home
          </NavLink>}
          {/* {!currentUser &&  <NavLink to='/login' exact={true} activeClassName='active'>
            Login
          </NavLink>} */}
          {!currentUser &&  <button className='demo-button' type='button' onClick={handleDemo}>Demo</button>}
          {/* {!currentUser && <NavLink to='/sign-up' exact={true} activeClassName='active'>
            Sign Up
          </NavLink>} */}
          {currentUser && <LogoutButton />}
      </div>
    </nav>
  );
}

export default NavBar;
