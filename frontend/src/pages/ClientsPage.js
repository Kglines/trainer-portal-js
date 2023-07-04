import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { fetchGetClients } from '../store/clients';
import OpenModalButton from '../components/OpenModalButton';
import CreateClient from '../components/CreateClient';

const ClientsPage = () => {
  const dispatch = useDispatch();
  const sessionUser = useSelector(state => state.session.user);
  
  const clients = useSelector(state => state.clients);

  const myClients = clients?.clients?.filter(client => client?.userId === sessionUser?.id)
  console.log('CLIENTS === ', clients.clients)

  useEffect(() => {
    dispatch(fetchGetClients())
  }, [dispatch])

  return (
    <div className='sm:w-full md:w-5/6 bg-white mx-auto text-center min-h-screen pb-2'>
      <div className='flex flex-col mx-auto xs:w-3/4 md:w-64 lg:w-80'>
        <h2 className='text-3xl pt-12'>My Clients</h2>
        <OpenModalButton
          modalComponent={<CreateClient />}
          buttonText='+ New Client'
          className='bg-secondary text-white rounded-md p-2 mt-2 sm:w-full md:w-5/6 mx-auto hover:bg-secondaryHover'
        />
        {/* <div className='h-8 flex flex-col border rounded-sm mt-4 w-full sm:mx-0 md:mx-auto sm:w-5/6'>
          <label htmlFor='month-select' className='sm:w-12'></label>
          <select id='month-select text-center border sm:w-12'>
            <option className='text-center flex flex-auto h-40'>
              --Please choose a month--
            </option>
            <option className='text-center'>January</option>
            <option className='text-center'>February</option>
            <option className='text-center'>March</option>
            <option className='text-center'>April</option>
            <option className='text-center'>May</option>
            <option className='text-center'>June</option>
            <option className='text-center'>July</option>
            <option className='text-center'>August</option>
            <option className='text-center'>September</option>
            <option className='text-center'>October</option>
            <option className='text-center'>November</option>
            <option className='text-center'>December</option>
          </select>
        </div> */}
      </div>
      <div className='sm:w-full md:w-2/3 mx-auto mt-8 mb-12 pb-12'>
        <table className='w-full table-auto border border-collapse mb-8 pb-8'>
          <thead>
            <tr className='h-12 text-lg'>
              <th className='border'>First Name</th>
              <th className='border'>Last Name</th>
              <th className='border'>Active?</th>
            </tr>
          </thead>
          <tbody>
            {myClients?.map((client) => (
              <tr
                className='odd:bg-white even:bg-lightGrey h-12 text-lg'
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
        <button className='bg-primary text-white rounded-md p-2 mt-2 w-1/3'>
          Generate Report
        </button>
      </div>
    </div>
  );
}

export default ClientsPage
