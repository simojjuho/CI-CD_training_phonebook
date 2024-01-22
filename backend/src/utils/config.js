require('dotenv').config()

const DBURI = process.env.NODE_ENV == 'test' 
  ? process.env.MONGODB_URI_TEST
  : process.env.NODE_ENV == 'production'
  ? process.env.MONGODB_URI_PROD
  : process.env.MONGODB_URI_DEV
const PORT = process.env.PORT || 3001

module.exports = {
  DBURI,
  PORT
}