import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
// import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import { fetchDeleteAnnouncement, fetchGetAnnouncements } from '../../store/announcements';
import { useModal } from '../../context/Modal';

const DeleteAnnouncement = ({ announcementId }) => {
    const dispatch = useDispatch();
    console.log('Announcement ID === ', typeof announcementId)
    // const history = useHistory();
    const { closeModal } = useModal();
    const [validationErrors, setValidationErrors] = useState([]);

    const onDelete = () => {
      return dispatch(fetchDeleteAnnouncement(announcementId))
        .then(() => {
          dispatch(fetchGetAnnouncements())
          return closeModal();
        })
        // dispatch(fetchDeleteAnnouncement(announcementId))
        // return dispatch(fetchGetAnnouncements())
        //   .then(() => {
        //     closeModal();
        //     document.location.reload();
        //     return dispatch(fetchGetAnnouncements());
        //   })
          .catch(async (res) => {
            const data = await res.json();
            if (data && data.errors) setValidationErrors(data.errors);
          });
    };

  return (
    <div>
      <div>
        <h2 className='text-white bg-primary text-center text-2xl'>
          Delete Announcement
        </h2>
      </div>
      <div className='my-4'>
        <p className='px-4'>
          Are you sure you want to delete this Announcement?
        </p>
      </div>
      {validationErrors?.map((error) => (
        <li key={error}>{error}</li>
      ))}
      <div className='text-center my-4'>
        <button
          onClick={onDelete}
          className='bg-primary hover:bg-primaryHover text-white rounded p-2 mx-2'
        >
          Delete
        </button>
        <button onClick={() => closeModal()} className='bg-secondary hover:bg-secondaryHover text-white rounded p-2 mx-2'>
          Cancel
        </button>
      </div>
    </div>
  );
}

export default DeleteAnnouncement
