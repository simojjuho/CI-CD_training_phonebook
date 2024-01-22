const http = require('http')

const { PORT } = require('./backend/src/utils/config')
const app = require('./backend/src/app')
const logger = require('./backend/src/utils/logger')

const server = http.createServer(app)

server.listen(PORT, () => {
  logger.info(`Server running on port ${PORT}`)
})