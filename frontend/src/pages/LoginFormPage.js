// frontend/src/components/LoginFormPage/index.js
import React, { useState } from 'react';
import * as sessionActions from '../store/session';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';

function LoginFormPage() {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const [credential, setCredential] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});

  if (sessionUser) return <Redirect to='/home' />;

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors({});
    return dispatch(sessionActions.login({ credential, password })).catch(
      async (res) => {
        const data = await res.json();
        if (data && data.errors) setErrors(data.errors);
      }
    );
  };

  return (
    <div className='flex flex-col text-center w-96 mt-40 mx-auto flex-nowrap bg-white rounded-md'>
      <h1 className='text-center bg-primary text-white w-full px-0 mx-0'>Log In</h1>
      <form onSubmit={handleSubmit} className='border-solid py-4 flex flex-col'>
        <label>
          Username or Email
          <input
            type='text'
            value={credential}
            onChange={(e) => setCredential(e.target.value)}
            required
          />
        </label>
        <label>
          Password
          <input
            type='password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>
        {errors.credential && <p>{errors.credential}</p>}
        <button
          type='submit'
          className='bg-secondary text-white rounded px-4 py-1 w-40 mx-auto my-4'
        >
          Log In
        </button>
      </form>
    </div>
  );
}

export default LoginFormPage;
