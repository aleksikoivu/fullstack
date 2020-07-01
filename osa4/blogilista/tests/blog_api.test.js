const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blogModel')
const helper = require('./test_helper')

const testerToken = "bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IlBpcmlwZXR0ZXJpMzAiLCJpZCI6IjVlZmI2NDJhMmY0MTk0M2MzNGUzZTdiNiIsImlhdCI6MTU5MzU5NTUyMX0.cIfF2UNBzgSLBd4mXwYYUwoY3vl8TVAt-aMaoHKr1Ac"

// npm test -- tests/blog_api.test.js
// Ennen testin pyöritystä tyhjätään tietokanta ja lisätään pari dummyä
beforeEach(async () => {
    await Blog.deleteMany({})

    // let blogObject = new Blog(helper.initialBlogs[0])
    // await blogObject.save()

    // blogObject = new Blog(helper.initialBlogs[1])
    // await blogObject.save()

    // parempi tapa syöttää taulukko tietokantaan
    const blogObjects = helper.initialBlogs
        .map(blog => new Blog(blog))

    const promiseArray = blogObjects.map(blog => blog.save())
    await Promise.all(promiseArray)

})

test('Content type JSON', async() => {
    await api.get('/api/blogs')
        .expect(200)
        .expect('Content-Type', /application\/json/)
})

test('All notes are returned', async() => {

    const response = await api.get('/api/blogs')
    expect(response.body).toHaveLength(helper.initialBlogs.length)
})

test('A specific note is within the returned notes', async () => {
    const response = await api.get('/api/blogs')

    const contents = response.body.map(response => response.author)
    expect(contents).toContain('Aleksi Koivu')
})

test('A valid blog post can be added ', async () => {
    const newBlog = {
        title: 'Valid dummy post',
        author: 'Testerman',
        url: 'WillItWork?.uk',
        likes: 50
    }

    await api
        .post('/api/blogs')
        .set('Authorization',testerToken)
        .send(newBlog)
        .expect(200)
        .expect('Content-Type', /application\/json/)

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)

    const contents = blogsAtEnd.map(response => response.title)
    expect(contents).toContain('Valid dummy post')
})

test('Note without content is not added', async() => {
    const newBlog = {}

    await api
        .post('/api/blogs')
        .set('Authorization',testerToken)
        .send(newBlog)
        .expect(400)

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length)
})

test('Empty likes is changed to 0', async() => {
    const newBlog = {
        title: 'No likes on a blog',
        author: 'Allu',
        url: 'google.net.uk',
    }

    await api
        .post('/api/blogs')
        .set('Authorization',testerToken)
        .send(newBlog)
        .expect(200)
        .expect('Content-Type', /application\/json/)

    const blogsAtEnd = await helper.blogsInDb()
    const content = blogsAtEnd.map(response => response.likes)

    expect(content[2]).toEqual(0)  
})

test('Get returns ID instead of _ID', async() => {
    const response = await api.get('/api/blogs')
    expect(response.body[0].id).toBeDefined()
})

test('Empty title or url gets 400 bad request', async() => {
    const newBlog = {
        title: 'This is a bad one',
        author: 'Didnt read instructions'
    }

    await api
        .post('/api/blogs')
        .set('Authorization',testerToken)
        .send(newBlog)
        .expect(400)

})

test('No token returns 401 Unauthorized', async() => {
    const newBlog = {}

    await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(401)
})

afterAll(() => {
    mongoose.connection.close()
})