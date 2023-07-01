import React from 'react'

const ClientsPage = () => {
  return (
    <div className='sm:w-full md:w-5/6 bg-white mx-auto text-center h-screen'>
      <div className='flex flex-col w-1/4 mx-auto'>
        <h2 className='text-3xl pt-12'>My Clients</h2>
        <button className='bg-secondary text-white rounded-md p-2 mt-2 w-5/6 mx-auto hover:bg-secondaryHover'>
          + Client
        </button>
        <div className='border rounded-sm mt-4 w-5/6 mx-auto'>
          <label htmlFor='month-select'></label>
          <select id='month-select text-center'>
            <option className='text-center'>--Please choose a month--</option>
            <option className='text-center'>January</option>
            <option className='text-center'>February</option>
            <option className='text-center'>March</option>
          </select>
        </div>
      </div>
      <div className='sm:w-full md:w-2/3 mx-auto mt-8 mb-12 pb-12'>
        <table className='w-full table-auto border border-collapse mb-8 pb-8'>
          <thead>
            <tr className='h-12 text-lg'>
              <th className='border'>First Name</th>
              <th className='border'>Last Name</th>
              <th className='border'>Active?</th>
            </tr>
          </thead>
          <tbody>
            <tr className='odd:bg-white even:bg-lightGrey h-12 text-lg'>
              <td className='border'>Betty</td>
              <td className='border'>Ingram</td>
              <td className='border'>
                <input type='checkbox' />
              </td>
            </tr>
            <tr className='odd:bg-white even:bg-lightGrey h-12 text-lg'>
              <td className='border'>Bruce</td>
              <td className='border'>Fay</td>
              <td className='border'>
                <input type='checkbox' />
              </td>
            </tr>
            <tr className='odd:bg-white even:bg-lightGrey h-12 text-lg'>
              <td className='border'>Dick</td>
              <td className='border'>Powers</td>
              <td className='border'>
                <input type='checkbox' />
              </td>
            </tr>
            <tr className='odd:bg-white even:bg-lightGrey h-12 text-lg'>
              <td className='border'>Llyn</td>
              <td className='border'>Balakhani</td>
              <td className='border'>
                <input type='checkbox' />
              </td>
            </tr>
            <tr className='odd:bg-white even:bg-lightGrey h-12 text-lg'>
              <td className='border'>Sophie</td>
              <td className='border'>Hershey</td>
              <td className='border'>
                <input type='checkbox' />
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ClientsPage
