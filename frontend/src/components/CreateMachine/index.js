import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { fetchCreateMachines, fetchGetMachines } from '../../store/machines';
import { useModal } from '../../context/Modal';

const CreateMachine = () => {
  const dispatch = useDispatch();

  const { closeModal } = useModal();

  const [number, setNumber] = useState(0);
  const [type, setType] = useState('');
  const [manufacturer, setManufacturer] = useState('');
  const [name, setName] = useState('');
  const [machineImg, setMachineImg] = useState('');
  const [validationErrors, setValidationErrors] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const payload = {
      number,
      type,
      manufacturer,
      name,
      machineImg
    }

    return dispatch(fetchCreateMachines(payload))
      .then(() => {
        closeModal();
        return dispatch(fetchGetMachines());
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
          Add Machine
        </h2>
      </div>
      {validationErrors.map((error) => (
        <li key={error}>{error}</li>
      ))}
      <div className='my-4 p-4 flex flex-col h-56'>
        <input
          className='bg-lightGrey my-2 h-12 text-xl mx-2 w-64 px-3'
          type='number'
          placeholder='Number'
          value={number}
          onChange={(e) => setNumber(e.target.value)}
        />
        <input
          className='bg-lightGrey my-2 h-12 text-xl mx-2 w-64 px-3'
          type='text'
          value={type}
          placeholder='Machine Type'
          onChange={(e) => setType(e.target.value)}
        />
        <input
          className='bg-lightGrey my-2 h-12 text-xl mx-2 w-64 px-3'
          type='text'
          value={manufacturer}
          placeholder='Machine Manufacturer'
          onChange={(e) => setManufacturer(e.target.value)}
        />
        <input
          className='bg-lightGrey my-2 h-12 text-xl mx-2 w-64 px-3'
          type='text'
          value={name}
          placeholder='Machine Name'
          onChange={(e) => setName(e.target.value)}
        />
        <input
          className='bg-lightGrey my-2 h-12 text-xl mx-2 w-64 px-3'
          type='text'
          value={machineImg}
          placeholder='Image URL'
          onChange={(e) => setMachineImg(e.target.value)}
        />
      </div>
      <div className='text-center my-4 py-6'>
        <button
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

export default CreateMachine
