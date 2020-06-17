import Axios from 'axios'
const baseUrl = 'http://localhost:3001/persons'

const getAll = () => {
    return Axios.get(baseUrl)
}

const create = newObject => {
    return Axios.post(baseUrl, newObject)
}

const deletePerson = (id) => {
    return Axios.delete(baseUrl+`/${id}`)
}

const updatePerson = (id, newObject) => {
    return Axios.put(baseUrl+`/${id}`, newObject)
}

export default {
    getAll: getAll,
    create: create,
    deletePerson: deletePerson,
    updatePerson: updatePerson
}