import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { fetchGetMachines } from '../store/machines';

const MachineInventoryPage = () => {
    const dispatch = useDispatch();

    const machines = useSelector(state => state.machines);

    console.log(machines)

    useEffect(() => {
        dispatch(fetchGetMachines())
    }, [dispatch])
  return (
    <div className='sm:w-full md:w-5/6 bg-white mx-auto text-center min-h-screen pb-2'>
      <div className='flex flex-col mx-auto xs:w-3/4 md:w-64 lg:w-80'>
        <h2 className='text-3xl pt-12'>Machine Inventory</h2>
      </div>
      <div>
        {machines?.machines?.map(machine => (
            <div className='flex px-2'>
                <p className='px-2'>{machine?.number}</p>
                <p className='px-2'>{machine?.type}</p>
                <p className='px-2'>{machine?.manufacturer}</p>
                <p className='px-2'>{machine?.name}</p>
            </div>
        ))}
      </div>
    </div>
  );
}

export default MachineInventoryPage
