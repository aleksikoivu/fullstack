const app = require('./app')
const express = require('express')
const cors = require('cors')
const logger = require('./utils/logger')
const http = require('http')
const config = require('./utils/config')

// !!!!!!!!!!!!!!!!!!! 4.6 ja 4.7 puuttuu 
// https://fullstackopen.com/osa4/sovelluksen_rakenne_ja_testauksen_alkeet

const server = http.createServer(app)

server.listen(config.PORT, () => {
  logger.info(`Server running on port ${config.PORT}`)
})

// const PORT = 3003
// app.listen(PORT, () => {
//   logger.info(`Server running on port ${PORT}`)
// })