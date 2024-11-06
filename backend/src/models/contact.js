const mongoose = require('mongoose')
const { DBURI } = require('../utils/config')
const logger = require('../utils/logger')


logger.info('Connecting to', DBURI )

mongoose.connect(DBURI)
  .then(() => {
    logger.info('connected to MongoDB')
  })
  .catch(error => {
    logger.info('error connecting to MongoDB', error.message)
  })

const contactSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: 3
  },
  number: {
    type: String,
    validate: {
      validator: (v) => {
        return /\d*\d{2}-\d{5,}/.test(v)
      }
    }
  }
})

contactSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

module.exports = mongoose.model('Contact', contactSchema)