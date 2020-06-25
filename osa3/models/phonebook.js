const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

const url = process.env.MONGODB_URI
console.log('connecting to', url)

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('connected to MongoDB')
    })
    .catch((error) => {
        console.log('error connecting to MongoDB:', error.message)
    }
    )

const numberSchema = new mongoose.Schema({
    name: { type: String, unique: true, minlength:[3, 'Minimum lenght of name is 3 characters'] },
    number: { type: String, unique: true, minlength:[8, 'Minimum lenght of number is 8 characters'] },
    date: Date
})

numberSchema.plugin(uniqueValidator)

numberSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
})

module.exports = mongoose.model('Phonebook', numberSchema)
