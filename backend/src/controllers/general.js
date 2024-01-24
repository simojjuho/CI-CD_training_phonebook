const generalRouter = require('express').Router()
const Contact = require('../models/contact')
const time = new Date

generalRouter.get('/', (req, res) => {
  res.send('<h1>Hello World!</h1>')
})

generalRouter.get('/info', (request, response) => {
  Contact.find({}).then(contacts => {
    response.send(`<p>Phonebook has info for ${contacts.length} people.</p><br />${time.toString()}`)
  })
})

generalRouter.get('/test', (request, response) => {
  response.send('ok')
})

generalRouter.get('/health', (request, response) => {
  if(true) throw error
  response.send('ok')
})

module.exports = generalRouter