import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { useModal } from '../../context/Modal';
import { fetchDeleteMachine, fetchGetMachines } from '../../store/machines';

const DeleteMachine = ({ machineId }) => {
    const dispatch = useDispatch();
    const { closeModal } = useModal();
    const [validationErrors, setValidationErrors] = useState([]);

    const onDelete = () => {
        return dispatch(fetchDeleteMachine(machineId))
          .then(() => {
            dispatch(fetchGetMachines())
            return closeModal();
          })
          .catch(async (res) => {
            const data = await res.json();
            if (data && data.errors) setValidationErrors(data.errors);
          });
    }

  return (
    <div className='w-full'>
      <div>
        <h2 className='text-white bg-primary text-center text-2xl'>
          Delete Machine
        </h2>
      </div>
      <div className='mx-8 mt-6'>
        <p>Are you sure you want to delete this machine?</p>
      </div>
      <div className='text-center my-4'>
        <button className='bg-primary hover:bg-primaryHover text-white rounded p-2 mx-2' onClick={onDelete}>
          Delete
        </button>
        <button className='bg-secondary hover:bg-secondaryHover text-white rounded p-2 mx-2' onClick={() => closeModal()}>
          Cancel
        </button>
      </div>
    </div>
  );
}

export default DeleteMachine
