// frontend/src/components/Navigation/index.js
import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import ProfileButton from '../ProfileButton';
import * as sessionActions from '../../store/session';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
// import './Navigation.css';

function Navigation({ isLoaded }) {
  const sessionUser = useSelector((state) => state.session.user);
  const dispatch = useDispatch();
  const history = useHistory();

  const logout = (e) => {
    e.preventDefault();
    dispatch(sessionActions.logout());
    history.push('/')
  };

  let sessionLinks;
  if (sessionUser) {
    sessionLinks = (
      <li className='flex mt-2'>
        {/* <ProfileButton user={sessionUser} /> */}
        <button onClick={logout} className='text-white mx-6'>
          Log Out
        </button>
      </li>
    );
  } else {
    sessionLinks = (
      <li className='flex flex-row mt-2'>
        <NavLink to='/' className='text-white mx-6'>
          Log In
        </NavLink>
        <NavLink to='/signup' className='text-white'>
          Sign Up
        </NavLink>
      </li>
    );
  }

  return (
    <nav className='bg-primary w-full h-10'>
      <ul className='flex flex-row color-white justify-around items-center'>
        <li className='text-white mt-2'>
          <NavLink exact to='/' className='text-white'>
            Home
          </NavLink>
        </li>
        {isLoaded && sessionLinks}
      </ul>
    </nav>
  );
}

export default Navigation;
