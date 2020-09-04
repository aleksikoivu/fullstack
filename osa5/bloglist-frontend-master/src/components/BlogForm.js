import React, { useState } from 'react'

const BlogForm = ({ createBlog }) => { // muuttujaan blogServicen create jossa muuttujana blogObject

  // Tilankäsittely voi olla komponentissa
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')
  const [title, setTitle] = useState('')

  const addBlog = (event) => {
    event.preventDefault()
    createBlog({
      author: author,
      title: title,
      url: url
    })
    setAuthor('')
    setTitle('')
    setUrl('')
  }

  return (
    <form onSubmit={addBlog}>
      <div>
        Author
        <input
          id = 'Author'
          type = 'text'
          value = {author}
          name = 'Author'
          onChange = {({ target }) =>  (setAuthor(target.value))}
        />
      </div>
      <div>
        Title
        <input
          id = 'Title'
          type = 'text'
          value = {title}
          name = 'Title'
          onChange = {({ target }) => (setTitle(target.value))}
        />
      </div>
      <div>
        Url
        <input
          id = 'Url'
          type = 'text'
          value = {url}
          name = 'Url'
          onChange = {({ target }) => (setUrl(target.value))}
        />
      </div>
      <button id= 'blogSubmit' type = "submit">Submit</button>
    </form>
  )
}

export default BlogForm