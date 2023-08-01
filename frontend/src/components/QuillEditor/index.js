import React from 'react'
import ReactQuill, { Quill } from 'react-quill'
import 'react-quill/dist/quill.snow.css';

const QuillEditor = ({ value, setValue }) => {

    // const quill = new Quill();

  //  console.log('QUILL === ', Quill.register({'modules/toolbar': true}));
  
    const modules = {
      toolbar: [
        [{ header: [1, 2, 3, 4, 5, 6, false] }],
        ['bold', 'italic', 'underline', 'strike', 'blockquote'],
        [{ size: [] }],
        [{ font: [] }],
        [{ align: ['right', 'center', 'justify'] }],
        [{ list: 'ordered' }, { list: 'bullet' }],
        ['link', 'image'],
        // [{ color: ['red', '#785412'] }],
        // [{ background: ['red', '#785412'] }],
      ],
    };
    const formats = [
      'header',
      'bold',
      'italic',
      'underline',
      'strike',
      'blockquote',
      'list',
      'bullet',
      'link',
      'color',
      'image',
      'background',
      'align',
      'size',
      'font',
    ];

  return (
    <ReactQuill
      defaultValue={value}
      value={value}
      onChange={setValue}
      modules={modules}
      theme='snow'
      formats={formats}
      className='h-64 mb-4'
    />
  );
}

export default QuillEditor
