import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { fetchGetUsers } from '../store/users';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';

const TrainersPage = () => {
    const dispatch = useDispatch();
    // const trainers = Object.values(useSelector(state => state.users));
    const trainers = useSelector(state => state.users.users)
console.log('Trainers === ', trainers)
    useEffect(() => {
        dispatch(fetchGetUsers())
    }, [dispatch]);

  return (
    <div className='sm:w-full md:w-5/6 bg-white mx-auto text-center min-h-screen pb-2'>
      <div className='flex flex-col mx-auto xs:w-3/4 md:w-64 lg:w-80'>
        <h2 className='text-3xl pt-12'>Trainers</h2>
      </div>
      <div className='sm:w-full md:w-2/3 mx-auto mt-8 mb-12 pb-12 flex flex-col'>
        {trainers?.map(trainer => (
            <span key={trainer?.id}>
                <Link to={`/trainers/${trainer?.id}`}>{trainer?.lastname},{' '}{trainer?.firstname}</Link>
            </span>
        ))}
      </div>
    </div>
  );
}

export default TrainersPage
