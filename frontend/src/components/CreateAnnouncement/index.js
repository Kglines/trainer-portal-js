import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { fetchCreateAnnouncement, fetchGetAnnouncements } from '../../store/announcements';
import { useModal } from '../../context/Modal.js';
import QuillEditor from '../QuillEditor';

const CreateAnnouncement = () => {
    const dispatch = useDispatch();
    
    const { closeModal } = useModal();

    const today = new Date();
    const currentMonth = today.getMonth();

    const [month, setMonth] = useState(currentMonth + 1);
    const [body, setBody] = useState('');
    const [validationErrors, setValidationErrors] = useState([]);

    const handleSubmit = (e) => {
        e.preventDefault();

        const payload = {
            month,
            body
        }
        
        return dispatch(fetchCreateAnnouncement(payload))
          .then(() => {
            closeModal();
            return dispatch(fetchGetAnnouncements());
          })
          .catch(async (res) => {
            const data = await res.json();
            if (data && data.errors) setValidationErrors(data.errors);
          });
    }

    const handleChange = (text) => {
      setBody(text)
    }
    
    const isDisabled = () => {
      if(body.length <= 1){
        return true
      } else {
        return false
      }
    }    

  return (
    <form onSubmit={handleSubmit} className='w-auto h-96'>
      <div>
        <h2 className='text-white bg-primary text-center text-2xl'>
          Create Announcement
        </h2>
      </div>
      <ul>
        {validationErrors &&
          validationErrors?.map((error) => <li key={error}>{error}</li>)}
      </ul>
      <div className='my-4 p-4 flex flex-col h-64'>
        <label className='mx-2'>
          Month
          <input
            type='number'
            value={month}
            onChange={(e) => setMonth(e.target.value)}
            name='Month'
            className='bg-lightGrey my-2 h-12 text-xl mx-2 w-16 px-3'
          />
        </label>
        <QuillEditor value={body} setValue={handleChange} />
      </div>
      <div className='text-center my-4'>
        <button
          type='submit'
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

export default CreateAnnouncement
