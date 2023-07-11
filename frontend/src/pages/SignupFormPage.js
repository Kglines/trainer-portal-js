import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import * as sessionActions from '../store/session';

function SignupFormPage() {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [profileImg, setProfileImg] = useState('');
  const [isAdmin, setIsAdmin] = useState(false);
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errors, setErrors] = useState({});

  console.log('SET ADMIN === ', isAdmin)
  // if (sessionUser) return <Redirect to='/home' />;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password === confirmPassword) {
      setErrors({});
      return dispatch(
        sessionActions.signup({
          email,
          username,
          firstName,
          lastName,
          password,
        })
      ).catch(async (res) => {
        const data = await res.json();
        if (data && data.errors) {
          setErrors(data.errors);
        }
      });
    }
    return setErrors({
      confirmPassword:
        'Confirm Password field must be the same as the Password field',
    });
  };

  const changeAdmin = () => {
    setIsAdmin(!isAdmin)
  }

  return (
    <div className='w-auto flex flex-col'>
      <h1 className='text-white bg-primary text-center text-2xl'>
        Add Trainer
      </h1>
      <form
        onSubmit={handleSubmit}
        className='w-auto h-96 flex flex-col text-left mx-4'
      >
        <label>
          Email
          <input
            type='text'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </label>
        {errors.email && <p>{errors.email}</p>}
        <label>
          Username
          <input
            type='text'
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </label>
        {errors.username && <p>{errors.username}</p>}
        <label>
          First Name
          <input
            type='text'
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required
          />
        </label>
        {errors.firstName && <p>{errors.firstName}</p>}
        <label>
          Last Name
          <input
            type='text'
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            required
          />
        </label>
        <label>
          Trainer Picture
          <input
            type='text'
            value={profileImg}
            onChange={(e) => setProfileImg(e.target.value)}
            required
          />
        </label>
        <label>
          Admin? 
          <input
            type='checkbox'
            value={isAdmin}
            checked={isAdmin}
            onChange={changeAdmin}
            required
          />
        </label>
        {errors.lastName && <p>{errors.lastName}</p>}
        <label>
          Password
          <input
            type='password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>
        {errors.password && <p>{errors.password}</p>}
        <label>
          Confirm Password
          <input
            type='password'
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </label>
        {errors.confirmPassword && <p>{errors.confirmPassword}</p>}
        <button
          type='submit'
          className='bg-secondary hover:bg-secondaryHover text-white rounded p-2 mx-2'
        >
          Submit
        </button>
      </form>
    </div>
  );
}

export default SignupFormPage;

