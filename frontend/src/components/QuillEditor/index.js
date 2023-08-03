import React from 'react'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css';

const QuillEditor = ({ value, setValue }) => {

    // const quill = new ReactQuill('#editor', {
    //   modules: {
    //     toolbar: [
    //       [{ header: [1, 2, 3, 4, 5, 6, false] }],
    //       ['bold', 'italic', 'underline', 'strike', 'blockquote'],
    //       [{ size: [] }],
    //       [{ font: [] }],
    //       [{ align: ['right', 'center', 'justify'] }],
    //       [{ list: 'ordered' }, { list: 'bullet' }],
    //       ['link', 'image'],
    //     ],
    //   },
    // });

  //  console.log('QUILL === ', quill);
  
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
      'indent',
      'bold',
      'italic',
      'underline',
      'strike',
      'script',
      'list',
      'bullet',
      'link',
      'color',
      'image',
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
