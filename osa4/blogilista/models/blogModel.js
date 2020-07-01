const mongoose = require('mongoose')
const config = require('../utils/config')
const logger = require('../utils/logger')
// const mongoUrl = config.MONGODB_URI

// mongoose.connect(mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true})
//     .then(() => {
//         logger.info('Connected to MongoDB')
//     })
//     .catch((error) => {
//         logger.error('Error connecting to MongoDB ', error.message)
//     })

const blogSchema = mongoose.Schema({
    title: { type: String, required: true },
    author: { type: String,required: true },
    url: { type: String,required: true },
    likes: { type: Number },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    }
  })

blogSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})
    
  module.exports = mongoose.model('Blog', blogSchema)