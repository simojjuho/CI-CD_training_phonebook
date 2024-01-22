import React from 'react'

const ShowNumbers = ({ numbers, removeContact }) => {

  return (
    <>
      <div id="numbersListBox">
        {numbers.map(person =>
          <Person key={person.id} person={person.name} number={person.number} id={person.id} removeContact={removeContact}/>)}
      </div>
    </>
  )}

export default ShowNumbers

const Person = ({ person, number, id, removeContact }) => {
  const clickHandler = () => removeContact(id, person)

  return (
    <ul>
      <li>
        {person}: {number} <br />
        { <button className="deleteButton" onClick={() => clickHandler()}>delete contact</button> }
      </li>
    </ul>

  )
}