// frontend/src/components/SignupForm/index.js
import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import styles from './SignupForm.module.css'

import * as sessionActions from '../../store/session';

const SignupFormPage = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.session.user)
  const [ username, setUsername ] = useState("");
  const [ email, setEmail ] = useState("");
  const [ password, setPassword ] = useState("");
  const [ confirmPassword, setConfirmPassword ] = useState("");
  const [ errors, setErrors ] = useState([]);

  if (user) return <Redirect to='/' />;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password === confirmPassword) {
      setErrors([]);
      return dispatch(sessionActions.signup({ username, email, password}))
        .catch(async (res) => {
          const data = await res.json();
          if (data && data.errors) setErrors(data.errors);
        });
    }
    return setErrors(['Passwords must match!'])
  }

  return (
    <form onSubmit={handleSubmit}>
      <ul>
        {errors.map((error, idx) => <p key={idx}>{error}</p>)}      </ul>
      <label>
        {/* Username */}
        <div>
          <input
            className={styles.input}
            type='text'
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder='Username'
            required
            />
        </div>
      </label>
      <label>
        {/* Email */}
        <div>
          <input
            className={styles.input}
            type='email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder='Email'
            required
            />
        </div>
      </label>
      <label>
        {/* Password */}
        <div>
          <input
            className={styles.input}
            type='password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder='Enter Password'
            required
            />
        </div>
      </label>
      <label>
        {/* Confirm Password */}
        <div>
          <input
            className={styles.input}
            type='password'
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder='Confirm Password'
            required
          />
        </div>
      </label>
      <div>
        <button
          className={styles.button}
          type='submit'
        >Sign Up
        </button>
      </div>
    </form>
  )
}

export default SignupFormPage;
