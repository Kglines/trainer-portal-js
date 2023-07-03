import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { fetchCreateAnnouncement, fetchGetAnnouncements } from '../../store/announcements';
import { useModal } from '../../context/Modal.js';
import ReactQuill, { Quill } from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import parse from 'html-react-parser';

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

    const modules = {
    toolbar: [
      [{ 'header': [1, 2, false] }],
      ['bold', 'italic', 'underline','strike', 'blockquote'],
      [{'list': 'ordered'}, {'list': 'bullet'}, {'indent': '-1'}, {'indent': '+1'}],
      ['link', 'image'],
      ['clean']
    ],
  }

    const formats = [
      'font', 'size', 'bold', 'italics', 'underline', 'strike', 'color', 'header', 'indent', 'list', 'direction', 'align', 'link', 'image'    
    ]
  return (
    <form onSubmit={handleSubmit} className='w-auto h-96'>
      <div>
        <h2 className='text-white bg-primary text-center text-2xl'>
          Create Announcement
        </h2>
      </div>
        <ul>
          {validationErrors &&
              validationErrors?.map((error) => 
                <li key={error}>{error}</li>
          )}
        </ul>
      <div className='my-4 p-4 flex flex-col h-64'>
        <input
          type='number'
          value={month}
          onChange={(e) => setMonth(e.target.value)}
          placeholder='Number of Month'
          className='bg-lightGrey my-2 h-12 text-xl'
        />
        
          <ReactQuill
            value={body}
            onChange={handleChange}
            placeholder='Announcement here...'
            theme='snow'
            formats={formats}
            modules={modules}
          />
        
        {/* <textarea
          type='text'
          value={body}
          onChange={(e) => setBody(e.target.value)}
          placeholder='Announcement here...'
          className='bg-lightGrey my-2 h-36 text-xl'
        /> */}
      </div>
      <div className='text-center my-4'>
        <button
          type='submit'
          disabled={!body}
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
