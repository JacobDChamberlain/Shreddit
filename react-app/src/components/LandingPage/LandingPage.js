import React, { useState } from 'react';
import LoginForm from '../auth/LoginForm';
import SignUpForm from '../auth/SignUpForm';
import landingBgImg from '../../images/shreddit_landing_bg.png'
import shlogo from '../../images/shreddit_avatar2.png'
import shlogo2 from '../../images/shlogo.png'
import './LandingPage.css'
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { login } from '../../store/session';

const LandingPage = () => {
    const [showSignUp, setShowSignUp] = useState(false)

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
        <div className='landing-page'>
            <div className='landing-page-container'>
                <div className='image-container-left'>
                    <img alt='shreddit-home-landing-bg' className='landing-bg' src={landingBgImg}></img>
                </div>
                <div className='forms-container-right'>
                    <h2>Welcome to Shreddit!</h2>
                    {showSignUp ? <img src={shlogo2}></img> : <img src={shlogo}></img>}
                    {showSignUp ? <h3>Sign up</h3> : <h3>Log in</h3>}
                    {showSignUp ?
                    <div className='login-form-container'>
                        <SignUpForm />
                        {!currentUser &&  <button className='demo-button' type='button' onClick={handleDemo}>Demo</button>}
                        <div className='forms-footer'>
                            Already have an account?
                            <button className='switch-form-button' onClick={() => setShowSignUp(false)}>Log in</button>
                        </div>
                    </div> :
                    <div className='login-form-container'>
                        <LoginForm />
                        {!currentUser &&  <button className='demo-button' type='button' onClick={handleDemo}>Demo</button>}
                        <div className='forms-footer'>
                            Don't have an account?
                            <button className='switch-form-button' onClick={() => setShowSignUp(true)}>Sign up</button>
                        </div>
                    </div>}
                </div>
            </div>
        </div>
    )
}

export default LandingPage;
