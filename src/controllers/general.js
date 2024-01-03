const generalRouter = require('express').Router()
const time = new Date

contactRouter.get('/', (req, res) => {
  res.send('<h1>Hello World!</h1>')
})

contactRouter.get('/info', (request, response) => {
  Contact.find({}).then(contacts => {
    response.send(`<p>Phonebook has info for ${contacts.length} people.</p><br />${time.toString()}`)
  })
})

module.exports = generalRouter