// frontend/src/components/Navigation/ProfileButton.js
import React, { useState, useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import * as sessionActions from '../../store/session';

function ProfileButton({ user }) {
  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false);
  const ulRef = useRef();

  const openMenu = () => {
    if (showMenu) return;
    setShowMenu(true);
  };

  useEffect(() => {
    if (!showMenu) return;

    
    const closeMenu = (e) => {
      if (!ulRef.current.contains(e.target)) {
        console.log('YOU ARE CLOSING!!!')
        setShowMenu(false);
      }
      setShowMenu(false);
    };

    document.addEventListener('click', closeMenu);

    return () => document.removeEventListener('click', closeMenu);
  }, [showMenu]);

  const closeMenu = () => setShowMenu(false);

  const logout = (e) => {
    e.preventDefault();
    dispatch(sessionActions.logout());
  };

  const ulClassName = 'profile-dropdown' + (showMenu ? '' : ' hidden');
  console.log('Show Menu === ', showMenu)
  return (
    <>
      <button onClick={openMenu} data-dropdown-toggle='profile-data' className='text-white'>
        <i className='fas fa-user-circle' />
      </button>
      {showMenu && (
        <ul id='profile-data' className={ulClassName} ref={ulRef}>
            <li>{user.username}</li>
            <li>
            {user.firstName} {user.lastName}
            </li>
            <li>{user.email}</li>
            <li>
            <button onClick={logout} className='bg-secondary text-white'>Log Out</button>
            </li>
        </ul>
      )}
    </>
  );
}

export default ProfileButton;
