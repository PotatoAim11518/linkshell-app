// frontend/src/components/LoginFormPage/index.js
import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import styles from './LoginForm.module.css'

import * as sessionActions from '../../store/session';

const LoginFormPage = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.session.user)
  const [ credential, setCredential ] = useState("");
  const [ password, setPassword ] = useState("");
  const [ errors, setErrors ] = useState([]);

  if (user) return (
    <Redirect to="/" />
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors([]);
    return dispatch(sessionActions.login({ credential, password}))
      .catch(async (res) => {
        const data = await res.json();
        if (data && data.errors) setErrors(data.errors);
      });
  }

  return (
    <form onSubmit={handleSubmit}>
      <ul>
        {errors.map((error, idx) => <p key={idx}>{error}</p>)}      </ul>
      <label>
        {/* Username or Email */}
        <div>
          <input
            className={styles.input}
            type='text'
            value={credential}
            onChange={(e) => setCredential(e.target.value)}
            placeholder='Username or Email'
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
      <div>
        <button className={styles.button} type='submit'>Log In</button>

      </div>
    </form>
  )
}

export default LoginFormPage;
