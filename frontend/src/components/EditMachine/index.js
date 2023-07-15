import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useModal } from '../../context/Modal';
import { fetchGetMachines, fetchUpdateMachine } from '../../store/machines';

const EditMachine = ({ machine }) => {
  const dispatch = useDispatch();
  const { closeModal } = useModal();

  const [number, setNumber] = useState(machine?.number);
  const [type, setType] = useState(machine?.type);
  const [manufacturer, setManufacturer] = useState(machine?.manufacturer);
  const [name, setName] = useState(machine?.name);
  const [machineImg, setMachineImg] = useState(machine?.machineImg);
  const [validationErrors, setValidationErrors] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const payload = {
      id: machine.id,
      number,
      type,
      manufacturer,
      name,
      machineImg
    }

    return dispatch(fetchUpdateMachine(payload))
      .then(() => {
        closeModal();
        dispatch(fetchGetMachines());
      })
      .catch(async (res) => {
        const data = await res.json();
        if (data && data.errors) setValidationErrors(data.errors);
      });
  };

  return (
    <form onSubmit={handleSubmit} className='w-auto'>
      <div className='text-white bg-primary text-center text-2xl py-2'>
        <h2>Edit Machine</h2>
      </div>
      {validationErrors?.map((error) => (
        <li key={error}>{error}</li>
      ))}
      <div className='my-4 p-4 flex flex-col h-96 w-96'>
        <label className='w-full flex text-center items-center'>
          Number
          <input
            type='number'
            value={number}
            onChange={(e) => setNumber(e.currentTarget.value)}
            name='Number'
            className='bg-lightGrey my-2 h-12 text-xl mx-2 w-16 px-3'
          />
        </label>
        <label className='w-full flex text-center items-center'>
          Type
          <input
            type='text'
            value={type}
            onChange={(e) => setType(e.currentTarget.value)}
            name='Type'
            className='bg-lightGrey my-2 h-12 text-xl mx-2 w-full px-3'
          />
        </label>
        <label className='w-full flex text-center items-center'>
          Manufacturer
          <input
            type='text'
            value={manufacturer}
            onChange={(e) => setManufacturer(e.currentTarget.value)}
            name='Manufacturer'
            className='bg-lightGrey my-2 h-12 text-xl mx-2 w-96 px-3'
          />
        </label>
        <label className='w-full flex text-center items-center'>
          Name
          <input
            type='text'
            value={name}
            onChange={(e) => setName(e.currentTarget.value)}
            name='Name'
            className='bg-lightGrey my-2 h-12 text-xl mx-2 w-96 px-3'
          />
        </label>
        <label className='w-full flex text-center items-center'>
          Image
          <input
            type='text'
            value={machineImg}
            onChange={(e) => setMachineImg(e.currentTarget.value)}
            name='Machine Image'
            className='bg-lightGrey my-2 h-12 text-xl mx-2 w-full px-3'
            placeholder='No current image...'
          />
        </label>
      </div>
      <div className='text-center my-4'>
        <button
          type='submit'
          className='bg-primary hover:bg-primaryHover text-white rounded p-2 mx-2 disabled:bg-disabledPrimary'
        >
          Submit
        </button>
        <button
          onClick={closeModal}
          className='bg-secondary hover:bg-secondaryHover text-white rounded p-2 mx-2'
        >
          Cancel
        </button>
      </div>
    </form>
  );
}

export default EditMachine
