import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { fetchCreateMaintenance, fetchGetMaintenance } from '../../store/maintenance';
import { useModal } from '../../context/Modal';

const CreateMaintenance = () => {
  const dispatch = useDispatch();

  const { closeModal } = useModal();

  const sessionUSer = useSelector(state => state.session.user)

  const [number, setNumber] = useState(0);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [isPending, setIsPending] = useState(false);
  const [isFixed, setIsFixed] = useState(false);
  const [validationErrors, setValidationErrors] = useState([]);
  const [userId, setUserId] = useState(sessionUSer.id);
  const [machineId, setMachineId] = useState(0);

  const handleSubmit = (e) => {
    e.preventDefault();

    const payload = {
      machineId,
      userId,
      title,
      description,
      isPending,
      isFixed
    }

    return dispatch(fetchCreateMaintenance(payload))
      .then(() => {
        closeModal();
        return dispatch(fetchGetMaintenance());
      })
      .catch(async (res) => {
        const data = await res.json();
        if (data && data.errors) setValidationErrors(data.errors);
      });
  
  }

  return (
    <form className='w-auto h-96'>
      <div>
        <h2 className='text-white bg-primary text-center text-2xl'>
          Report a Problem
        </h2>
      </div>
      <div className='my-4 p-4 flex flex-col h-56'>
        <input
          className='bg-lightGrey my-2 h-12 text-xl mx-2 w-64 px-3'
          type='number'
          placeholder='Number'
          value={number}
          onChange={(e) => setNumber(e.target.value)}
        />
      </div>
    </form>
  );
}

export default CreateMaintenance
