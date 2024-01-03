require('dotenv').config()
const { PORT } = require('./utils/config')
const express = require('express')
const contactRouter = require('./controllers/contacts')
const generalRouter = require('./controllers/general')
const morgan = require('morgan')
const cors = require('cors')
const app = express()
app.use(express.json())
morgan.token('bodyJSON', function (request) {
  console.log(request.body)
  return JSON.stringify(request.body)
})
app.use(cors())

app.use(morgan(':method :url :status :res[content-length] - :response-time ms :bodyJSON'))
app.use(express.static('build'))
app.use(contactRouter)
app.use(generalRouter)

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

app.use(unknownEndpoint)

const errorHandler = (error, request, response, next) => {
  console.error(error.message)

  if(error.name === 'CastError') {
    return response.status(404).send({ error: 'malformatted id' })
  } else if(error.name === 'ValidationError') {
    return response.status(400).send({ error: error.message })
  }

  next(error)
}

app.use(errorHandler)


app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})