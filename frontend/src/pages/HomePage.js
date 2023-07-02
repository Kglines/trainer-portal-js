import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Redirect } from 'react-router-dom/cjs/react-router-dom.min';
import { fetchGetAnnouncements } from '../store/announcements';
import OpenModalButton from '../components/OpenModalButton';
import EditAnnouncementForm from '../components/EditAnnouncementForm.js';
import DeleteAnnouncement from '../components/DeleteAnnouncement';
import CreateAnnouncement from '../components/CreateAnnouncement';

const HomePage = () => {
  const dispatch = useDispatch();

  const sessionUser = useSelector(state => state.session.user);
  const today = new Date();
  const currentMonth = today.getMonth();
  const announcements = Object.values(useSelector(state => state.announcements)).filter(announcement => announcement.month === currentMonth + 1)

  useEffect(() => {
    dispatch(fetchGetAnnouncements())
  }, [dispatch])

  console.log('ANNOUNCEMENTS === ', announcements)

  if(!sessionUser) return <Redirect to='/'/>
  return (
    <div className='sm:w-full md:w-5/6 bg-white mx-auto text-center h-screen'>
      <p className='text-4xl font-bold py-8'>
        Welcome {sessionUser.firstname}!
      </p>
      <div>
        <div>
          <p className='text-2xl underline'>Announcements</p>
          <div className='mt-4'>
            <OpenModalButton
              className='p-2 bg-primary text-white rounded'
              buttonText='New Announcement'
              modalComponent={<CreateAnnouncement />}
            />
          </div>
        </div>
        <div className='my-8 pb-24'>
          <ul className='text-left w-4/5 mx-auto flex-row'>
            {announcements?.map((announcement) => (
              <li
                key={announcement?.id}
                className='py-1 flex flex-nowrap odd:white even:bg-lightGrey justify-between'
              >
                {announcement?.body}{' '}
                {sessionUser.isAdmin && (
                  <div className='flex justify-end'>
                    <OpenModalButton
                      buttonText='EDIT'
                      className='text-secondary px-1'
                      modalComponent={<EditAnnouncementForm />}
                    />
                    <OpenModalButton
                      modalComponent={<DeleteAnnouncement />}
                      buttonText='DELETE'
                      className='text-primary px-1'
                    />
                  </div>
                )}
              </li>
            ))}
            {/* <li>
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
            </li> */}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default HomePage
