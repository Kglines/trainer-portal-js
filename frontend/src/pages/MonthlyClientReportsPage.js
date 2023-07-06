import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { fetGetUsersReports, fetchGetUsers } from '../store/users';

const MonthlyClientReportsPage = () => {
  const dispatch = useDispatch();

  const users = useSelector(state => state.users);
  const usersReports = Object.values(useSelector(state => state.users));

  // useEffect(() => {
  //   dispatch(fetchGetUsers())
    
  // }, [dispatch]);

  useEffect(() => {
    dispatch(fetGetUsersReports());
  }, [dispatch])

  console.log('USERS === ', usersReports)
  return (
    <div className='sm:w-full md:w-5/6 bg-white mx-auto text-center h-screen'>
      <div className='flex flex-col mx-auto xs:w-3/4 md:w-full mb-8'>
        <h2 className='text-3xl pt-12'>Monthly Client Reports</h2>
      </div>
      <div>
        {usersReports?.map((user) => (
          <div className='flex justify-between'>
            <p className='text-left ml-4'>
              {user.firstname}{' '}{user.lastname}{' '}
            </p>
            <div className='flex justify-end align-middle'>
              {user.MonthlyClientReports.map(report => (
                <p className='mx-4' key={report.id}>{report.month}</p>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default MonthlyClientReportsPage
