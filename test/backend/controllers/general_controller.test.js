const supertest = require('supertest')
const app = require('../../../backend/src/app')
const api = supertest(app)

describe('Testing general controllers', () => {
  test('/test endpoint gives a response', async () => {
    await api
      .get('/test')
      .expect(200)    
  })

  test('/test response contenty type is json', async () => {
    await api
      .get('/test')
      .expect('Content-Type', /text\/html/)   
  })

  test('/test response is Working!', async () => {
    const response = await api.get('/test')
    expect(response.text).toBe('Working!')
  })
})