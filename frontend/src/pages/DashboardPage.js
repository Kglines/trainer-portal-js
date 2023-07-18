import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { fetchGetMonthlyClientReports } from '../store/monthlyClientReports';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';

const Reports = () => {
  const dispatch = useDispatch();

  const monthlyClientReports = Object.values(useSelector(state => state.monthlyClientReports))


  useEffect(() => {
    dispatch(fetchGetMonthlyClientReports())
  }, [dispatch])

  return (
    <div className='sm:w-full md:w-5/6 bg-white mx-auto text-center min-h-screen pb-2'>
      <div className='flex flex-wrap justify-around align-center mx-4'>
        <Link
          to='/trainers'
          className='border p-36 mx-12 w-96 my-12 shadow-grey shadow-xl hover:scale-105 duration-300'
        >
          Trainers
        </Link>
        <Link
          to='/monthly-client-reports'
          className='border p-36 mx-12 w-96 my-12 shadow-grey shadow-xl hover:scale-105 duration-300'
        >
          <h2>Trainer Reports</h2>
          <p>{monthlyClientReports.length} Reports</p>
        </Link>
        <Link
          to='/machines'
          className='border p-36 mx-12 w-96 my-12 shadow-grey shadow-xl hover:scale-105 duration-300'
        >
          <h2>Equipment</h2>
        </Link>

        <div className='border p-36 mx-12 w-96 my-12 shadow-grey shadow-xl hover:scale-105 duration-300'>
          Equipment Reports
        </div>
      </div>
    </div>
  );
}

export default Reports
