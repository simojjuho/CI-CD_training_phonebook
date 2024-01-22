const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../../../backend/src/app')
const api = supertest(app)
const Contact = require('../../../backend/src/models/contact')
const { contacts } = require('../shared/contacts')

describe('Testing the functionality of database connection and the controllers', () => {
  beforeEach(async () => {
    await Contact.deleteMany({})

    const contactObjects = contacts.map(contact => new Contact(contact))
    const promiseArray = contactObjects.map(contact => contact.save())
    await Promise.all(promiseArray)
  })

  test('Controller functioning', async () => {
    await api
      .get('/api/persons')
      .expect(200)
  })

  test('Getting response in json form', async () => {
    await api
      .get('/api/persons')
      .expect('Content-Type', /application\/json/)
  })

  test('Response is two objects long', async () => {
    const response = await api
      .get('/api/persons')
    expect(response.body).toHaveLength(2)
  })

  test('Response has a correct name', async () => {
    const response = await api
      .get('/api/persons')
    expect(response.body[1].name).toBe('C.S. Lewis')
  })

  afterAll(async () => {
    mongoose.connection.close()
  })
})
