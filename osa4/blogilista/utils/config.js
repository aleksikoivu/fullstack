let PORT = process.env.PORT || 3003
require('dotenv').config()

let MONGODB_URI = process.env.MONGODB_URI

if(process.env.NODE_ENV === 'test'){
  MONDOGB_URI = process.env.TEST_MONGODB_URI
}


module.exports = {
  MONGODB_URI,
  PORT
}