import React from 'react'

const NumberFilter = ({ filterField,
  handleFilterFieldChange }) => {
  return(
    <div>
      <p>Search for a contact. Shows all the contacts that include the set of letters, case-insensitive.</p>
      <input
        id="filterInput"
        value={filterField}
        onChange={handleFilterFieldChange}
      />
    </div>

  )
}

export default NumberFilter