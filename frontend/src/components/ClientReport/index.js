import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useModal } from '../../context/Modal';
import { fetchGetClients } from '../../store/clients';
import { fetchCreateMonthlyClientReports, fetchGetMonthlyClientReports } from '../../store/monthlyClientReports';

const ClientReport = () => {
  const dispatch = useDispatch();
  const { closeModal } = useModal();

  const sessionUser = useSelector(state => state.session.user);
  const clients = useSelector(state => state.clients?.clients).filter(client => client?.userId === sessionUser?.id)

  const monthlyClientReports = Object.values(useSelector(state => state.monthlyClientReports)).filter(report => report.userId === sessionUser.id)

  

  
  useEffect(() => {
    dispatch(fetchGetClients())
  }, [dispatch])

  useEffect(() => {
    dispatch(fetchGetMonthlyClientReports())
  }, [dispatch])

  const today = new Date();
  const thisYear = today.getFullYear();

  const [reportMonth, setReportMonth] = useState(0);
  const [reportYear, setReportYear] = useState(thisYear);
  const [validationErrors, setValidationErrors] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    const payload = {
      userId: sessionUser.id,
      month: reportMonth,
      year: reportYear
    }

    if (reportMonth === 0) {
      return setValidationErrors(['**** Please choose a month! ****']);
    }

    const duplicate = monthlyClientReports.find(report => {
      return report.month === parseInt(reportMonth) && report.year === parseInt(reportYear)
    })
    
    if(duplicate) return setValidationErrors([
      'You already submitted at report for this month.',
    ]);

    return dispatch(fetchCreateMonthlyClientReports(payload))
      .then(() => {
        setIsLoading(false);
      })
      .then(() => {
        closeModal();
      })
      .catch(async (res) => {
        const data = await res.json();
        if (data && data.errors) setValidationErrors(data.errors);
      });
  }

  const months = [
    '--Please choose a month--',
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];

  return (
    <form
      className='w-auto h-96 flex flex-col overflow-auto'
      onSubmit={handleSubmit}
    >
      <div>
        <h2 className='text-white bg-primary text-center text-2xl p-2'>
          Monthly Client Report for {sessionUser.firstname}{' '}
          {sessionUser.lastname}
        </h2>
      </div>
      {isLoading ? (
        <h2 className='text-primary text-center text-2xl'>Loading...</h2>
      ) : (
        <div>
          <div className='h-8 flex flex-col border rounded-sm mt-4 w-full sm:mx-0 md:mx-auto sm:w-5/6'>
            <select
              id='month-select'
              className=' text-center border h-12'
              value={reportMonth}
              onChange={(e) => setReportMonth(e.target.value)}
            >
              {months.map((month, idx) => (
                <option
                  key={idx}
                  value={idx}
                  onChange={() => setReportMonth(idx)}
                >
                  {month}
                </option>
              ))}
            </select>
          </div>

          <div className='mx-auto mt-8 w-full p-1'>
            <table className='w-full table-auto border border-collapse mb-8 pb-8'>
              <thead>
                <tr className='h-12 text-lg'>
                  <th className='border'>First Name</th>
                  <th className='border'>Last Name</th>
                  <th className='border'>Active?</th>
                </tr>
              </thead>
              <tbody>
                {clients?.map((client) => (
                  <tr
                    className='odd:bg-white even:bg-lightGrey h-12 text-lg text-center'
                    key={client?.id}
                  >
                    <td className='border'>{client?.firstname}</td>
                    <td className='border'>{client?.lastname}</td>
                    <td className='border'>
                      <input type='checkbox' checked={client?.isActive} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {validationErrors?.map((error) => (
            <p key={error} style={{ color: 'red' }} className='text-red text-center text-xl border'>
              {error}
            </p>
          ))}
          <div className='text-center my-4'>
            <button
              type='submit'
              // disabled={isDisabled()}
              className='bg-primary hover:bg-primaryHover text-white rounded p-2 mx-2 disabled:bg-disabledPrimary'
            >
              Submit
            </button>
            <button
              onClick={() => closeModal()}
              className='bg-secondary hover:bg-secondaryHover text-white rounded p-2 mx-2'
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </form>
  );
}

export default ClientReport
