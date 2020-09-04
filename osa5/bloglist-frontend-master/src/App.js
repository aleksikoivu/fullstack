import React, { useState, useEffect } from 'react'
// Components
import Blog from './components/Blog'
import LoginForm from './components/loginForm'
import Notification from './components/Notification'
import BlogForm from './components/BlogForm'
// Services
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [errorMessage, setErrorMessage] = useState('')

  const [newBlogVisible, setNewBlogVisible] = useState(false) // eli falsena ei näytetä


  useEffect(() => {
    // Blogien haku blogServicestä
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )
  }, []) // Parametrinä oleva taulukko varmistaa että efekti suoritetaan vain kun komponentti renderöidään ensimmäistä kertaa

  useEffect(() => {
    // Tarkistus sille onko käyttäjä localstoragessa
    const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser')
    if (loggedUserJSON){
      console.log('loggedappuserfound')
      // Haettaessa pitää parsia pois JSON -muodosta
      const user = JSON.parse(loggedUserJSON)
      //setUser(user)
      //console.log(user)
      blogService.setToken(user.token)
    }
  }, [])

  
  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username, password
      })
      
      // Tallennetaan sivun storageen kys. käyttäjä
      window.localStorage.setItem(
        'loggedBlogAppUser', JSON.stringify(user) // Tallentaessa objektista stringi
        )
        
      // Asetetaan tokeniksi saatu userin token
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      setErrorMessage('Invalid username or password')
      setTimeout(() => {
        setErrorMessage(null)
      },5000 )
    }
  }
  
  const addBlog = (blogObject) => {
    const authorization = user.token
    blogService.create(blogObject, authorization)
    .then(returnedBlog => {
      setBlogs(blogs.concat(returnedBlog))
      //Piti jostain syystä laittaa hakemaan kaikki blogit uusiksi tai username & delete button ei renderöitynyt
      blogService.getAll().then(blogs => setBlogs( blogs ))
      setErrorMessage(`${blogObject.title} by ${blogObject.author} added`)
    })
    setTimeout(() => {
      setErrorMessage(null)
    }, 5000)
  }
  
  const editBlog = (blogObject , id) => {
    const authorization = user.token
    blogService.edit(blogObject, id, authorization)
    .then(() => {
      setErrorMessage(`${blogObject.title} liked successfully`)
    })
    setTimeout(() => {
      setErrorMessage(null)
    }, 5000)
  }
  
  const removeBlog = (id) => {
    const authorization = user.token
    blogService.remove(id, authorization)
    .then(() => {
      blogService.getAll().then(blogs => setBlogs(blogs))
      setErrorMessage('Blog removed successfully')
    })
    setTimeout(() => {
      setErrorMessage(null)
    }, 5000)
  }
  
  const logOut = () => {
    setUser(null)
    window.localStorage.clear()
  }
  
  const hideWhenVisible = { display: newBlogVisible ? 'none' : '' }
  const showWhenVisible = { display: newBlogVisible ? '' : 'none' }
  
  // Jos käyttäjä ei ole kirjautunut niin näkyy kirjautumislomake
  if(user === null){
    return (
      <div>
        <h1>Blogpage</h1>
        <Notification message = {errorMessage}/>

        {user === null && <LoginForm
          handleLogin = {handleLogin}
          username = {username}
          handleUserNameChange = {({ target }) => setUsername(target.value)}
          password = {password}
          handlePassWordChange = {({ target }) => setPassword(target.value)}/>}
      </div>
    )
  }

  // Jos käyttäjä on kirjautunut niin näytetään blogit ja luontilomake
  return (
    <div>
      <div>Logged in as {user.username}
        <button onClick={logOut}>Logout</button>
      </div>

      <div style={hideWhenVisible}>
        <button id={'newBlog'} onClick={() => setNewBlogVisible(true)}>Create new blog entry</button>
      </div>
      <div style={showWhenVisible}>
        <BlogForm
          createBlog = {addBlog}
          user = {user} />
        <button onClick={() => setNewBlogVisible(false)}>Cancel</button>
      </div>
      <Notification message = {errorMessage}/>
      <h2>Blogs</h2>
      {blogs.sort((a,b) => (a.likes < b.likes)).map(blog =>
        <Blog
          key = {blog.id}
          blog = {blog}
          addLike = {editBlog}
          removeBlog = {removeBlog}
          user = {user}/>
      )}
    </div>
  )
}

export default App