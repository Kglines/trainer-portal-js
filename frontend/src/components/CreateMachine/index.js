import React, { useState } from 'react'
import { useDispatch } from 'react-redux';

const CreateMachine = () => {
  const dispatch = useDispatch();

  const [number, setNumber] = useState(0);
  const [type, setType] = useState('');
  const [manufacturer, setManufacturer] = useState('');
  const [name, setName] = useState('');
  const [machineImg, setMachineImg] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    const payload = {
      number,
      type,
      manufacturer,
      name,
      machineImg
    }

    return dispatch()
  }

  return (
    <div>CreateMachine</div>
  )
}

export default CreateMachine
