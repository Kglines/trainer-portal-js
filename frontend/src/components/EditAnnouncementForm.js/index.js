import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { fetchEditAnnouncement, fetchGetAnnouncements } from '../../store/announcements';
import { useModal } from '../../context/Modal';

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

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <h2>Edit Announcement</h2>
      </div>
      {validationErrors?.map(error => (
        <li key={error}>{error}</li>
      ))}
      <div>
        <input type='text' value={month} onChange={(e) => setMonth(e.target.value)} name='Month' />
        <input type='text' value={body} onChange={(e) => setBody(e.target.value)} name='Body' />
      </div>
      <div>
        <button type='submit'>Submit</button>
        <button>Cancel</button>
      </div>
    </form>
  )
}

export default EditAnnouncementForm
