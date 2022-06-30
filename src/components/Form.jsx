import { useEffect, useState } from 'react'
import Error from './Error'

export const Form = ({ patients, setPatients, patient, setPatient }) => {
  const [name, setName] = useState('')
  const [owner, setOwner] = useState('')
  const [email, setEmail] = useState('')
  const [entryDate, setEntryDate] = useState('')
  const [symptoms, setSymptoms] = useState('')

  const [error, setError] = useState(false)

  const resetFields = () => {
    setName('')
    setOwner('')
    setEmail('')
    setEntryDate('')
    setSymptoms('')
  }

  useEffect(() => {
    if (Object.keys(patient).length > 0) {
      const { name, owner, email, entryDate, symptoms } = patient
      setName(name)
      setOwner(owner)
      setEmail(email)
      setEntryDate(entryDate)
      setSymptoms(symptoms)
    }
  }, [patient])

  const generateId = () => {
    const random = Math.random().toString(36).substring(2)
    const date = Date.now().toString()

    return random + date
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    if ([name, owner, email, entryDate, symptoms].includes('')) {
      setError(true)
      return
    }
    const patientToFill = {
      name,
      owner,
      email,
      entryDate,
      symptoms,
    }

    if (patient.id) {
      patientToFill.id = patient.id
      const updatedPatients = patients.map((patientState) =>
        patientState.id === patientToFill.id ? patientToFill : patientState,
      )
      setPatients(updatedPatients)
      setPatient({})
    } else {
      patientToFill.id = generateId()
      setPatients([...patients, patientToFill])
    }

    resetFields()

    setError(false)
  }

  return (
    <div className='md:w-1/2 lg:w-2/5 mx-5'>
      <h2 className='font-black text-3xl text-center'>Track for patients</h2>
      <p className='text-lg mt-5 text-center mb-10'>
        Add patients and {''}
        <span className='text-indigo-600 font-bold'>Manage them</span>
      </p>
      <form onSubmit={handleSubmit} className='bg-white shadow-md rounded py-10 px-5 mb-10'>
        {error && (
          <Error>
            <p>All the fields are required</p>
          </Error>
        )}
        <div className='mb-5'>
          <label htmlFor='petName' className='block text-grey-700 uppercase font-bold'>
            Pet name
          </label>
          <input
            id='petName'
            type='text'
            placeholder='Pet name'
            className='border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md'
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className='mb-5'>
          <label htmlFor='ownerName' className='block text-grey-700 uppercase font-bold'>
            Owner name
          </label>
          <input
            id='ownerName'
            type='text'
            placeholder='Owner name'
            className='border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md'
            value={owner}
            onChange={(e) => setOwner(e.target.value)}
          />
        </div>
        <div className='mb-5'>
          <label htmlFor='email' className='block text-grey-700 uppercase font-bold'>
            Email
          </label>
          <input
            id='email'
            type='email'
            placeholder='Email'
            className='border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className='mb-5'>
          <label htmlFor='entryDate' className='block text-grey-700 uppercase font-bold'>
            Entry date
          </label>
          <input
            id='entryDate'
            type='date'
            className='border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md'
            value={entryDate}
            onChange={(e) => setEntryDate(e.target.value)}
          />
        </div>
        <div className='mb-5'>
          <label htmlFor='symptoms' className='block text-grey-700 uppercase font-bold'>
            Symptoms
          </label>
          <textarea
            id='symptoms'
            className='border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md'
            placeholder='Describes the symptoms'
            value={symptoms}
            onChange={(e) => setSymptoms(e.target.value)}
          />
        </div>

        <input
          type='submit'
          className='bg-indigo-600 w-full p-3 text-white uppercase font-bold hover:bg-indigo-700 cursor-pointer transition-all'
          value={patient.id ? 'Edit patient' : 'Add patient'}
        />
      </form>
    </div>
  )
}
