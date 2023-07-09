import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { fetGetUsersReports, fetchGetUsers } from '../store/users';

const MonthlyClientReportsPage = () => {
  const dispatch = useDispatch();

  const users = useSelector(state => state.users);
  const usersReports = Object.values(useSelector(state => state.users)).slice(2);

  // useEffect(() => {
  //   dispatch(fetchGetUsers())
    
  // }, [dispatch]);
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

  useEffect(() => {
    dispatch(fetGetUsersReports());
  }, [dispatch])

  function generateMonthlyReportArray(users) {
    const maxMonths = 12;
    const result = [];

    for (const user of users) {
      const monthlyReport = new Array(maxMonths).fill(null);

      for (const report of user?.MonthlyClientReports) {
        const month = report?.month;
        const index = month - 1; // Adjust for zero-indexed array

        monthlyReport[index] = month;
      }

      result.push(monthlyReport);
    }

    return result;
  }

  const monthlyReports = generateMonthlyReportArray(usersReports)
// console.log('MONTHLY REPORTS ARRAY ************************ ', monthlyReports?.map((reports, index) => {
//   console.log('INDEX, REPORTS', index, reports)
//   reports.map((report, index) => {
//     console.log('RRRRRR IIIIIII ===== ', report)
//   })
// }));

  

  return (
    <div className='sm:w-full md:w-5/6 bg-white mx-auto text-center h-screen overflow-auto'>
      <div className='flex flex-col mx-auto xs:w-3/4 md:w-full mb-8'>
        <h2 className='text-3xl pt-12'>Monthly Client Reports</h2>
      </div>
      <div className='flex lg:justify-center md:w-full'>
        <table>
          <thead className='border border-collapse'>
            <tr className='border border-collapse'>
              <th>Trainer</th>
            </tr>
          </thead>
          <tbody className='border border-collapse'>
            {usersReports.map((user) => (
              <tr key={user?.id} className='even:bg-lightGrey border'>
                {user?.firstname}
              </tr>
            ))}
          </tbody>
        </table>
        <table className='border border-collapse'>
          <thead className='border border-collapse'>
            <tr className='border border-collapse'>
              {months.map((month, idx) => (
                <th key={idx} className='px-6 odd:bg-lightGrey border'>
                  {month}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className='border border-collapse'>
            {monthlyReports.map((reports, index) => (
              <tr className='even:bg-lightGrey border'>
                {reports.map((report, idx) => (
                  <td key={report?.id} className='border border-collapse'>
                    {/* <input type='checkbox' checked={report} readOnly/> */}
                    <div className='bg-secondary w-4 text-center mx-auto text-secondary'>
                      {report}
                    </div>
                  </td>
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
