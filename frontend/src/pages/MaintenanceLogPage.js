import React from 'react'

const MaintenanceLogPage = () => {
  return (
    <div className='sm:w-full md:w-5/6 bg-white mx-auto text-center min-h-screen pb-2'>
      <div className='flex flex-col mx-auto xs:w-3/4 md:w-64 lg:w-80'>
        <h2 className='text-3xl pt-12'>Maintenance Log</h2>
      </div>
      <div className='sm:w-full md:w-2/3 mx-auto mt-8 mb-12 pb-12'>
        <table>
          <thead>
            <tr>
              <th className='border'>
                Machine
                <td className='px-2 border'>Number</td>
                <td className='px-2 border'>Type</td>
                <td className='px-2 border'>Manufacturer</td>
                <td className='px-2 border'>Name</td>
              </th>
              <th className='border'>
                Problem
                {/* <td className='px-2 border'></td> */}
                <td className='px-2 border'>Description</td>
              </th>
            </tr>
          </thead>
          <tbody>
            
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default MaintenanceLogPage
