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

  const months = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ];

  console.log('USERS === ', usersReports)
  return (
    <div className='sm:w-full md:w-5/6 bg-white mx-auto text-center h-screen'>
      <div className='flex flex-col mx-auto xs:w-3/4 md:w-full mb-8'>
        <h2 className='text-3xl pt-12'>Monthly Client Reports</h2>
      </div>
      <div>
        <table>
          <thead className=''>
            <tr className=''>
              <th>Trainer</th>
              {months.map((month, idx) => (
                <th key={idx} className='px-6 odd:bg-lightGrey'>
                  {month}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {usersReports.map((user) => (
              <tr className='odd:bg-white even:bg-lightGrey h-12 text-lg'>
                <td>
                  {user.firstname} {user.lastname}
                </td>
                {user.MonthlyClientReports?.map((report) => (
                  <td>{report.month}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default MonthlyClientReportsPage
