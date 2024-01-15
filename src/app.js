const express = require('express')
const morgan = require('morgan')
const cors = require('cors')

const contactRouter = require('./controllers/contacts')
const generalRouter = require('./controllers/general')
const errorHandler = require('./middleware/errorHandler')
const unknownEndpoint = require('./middleware/unknownEndpoint')
const logger = require('./utils/logger')

const app = express()
app.use(express.json())

morgan.token('bodyJSON', function (request) {
  logger.info(request.body)
  return JSON.stringify(request.body)
})

app.use(cors())

if(process.env.NODE_ENV != 'test') {
  app.use(morgan(':method :url :status :res[content-length] - :response-time ms :bodyJSON'))
}

app.use(express.static('build'))
app.use('/api/persons', contactRouter)
app.use('/', generalRouter)

app.use(unknownEndpoint)
app.use(errorHandler)

module.exports = app