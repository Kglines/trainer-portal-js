import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { fetGetUsersReports, fetchGetUsers } from '../store/users';

const MonthlyClientReportsPage = () => {
  const dispatch = useDispatch();

  const users = useSelector(state => state.users);
  const usersReports = useSelector(state => state.users);

  useEffect(() => {
    dispatch(fetchGetUsers())
    
  }, [dispatch]);

  useEffect(() => {
    dispatch(fetGetUsersReports());
  }, [dispatch])

  console.log('USERS === ', usersReports)
  return (
    <div className='sm:w-full md:w-5/6 bg-white mx-auto text-center h-screen'>
      <div>
        <h2>Monthly Client Reports</h2>
      </div>
      <div></div>
    </div>
  );
}

export default MonthlyClientReportsPage
