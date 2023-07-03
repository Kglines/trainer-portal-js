import React from 'react'
import ReactQuill, { Quill } from 'react-quill'
import 'react-quill/dist/quill.snow.css';

const QuillEditor = ({ value, setValue }) => {

    const quill = new Quill();

   
  
    const modules = {
      toolbar: [
        [{ size: ['small', false, 'large', 'huge'] }], // custom dropdown
        [{ font: [] }],
        ['bold', 'italic', 'underline', 'strike'],
        [
          { list: 'ordered' },
          { list: 'bullet' },
          { indent: '-1' },
          { indent: '+1' },
        ],
        ['link', 'image'],
      ],
    };

  return (
    <ReactQuill
      defaultValue={value}
      onChange={setValue}
      modules={modules}
      theme='snow'
    >
    </ReactQuill>
  );
}

export default QuillEditor
