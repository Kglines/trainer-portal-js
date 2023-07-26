import React, { useEffect, useMemo, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { fetchGetUsersReports } from '../store/users';
import PacmanLoader from 'react-spinners/PacmanLoader';
import { fetchGetMonthlyClientReports } from '../store/monthlyClientReports';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';

const MonthlyClientReportsPage = () => {
  const dispatch = useDispatch();

  const [validationErrors, setValidationErrors] = useState([])
 
  // const usersReports = Object.values(useSelector(state => state.users))
  const usersReports = Object.values(useSelector(state => state.monthlyClientReports))
  // const usersReports = useSelector(state => state.monthlyClientReports)
  // console.log('USERS REPORTS === ', usersReports)
  useEffect(() => {
    dispatch(fetchGetMonthlyClientReports())
  }, [dispatch])

  // useEffect(() => {
    
  //   dispatch(fetchGetUsersReports()).catch(async (res) => {
  //     const data = await res.json();
  //     if (data && data.errors) setValidationErrors(data.errors);
  //   });
    
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


  function generateMonthlyReportArray(users) {
    const maxMonths = 12;
    const result = [];
    
    // Loop through users and create a new array with null for each month
    for (const user of users) {
      const monthlyReport = new Array(maxMonths).fill(null);
     
      // Loop through reports
      for (const report of user?.MonthlyClientReports) {
        // If there's a report for the month
        const month = report?.month;
        // Adjust for zero-indexed array
        const index = month - 1; 

        // Assign the month value at the index
        monthlyReport[index] = month;
      }

      result.push(monthlyReport);
    }
    
    return result;
  }

  
  const monthlyReports = useMemo(() => {
    return generateMonthlyReportArray(usersReports)
  }, [usersReports]);
  

  const reportsClass = (report) => {
    if(report !== null){
      return 'bg-secondary text-secondary border-black border-y-2 border-x-2';
    } else {
      return 'h-8 border-black border-y-2 border-x-2 odd:bg-lightGrey';
    }
  }

  if(usersReports.length === 0) return <PacmanLoader size={150} color='primary' title='No Reports' />

  return (
    <div className='sm:w-full md:w-5/6 bg-white mx-auto text-center h-screen overflow-auto'>
      <div className='flex flex-col mx-auto xs:w-3/4 md:w-full mb-8'>
        <h2 className='text-3xl pt-12'>Monthly Client Reports</h2>
      </div>
      <div className='flex lg:justify-center md:w-full'>
        {validationErrors?.map((error) => (
          <li key={error}>{error}</li>
        ))}
        <>
          <table className='border border-collapse gap-0'>
            <thead className='border border-collapse'>
              <tr className='border border-collapse  border-y-2 border-x-2'>
                <th>Trainer</th>
              </tr>
            </thead>
            <tbody className='border border-collapse'>
              {usersReports?.map((user) => (
                <tr
                  key={user?.id}
                  className='even:bg-lightGrey border border-y-2 border-x-2'
                >
                  <td className='p-2 hover:text-secondary'>
                    <Link to={`/trainers/${user?.id}`}>
                      {user?.lastname}, {user?.firstname}
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <table className='border border-collapse gap-0'>
            <thead className='border border-collapse'>
              <tr className='border border-collapse'>
                {months?.map((month, idx) => (
                  <th
                    key={idx}
                    className='px-6 odd:bg-lightGrey border  border-y-2 border-x-2'
                  >
                    {month}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className='border border-collapse'>
              {monthlyReports?.map((reports, index) => (
                <tr key={index} className='px-6 even:bg-lightGrey'>
                  {reports?.map((report, index) => (
                    <td key={index} className={reportsClass(report)}>
                      {report}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </>
      </div>
    </div>
  );
}

export default MonthlyClientReportsPage
