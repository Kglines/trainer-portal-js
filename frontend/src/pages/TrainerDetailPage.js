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
      <div className='flex flex-col mx-auto xs:w-3/4 md:w-64 lg:w-80'>
        <h2 className='text-3xl pt-12'>
          {trainer?.firstname} {trainer?.lastname}
        </h2>
      </div>
    </div>
  );
}

export default TrainerDetailPage
