import React from 'react'
import PropTypes from 'prop-types'

const LoginForm = ({
  handleLogin,
  handleUserNameChange,
  handlePassWordChange,
  username,
  password
}) => {
  return (
    <form onSubmit={handleLogin}>
      <h2>Login</h2>
      <div>
        Username
        <input
          id='Username'
          type="text"
          value={username}
          name="Username"
          onChange= {handleUserNameChange}
        />
      </div>
      <div>
        Password
        <input
          id='Password'
          type="password"
          value={password}
          name="Password"
          onChange={handlePassWordChange}
        />
      </div>
      <button type="submit" id='login-button'>login</button>
    </form>
  )
}

LoginForm.propTypes = {
  handleLogin: PropTypes.func.isRequired,
  handleUserNameChange: PropTypes.func.isRequired,
  handlePassWordChange: PropTypes.func.isRequired,
  username: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired
}

export default LoginForm