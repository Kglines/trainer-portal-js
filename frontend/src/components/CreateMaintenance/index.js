import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { fetchCreateMaintenance, fetchGetMaintenance } from '../../store/maintenance';
import { useModal } from '../../context/Modal';
import { fetchGetMachines } from '../../store/machines';

const CreateMaintenance = () => {
  const dispatch = useDispatch();

  const { closeModal } = useModal();

  const sessionUSer = useSelector(state => state.session.user);
  const machines = useSelector(state => state.machines.machines);

  function getMachineId(num) {
    const machine = machines?.find(machine => machine?.number === num)
    return setMachineId(machine?.id)
  }

  useEffect(() => {
    dispatch(fetchGetMachines())
  }, [dispatch])

  const [number, setNumber] = useState(0);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [isPending, setIsPending] = useState(true);
  const [isFixed, setIsFixed] = useState(false);
  const [userId, setUserId] = useState(sessionUSer.id);
  const [machineId, setMachineId] = useState(0);
  const [validationErrors, setValidationErrors] = useState([]);


  const handleSubmit = (e) => {
    e.preventDefault();

    getMachineId(parseInt(number))

    const payload = {
      machineId,
      userId: sessionUSer.id,
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
    <form className='w-auto h-96' onSubmit={handleSubmit}>
      <div>
        <h2 className='text-white bg-primary text-center text-2xl'>
          Report a Problem
        </h2>
      </div>
      <div className='my-4 p-4 flex flex-col h-56'>
        <span className='content-center'>
          <label className='flex flex-row items-center'>
            Machine Number
            <input
              className='bg-lightGrey my-2 h-12 text-xl mx-2 w-24 px-3'
              type='number'
              placeholder='Number'
              value={number}
              onChange={(e) => setNumber(e.target.value)}
            />
          </label>
        </span>

        <input
          type='text'
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className='bg-lightGrey my-2 h-12 text-xl mx-2 w-auto px-3'
          autoComplete='on'
          placeholder='Problem Title'
        />
        <textarea
          type='text'
          rows={4}
          cols={50}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className='bg-lightGrey my-2 h-auto text-xl mx-2 w-auto px-3'
          placeholder='Describe the problem here...'
        />
      </div>
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
    </form>
  );
}

export default CreateMaintenance
