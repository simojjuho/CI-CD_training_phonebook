const AddNumber = ({handleNameFieldChange,
                    handleNumberFieldChange,
                    addContact, 
                    newName, 
                    newNumber}) => {
    return (
    <form onSubmit={addContact}>
        <div>
          name:
          <input 
            id="nameInput"
            value={newName}
            onChange={handleNameFieldChange} 
          />
          <br />
          number:
          <input
            id="numberInput"
            value={newNumber}
            onChange={handleNumberFieldChange}
          />
        </div>
        <div>
          <button id="addButton" type="submit">add</button>
        </div>
      </form>
      )
}

export default AddNumber