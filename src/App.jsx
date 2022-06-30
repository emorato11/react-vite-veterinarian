import { useEffect, useState } from 'react'
import { Form } from './components/Form'
import { Header } from './components/Header'
import { Patientslist } from './components/PatientsList'

function App() {
  const [patients, setPatients] = useState([])
  const [patient, setPatient] = useState({})

  useEffect(() => {
    const storedPatients = JSON.parse(localStorage.getItem('patients')) ?? []
    setPatients(storedPatients)
  }, [])

  useEffect(() => {
    localStorage.setItem('patients', JSON.stringify(patients))
  }, [patients])

  const removePatient = (id) => {
    const updatedPatients = patients.filter((patient) => patient.id !== id)
    setPatients(updatedPatients)
  }

  return (
    <div className='container mx-auto mt-20'>
      <Header />
      <div className='mt-12 md:flex'>
        <Form
          patients={patients}
          setPatients={setPatients}
          patient={patient}
          setPatient={setPatient}
        />
        <Patientslist patients={patients} setPatient={setPatient} removePatient={removePatient} />
      </div>
    </div>
  )
}

export default App
