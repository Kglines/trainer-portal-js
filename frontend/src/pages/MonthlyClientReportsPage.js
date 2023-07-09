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
      console.log('RESULT ============ ', result[0])
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
    <div className='sm:w-full md:w-5/6 bg-white mx-auto text-center h-screen'>
      <div className='flex flex-col mx-auto xs:w-3/4 md:w-full mb-8'>
        <h2 className='text-3xl pt-12'>Monthly Client Reports</h2>
      </div>
      <div className='flex'>
        <table>
          <thead className=''>
            <tr className=''>
              <th>Trainer</th>
            </tr>
          </thead>
          <tbody>
            {usersReports.map((user) => (
              <tr key={user?.id}>{user?.firstname}</tr>
            ))}
          </tbody>
        </table>
        <table>
          <thead className=''>
            <tr className=''>
              {months.map((month, idx) => (
                <th key={idx} className='px-6 odd:bg-lightGrey'>
                  {month}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
              {monthlyReports.map((reports, index) => (
                    <tr>
                  {reports.map((report, idx) => (
                      <td key={report?.id}>{report}</td>
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
