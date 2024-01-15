const Contact = require('../models/contact')
const contactRouter = require('express').Router();

contactRouter.get('/', (request, response) => {
  Contact.find({}).then(contacts => {
    response.json(contacts)
  })
})

contactRouter.get('/:id', (request, response, next) => {
  const id = request.params.id
  Contact.findById(id)
    .then(contact => {
      if(contact) response.json(contact)
      else {response.status(404).end()
      }
    })
    .catch(error => next(error))
})

contactRouter.delete('/:id', (request, response, next) => {

  Contact.findByIdAndRemove(request.params.id)
    .then(() => {
      response.status(204).end()
    })
    .catch(error => next(error))
})

contactRouter.put('/:id', (request, response, next) => {

  const contact = {
    name: request.body.name,
    number: request.body.number
  }
  Contact.findByIdAndUpdate(
    request.params.id,
    contact,
    {  new: true, runValidators: true, context: 'query'  }
  )
    .then(updatedContact => {
      response.json(updatedContact)
    })
    .catch(error => next(error))
})

contactRouter.post('/', (request, response, next) => {
  const contact = new Contact({
    name: request.body.name,
    number: request.body.number
  })

  if (contact.name === undefined || contact.number === undefined) return response.status(400).json({ error: 'content missing!' })

  contact.save()
    .then(savedNumber => {
      response.json(savedNumber)
    })
    .catch(error => next(error))
})

module.exports = contactRouter