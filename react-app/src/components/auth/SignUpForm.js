import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { Redirect } from 'react-router-dom';
import { signUp } from '../../store/session';
import './SignupForm.css'

const SignUpForm = () => {
  const [errors, setErrors] = useState([]);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [profilePic, setProfilePic] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const user = useSelector(state => state.session.user);
  const dispatch = useDispatch();

  const onSignUp = async (e) => {
    e.preventDefault();
    if (password === repeatPassword) {
      const data = await dispatch(signUp(username, email, password, profilePic));
      if (data) {
        setErrors(data)
      }
    }
  };

  const updateUsername = (e) => {
    setUsername(e.target.value);
  };

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updateProfilePic = (e) => {
    setProfilePic(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  const updateRepeatPassword = (e) => {
    setRepeatPassword(e.target.value);
  };

  if (user) {
    return <Redirect to='/' />;
  }

  return (
    <form className='signup-form' onSubmit={onSignUp}>
      <div>
        {errors.map((error, ind) => (
          <div className='error-text' key={ind}>{error}</div>
        ))}
      </div>
      <div>
        <input
          className='input-field'
          type='text'
          name='username'
          onChange={updateUsername}
          value={username}
          placeholder='Username'
        ></input>
      </div>
      <div>
        <input
          className='input-field'
          type='text'
          name='email'
          onChange={updateEmail}
          value={email}
          placeholder='Email'
        ></input>
      </div>
      <div>
        <input
          className='input-field'
          type='text'
          name='profilePic'
          onChange={updateProfilePic}
          value={profilePic}
          placeholder='Profile Picture (must be .jpg URL)'
        ></input>
      </div>
      <div>
        <input
          className='input-field'
          type='password'
          name='password'
          onChange={updatePassword}
          value={password}
          placeholder='Password'
        ></input>
      </div>
      <div>
        <input
          className='input-field'
          type='password'
          name='repeat_password'
          onChange={updateRepeatPassword}
          value={repeatPassword}
          required={true}
          placeholder='Confirm Password'
        ></input>
      </div>
      <button className='login-button' type='submit'>Continue</button>
    </form>
  );
};

export default SignUpForm;
