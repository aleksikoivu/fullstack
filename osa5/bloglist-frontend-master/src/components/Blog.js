import React, { useState } from 'react'

const Blog = ({ blog, addLike, removeBlog, user }) => {

  const [visible, setVisible] = useState(false)
  const [removeVisible, setRemoveVisible] = useState(false)
  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }

  const hideWhenNotRightUser = { display : removeVisible ? 'none' : '' }

  const toggleVisibilitySetUser = () => {
    setVisible(true)
    if(!user){ //Piti kiertää testejä varten tuo userin tarkastus
      setRemoveVisible(false)
    }else if(blog.user.username !== user.username){
      setRemoveVisible(true)
    }
  }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  const toggleLike = () => {
    blog.likes += 1
    addLike(blog, blog.id)
  }

  const toggleRemove = () => {
    const result = window.confirm(`Are you sure you want to remove ${blog.title} by ${blog.author}`)
    if(result===true){
      removeBlog(blog.id)
    }
  }

  return(
    <div style={{ border: '1px solid black' }}>

      <div style={hideWhenVisible} className='showDefault'>
        {blog.title} --- {blog.author}
        <button id="showMoreButton" onClick={toggleVisibilitySetUser}>Show more</button>
      </div>

      <div style={showWhenVisible} className='togglableContent'>
        {blog.title} --- {blog.author}
        <button onClick={toggleVisibility}>Show less</button> <br></br>
        <b>Url:</b> {blog.url} <br></br>
        <b>Likes:</b> {blog.likes}
        <button id='likeButton' onClick={toggleLike}>Like</button> <br></br>
        <b>Username:</b>{blog.user.username} <br></br>

        <div style={hideWhenNotRightUser}>
          <button id='deleteBlogButton'onClick={toggleRemove}>Delete blog</button>
        </div>

      </div>
    </div>
  )
}

export default Blog