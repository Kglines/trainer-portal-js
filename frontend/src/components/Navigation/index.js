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
        <ProfileButton user={sessionUser} />
        {/* <div className='rounded-full'>
          <select className='rounded-lg' placeholder='Profile'>
            <option>Profile</option>
            <option>Logout</option>
          </select>
        </div> */}
        <button onClick={logout} className='text-white mx-6 hover:outline px-2'>
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
    <nav className='bg-primary w-full h-10 sticky top-0'>
      {sessionUser ? (
        <ul className='flex flex-row color-white justify-around items-center'>
          <div className='flex'>
            <li className='text-white mt-2'>
              <NavLink
                exact
                to='/'
                className='text-white mx-4 hover:outline px-2'
              >
                Home
              </NavLink>
            </li>
            <li className='text-white mt-2'>
              <NavLink
                exact
                to='/clients'
                className='text-white mx-4 hover:outline px-2'
              >
                Clients
              </NavLink>
            </li>
            {sessionUser.isAdmin && <li className='text-white mt-2'>
              <NavLink
                exact
                to='/reports'
                className='text-white mx-4 hover:outline px-2'
              >
                Reports
              </NavLink>
            </li>}
          </div>
          {isLoaded && sessionLinks}
        </ul>
      ) : (
        <p className='text-white text-center text-3xl pt-1'>
          HAC Trainer Portal
        </p>
      )}
    </nav>
  );
}

export default Navigation;
