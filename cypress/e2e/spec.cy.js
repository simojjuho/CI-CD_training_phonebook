describe('Front page functionalities', () => {
  it('Page is loaded', () => {
    cy.visit('localhost:5001')
    cy.contains('Phonebook')
  })

  it('Contacts are found', () => {
    cy.visit('localhost:5001')
    cy.contains('Contacts loaded succesfully!')
  })

  it('Add Kekkonen to the list', () => {
    cy.visit('localhost:5001')
    cy.get('input#nameInput').type('Kekkonen')
    cy.get('input#numberInput').type('08-123456789')
    cy.get('button#addButton').click()
    cy.contains('Kekkonen')
    cy.contains('08-123456789')
  })

  it('Filters only Kekkonen visible on the list', () => {
    cy.visit('localhost:5001')
    cy.get('input#filterInput').type('Kek')
    cy.get('li').should('have.length', 1)
  })

  it('Remove Kekkonen from the list', () => {
    cy.visit('localhost:5001')
    cy.get('.deleteButton').last().click()
  })
})