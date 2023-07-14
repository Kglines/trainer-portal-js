import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { fetchGetMachines } from '../store/machines';
import OpenModalButton from '../components/OpenModalButton';
import CreateMachine from '../components/CreateMachine';
import EditMachine from '../components/EditMachine';
import DeleteMachine from '../components/DeleteMachine';

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
        <OpenModalButton
          modalComponent={<CreateMachine />}
          buttonText='Add Machine'
          className='bg-secondary text-white rounded-md p-2 mt-2 sm:w-full md:w-1/2 mx-auto hover:bg-secondaryHover'
        />
      </div>
      <div className='mt-8 mx-2'>
        <table className='w-full table-auto border border-collapse mb-8 pb-8'>
          <thead>
            <tr className='h-12 text-lg'>
              <th className='px-2 border'>Number</th>
              <th className='px-2 border'>Type</th>
              <th className='px-2 border'>Manufacturer</th>
              <th className='px-2 border'>Name</th>
              <th className='px-2 border'>
                <div className='flex justify-around'>
                  <div>
                    <i className='fa fa-pencil'></i>
                  </div>
                  <div>
                    <i className='fa fa-trash'></i>
                  </div>
                </div>
              </th>
            </tr>
          </thead>
          <tbody>
            {machines?.machines?.map((machine) => (
              <tr
                className='odd:bg-white even:bg-lightGrey h-12 text-lg'
                key={machine?.id}
              >
                <td className='px-2 border'>{machine?.number}</td>
                <td className='px-2 border'>{machine?.type}</td>
                <td className='px-2 border'>{machine?.manufacturer}</td>
                <td className='px-2 border'>{machine?.name}</td>
                <td className='px-2 border'>
                  <div className='flex justify-around'>
                    <div>
                      <OpenModalButton
                        modalComponent={<EditMachine machineId={machine?.id} />}
                        buttonText={
                          <i className='fa fa-pencil text-secondary'></i>
                        }
                      />
                    </div>
                    <div>
                      <OpenModalButton
                        modalComponent={<DeleteMachine machineId={machine?.id}/>}
                        buttonText={<i className='fa fa-trash text-primary'></i>}
                      />
                    </div>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default MachineInventoryPage
