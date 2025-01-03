import React from 'react'
import { useEffect, useState } from 'react'
import ShowNumbers from './components/ShowNumbers'
import AddNumber from './components/AddNumber'
import NumberFilter from './components/NumberFilter'
import numbersService from './services/numbers'
import Feedback from './components/Feedback'
import Error from './components/Error'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filterField, setNumberFilter] = useState('')
  const [feedBackMessage, setFeedbackMessage] = useState(null)
  const [errorMsg, setErrorMsg] = useState(null)

  useEffect(() => {
    numbersService.getAll()
      .then(returnedNumbers => {
        setPersons(returnedNumbers.data)
        setFeedbackMessage('Contacts loaded succesfully!')
        nullFeedbackMessage()
      })
      .catch(error => {
        setErrorMsg('Loading contacts failed!')
        console.log(error)
        nullErrorMsg()
      })
  },[])

  const addContact = event => {
    event.preventDefault()
    const contactObject = {
      name: newName,
      number: newNumber
    }
    if (persons.some(element => element.name === newName)) {
      updateContact(persons.find(person => person.name === contactObject.name), contactObject)
    } else {
      numbersService.createContact(contactObject)
        .then(returnedNumbers => {
          setPersons(persons.concat(returnedNumbers))
          setFeedbackMessage(`Contact ${contactObject.name}: ${contactObject.number} added!`)
          nullFeedbackMessage()
          setNewName('')
          setNewNumber('')
        })
        .catch(error => {
          console.log(error.response.data)
          setErrorMsg(error.response.data.error)
          nullErrorMsg()
        })
    }
  }

  const removeContact = (id, name) => {
    if(window.confirm(`Please confirm you want to remove ${id}: ${name} from contacts?`)){
      numbersService.deleteContact(id)
        .then(() => {
          setPersons(persons.filter(person => person.id !== id))
          setFeedbackMessage(`Contact ${id}: ${name} removed`)
          nullFeedbackMessage()
        })
        .catch(() => {
          console.log('Contact not found')
          setErrorMsg('Contact not found')
          nullErrorMsg()
          setPersons(persons.filter(person => person.id !== id))
        })

    }
  }

  const updateContact = (person, newContact) => {
    if(window.confirm('Please confirm you want to update contact?')) {
      numbersService.update(person.id, newContact)
        .then(returnedNumber => {
          setPersons(persons.map(contact => contact.id !== person.id ? contact : returnedNumber))
          setFeedbackMessage('Contact updated.')
          nullFeedbackMessage()
        })
        .catch(error => {
          setErrorMsg(error.response.data.error)
          nullErrorMsg()
        })
    }
  }

  const nullFeedbackMessage = () => setTimeout(() => setFeedbackMessage(null), 5000)
  const nullErrorMsg = () => setTimeout(() => setErrorMsg(null), 5000)
  const handleNameFieldChange = (event) => setNewName(event.target.value)
  const handleNumberFieldChange = (event) => setNewNumber(event.target.value)
  const handleFilterFieldChange = (event) => setNumberFilter(event.target.value)
  const filterNameList = () => persons.filter(contact => contact.name.toLowerCase().includes(filterField.toLowerCase()))

  return (
    <div>
      <h2>Phonebook</h2>
      <Feedback feedback={feedBackMessage}/>
      <Error errorMsg={errorMsg}/>
      <h3>Add a contact</h3>
      <AddNumber
        handleNameFieldChange={handleNameFieldChange}
        handleNumberFieldChange={handleNumberFieldChange}
        addContact={addContact}
        newName={newName}
        newNumber={newNumber} />
      <div>
        <h3>Filter contacts</h3>
        <NumberFilter filterField={filterField} handleFilterFieldChange={handleFilterFieldChange} />
        <h3>Numbers</h3>
        <ShowNumbers numbers={filterNameList()} removeContact={removeContact} />
      </div>
    </div>
  )
}

export default App
