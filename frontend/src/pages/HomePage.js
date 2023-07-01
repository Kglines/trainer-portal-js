import React from 'react'
import { useSelector } from 'react-redux'
import { Redirect } from 'react-router-dom/cjs/react-router-dom.min';

const HomePage = () => {
  const sessionUser = useSelector(state => state.session.user);

  if(!sessionUser) return <Redirect to='/'/>
  return (
    <div className='sm:w-full md:w-5/6 bg-white mx-auto text-center h-auto'>
      <p className='text-4xl font-bold py-8'>Welcome {sessionUser.firstname}!</p>
      <div>
        <div>
          <p>Announcements</p>
        </div>
      </div>
    </div>
  )
}

export default HomePage
