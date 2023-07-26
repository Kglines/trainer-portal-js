import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom/cjs/react-router-dom.min';
import { fetchGetAUser } from '../store/users';

const TrainerDetailPage = () => {
  const dispatch = useDispatch();
  const { trainerId } = useParams();

  const trainer = useSelector(state => state.users.user);
console.log('TRAINER === ', trainer)
  useEffect(() => {
    dispatch(fetchGetAUser(trainerId))
  }, [dispatch, trainerId])

  return (
    <div className='sm:w-full md:w-5/6 bg-white mx-auto text-center min-h-screen pb-2'>
      <div className='flex justify-around pt-12 mx-auto xs:w-3/4 md:w-64 lg:w-full'>
        <img
          className='w-96 mt-4 rounded-full object-contain shadow-2xl shadow-gray'
          src={trainer?.profileImg}
          alt={trainer?.username}
        />
        <div className=''>
          <h2 className='text-3xl mx-12 pt-12'>
            {trainer?.firstname} {trainer?.lastname}
          </h2>
          <div className='my-4'>
            <div className='flex text-left justify-between'>
              <span className='font-bold text-left'>Email:</span>
              <span>{trainer?.email}</span>
            </div>
            <div className='flex text-left justify-between'>
              <span className='font-bold text-left'>Username:</span>
              <span>{trainer?.username}</span>
            </div>
            <div className='flex text-left justify-between'>
              <span className='font-bold text-left'>Hire Date:</span>
              <span>May 2, 2012</span>
            </div>
            <div className='flex text-left justify-between'>
              <span className='font-bold text-left'>Status:</span>
              <span>Full-Time</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TrainerDetailPage
