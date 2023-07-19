import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { fetchGetProblemMachines } from '../store/machines';
import { fetchGetMaintenance } from '../store/maintenance';

const MaintenanceLogPage = () => {
  const dispatch = useDispatch();

  // const machines = Object.values(useSelector(state => state.machines));

  const problems = Object.values(useSelector(state => state.maintenance))

  console.log('PROBLEMS === ', problems)
  useEffect(() => {
    // dispatch(fetchGetProblemMachines())
    dispatch(fetchGetMaintenance());
  }, [dispatch]);

  return (
    <div className='sm:w-full md:w-5/6 bg-white mx-auto text-center min-h-screen pb-2'>
      <div className='flex flex-col mx-auto xs:w-3/4 md:w-64 lg:w-80'>
        <h2 className='text-3xl pt-12'>Maintenance Log</h2>
      </div>
      <div className='sm:w-full md:w-2/3 mx-auto mt-8 mb-12 pb-12'>
        <table>
          <thead>
            <tr>
              <th className='px-2 border'>Machine #</th>
              <th className='px-2 border'>Problem</th>
              <th className='px-2 border'>Description</th>
              <th className='px-2 border'>Pending</th>
              <th className='px-2 border'>Fixed</th>
              <th className='px-2 border'>Date Fixed</th>
            </tr>
          </thead>
          <tbody>
            {problems?.map((problem) => (
              <tr key={problem?.id}>
                <td className='px-2 border'>{problem?.Machine?.number}</td>
                <td className='px-2 border'>{problem?.title}</td>
                <td className='px-2 border'>{problem?.description}</td>
                <td className='px-2 border' type='checkbox'>
                  {problem?.isPending}
                </td>
                <td className='px-2 border'>{problem?.isFixed}</td>
                <td className='px-2 border'>{}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default MaintenanceLogPage
