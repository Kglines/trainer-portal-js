import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { fetchGetMaintenance } from '../store/maintenance';
import OpenModalButton from '../components/OpenModalButton';
import CreateMaintenance from '../components/CreateMaintenance';

const MaintenanceLogPage = () => {
  const dispatch = useDispatch();

  const problems = Object.values(useSelector(state => state.maintenance))
  const sessionUser = useSelector(state => state.session.user);
  
  useEffect(() => {
    dispatch(fetchGetMaintenance());
  }, [dispatch]);


  return (
    <div className='sm:w-full md:w-5/6 bg-white mx-auto text-center min-h-screen pb-2'>
      <div className='flex flex-col mx-auto xs:w-3/4 md:w-64 lg:w-80'>
        <h2 className='text-3xl pt-12'>Maintenance Log</h2>
        <OpenModalButton
          modalComponent={<CreateMaintenance />}
          buttonText='Add Entry'
          className='bg-secondary text-white rounded-md p-2 mt-2 sm:w-full md:w-5/6 mx-auto hover:bg-secondaryHover'
        />
      </div>
      <div className='sm:w-full md:w-2/3 mx-auto mt-8 mb-12 pb-12'>
        <table>
          <thead>
            <tr>
              <th className='px-2 border'>Machine #</th>
              <th className='px-2 border'>Machine Name</th>
              <th className='px-2 border'>Problem</th>
              <th className='px-2 border'>Description</th>
              <th className='px-2 border'>Pending</th>
              <th className='px-2 border'>Fixed</th>
              <th className='px-2 border'>Date Fixed</th>
              {sessionUser.isAdmin && <th className='px-2 border'>Edit</th>}
            </tr>
          </thead>
          <tbody>
            {problems?.map((problem) => (
              <tr key={problem?.id}>
                {console.log('MACHINE PROBLEMS === ', problem?.Machine)}
                <td className='px-2 border'>{problem?.machineId}</td>
                <td className='px-2 border'>{problem?.Machine?.name}</td>
                <td className='px-2 border'>{problem?.title}</td>
                <td className='px-2 border w-96'>{problem?.description}</td>
                <td className='px-2 border' type='checkbox'>
                  {problem?.isPending ? 'Yes' : 'No'}
                </td>
                <td className='px-2 border'>
                  {problem?.isFixed ? 'Yes' : 'No'}
                </td>
                <td className='px-2 border'>
                  {problem?.updatedAt ? problem.updatedAt : ''}
                </td>
                {sessionUser?.isAdmin && (
                  <td className='px-2 border'>
                    <button className='bg-secondary text-white rounded-md p-2 mt-2 w-full mx-auto hover:bg-secondaryHover'>
                      FIXED
                    </button>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default MaintenanceLogPage
