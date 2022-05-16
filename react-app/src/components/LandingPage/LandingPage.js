import React, { useState } from 'react';
import LoginForm from '../auth/LoginForm';
import SignUpForm from '../auth/SignUpForm';
import landingBgImg from '../../images/shreddit_landing_bg.png'
import './LandingPage.css'

const LandingPage = () => {
    const [showSignUp, setShowSignUp] = useState(false)

    return (
        <div className='landing-page'>
            <div className='landing-page-container'>
                <div className='image-container-left'>
                    <img alt='shreddit-home-landing-bg' className='landing-bg' src={landingBgImg}></img>
                </div>
                <div className='forms-container-right'>
                    <h2>Welcome to Shreddit!</h2>
                    {showSignUp ? <h3>Sign up</h3> : <h3>Log in</h3>}
                    {showSignUp ?
                    <div className='login-form-container'>
                        <SignUpForm />
                        <div className='forms-footer'>
                            Already have an account?
                            <button className='switch-form-button' onClick={() => setShowSignUp(false)}>Log in</button>
                        </div>
                    </div> :
                    <div className='login-form-container'>
                        <LoginForm />
                        <div className='forms-footer'>
                            Don't have an account?
                            <button className='show-form-button' onClick={() => setShowSignUp(true)}>Sign up</button>
                        </div>
                    </div>}
                </div>
            </div>
        </div>
    )
}

export default LandingPage;
