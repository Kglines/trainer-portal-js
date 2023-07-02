import React from 'react'
import { useSelector } from 'react-redux'
import { Redirect } from 'react-router-dom/cjs/react-router-dom.min';

const HomePage = () => {
  const sessionUser = useSelector(state => state.session.user);

  if(!sessionUser) return <Redirect to='/'/>
  return (
    <div className='sm:w-full md:w-5/6 bg-white mx-auto text-center h-screen'>
      <p className='text-4xl font-bold py-8'>Welcome {sessionUser.firstname}!</p>
      <div>
        <div>
          <p className='text-xl underline'>Announcements</p>
        </div>
        <div className='my-8 pb-24'>
          <ul>
            <li>
              <p>6/12 - this thing is going to happen</p>
            </li>
            <li>
              <p>6/18 - this other thing is going to happen</p>
            </li>
            <li>
              <p>6/20 - no thing is going on today</p>
            </li>
            <li>
              <p>6/12 - this thing is going to happen</p>
            </li>
            <li>
              <p>6/18 - this other thing is going to happen</p>
            </li>
            <li>
              <p>6/20 - no thing is going on today</p>
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default HomePage
