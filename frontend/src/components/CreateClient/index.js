import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useModal } from '../../context/Modal';
import { fetchCreateClient, fetchGetClients } from '../../store/clients';

const CreateClient = () => {
  const dispatch = useDispatch();

  const { closeModal } = useModal();

  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [isActive, setIsActive] = useState(true);
  const [validationErrors, setValidationErrors] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const payload = {
      firstname,
      lastname,
      isActive
    }

    return dispatch(fetchCreateClient(payload))
      .then(() => {
        closeModal();
        return dispatch(fetchGetClients());
      })
      .catch(async (res) => {
        const data = await res.json();
        if (data && data.errors) setValidationErrors(data.errors);
      });
  }

  const isDisabled = () => {
    if(firstname.length < 1 || lastname.length < 1 || isActive === undefined){
      return true
    } else {
      return false
    }
  }

  return (
    <form onSubmit={handleSubmit} className='w-auto h-96'>
      <div>
        <h2 className='text-white bg-primary text-center text-2xl'>
          Add Client
        </h2>
      </div>
      <ul>
        {validationErrors.map((error) => (
          <li key={error}>{error}</li>
        ))}
      </ul>
      <div className='my-4 p-4 flex flex-col h-56'>
        <input className='bg-lightGrey my-2 h-12 text-xl mx-2 w-64 px-3' type='text' placeholder='First name' value={firstname} onChange={(e) => setFirstname(e.target.value)}/>
        <input className='bg-lightGrey my-2 h-12 text-xl mx-2 w-64 px-3' type='text' placeholder='Last name' value={lastname} onChange={(e) => setLastname(e.target.value)}/>
        <label>
          Active this month?
        <input className='bg-lightGrey mx-2 text-xl w-4 px-3' type='checkbox' placeholder='Active this month?' value={isActive} onChange={(e) => setIsActive(e.target.value)}/>
        </label>
      </div>
      <div className='text-center my-4'>
        <button
          disabled={isDisabled()}
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

export default CreateClient
