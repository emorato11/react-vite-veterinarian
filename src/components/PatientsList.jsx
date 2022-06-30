import { Patient } from './Patient'

export const Patientslist = ({ patients, setPatient, removePatient }) => {
  return (
    <div className='md:w-1/2 lg:w-3/5 md:h-screen overflow-y-scroll'>
      {patients && patients.length ? (
        <>
          <h2 className='font-black text-3xl text-center'>List</h2>
          <p className='text-xl mt-5 mb-10 text-center'>
            Manage your {''}
            <span className='text-indigo-600 font-bold'>Patients and Dates</span>
          </p>

          {patients.map(({ name, owner, email, entryDate, symptoms, id }) => (
            <Patient
              key={id}
              name={name}
              owner={owner}
              email={email}
              entryDate={entryDate}
              symptoms={symptoms}
              id={id}
              setPatient={setPatient}
              removePatient={removePatient}
            />
          ))}
        </>
      ) : (
        <>
          <h2 className='font-black text-3xl text-center'>No patients added</h2>
          <p className='text-xl mt-5 mb-10 text-center'>
            Add your patients {''}
            <span className='text-indigo-600 font-bold'>and they will show just below</span>
          </p>
        </>
      )}
    </div>
  )
}
