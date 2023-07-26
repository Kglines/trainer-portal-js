import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { fetchGetClients } from '../store/clients';
import OpenModalButton from '../components/OpenModalButton';
import CreateClient from '../components/CreateClient';
import CreateClientReport from '../components/CreateClientReport';

const ClientsPage = () => {
  const dispatch = useDispatch();

  const sessionUser = useSelector(state => state.session.user);
  
  const clients = useSelector(state => state.clients);

  const myClients = clients?.clients?.filter(client => client?.userId === sessionUser?.id)
  // console.log('CLIENTS === ', clients.clients)

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
      </div>
      <div className='sm:w-full md:w-2/3 mx-auto mt-8 mb-12 pb-12'>
        <table className='w-full table-auto border border-collapse mb-8 pb-8'>
          <thead>
            <tr className='h-12 text-lg'>
              <th className='border'>First Name</th>
              <th className='border'>Last Name</th>
              {/* <th className='border'>Active?</th> */}
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
                {/* <td className='border'>
                  <input type='checkbox' checked={client?.isActive} />
                </td> */}
              </tr>
            ))}
          </tbody>
        </table>
        <OpenModalButton
          buttonText='Generate Report'
          className='bg-primary text-white rounded-md p-2 mt-2 w-1/3'
          modalComponent={<CreateClientReport />}
        />
      </div>
    </div>
  );
}

export default ClientsPage
