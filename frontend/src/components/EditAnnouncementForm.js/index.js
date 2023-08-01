import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { fetchEditAnnouncement, fetchGetAnnouncements } from '../../store/announcements';
import { useModal } from '../../context/Modal';
import QuillEditor from '../QuillEditor';

const EditAnnouncementForm = ({ announcement }) => {
  const dispatch = useDispatch();
  const { closeModal } = useModal();

  const [month, setMonth] = useState(announcement?.month)
  const [body, setBody] = useState(announcement?.body)
  const [validationErrors, setValidationErrors] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const payload = {
      id: announcement.id,
      month,
      body
    }

    dispatch(fetchEditAnnouncement(payload))
      .then(() => {
        closeModal();
        dispatch(fetchGetAnnouncements());
      })
      .catch(async (res) => {
        const data = await res.json();
        if (data && data.errors) setValidationErrors(data.errors);
      });
      
  }

  const handleChange = (html) => {
    setBody(html)
  }

  return (
    <form onSubmit={handleSubmit} className='w-auto h-auto'>
      <div>
        <h2 className='text-white bg-primary text-center text-2xl'>
          Edit Announcement
        </h2>
      </div>
      {validationErrors?.map((error) => (
        <li key={error}>{error}</li>
      ))}
      <div className='my-4 p-4 flex flex-col h-auto'>
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
      <div className='text-center my-4 pt-2'>
        <button
          type='submit'
          className='bg-primary hover:bg-primaryHover text-white rounded p-2 mx-2 disabled:bg-disabledPrimary'
        >
          Submit
        </button>
        <button className='bg-secondary hover:bg-secondaryHover text-white rounded p-2 mx-2'>
          Cancel
        </button>
      </div>
    </form>
  );
}

export default EditAnnouncementForm
